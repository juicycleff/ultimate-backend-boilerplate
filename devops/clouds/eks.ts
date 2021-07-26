import * as awsx from '@pulumi/awsx';
import * as eks from '@pulumi/eks';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

export class EksCluster extends pulumi.ComponentResource {
  public cluster: eks.Cluster;
  public provider: k8s.Provider;

  constructor(name: string, opts: pulumi.ComponentResourceOptions = {}) {
    super('ub:kubernetes-ts-multicloud:EksCluster', name, {}, opts);

    // Create a VPC for our cluster.
    const vpc = new awsx.ec2.Vpc('vpc', {});

    // Create the EKS cluster itself, including a "gp2"-backed StorageClass and a deployment of the Kubernetes dashboard.
    this.cluster = new eks.Cluster('cluster', {
      vpcId: vpc.id,
      subnetIds: vpc.publicSubnetIds,
      instanceType: 't2.medium',
      desiredCapacity: 2,
      minSize: 1,
      maxSize: 2,
      storageClasses: 'gp2',
      deployDashboard: false,
    });

    this.provider = this.cluster.provider;
  }
}
