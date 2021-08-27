#!/bin/bash
set -euo pipefail

################################### Download and prepare helm cli ###################################
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh

# remove download binary file
rm -f ./get_helm.sh
echo "HELM setup completed!!!"
######################################################################################################

################################### Download and prepare Pulumi ###################################
curl -fsSL https://get.pulumi.com | sh
######################################################################################################
