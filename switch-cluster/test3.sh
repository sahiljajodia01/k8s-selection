#! /bin/bash


SECRET=$(kubectl --kubeconfig="${KUBECONFIG}" \
--namespace "${NAMESPACE}" \
get serviceaccount "${SERVICE_ACCOUNT}" -o json | python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["secrets"][0]["name"])') || exit 1

TOKEN=$(kubectl --kubeconfig="${KUBECONFIG}" \
--namespace "${NAMESPACE}" \
get secret "${SECRET}" -o json \
| python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["data"]["token"])' | base64 --decode) || exit 1

echo ${TOKEN}