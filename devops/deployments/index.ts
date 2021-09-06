import { GuardianApp } from './apps/guardian.deployment';
import { OrganisationApp } from './apps/organisation.deployment';
import { BillingApp } from './apps/billing.deployment';

import { RedisApp } from './thirdparty/redis.deployment';
import { KratosApp } from './thirdparty/kratos.deployment';
import { TraefikApp } from './thirdparty/traefik.deployment';
import { KrakendApp } from './thirdparty/krakend.deployment';

/**
 * Creates an application instance array
 * @param cluster
 * @param imageTag
 */
export function getDeployments(cluster: any, imageTag: string) {
  const instances = [];

  // Guardian app
  instances.push(
    new GuardianApp(cluster.name, {
      provider: cluster.provider,
      imageTag: imageTag,
      staticAppIP: cluster.staticAppIP,
    }),
  );

  // Organisation app
  instances.push(
    new OrganisationApp(cluster.name, {
      provider: cluster.provider,
      imageTag,
      staticAppIP: cluster.staticAppIP,
    }),
  );

  // Billing app
  instances.push(
    new BillingApp(cluster.name, {
      provider: cluster.provider,
      imageTag,
      staticAppIP: cluster.staticAppIP,
    }),
  );

  return instances;
}

/**
 * Creates third party application instance array
 * @param cluster
 */
export function getThirdPartyDeployments(cluster: any) {
  const instances = [];

  instances.push(
    new RedisApp(cluster.name, {
      provider: cluster.provider,
      version: '14.8.11',
      staticAppIP: cluster.staticAppIP,
    }),
  );

  instances.push(
    new KratosApp(cluster.name, {
      provider: cluster.provider,
      version: '0.19.2',
      staticAppIP: cluster.staticAppIP,
    }),
  );

  instances.push(
    new TraefikApp(cluster.name, {
      provider: cluster.provider,
      version: '10.3.2',
      staticAppIP: cluster.staticAppIP,
    }),
  );

  instances.push(
    new KrakendApp(cluster.name, {
      provider: cluster.provider,
      version: '10.3.2',
      staticAppIP: cluster.staticAppIP,
    }),
  );

  return instances;
}
