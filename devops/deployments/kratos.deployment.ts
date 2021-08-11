import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

// Arguments for the demo app.
export interface KratosAppArgs {
  provider: k8s.Provider; // Provider resource for the target Kubernetes cluster.
  imageTag: string; // Tag for the kuard image to deploy.
  staticAppIP?: pulumi.Input<string>; // Optional static IP to use for the service. (Required for AKS).
}

export class KratosApp extends pulumi.ComponentResource {
  public appUrl: pulumi.Output<string>;

  constructor(
    name: string,
    args: KratosAppArgs,
    opts: pulumi.ComponentResourceOptions = {},
  ) {
    super('ub:kubernetes-ts-multicloud:demo-app', name, args, opts);

    const appLabels = { app: 'kratos' };

    // Create the PVC
    const pvc = new k8s.core.v1.PersistentVolumeClaim(
      `${name}-ub`,
      {
        metadata: {
          name: 'kratos-claim0',
        },
        spec: {
          selector: { matchLabels: appLabels },
          accessModes: ['ReadWriteOnce'],
          resources: {
            requests: {
              storage: '50Mi'
            }
          }
        },
      },
      { provider: args.provider, parent: this },
    );

    // Create the Deployment.
    const deployment = new k8s.apps.v1.Deployment(
      `${name}-ub`,
      {
        spec: {
          selector: { matchLabels: appLabels },
          replicas: 1,
          template: {
            metadata: { labels: appLabels },
            spec: {
              containers: [
                {
                  name: 'kratos',
                  image: `oryd/kratos:${args.imageTag}`,
                  ports: [{ containerPort: 4433, name: 'http' }, { containerPort: 4434, name: 'http' }],
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
                  args: [
                    'migrate -c /etc/config/kratos/kratos.yml sql -e --yes',
                    'serve --config /etc/config/kratos/kratos.yml all',
                  ],
                  imagePullPolicy: 'Always',
                  volumeMounts: [
                    {
                      mountPath: '/etc/config/kratos',
                      name: 'kratos-claim0',
                    }
                  ]
                },
              ],
              volumes: [
                {
                  name: 'kratos-claim0',
                  persistentVolumeClaim: {
                    claimName: 'kratos-claim0'
                  }
                }
              ],
            },
          },
        },
      },
      { provider: args.provider, parent: this },
    );

    // Create a LoadBalancer Service to expose the kuard Deployment.
    const service = new k8s.core.v1.Service(
      `${name}-ub`,
      {
        spec: {
          loadBalancerIP: args.staticAppIP,
          selector: appLabels,
          ports: [{ port: 80, targetPort: 4433 }],
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
