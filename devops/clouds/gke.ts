import * as gcp from '@pulumi/gcp';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import * as random from '@pulumi/random';

export class GkeCluster extends pulumi.ComponentResource {
  public cluster: gcp.container.Cluster;
  public provider: k8s.Provider;

  constructor(name: string, opts: pulumi.ComponentResourceOptions = {}) {
    super('ub:kubernetes-ts-multicloud:GkeCluster', name, {}, opts);

    // Find the latest engine version.
    const engineVersion = gcp.container
      .getEngineVersions({}, { async: true })
      .then((v) => v.latestMasterVersion);

    // Generate a strong password for the Kubernetes cluster.
    const password = new random.RandomPassword(
      'password',
      {
        length: 20,
        special: true,
      },
      { parent: this },
    ).result;

    // Create the GKE cluster.
    const k8sCluster = new gcp.container.Cluster(
      'cluster',
      {
        // We can't create a cluster with no node pool defined, but we want to only use
        // separately managed node pools. So we create the smallest possible default
        // node pool and immediately delete it.
        initialNodeCount: 1,
        removeDefaultNodePool: true,

        minMasterVersion: engineVersion,
      },
      { parent: this },
    );

    const nodePool = new gcp.container.NodePool(
      `primary-node-pool`,
      {
        cluster: k8sCluster.name,
        initialNodeCount: 2,
        location: k8sCluster.location,
        nodeConfig: {
          preemptible: true,
          machineType: 'n1-standard-1',
          oauthScopes: [
            'https://www.googleapis.com/auth/compute',
            'https://www.googleapis.com/auth/devstorage.read_only',
            'https://www.googleapis.com/auth/logging.write',
            'https://www.googleapis.com/auth/monitoring',
          ],
        },
        version: engineVersion,
        management: {
          autoRepair: true,
        },
      },
      {
        dependsOn: [k8sCluster],
      },
    );

    this.cluster = k8sCluster;

    // Manufacture a GKE-style Kubeconfig. Note that this is slightly "different" because of the way GKE requires
    // gcloud to be in the picture for cluster authentication (rather than using the client cert/key directly).
    const k8sConfig = pulumi
      .all([k8sCluster.name, k8sCluster.endpoint, k8sCluster.masterAuth])
      .apply(([name, endpoint, auth]) => {
        const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
        return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${auth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    auth-provider:
      config:
        cmd-args: config config-helper --format=json
        cmd-path: gcloud
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp
`;
      });

    // Export a Kubernetes provider instance that uses our cluster from above.
    this.provider = new k8s.Provider(
      'gke',
      { kubeconfig: k8sConfig },
      {
        parent: this,
        dependsOn: [nodePool],
      },
    );
  }
}
