#! /bin/bash

kubectl config set-cluster ${CLUSTER_NAME} --server="${SERVER_IP}" --certificate-authority-data="${CATOKEN}" || exit 1

kubectl config set-credentials ${SERVICE_ACCOUNT} --token="${TOKEN}" || exit 1

kubectl config set-context ${CONTEXT_NAME} --user="${SERVICE_ACCOUNT}" --cluster="${CLUSTER_NAME}" --namespace="${NAMESPACE}" || exit 1