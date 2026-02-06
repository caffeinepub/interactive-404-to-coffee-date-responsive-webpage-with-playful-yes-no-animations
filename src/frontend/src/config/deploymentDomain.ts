/**
 * Deployment domain configuration
 * This is the single source of truth for the deployment domain name
 * used when generating shareable links.
 */
export const DEPLOYMENT_DOMAIN = 'open-at-your-own-risk';

/**
 * Get the full deployment URL
 * In production, this will use the configured deployment domain.
 * In development, it falls back to the current origin.
 */
export function getDeploymentUrl(): string {
  // In production (deployed on IC), use the configured domain
  if (import.meta.env.PROD) {
    return `https://${DEPLOYMENT_DOMAIN}.icp0.io`;
  }
  
  // In development, use current origin
  return window.location.origin;
}
