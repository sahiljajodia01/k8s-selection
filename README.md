# K8sSelection Extension


# About the Project

### K8s Selection is a Jupyter Notebook extension which will be used at SWAN to support user managed kubernetes clusters. It will allow users to have disposible Kubernetes cluster running Spark to do data analysis inside SWAN. Currently it is integrated with a test version of SWAN.

## Why do we need this extension
This being the poject of SWAN, I will write this with respect to how it will be useful in SWAN. However, different organisations can have different use cases for this extension.

* Currently SWAN does not support user managed K8s clusters for Spark. This extension will allow the support of user managed clusters.
* After joining CERN, almost every user get some computing resources, but currently a user cannot use it for scalable
data analysis inside SWAN notebooks. This will allow them to quickly create cluster, use it and then dispose it again.
* If due to some reason the cluster is not responding, then currently it is hard to use another cluster. This extension can handle more than one cluster.
* Users (mostly physicists) of SWAN wants to do data analysis of the large datasets that they have using Spark. They dont want to execute complex kubernetes commands to setup K8s clusters for Spark. This extension serves them by doing most of the work in the backend.

## Features
* Parsing and showing all the clusters available to use from the KUBECONFIG file
* Deleting obsolete or unused clusters from the KUBECONFIG file
* Add your own cluster (if you are an admin) or Add clusters shared by admin to you, in the KUBECONFIG file.
* This extension allows couple of different authentication modes (Token and Openstack).
* Displaying whether you are successfully connected to a cluster.
* You can share your cluster with other user (so that they can use your cluster to offload services). This feature however currently only works for SWAN.

Note: Here the word cluster always refers to a Kubernetes cluster.

## Future Work
The work that can be done to make this jupyter notebook extension more useful in the future.

* Adding GCloud (and similarly other) mode to use GKE clusters for spark
* Creating abstractions (functions) so it is easy to extend
* Making it useful for services other than spark. E.g Distributed Tensorflow (Currently it is only useful for Spark)


# Documentation

## Instructions to create and intialize an Openstack K8s cluster to use it with K8sSelection extension

* Create cluster
    ```bash
    openstack coe cluster create \
        --cluster-template kubernetes-1.13.3-3 \
        --master-flavor m2.small \
        --node-count 4 \
        --flavor m2.small \
        --keypair pkothuri_new \
        --labels keystone_auth_enabled="true" \
        --labels influx_grafana_dashboard_enabled="false" \
        --labels manila_enabled="true" \
        --labels kube_tag="v1.13.3-12" \
        --labels kube_csi_enabled="true" \
        --labels kube_csi_version="v0.3.2" \
        --labels container_infra_prefix="gitlab-registry.cern.ch/cloud/atomic-system-containers/" \
        --labels cgroup_driver="cgroupfs" \
        --labels cephfs_csi_enabled="true" \
        --labels flannel_backend="vxlan" \
        --labels cvmfs_csi_version="v0.3.0" \
        --labels admission_control_list="NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota,Priority" \
        --labels ingress_controller="traefik" \
        --labels manila_version="v0.3.0" \
        --labels cvmfs_csi_enabled="true" \
        --labels cvmfs_tag="qa" \
        --labels cephfs_csi_version="v0.3.0" \
        --labels monitoring_enabled="true" \
        --labels tiller_enabled="true" \
  <cluster-name>
    ```
    **Note**: `--labels "keystone_auth_enabled=true"` is important for token authentication

* Obtain Configuration
    ```bash
    mkdir -p $HOME/<cluster-name>
    cd $HOME/<cluster-name>
    openstack coe cluster config k8s-pkothuri > env.sh
    . env.sh
    ```

* Install tiller
    ```bash
    kubectl --namespace kube-system create serviceaccount tiller
    kubectl create clusterrolebinding tiller-kube-system --clusterrole cluster-admin --serviceaccount=kube-system:tiller
    helm init --service-account tiller --wait
    helm version
    ```

* Deploy Spark Services
    ```bash
    helm install \
        --wait \
        --name spark \
        --set spark.shuffle.enable=true \
        --set cvmfs.enable=true https://gitlab.cern.ch/db/spark-service/spark-service-charts/raw/master/cern-spark-services-1.0.0.tgz
    ```

* Deploy Admin. Namespace should be of the form `spark-$USER`
    ```bash
    helm install \
        --wait \
        --kubeconfig "${KUBECONFIG}" \
        --set cvmfs.enable=true \
        --set user.name=$USER \
        --set user.admin=true \
        --name "spark-admin-$USER" https://gitlab.cern.ch/db/spark-service/spark-service-charts/raw/spark_user_accounts/cern-spark-user-1.1.0.tgz
    ```

* Config to add to k8sselection (name, server, certificate-authority-data)
    ```bash
    kubectl config view --flatten
    ```

## Deploy user (done by extension while sharing access with the user)
  
* Deploy User. Namespace should be of the form `spark-$USER` 
    ```bash
    helm install \
        --wait \
        --kubeconfig "${KUBECONFIG}" \
        --set cvmfs.enable=true \
        --set user.name=$USER \
        --name "spark-user-$USER" https://gitlab.cern.ch/db/spark-service/spark-service-charts/raw/spark_user_accounts/cern-spark-user-1.1.0.tgz
    ```

## Instructions for User to use the extension

You will receive the credentials of the cluster from the admin on your CERN email. Get the credential from there and go to the extension to add the cluster onto your KUBECONFIG file.


## Testing - running spark pi with selected cluster

To test this extension, you can run the following block of code from the jupyter notebook after connecting to a cluster from the extension.
```python
import os
from pyspark import SparkContext, SparkConf
from pyspark.sql import SparkSession

ports = os.getenv("SPARK_PORTS").split(",")

# change to SPARK_MASTER_IP
swan_spark_conf.set("spark.master", "k8s://" + os.getenv("K8S_MASTER_IP"))
swan_spark_conf.set("spark.kubernetes.container.image", "gitlab-registry.cern.ch/db/spark-service/docker-registry/swan:v1")
swan_spark_conf.set("spark.kubernetes.namespace", "spark-"+os.getenv("USER"))
swan_spark_conf.set("spark.driver.host", os.getenv("SERVER_HOSTNAME"))
swan_spark_conf.set("spark.executor.instances", 1)
swan_spark_conf.set("spark.executor.core", 1)
swan_spark_conf.set("spark.kubernetes.executor.request.cores", "100m")
swan_spark_conf.set("spark.executor.memory", "500m")
swan_spark_conf.set("spark.kubernetes.authenticate.oauthToken", os.getenv("OS_TOKEN"))
swan_spark_conf.set("spark.logConf", True)
swan_spark_conf.set("spark.driver.port", ports[0])
swan_spark_conf.set("spark.blockManager.port", ports[1])
swan_spark_conf.set("spark.ui.port", ports[2])
swan_spark_conf.set("spark.kubernetes.executorEnv.PYSPARK_PYTHON", "python3")
swan_spark_conf.set("spark.kubernetes.executor.volumes.persistentVolumeClaim.sft-cern-ch.mount.path","/cvmfs/sft.cern.ch")
swan_spark_conf.set("spark.kubernetes.executor.volumes.persistentVolumeClaim.sft-cern-ch.mount.readOnly", True)
swan_spark_conf.set("spark.kubernetes.executor.volumes.persistentVolumeClaim.sft-cern-ch.options.claimName", "cvmfs-sft-cern-ch-pvc")
swan_spark_conf.set("spark.kubernetes.executor.volumes.persistentVolumeClaim.sft-nightlies-cern-ch.mount.path", "/cvmfs/sft-nightlies.cern.ch")
swan_spark_conf.set("spark.kubernetes.executor.volumes.persistentVolumeClaim.sft-nightlies-cern-ch.mount.readOnly", True)
swan_spark_conf.set("spark.kubernetes.executor.volumes.persistentVolumeClaim.sft-nightlies-cern-ch.options.claimName", "cvmfs-sft-nightlies-cern-ch-pvc")
swan_spark_conf.set('spark.executorEnv.PYTHONPATH', os.environ.get('PYTHONPATH'))
swan_spark_conf.set('spark.executorEnv.JAVA_HOME', os.environ.get('JAVA_HOME'))
swan_spark_conf.set('spark.executorEnv.SPARK_HOME', os.environ.get('SPARK_HOME'))
swan_spark_conf.set('spark.executorEnv.SPARK_EXTRA_CLASSPATH', os.environ.get('SPARK_DIST_CLASSPATH'))

sc = SparkContext(conf=swan_spark_conf)
spark = SparkSession(sc)

import random
NUM_SAMPLES = 100
def inside(p):
    x, y = random.random(), random.random()
    return x*x + y*y < 1
count = sc.parallelize(range(0, NUM_SAMPLES)).filter(inside).count()
print("Pi is roughly %f" % (4.0 * count / NUM_SAMPLES))
```


## Instructions to run the extension using Docker on your local

The `Dockerfile` and `docker-compose.yml` files are already included in this repository. First clone this repository and then run the following commands in the terminal

```bash
docker build -t custom_extension .
docker-compose -f docker-compose.yml up
```

**Note**: Please make sure you change the Envionment variables and volume mounts inside the `docker-compose.yml` file according to your local PC.