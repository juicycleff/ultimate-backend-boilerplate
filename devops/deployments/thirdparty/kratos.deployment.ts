import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import * as jsyaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

import { BaseHelmAppConfig } from '../base.config';
import { removeHelmHooksTransformation } from '../../utils';

// Arguments for the demo app.
export interface KratosAppArgs extends BaseHelmAppConfig {
  config?: {
    namespace?: string;
  };
}

export class KratosApp extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: KratosAppArgs,
    opts: pulumi.ComponentResourceOptions = {},
  ) {
    super('ub:boilerplate-third-party:kratos', name, args, opts);
    let kratosConfig = {};
    try {
      kratosConfig = jsyaml.load(
        fs.readFileSync(
          path.resolve(__dirname, '../../../.deploy/ory/config/kratos.yml'),
          'utf8',
        ),
      );
    } catch (e) {
      throw e;
    }

    const helm = new k8s.helm.v3.Chart(
      `${name}-kratos`,
      {
        repo: 'ory',
        chart: 'kratos',
        version: args.version,
        namespace: args.config?.namespace,
        values: {
          kratos: {
            config: kratosConfig,
            autoMigrate: true,
          },
          secret: {
            enabled: true,
            admin: {
              enabled: true,
            },
            public: {
              enabled: true,
            },
          },
        },
      },
      {
        provider: args.provider,
        parent: this,
        transformations: [removeHelmHooksTransformation],
      },
    );

    // Create a LoadBalancer Service to expose the kratos Deployment.
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
