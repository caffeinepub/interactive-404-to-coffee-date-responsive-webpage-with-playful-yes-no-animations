import { Button } from '@/components/ui/button';
import { useShareLink } from '@/hooks/useShareLink';
import { Copy, Check, AlertTriangle } from 'lucide-react';

interface WarningGateProps {
  onContinue: () => void;
}

export default function WarningGate({ onContinue }: WarningGateProps) {
  const { shareUrl, copyToClipboard, copyStatus } = useShareLink();

  return (
    <div className="text-center space-y-8 card-container max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-20 h-20 text-amber-500/80" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-primary/90">
          Open this link at your own risk
        </h1>
        
        <p className="text-lg text-primary/70 px-4">
          This is a special interactive experience. Proceed with caution... or curiosity! 😏
        </p>
      </div>

      <div className="space-y-4 bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-md">
        <p className="text-sm font-medium text-primary/70 mb-2">Share this link:</p>
        <div className="flex items-center gap-3 bg-white/60 rounded-lg p-3 break-all text-left">
          <code className="text-sm text-primary/80 flex-1 font-mono">
            {shareUrl}
          </code>
          <Button
            onClick={copyToClipboard}
            size="sm"
            variant="outline"
            className="shrink-0 bg-white/80 hover:bg-white transition-all duration-200"
          >
            {copyStatus === 'success' ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        {copyStatus === 'error' && (
          <p className="text-sm text-red-500/80">Failed to copy. Please copy manually.</p>
        )}
      </div>

      <Button
        onClick={onContinue}
        size="lg"
        className="px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
      >
        Continue
      </Button>
    </div>
  );
}
