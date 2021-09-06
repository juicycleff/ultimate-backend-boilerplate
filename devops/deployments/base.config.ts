import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

export interface BaseAppConfig {
  /** Provider resource for the target Kubernetes cluster. **/
  provider: k8s.Provider;
  /** Optional static IP to use for the service. (Required for AKS). **/
  staticAppIP?: pulumi.Input<string>;
}

export interface BaseContainerAppConfig extends BaseAppConfig {
  /** Container image tag. **/
  imageTag: string;
}

export interface BaseHelmAppConfig extends BaseAppConfig {
  /** helm chart version. **/
  version: string;
}
