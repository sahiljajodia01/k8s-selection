import yaml
import io


from kubernetes import client, config
from kubernetes.client.rest import ApiException
from pprint import pprint
import json
import os
# from __future__ import print_function

# Define data
# data = {'a list': [1, 42, 3.141, 1337, 'help'],
#         'a string': 'bla',
#         'another dict': {'foo': 'bar',
#                          'key': 'value',
#                          'the answer': 42}}
# current_context = 'docker-for-desktop'
# load = {}
# # Write YAML file
# with io.open('/Users/sahiljajodia/.kube/config', 'r', encoding='utf8') as stream:
#     load = yaml.safe_load(stream)

# print(load)
    
# load['current-context'] = current_context

# with io.open('config', 'w', encoding='utf8') as out:
#     yaml.dump(load, out, default_flow_style=False, allow_unicode=True)

# namespace = 'sahil'
# username = 'sjajodia'
# rolebinding_name = 'edit-cluster-' + namespace

# config.load_kube_config(config_file=os.getenv('HOME') + '/tutorial-keystone-creds/config')
# api_instance = client.CoreV1Api()







# os.makedirs(os.getenv('HOME') + '/.hello')

# load = {}
# load['apiVersion'] = 'v1'
# load['clusters'] = []
# load['contexts'] = []
# load['current-context'] = ''
# load['kind'] = 'Config'
# load['preferences'] = {}
# load['users'] = []

# load['clusters'].append({
#                             'cluster': {
#                                 'certificate-authority-data': 'yr87rhwekjkjfns',
#                                 'server': '127.0.0.1'
#                             },
#                             'name': 'Hello'
#                         })

# with io.open(os.environ['HOME'] + '/.hello/config', 'w', encoding='utf8') as out:
#     yaml.safe_dump(load, out, default_flow_style=False, allow_unicode=True)










# obj = client.V1ObjectMeta(name=namespace)
# body = client.V1Namespace(metadata=obj)
# api_instance.create_namespace(body)


# with io.open('role-binding-template.yaml', 'r', encoding='utf8') as stream:
#     load = yaml.safe_load(stream)

# load['metadata']['name'] = rolebinding_name
# load['metadata']['namespace'] = namespace
# load['subjects'][0]['name'] = username

# with io.open('role-binding-template.yaml', 'w', encoding='utf8') as out:
#     yaml.safe_dump(load, out, default_flow_style=False, allow_unicode=True)

# rbac_client = client.RbacAuthorizationV1Api()
# k8s_client = client.ApiClient()
# utils.create_from_yaml(k8s_client, "role-binding-template.yaml")
# rolebinding_obj = client.V1ObjectMeta(name=rolebinding_name, namespace=namespace)
# role_ref = client.V1RoleRef(api_group='rbac.authorization.k8s.io', kind='ClusterRole', name='edit')
# rolebinding_body = client.V1RoleBinding(metadata=rolebinding_obj, role_ref=role_ref)

# rbac_client.create_namespaced_role_binding(namespace, rolebinding_body)
# try:
#     api_response = rbac_client.list_namespaced_role_binding(namespace=namespace)
#     for i in api_response.items:
#         print(i.metadata.name)
#     # print(api_response)
# except:
#     error = 'Cannot list namespaced role binding'






# Read YAML file
# with open("data.yaml", 'r') as stream:
#     data_loaded = yaml.safe_load(stream)

# print(data == data_loaded)








# configuration = client.Configuration()
# configuration.api_key['authorization'] = "eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJzYWhpbCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJzYWhpbC10b2tlbi1kbjVmOSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJzYWhpbCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImQ3OWM5MDliLThlY2QtMTFlOS05NDIxLTA4MDAyNzkwZjA0MSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpzYWhpbDpzYWhpbCJ9.NgaVRSForPa0MN9XCTJ-6kdOSqcxoidnh_My_yqThqIP3IOzhoZkGVW5nro3QSnz068AfW4AW7nOR7Lh20R1jZAccsWehuOttWOFUfgDi2svz0ce63mDOdbhZQmCLuFrH5fEfFV6q7WpuURuN8ALuF4H-WhAfU365yRaF140rZOpnQRfot1wxmrjcRyM3qF-cwC8ZJjbHm2f0SU4c0a2K0ChGFT8fqN0VxigQc8vOt2UxP_3Lnb7k8HP7pCOxH70_Yiqacr_iS9qju4BFeKbO2F-n6B3Ql1EM-6xNOEVv_jUAfKSNDy5FDemqhqAH5YLeJ2L7tazl3Nih71hyDfWug"
# configuration.api_key_prefix['authorization'] = 'Bearer'
# configuration.host = 'https://192.168.99.103:8443'

config.load_kube_config()
namespace = "swan-sjajodia"
api_instance = client.CoreV1Api()

try:
    api_response = api_instance.list_namespaced_pod(namespace=namespace)
    # api_response = json.loads(api_response)
    # pprint(api_response)
    print("Pods: ")
    for i in api_response.items:
        print(i.metadata.name)
except ApiException as e:
    print(str(e))
    # pprint("Exception when calling CoreV1Api->list_namespaced_service_account: %s\n" % e)


# from email.mime.text import MIMEText
# import subprocess

# body = '''
#     Cluster name: {selected_cluster}\n\nCA Cert: {ca_cert}\n\nServer IP: {server_ip} 
# '''

# # Sending the mail
# body = body.format(selected_cluster="abc", ca_cert="xyz", server_ip="7348.dcdb4")
# msg = MIMEText(body)
# msg["From"] = "jajodiasahil@gmail.com"
# msg["To"] = "jajodiasahil@gmail.com"
# msg["Subject"] = "Credentials for cluster: " + selected_cluster
# p = subprocess.Popen(["/usr/sbin/sendmail", "-t", "-oi"], stdin=subprocess.PIPE)
# p.communicate(msg.as_bytes())

# config.load_kube_config()
