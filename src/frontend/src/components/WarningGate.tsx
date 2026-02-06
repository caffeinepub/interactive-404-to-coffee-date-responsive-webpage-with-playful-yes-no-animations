import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Copy, Check } from 'lucide-react';
import { getDeploymentUrl } from '@/config/deploymentDomain';

interface WarningGateProps {
  onContinue: () => void;
}

export default function WarningGate({ onContinue }: WarningGateProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = getDeploymentUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="text-center space-y-8 card-container max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-red-600/90">
          ⚠️ WARNING ⚠️
        </h1>
        
        <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-400 rounded-2xl p-6 shadow-lg">
          <p className="text-lg font-semibold text-red-800 mb-4">
            PROCEED AT YOUR OWN RISK
          </p>
          <p className="text-base text-red-700">
            This link contains highly suspicious content. Opening it may result in:
          </p>
          <ul className="text-base text-red-700 text-left mt-3 space-y-2 max-w-md mx-auto">
            <li>• Unexpected emotional responses</li>
            <li>• Uncontrollable smiling</li>
            <li>• Potential commitment to coffee dates</li>
            <li>• Exposure to romantic gestures</li>
          </ul>
        </div>

        <div className="bg-yellow-50/80 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-4 shadow-md">
          <p className="text-sm font-medium text-yellow-800 mb-2">
            Share this suspicious link:
          </p>
          <div className="flex items-center gap-2 bg-white/80 rounded-lg p-3 border border-yellow-300">
            <code className="flex-1 text-sm text-gray-700 break-all text-left">
              {shareUrl}
            </code>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="outline"
              className="shrink-0 hover:bg-yellow-100"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Button
        onClick={onContinue}
        size="lg"
        className="px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-red-600 hover:bg-red-700"
      >
        I Understand the Risks - Continue Anyway
      </Button>
    </div>
  );
}
