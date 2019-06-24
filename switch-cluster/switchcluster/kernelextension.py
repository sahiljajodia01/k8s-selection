ipykernel_imported = True
try:
    from ipykernel import zmqshell
except ImportError:
    ipykernel_imported = False

import os, logging, tempfile, subprocess
import io, yaml
import subprocess
import time
from kubernetes import client, config
from kubernetes.client.rest import ApiException
import base64


class SwitchCluster:
    def __init__(self, ipython, log):
        self.ipython = ipython
        self.log = log

    def send(self, msg):
        """Send a message to the frontend"""
        self.comm.send(msg)

    def send_ok(self, page, config=None):
        """Send a message to frontend to switch to a specific page and append spark config"""
        self.send({'msgtype': page, 'config': config})

    def send_error(self, page, error):
        """Send a message to frontend to switch to a specific page and append error message"""
        self.send({'msgtype': page, 'error': error})

    def handle_comm_message(self, msg):
        """ Handle message received from frontend """
        # self.log.info(msg)
        action = msg['content']['data']['action']

        if action == 'Refresh':
            self.cluster_list()
        elif action == 'change-current-context':
            context = msg['content']['data']['context']
            # self.log.info("Changed context for kubeconfig!")


            self.log.info("Context from frontend: ", context)

            with io.open(os.environ['HOME'] + '/.kube/config', 'r', encoding='utf8') as stream:
                load = yaml.safe_load(stream)

            load['current-context'] = context

            with io.open(os.environ['HOME'] + '/.kube/config', 'w', encoding='utf8') as out:
                yaml.dump(load, out, default_flow_style=False, allow_unicode=True)

            self.send({
                'msgtype': 'changed-current-context'
            })
        elif action == 'check-current-settings':
            cluster = msg['content']['data']['cluster']
            namespace = msg['content']['data']['namespace']
            svcaccount = msg['content']['data']['svcaccount']

            self.check_config(cluster, namespace, svcaccount)
        elif action == 'get-context-settings':
            context = msg['content']['data']['context']

            self.log.info("View Context: ", context)

            with io.open(os.environ['HOME'] + '/.kube/config', 'r', encoding='utf8') as stream:
                load = yaml.safe_load(stream)

            for i in load['contexts']:
                if i['name'] == context:
                    cluster_name = i['context']['cluster']
                    user_name = i['context']['user']
                    namespace_name = i['context']['namespace']

            self.log.info("Cluster name: ", cluster_name)
            self.log.info("Service account name: ", user_name)
            self.log.info("Namespace name: ", namespace_name)

            os.environ['KUBECONFIG'] = os.environ['HOME'] + '/.kube/config'
            os.environ['NAMESPACE'] = namespace_name
            os.environ['SERVICE_ACCOUNT'] = user_name

            token = subprocess.check_output('/Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/test3.sh', shell=True)
            token = base64.b64decode(token)
            self.log.info("Token: ", str(token))

            self.send({
                'msgtype': 'context-info',
                'cluster_name': cluster_name,
                'svcaccount': user_name,
                'namespace': namespace_name,
                'token': token
            })
        elif action == 'add-context':
            namespace = msg['content']['data']['namespace']
            token = msg['content']['data']['token']
            svcaccount = msg['content']['data']['svcaccount']
            context_name = msg['content']['data']['context_name']
            cluster = msg['content']['data']['cluster']
            tab = msg['content']['data']['tab']

            if tab == 'local':
                os.environ['SERVICE_ACCOUNT'] = svcaccount
                os.environ['TOKEN'] = token
                os.environ['CONTEXT_NAME'] = context_name
                os.environ['CLUSTER_NAME'] = cluster
                os.environ['NAMESPACE'] = namespace

                error = ''

                config.load_kube_config()

                contexts, active_context = config.list_kube_config_contexts()
                contexts = [i['name'] for i in contexts]

                api_instance = client.CoreV1Api()
                
                if context_name in contexts:
                    error = error + ' Context \'{}\' already exist.'.format(context_name)

                if error == '':
                    try:
                        api_response = api_instance.list_namespace()
                        namespace_names = [i.metadata.name for i in api_response.items]

                        if namespace not in namespace_names:
                            error = error + ' Namespace \'{}\' does not exist.'.format(namespace)

                    except ApiException as e:
                        error = e
                        self.log.info("Exception when calling CoreV1Api->list_namespaced_service_account: %s\n" % e)
                
                
                if error == '':
                    try:
                        api_response = api_instance.list_namespaced_service_account(namespace=namespace)
                        svcaccount_names = [i.metadata.name for i in api_response.items]
                        
                        if svcaccount not in svcaccount_names:
                            error = error + ' Service account \'{}\' does not exist.'.format(svcaccount)
                    except ApiException as e:
                        error = e
                        self.log.info("Exception when calling CoreV1Api->list_namespace: %s\n" % e)
                
                if error == '':
                    output = subprocess.call('/Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/test4.sh', shell=True)
                    self.log.info("output: ", output)
                    if output != 0:
                        error = 'You cannot use these settings. Please contact your admin'

                if error == '':
                    self.send({
                    'msgtype': 'added-context-successfully',
                    })
                else:
                    self.send({
                    'msgtype': 'added-context-unsuccessfully',
                    'error': error
                    })
        elif action == 'add-context-cluster':
            namespace = "sahil"
            token = msg['content']['data']['token']
            svcaccount = "sahil"
            cluster_name = msg['content']['data']['cluster_name']
            tab = msg['content']['data']['tab']
            ip = msg['content']['data']['ip']
            insecure_server = msg['content']['data']['insecure_server']
            context_name = cluster_name + "-" + namespace + "-" + svcaccount + "-context"

            if insecure_server == "false":
                catoken = msg['content']['data']['catoken']

            if tab == 'local':

                os.environ['SERVICE_ACCOUNT'] = svcaccount
                os.environ['TOKEN'] = token
                os.environ['CONTEXT_NAME'] = context_name
                os.environ['CLUSTER_NAME'] = cluster_name
                os.environ['NAMESPACE'] = namespace
                os.environ['SERVER_IP'] = ip


                if insecure_server == "false":
                    os.environ['CATOKEN'] = catoken

                error = ''

                config.load_kube_config()

                contexts, active_context = config.list_kube_config_contexts()
                contexts = [i['name'] for i in contexts]

                api_instance = client.CoreV1Api()

                with io.open(os.environ['HOME'] + '/.kube/config', 'r', encoding='utf8') as stream:
                    load = yaml.safe_load(stream)
                clusters = []
                for i in load['clusters']:
                    clusters.append(i['name'])

                if cluster_name in clusters:
                    error = error + ' Cluster \'{}\' already exist.'.format(cluster_name)


                # if error == '':
                #     if context_name in contexts:
                #         error = error + ' Context \'{}\' already exist.'.format(context_name)
                
                # if error == '':
                #     try:
                #         api_response = api_instance.list_namespace()
                #         namespace_names = [i.metadata.name for i in api_response.items]

                #         if namespace not in namespace_names:
                #             error = error + ' Namespace \'{}\' does not exist.'.format(namespace)

                #     except ApiException as e:
                #         error = e
                #         self.log.info("Exception when calling CoreV1Api->list_namespaced_service_account: %s\n" % e)
                
                
                # if error == '':
                #     try:
                #         api_response = api_instance.list_namespaced_service_account(namespace=namespace)
                #         svcaccount_names = [i.metadata.name for i in api_response.items]
                        
                #         if svcaccount not in svcaccount_names:
                #             error = error + ' Service account \'{}\' does not exist.'.format(svcaccount)
                #     except ApiException as e:
                #         error = e
                #         self.log.info("Exception when calling CoreV1Api->list_namespace: %s\n" % e)

                if error == '':
                    with io.open(os.environ['HOME'] + '/.kube/config', 'r', encoding='utf8') as stream:
                        load = yaml.safe_load(stream)
                    
                    if insecure_server == "false":
                        load['clusters'].append({
                            'cluster': {
                                'certificate-authority-data': catoken,
                                'server': ip
                            },
                            'name': cluster_name
                        })
                    else:
                        load['clusters'].append({
                            'cluster': {
                                'insecure-skip-tls-verify': True,
                                'server': ip
                            },
                            'name': cluster_name
                        })

                    with io.open(os.environ['HOME'] + '/.kube/config', 'w', encoding='utf8') as out:
                        yaml.dump(load, out, default_flow_style=False, allow_unicode=True)

                if error == '':
                    output = subprocess.call('/Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/test5.sh', shell=True)
                    self.log.info("output: ", output)
                    if output != 0:
                        error = 'There is some error. You cannot use these settings. Please contact your admin'


                if error == '':
                    self.send({
                    'msgtype': 'added-context-successfully',
                    })
                else:
                    self.send({
                    'msgtype': 'added-context-unsuccessfully',
                    'error': error
                    })
        elif action == "show-error":
            error = "Please fill all the required fields."
            self.send({
                'msgtype': 'added-context-unsuccessfully',
                'error': error
            })


    def register_comm(self):
        """ Register a comm_target which will be used by frontend to start communication """
        self.ipython.kernel.comm_manager.register_target(
            "SwitchCluster", self.target_func)

    def target_func(self, comm, msg):
        """ Callback function to be called when a frontend comm is opened """
        self.log.info("Established connection to frontend")
        self.log.debug("Received message: %s", str(msg))
        self.comm = comm

        @self.comm.on_msg
        def _recv(msg):
            self.handle_comm_message(msg)


        self.cluster_list()

    def cluster_list(self):
        contexts, active_context = config.list_kube_config_contexts()

        if not contexts:
            print("Cannot find any context in kube-config file.")


        contexts = [context['name'] for context in contexts]
        active_context = active_context['name']

        with io.open(os.environ['HOME'] + '/.kube/config', 'r', encoding='utf8') as stream:
            load = yaml.safe_load(stream)
            # self.log.info(load)
        # if len(load['contexts']) == 0:
        #     print("Cannot find any context in kube-config file.")

        clusters = []
        for i in load['clusters']:
            clusters.append(i['name'])

        # active_context = load['current-context']

        for i in load['contexts']:
            if i['name'] == active_context:
                current_cluster = i['context']['cluster']

        
        # self.log.info(current_cluster)

        self.log.info("Contexts:")
        for i in contexts:
            self.log.info(i)

        self.log.info("Current context: ", active_context)

        self.send({
            'msgtype': 'context-select',
            'contexts': contexts,
            'active_context': active_context,
            'clusters': clusters,
            'current_cluster': current_cluster
        })

    def check_config(self, cluster, namespace, svcaccount):
        # def run_command(command):
        #     p = subprocess.Popen(command,
        #                         stdout=subprocess.PIPE,
        #                         stderr=subprocess.STDOUT)
        #     return iter(p.stdout.readline, b'')


        with io.open(os.environ['HOME'] + '/.kube/config', 'r', encoding='utf8') as stream:
                load = yaml.safe_load(stream)
                self.log.info(load)
        
        for i in load['clusters']:
            if i['name'] == cluster:
                server_host = i['cluster']['server']
        
        kubeconfig = os.environ['HOME'] + "/config"
        os.environ['KUBECONFIG'] = kubeconfig
        os.environ['NAMESPACE'] = namespace
        os.environ['SERVICE_ACCOUNT'] = svcaccount
        os.environ['SERVER'] = server_host
        os.environ['CLUSTER'] = cluster

        error = ''
        # for line in run_command(command):
        #     print(line)
        output = subprocess.call('/Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/test.sh', shell=True)
        self.log.info("output: ", output)
        if output != 0:
            error = 'Error'

        if error == '':
            output2 = subprocess.call('/Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/test2.sh', shell=True)
            if output2 != 0:
                self.send({
                'msgtype': 'authentication-unsuccessfull',
                'error': "Error"
                })
            else:
                self.send({
                'msgtype': 'authentication-successfull',
                })
        else:
            self.send({
            'msgtype': 'authentication-unsuccessfull',
            'error': error
            })

        


def load_ipython_extension(ipython):
    """ Load Jupyter kernel extension """

    log = logging.getLogger('tornado.switchcluster.kernelextension')
    log.name = 'switchcluster.kernelextension'
    log.setLevel(logging.INFO)
    log.propagate = True

    if ipykernel_imported:
        if not isinstance(ipython, zmqshell.ZMQInteractiveShell):
            log.error("SwitchCluster: Ipython not running through notebook. So exiting.")
            return
    else:
        return

    log.info("Starting SwitchCluster Kernel Extension")
    ext = SwitchCluster(ipython, log)
    ext.register_comm()