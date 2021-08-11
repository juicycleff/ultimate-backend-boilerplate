import * as dok from '@pulumi/digitalocean';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

/**
 * Digital Ocean cluster
 */
export class DokCluster extends pulumi.ComponentResource {
  public cluster: dok.KubernetesCluster;
  public provider: k8s.Provider;

  constructor(name: string, opts: pulumi.ComponentResourceOptions = {}) {
    super('ub:kubernetes-ts-multicloud:GokCluster', name, {}, opts);

    const config = new pulumi.Config();
    const nodeCount = config.getNumber('nodeCount') || 3;
    const appReplicaCount = config.getNumber('appReplicaCount') || 5;
    const domainName = config.get('domainName');

    // Find the latest engine version.
    const engineVersion = dok.getKubernetesVersions().then((v) => v.latestVersion);

    // Create the GKE cluster.
    this.cluster = new dok.KubernetesCluster(
      'cluster',
      {
        region: dok.Region.LON1,
        version: engineVersion,
        nodePool: {
          name: 'default',
          nodeCount,
          size: dok.DropletSlug.DropletS2VCPU2GB,
        },
      },
      { parent: this },
    );

    // The DigitalOcean Kubernetes cluster periodically gets a new certificate,
    // so we look up the cluster by name and get the current kubeconfig after
    // initial provisioning. You'll notice that the `certificate-authority-data`
    // field changes on every `pulumi update`.
    const k8sConfig = this.cluster.status.apply((status) => {
      if (status === 'running') {
        const clusterDataSource = this.cluster.name.apply((name) =>
          dok.getKubernetesCluster({ name }),
        );
        return clusterDataSource.kubeConfigs[0].rawConfig;
      } else {
        return this.cluster.kubeConfigs[0].rawConfig;
      }
    });

    // Export a Kubernetes provider instance that uses our cluster from above.
    this.provider = new k8s.Provider(
      'dok',
      { kubeconfig: k8sConfig },
      {
        parent: this,
      },
    );
  }
}
