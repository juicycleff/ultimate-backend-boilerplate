import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import { BaseHelmAppConfig } from '../base.config';
import { removeHelmHooksTransformation } from '../../utils';

// Arguments for the redis helm.
export interface RedisAppArgs extends BaseHelmAppConfig {
  config?: {
    namespace?: string;
  };
}

export class RedisApp extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: RedisAppArgs,
    opts: pulumi.ComponentResourceOptions = {},
  ) {
    super('ub:boilerplate-third-party:redis', name, args, opts);

    const commonLabels = { app: 'redis', ub: 'v3' };
    const helm = new k8s.helm.v3.Chart(
      `${name}-redis`,
      {
        repo: 'bitnami',
        chart: 'redis',
        version: args.version,
        namespace: args.config?.namespace ?? 'tyk',
        values: {
          commonLabels,
        },
      },
      {
        provider: args.provider,
        parent: this,
        transformations: [removeHelmHooksTransformation],
      },
    );

    // Create a LoadBalancer Service to expose the redis Deployment.
    const service = helm.getResource('v1/Service', name);

    // The address appears in different places depending on the Kubernetes service provider.
    let address = service.status.loadBalancer.ingress[0].hostname;
    if (name === 'gke' || name === 'aks') {
      address = service.status.loadBalancer.ingress[0].ip;
    }

    this.appUrl = pulumi.interpolate`http://${address}:${service.spec.ports[0].port}`;

    this.registerOutputs();
  }
}
