const convexDeploymentUrl = process?.env?.NEXT_PUBLIC_CONVEX_URL;

export const convexSiteUrl = convexDeploymentUrl!.endsWith(".cloud")
  ? convexDeploymentUrl!.substring(
      0,
      convexDeploymentUrl!.length - ".cloud".length
    ) + ".site"
  : convexDeploymentUrl;
