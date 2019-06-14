#! /bin/bash

kubectl --kubeconfig="${HOME}/k8s-${NAMESPACE}-${SERVICE_ACCOUNT}-${CLUSTER}.config" --namespace "${NAMESPACE}"