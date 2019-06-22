kubectl config set-credentials ${USER_NAME} --username="${USER_NAME}" --password="${PASSWORD}" || exit 1

kubectl config set-context ${CONTEXT_NAME} --user="${USER_NAME}" --cluster="${CLUSTER_NAME}" --namespace="${NAMESPACE}" || exit 1