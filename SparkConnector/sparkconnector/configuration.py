import os, subprocess
from pyspark import SparkConf, SparkContext
from string import Formatter


class SparkConfigurationFactory:

    def __init__(self, connector):
        self.connector = connector

    def create(self):
        cluster_name = os.environ.get('SPARK_CLUSTER_NAME', 'local')

        # Define configuration based on cluster type
        if cluster_name == 'local':
            # local
            return SparkLocalConfiguration(self.connector, cluster_name)
        elif cluster_name == 'k8s':
            # kubernetes
            return SparkK8sConfiguration(self.connector, cluster_name)
        else:
            # yarn
            return SparkYarnConfiguration(self.connector, cluster_name)


class SparkConfiguration(object):

    def __init__(self, connector, cluster_name):
        self.cluster_name = cluster_name
        self.connector = connector

    def get_cluster_name(self):
        """ Get cluster name """
        return self.cluster_name

    def get_spark_memory(self):
        """ Get spark max memory """
        return os.environ.get('MAX_MEMORY', '2')

    def get_spark_version(self):
        """ Get spark version """
        from pyspark import __version__ as spark_version
        return spark_version

    def get_spark_user(self):
        """ Get cluster name """
        return os.environ.get('SPARK_USER', '')

    def get_spark_needs_auth(self):
        """ When NXCals no longer require kinit, remove the function """
        return self.cluster_name == "nxcals" and subprocess.call(['klist', '-s']) != 0

    def close_spark_session(self):
        sc = self.connector.ipython.user_ns.get('sc')
        if sc and isinstance(sc, SparkContext):
            sc.stop()

    def _parse_options(self, _opts):
        """ Parse options and set defaults """
        _options = {}
        if 'options' in _opts:
            for name, value in _opts['options'].items():
                replaceable_values = {}
                for _, variable, _, _ in Formatter().parse(value):
                    if variable is not None:
                        replaceable_values[variable] = os.environ.get(variable)

                value = value.format(**replaceable_values)
                _options[name] = value
        return _options

    def configure(self, opts, ports):
        """ Initializes Spark configuration object """

        # Check if there's already a conf variablex
        # If using SparkMonitor, this is defined but is of type SparkConf
        conf = self.connector.ipython.user_ns.get('swan_spark_conf')
        if conf:
            self.connector.log.warn("conf already exists: %s", conf.toDebugString())
            if not isinstance(conf, SparkConf):
                raise Exception('There is already a "swan_spark_conf" variable defined and is not of type SparkConf.')
        else:
            conf = SparkConf()  # Create a new conf

        options = self._parse_options(opts)

        # Do not overwrite the existing driver extraClassPath with option, add instead
        def_conf_extra_class_path = conf.get('spark.driver.extraClassPath', '')
        options_extra_class_path = options.get('spark.driver.extraClassPath', '')
        if def_conf_extra_class_path != '' and options_extra_class_path != '':
            options['spark.driver.extraClassPath'] = def_conf_extra_class_path + ":" + options_extra_class_path
        elif def_conf_extra_class_path != '' and options_extra_class_path == '':
            options['spark.driver.extraClassPath'] = def_conf_extra_class_path
        elif def_conf_extra_class_path == '' and options_extra_class_path != '':
            options['spark.driver.extraClassPath'] = options_extra_class_path

        # Add options to the default conf
        for name, value in options.items():
            conf.set(name, value)

        # Extend conf adding logging of log4j to java options
        base_extra_java_options = "-Dlog4j.configuration=file:%s" % self.connector.log4j_file
        extra_java_options = conf.get("spark.driver.extraJavaOptions")
        if extra_java_options:
            extra_java_options = base_extra_java_options + " " + extra_java_options
        else:
            extra_java_options = base_extra_java_options
        conf.set("spark.driver.extraJavaOptions", extra_java_options)

        # Extend conf ensuring that LD_LIBRARY_PATH on executors is the same as on the driver
        ld_library_path = conf.get('spark.executorEnv.LD_LIBRARY_PATH')
        if ld_library_path:
            ld_library_path = ld_library_path + ":" + os.environ.get('LD_LIBRARY_PATH', '')
        else:
            ld_library_path = os.environ.get('LD_LIBRARY_PATH', '')
        conf.set('spark.executorEnv.LD_LIBRARY_PATH', ld_library_path)

        # Extend conf with ports for the driver and block manager
        conf.set('spark.driver.host', os.environ.get('SERVER_HOSTNAME', 'localhost'))
        conf.set('spark.driver.port', ports[0])
        conf.set('spark.blockManager.port', ports[1])
        conf.set('spark.ui.port', ports[2])

        # Extend conf with spark app name to allow the monitoring and filtering of SWAN jobs in the Spark clusters
        app_name = conf.get('spark.app.name')
        conf.set('spark.app.name', app_name + '_swan' if app_name else 'pyspark_shell_swan')

        return conf


class SparkLocalConfiguration(SparkConfiguration):

    def configure(self, opts, ports):
        """ Initialize YARN configuration for Spark """

        conf = super(self.__class__, self).configure(opts, ports)

        conf.set('spark.master', 'local[*]')
        return conf

    def get_spark_session_config(self):
        conn_config = {}

        sc = self.connector.ipython.user_ns.get('sc')
        if sc and isinstance(sc, SparkContext):
            history_url = 'http://' + sc._conf.get('spark.driver.host') + ':' + sc._conf.get('spark.ui.port')
            conn_config['sparkhistoryserver'] = history_url
        return conn_config


class SparkK8sConfiguration(SparkConfiguration):

    def _format_local_paths(self, path_array):
        """ Dependencies which are in EOS HOME will be formatted to root:// """

        spark_work_dir = None
        for dh in self.connector.ipython.user_ns.get('_dh'):
            if dh.startswith('/eos/home') and 'SWAN_projects' in dh:
                # Adjust /eos/home path to /eos/user xrootd access
                spark_work_dir = dh.replace('/eos/home', 'root://eoshome.cern.ch//eos/user', 1).replace('-', '/', 1)
                break

        adjusted_paths = []
        for path in path_array:
            if spark_work_dir and path.startswith('./'):
                adjusted_path = path.replace('.', spark_work_dir, 1)
                if " " in adjusted_path:
                    raise Exception(
                        'Could not stage dependencies with spark.files, spark.jars or spark.submit.pyFiles '
                        'which include space in the name of the project or path')
                adjusted_paths.append(adjusted_path)
            elif path.startswith('/'):
                raise Exception('Staging of dependencies not allowed from all local paths. '
                                'Please use your notebook directory ./, root://, http:// or s3a://')
            else:
                adjusted_paths.append(path)

        return ",".join(adjusted_paths)

    def _retrieve_k8s_master(self, kubeconfig_path):
        """ Extract k8s master ip from kubeconfig """
        with open(kubeconfig_path) as f:
            for line in f.readlines():
                server = line.split("server:")
                if len(server) == 2:
                    return "k8s://" + server[1].strip()

    def configure(self, opts, ports):
        """ Initialize K8s configuration for Spark """

        conf = super(self.__class__, self).configure(opts, ports)

        # Set K8s configuration
        conf.set('spark.kubernetes.namespace', os.environ.get('SPARK_USER'))
        conf.set('spark.master', self._retrieve_k8s_master(os.environ.get('KUBECONFIG')))

        # Ensure that Spark ENVs on executors are the same as on the driver
        conf.set('spark.executorEnv.PYTHONPATH', os.environ.get('PYTHONPATH'))
        conf.set('spark.executorEnv.JAVA_HOME', os.environ.get('JAVA_HOME'))
        conf.set('spark.executorEnv.SPARK_HOME', os.environ.get('SPARK_HOME'))
        conf.set('spark.executorEnv.SPARK_EXTRA_CLASSPATH', os.environ.get('SPARK_DIST_CLASSPATH'))

        # There is no resource staging server for files, download directly from storage to executors
        # Distribute files (for pyFiles add them also to files) and jars
        spark_files = conf.get('spark.files', '')
        conf.set('spark.files', self._format_local_paths(spark_files.split(",")))
        spark_jars = conf.get('spark.jars', '')
        conf.set('spark.jars', self._format_local_paths(spark_jars.split(",")))

        if conf.get('spark.submit.pyFiles', None):
            raise Exception('Option spark.submit.pyFiles is not recommended. '
                            'Please use e.g. spark.files=./bigdl.zip and sc.addPyFile("./bigdl.zip")')

        if conf.get('spark.yarn.dist.files', None) or \
                conf.get('spark.yarn.dist.jars', None) or \
                conf.get('spark.yarn.dist.archives', None):
            raise Exception('Kubernetes does not support syntax for YARN, use spark.files or spark.jars')

        return conf

    def get_spark_session_config(self):
        conn_config = {}
        sc = self.connector.ipython.user_ns.get('sc')
        if sc and isinstance(sc, SparkContext):
            # set the metrics URL if the config bundle is selected
            if sc._conf.get('spark.cern.grafana.url') is not None:
                # if spark.cern.grafana.url is set, use cern spark monitoring dashboard
                conn_config['sparkmetrics'] = sc._conf.get('spark.cern.grafana.url') + \
                                              '?orgId=1' + \
                                              '&var-ClusterName=' + self.get_cluster_name() + \
                                              '&var-UserName=' + self.get_spark_user() + \
                                              '&var-ApplicationId=' + sc._conf.get('spark.app.id')

            history_url = 'http://' + sc._conf.get('spark.driver.host') + ':' + sc._conf.get('spark.ui.port')
            conn_config['sparkhistoryserver'] = history_url

        return conn_config


class SparkYarnConfiguration(SparkConfiguration):

    def configure(self, opts, ports):
        """ Initialize YARN configuration for Spark """

        conf = super(self.__class__, self).configure(opts, ports)

        # Initialize YARN Specific configuration
        conf.set('spark.master', 'yarn')
        conf.set('spark.authenticate', True)
        conf.set('spark.network.crypto.enabled', True)
        conf.set('spark.authenticate.enableSaslEncryption', True)

        # Ensure that driver has extra classpath required for running on YARN
        base_extra_class_path = "/eos/project/s/swan/public/hadoop-mapreduce-client-core-2.6.0-cdh5.7.6.jar"
        extra_class_path = conf.get('spark.driver.extraClassPath')
        if extra_class_path:
            extra_class_path = base_extra_class_path + ":" + extra_class_path
        else:
            extra_class_path = base_extra_class_path
        conf.set('spark.driver.extraClassPath', extra_class_path)

        return conf

    def get_spark_session_config(self):
        conn_config = {}
        sc = self.connector.ipython.user_ns.get('sc')
        if sc and isinstance(sc, SparkContext):
            # set the metrics URL if the config bundle is selected
            conn_config = {}
            if sc._conf.get('spark.cern.grafana.url') is not None:
                # if spark.cern.grafana.url is set, use cern spark monitoring dashboard
                conn_config['sparkmetrics'] = sc._conf.get('spark.cern.grafana.url') + \
                                              '?orgId=1' + \
                                              '&var-ClusterName=' + self.get_cluster_name() + \
                                              '&var-UserName=' + self.get_spark_user() + \
                                              '&var-ApplicationId=' + sc._conf.get('spark.app.id')

            # determine the history server URL depending on the selected resource manager (yarn, k8s, local etc)
            history_url = sc._conf.get(
                'spark.org.apache.hadoop.yarn.server.webproxy.amfilter.AmIpFilter.param.PROXY_URI_BASES'
            ).split(',', 1)[0]
            conn_config['sparkhistoryserver'] = history_url

        return conn_config
