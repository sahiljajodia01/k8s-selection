from __future__ import print_function
import time
import kubernetes.client
import kubernetes.config
from kubernetes.client.rest import ApiException
from pprint import pprint





def load_jupyter_server_extension(nb_server_app):
    kubernetes.config.load_kube_config()

    # create an instance of the API class
    api_instance = kubernetes.client.CoreV1Api()
    namespace = 'default'

    try: 
        api_response = api_instance.list_namespaced_pod(namespace)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling CoreV1Api->list_namespaced_pod: %s\n" % e)