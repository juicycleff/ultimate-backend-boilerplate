import { HelloWorldApp } from './hello-world.deployment';
import { GuardianApp } from './guardian.deployment';

/**
 * Creates an application instance array
 * @param cluster
 * @param kuardImageTag
 */
export function getDeployments(cluster: any, kuardImageTag: string) {
  const instances = [];

  // Demo app
  instances.push(
    new HelloWorldApp(cluster.name, {
      provider: cluster.provider,
      imageTag: kuardImageTag,
      staticAppIP: cluster.staticAppIP,
    }),
  );

  // Guardian app
  instances.push(
    new GuardianApp(cluster.name, {
      provider: cluster.provider,
      imageTag: kuardImageTag,
      staticAppIP: cluster.staticAppIP,
    }),
  );

  return instances;
}

export * from './hello-world.deployment';
export * from './guardian.deployment';
