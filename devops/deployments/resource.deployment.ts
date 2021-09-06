import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import { BaseHelmAppConfig } from './base.config';

// Arguments for the redis helm.
export interface ResourceSetupArgs extends BaseHelmAppConfig {
  config?: {
    namespace?: string;
  };
}

export class ResourceSetup extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: ResourceSetupArgs,
    opts: pulumi.ComponentResourceOptions = {},
  ) {
    super('ub:boilerplate-third-party:redis', name, args, opts);

    // create tyk ns
    const tykNs = new k8s.core.v1.Namespace(
      'tyk',
      {
        metadata: {
          name: 'tyk',
        },
      },
      { provider: args.provider, parent: this },
    );

    this.registerOutputs();
  }
}
