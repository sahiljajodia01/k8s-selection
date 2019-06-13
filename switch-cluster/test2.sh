#! /bin/bash

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