#! /bin/bash

SECRET=$(kubectl --kubeconfig="${KUBECONFIG}" \
--namespace "${NAMESPACE}" \
get serviceaccount "${SERVICE_ACCOUNT}" -o json | python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["secrets"][0]["name"])') || exit 1

TOKEN=$(kubectl --kubeconfig="${KUBECONFIG}" \
--namespace "${NAMESPACE}" \
get secret "${SECRET}" -o json \
| python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["data"]["token"])' | base64 --decode) || exit 1

CA=$(kubectl --kubeconfig="${KUBECONFIG}" \
--namespace "${NAMESPACE}" \
get secret "${SECRET}" -o json \
| python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["data"]["ca.crt"])') || exit 1


cat > ${HOME}/k8s-user.config <<EOF
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: $CA
    server: $SERVER
  name: minikube
contexts:
- context:
    cluster: minikube
    namespace: $NAMESPACE
    user: spark
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: spark
  user:
    token: $TOKEN
EOF

echo "1"