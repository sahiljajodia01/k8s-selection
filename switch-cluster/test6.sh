kubectl config delete-cluster ${CLUSTER_NAME} || exit 1

kubectl config delete-context ${CONTEXT_NAME} || exit 1