import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import * as aks from './clouds/aks';
import * as eks from './clouds/eks';
import * as gke from './clouds/gke';
import * as deps from './deployments';
import * as local from './local';

// Create Kubernetes clusters.
// Note: Comment out lines for any cluster you don't want to deploy.
const aksCluster = new aks.AksCluster('multicloud', {});
const eksCluster = new eks.EksCluster('multicloud', {});
const gkeCluster = new gke.GkeCluster('multicloud', {});

// Create a list of named clusters where the demo app will be deployed.
interface Cluster {
  name: string;
  provider: k8s.Provider;
  staticAppIP?: pulumi.Output<string>;
}
const clusters: Cluster[] = [
  // Note: Comment out lines for any cluster you don't want to deploy.
  { name: 'aks', provider: aksCluster.provider, staticAppIP: aksCluster.staticAppIP },
  { name: 'eks', provider: eksCluster.provider },
  { name: 'gke', provider: gkeCluster.provider },
  { name: 'local', provider: local.provider },
];

// Export a list of URLs to access the demo app.
interface AppUrl {
  name: string;
  url: pulumi.Output<string>;
}
export let appUrls: AppUrl[] = [];

const kuardImageTag = 'blue';

// Create the application on each of the selected clusters.
for (const cluster of clusters) {
  const instances = deps.getDeployments(cluster, kuardImageTag);

  for (const instance of instances) {
    const instanceUrl: AppUrl = { name: cluster.name, url: instance.appUrl };
    appUrls = appUrls.concat(instanceUrl);
  }
}
