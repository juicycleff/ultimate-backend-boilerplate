import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import { BaseContainerAppConfig } from '../base.config';

export interface GuardianAppArgs extends BaseContainerAppConfig {}

export class GuardianApp extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: GuardianAppArgs,
    opts: pulumi.ComponentResourceOptions = {},
    labels?: Record<string, any>,
  ) {
    super('ub:boilerplate:guardian-app', name, args, opts);

    const appLabels = { ...labels, app: 'ultimate-backend' };
    const deployment = new k8s.apps.v1.Deployment(
      `${name}-guardian-svc`,
      {
        spec: {
          selector: { matchLabels: appLabels },
          replicas: 1,
          template: {
            metadata: { labels: appLabels },
            spec: {
              containers: [
                {
                  name: 'guardian-svc',
                  image: `ub-boilerplate/guardian:${args.imageTag}`,
                  ports: [{ containerPort: 5000, name: 'http' }],
                  livenessProbe: {
                    httpGet: { path: '/healthy', port: 'http' },
                    initialDelaySeconds: 5,
                    timeoutSeconds: 1,
                    periodSeconds: 10,
                    failureThreshold: 3,
                  },
                  readinessProbe: {
                    httpGet: { path: '/ready', port: 'http' },
                    initialDelaySeconds: 5,
                    timeoutSeconds: 1,
                    periodSeconds: 10,
                    failureThreshold: 3,
                  },
                },
              ],
            },
          },
        },
      },
      { provider: args.provider, parent: this },
    );

    // Create a LoadBalancer Service to expose the kuard Deployment.
    const service = new k8s.core.v1.Service(
      `${name}-ub-app`,
      {
        spec: {
          loadBalancerIP: args.staticAppIP, // Required for AKS - automatic LoadBalancer still in preview.
          selector: appLabels,
          ports: [{ port: 80, targetPort: 5000 }],
          type: 'ClusterIP',
        },
      },
      { provider: args.provider, parent: this },
    );

    // The address appears in different places depending on the Kubernetes service provider.
    let address = service.status.loadBalancer.ingress[0].hostname;
    if (name === 'gke' || name === 'aks') {
      address = service.status.loadBalancer.ingress[0].ip;
    }

    this.appUrl = pulumi.interpolate`http://${address}:${service.spec.ports[0].port}`;
    this.registerOutputs();
  }
}
