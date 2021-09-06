#!/bin/bash
set -euo pipefail

helm repo add traefik-mesh https://helm.traefik.io/mesh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add ory https://k8s.ory.sh/helm/charts
helm repo update
