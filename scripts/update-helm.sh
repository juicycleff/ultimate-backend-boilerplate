#!/bin/bash
set -euo pipefail

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add ory https://k8s.ory.sh/helm/charts
helm repo update
