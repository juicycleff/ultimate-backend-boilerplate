import * as pulumi from '@pulumi/pulumi';

// A transformation to remove Helm hooks. Pulumi does not support running them and will complain if they exist.
// See: https://github.com/pulumi/pulumi-kubernetes/issues/555#issuecomment-810383577
export function removeHelmHooksTransformation2(
  o: pulumi.ResourceTransformationArgs,
): pulumi.ResourceTransformationResult {
  if (o.props?.metadata?.annotations?.['helm.sh/hook']) {
    delete o.props.metadata.annotations['helm.sh/hook'];
    delete o.props.metadata.annotations['helm.sh/hook-delete-policy'];
  }

  return o;
}

// A transformation to remove Helm hooks. Pulumi does not support running them and will complain if they exist.
// See: https://github.com/pulumi/pulumi-kubernetes/issues/555#issuecomment-810383577
export const removeHelmHooksTransformation = (
  o: pulumi.ResourceTransformationArgs,
): pulumi.ResourceTransformationResult => {
  if (o.props?.metadata?.annotations?.['helm.sh/hook']) {
    const {
      'helm.sh/hook': junk,
      'helm.sh/hook-delete-policy': junk2,
      ...validAnnotations
    } = o.props.metadata.annotations;
    return {
      props: {
        ...o.props,
        metadata: {
          ...o.props.metadata,
          annotations: validAnnotations,
        },
      },
      opts: o.opts,
    };
  }
  return o;
};
