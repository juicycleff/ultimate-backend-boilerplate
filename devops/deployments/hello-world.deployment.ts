import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

// Arguments for the demo app.
export interface HelloWorldAppArgs {
  provider: k8s.Provider; // Provider resource for the target Kubernetes cluster.
  imageTag: string; // Tag for the kuard image to deploy.
  staticAppIP?: pulumi.Input<string>; // Optional static IP to use for the service. (Required for AKS).
}

export class HelloWorldApp extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: HelloWorldAppArgs,
    opts: pulumi.ComponentResourceOptions = {},
  ) {
    super('ub:kubernetes-ts-multicloud:demo-app', name, args, opts);

    // Create the kuard Deployment.
    const appLabels = { app: 'kuard' };
    const deployment = new k8s.apps.v1.Deployment(
      `${name}-demo-app`,
      {
        spec: {
          selector: { matchLabels: appLabels },
          replicas: 1,
          template: {
            metadata: { labels: appLabels },
            spec: {
              containers: [
                {
                  name: 'kuard',
                  image: `gcr.io/kuar-demo/kuard-amd64:${args.imageTag}`,
                  ports: [{ containerPort: 8080, name: 'http' }],
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
      `${name}-demo-app`,
      {
        spec: {
          loadBalancerIP: args.staticAppIP, // Required for AKS - automatic LoadBalancer still in preview.
          selector: appLabels,
          ports: [{ port: 80, targetPort: 8080 }],
          type: 'LoadBalancer',
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
