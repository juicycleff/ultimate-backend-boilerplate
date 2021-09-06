import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import * as aks from './clouds/aks';
import * as eks from './clouds/eks';
import * as gke from './clouds/gke';
import * as dok from './clouds/dok';
import * as local from './clouds/local';
import * as deps from './deployments';

// Create Kubernetes clusters.
// Note: Comment out lines for any cluster you don't want to deploy.
// const aksCluster = new aks.AksCluster('ub-boilerplate', {});
// const eksCluster = new eks.EksCluster('ub-boilerplate', {});
// const gkeCluster = new gke.GkeCluster('ub-boilerplate', {});
// const dokCluster = new dok.DokCluster('ub-boilerplate', {});

// Create a list of named clusters where the demo app will be deployed.
interface Cluster {
  name: string;
  provider: k8s.Provider;
  staticAppIP?: pulumi.Output<string>;
}
const clusters: Cluster[] = [
  // Note: Comment out lines for any cluster you don't want to deploy.
  // { name: 'aks', provider: aksCluster.provider, staticAppIP: aksCluster.staticAppIP },
  // { name: 'eks', provider: eksCluster.provider },
  // { name: 'gke', provider: gkeCluster.provider },
  // { name: 'dok', provider: dokCluster.provider },
  { name: 'local', provider: local.provider },
];

// Export a list of URLs to access deployed apps.
interface AppUrl {
  name: string;
  url: pulumi.Output<string>;
}
export let appUrls: AppUrl[] = [];

// Create third-party resources and apps.
for (const cluster of clusters) {
  const instances = deps.getThirdPartyDeployments(cluster);

  for (const instance of instances) {
    const instanceUrl: AppUrl = { name: cluster.name, url: instance.appUrl };
    appUrls = appUrls.concat(instanceUrl);
  }
}

const imageTag = 'latest';
// Create the application on each of the selected clusters.
for (const cluster of clusters) {
  const instances = deps.getDeployments(cluster, imageTag);

  for (const instance of instances) {
    const instanceUrl: AppUrl = { name: cluster.name, url: instance.appUrl };
    appUrls = appUrls.concat(instanceUrl);
  }
}
