import { useState, useCallback } from 'react';

export function useShareLink() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Generate the full share URL with warning fragment
  const shareUrl = `${window.location.origin}${window.location.pathname}#warning`;

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  }, [shareUrl]);

  return {
    shareUrl,
    copyToClipboard,
    copyStatus,
  };
}
