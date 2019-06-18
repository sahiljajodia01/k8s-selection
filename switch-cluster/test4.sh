#! /bin/bash

kubectl --namespace="${NAMESPACE}" describe serviceaccounts ${SERVICE_ACCOUNT} || exit 1


kubectl config set-credentials ${SERVICE_ACCOUNT} --token="${TOKEN}"


kubectl config set-context ${CONTEXT_NAME} --user="${SERVICE_ACCOUNT}" --cluster="${CLUSTER_NAME}" --namespace="${NAMESPACE}"