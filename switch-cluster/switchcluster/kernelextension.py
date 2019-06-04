ipykernel_imported = True
try:
    from ipykernel import zmqshell
except ImportError:
    ipykernel_imported = False

import os, logging, tempfile, subprocess

import time
import kubernetes.client
import kubernetes.config
from kubernetes.client.rest import ApiException


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

        action = msg['content']['data']['action']

    def register_comm(self):
        """ Register a comm_target which will be used by frontend to start communication """
        self.ipython.kernel.comm_manager.register_target(
            "SwitchCluster", self.target_func)

    def target_func(self, comm, msg):
        """ Callback function to be called when a frontend comm is opened """
        self.log.info("Established connection to frontend")
        self.log.debug("Received message: %s", str(msg))

        kubernetes.config.load_kube_config()

        # create an instance of the API class
        api_instance = kubernetes.client.CoreV1Api()
        namespace = 'default'

        try: 
            api_response = api_instance.list_namespaced_pod(namespace)
            self.log.info("Api response: %s", api_response)
        except ApiException as e:
            self.log.info("Exception when calling CoreV1Api->list_namespaced_pod: %s\n" % e)

        self.comm = comm

        @self.comm.on_msg
        def _recv(msg):
            self.handle_comm_message(msg)



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