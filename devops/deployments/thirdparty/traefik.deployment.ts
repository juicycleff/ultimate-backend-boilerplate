import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import { BaseHelmAppConfig } from '../base.config';
import { removeHelmHooksTransformation } from '../../utils';

export interface TraefikAppArgs extends BaseHelmAppConfig {
  config?: {
    namespace?: string;
  };
}

export class TraefikApp extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: TraefikAppArgs,
    opts: pulumi.ComponentResourceOptions = {},
  ) {
    super('ub:boilerplate-third-party:traefik-mesh', name, args, opts);

    const helm = new k8s.helm.v3.Chart(
      `${name}-traefik-mesh`,
      {
        repo: 'traefik-mesh',
        chart: 'traefik-mesh',
        version: args.version,
        namespace: args.config?.namespace ?? 'default',
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
