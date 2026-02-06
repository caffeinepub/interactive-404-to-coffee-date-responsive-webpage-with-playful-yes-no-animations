import { useState } from 'react';
import { getDeploymentUrl } from '@/config/deploymentDomain';

export function useShareLink() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const shareUrl = getDeploymentUrl();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return {
    shareUrl,
    copyToClipboard,
    copyStatus,
  };
}
