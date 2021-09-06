import * as k8s from '@pulumi/kubernetes';

// No args provided, so this uses ambient configuration to target a cluster.
// Behavior is the same as kubectl with no KUBECONFIG explicitly set.
export const provider = new k8s.Provider('local', {});
