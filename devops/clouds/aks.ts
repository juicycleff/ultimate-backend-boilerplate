import * as azure from '@pulumi/azure';
import * as azuread from '@pulumi/azuread';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import * as random from '@pulumi/random';
import * as tls from '@pulumi/tls';

export class AksCluster extends pulumi.ComponentResource {
  public cluster: azure.containerservice.KubernetesCluster;
  public provider: k8s.Provider;
  public staticAppIP: pulumi.Output<string>;

  constructor(name: string, opts: pulumi.ComponentResourceOptions = {}) {
    super('ub:kubernetes-ts-multicloud:AksCluster', name, {}, opts);

    // Generate a strong password for the Service Principal.
    const password = new random.RandomPassword(
      'password',
      {
        length: 20,
        special: true,
      },
      { parent: this },
    ).result;

    // Create an SSH public key that will be used by the Kubernetes cluster.
    // Note: We create one here to simplify the demo, but a production deployment would probably pass
    // an existing key in as a variable.
    const sshPublicKey = new tls.PrivateKey(
      'sshKey',
      {
        algorithm: 'RSA',
        rsaBits: 4096,
      },
      { parent: this },
    ).publicKeyOpenssh;

    // Create the AD service principal for the K8s cluster.
    const adApp = new azuread.Application(
      'aks',
      { displayName: `${name}-ad` },
      { parent: this },
    );
    const adSp = new azuread.ServicePrincipal(
      'aksSp',
      {
        applicationId: adApp.applicationId,
      },
      { parent: this },
    );
    const adSpPassword = new azuread.ServicePrincipalPassword(
      'aksSpPassword',
      {
        servicePrincipalId: adSp.id,
        value: password,
        endDate: '2099-01-01T00:00:00Z',
      },
      { parent: this },
    );

    const resourceGroup = new azure.core.ResourceGroup('multicloud');

    // Grant the resource group the "Network Contributor" role so that it can link the static IP to a
    // Service LoadBalancer.
    const rgNetworkRole = new azure.authorization.Assignment(
      'spRole',
      {
        principalId: adSp.id,
        scope: resourceGroup.id,
        roleDefinitionName: 'Network Contributor',
      },
      { parent: this },
    );

    // Create a Virtual Network for the cluster
    const vnet = new azure.network.VirtualNetwork(
      'multicloud',
      {
        resourceGroupName: resourceGroup.name,
        addressSpaces: ['10.2.0.0/16'],
      },
      { parent: this },
    );

    // Create a Subnet for the cluster
    const subnet = new azure.network.Subnet(
      'multicloud',
      {
        resourceGroupName: resourceGroup.name,
        virtualNetworkName: vnet.name,
        addressPrefixes: ['10.2.1.0/24'],
      },
      { parent: this },
    );

    // Now allocate an AKS cluster.
    this.cluster = new azure.containerservice.KubernetesCluster(
      'aksCluster',
      {
        resourceGroupName: resourceGroup.name,
        defaultNodePool: {
          name: 'aksagentpool',
          nodeCount: 2,
          vmSize: 'Standard_B2s',
          osDiskSizeGb: 30,
          vnetSubnetId: subnet.id,
        },
        dnsPrefix: name,
        linuxProfile: {
          adminUsername: 'aksuser',
          sshKey: {
            keyData: sshPublicKey,
          },
        },
        servicePrincipal: {
          clientId: adApp.applicationId,
          clientSecret: adSpPassword.value,
        },
        kubernetesVersion: '1.16.9',
        roleBasedAccessControl: { enabled: true },
        networkProfile: {
          networkPlugin: 'azure',
          dnsServiceIp: '10.2.2.254',
          serviceCidr: '10.2.2.0/24',
          dockerBridgeCidr: '172.17.0.1/16',
        },
      },
      { parent: this },
    );

    // Expose a K8s provider instance using our custom cluster instance.
    this.provider = new k8s.Provider(
      'aks',
      {
        kubeconfig: this.cluster.kubeConfigRaw,
      },
      { parent: this },
    );

    this.staticAppIP = new azure.network.PublicIp(
      'staticAppIP',
      {
        resourceGroupName: this.cluster.nodeResourceGroup,
        allocationMethod: 'Static',
      },
      { parent: this },
    ).ipAddress;

    this.registerOutputs();
  }
}
