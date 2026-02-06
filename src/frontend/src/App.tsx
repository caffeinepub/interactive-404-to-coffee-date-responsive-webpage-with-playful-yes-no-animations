import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import ConfettiCanvas from '@/components/effects/ConfettiCanvas';
import FireworksCanvas from '@/components/effects/FireworksCanvas';
import WarningGate from '@/components/WarningGate';

type Screen = 'warning' | '404' | 'invitation' | 'celebration';

const NO_MESSAGES = [
  "wait....are you sure?",
  "Really.",
  "try again.",
  "you sure.",
  "haha nice try.",
  "no escape .",
  "nice try.",
  "you cant escape.",
  "you are testing my patience."
];

const GRADIENTS = [
  'linear-gradient(135deg, oklch(0.92 0.05 340) 0%, oklch(0.88 0.08 350) 50%, oklch(0.85 0.10 360) 100%)',
  'linear-gradient(135deg, oklch(0.90 0.06 320) 0%, oklch(0.86 0.09 330) 50%, oklch(0.82 0.11 340) 100%)',
  'linear-gradient(135deg, oklch(0.88 0.07 300) 0%, oklch(0.84 0.10 310) 50%, oklch(0.80 0.12 320) 100%)',
  'linear-gradient(135deg, oklch(0.91 0.05 350) 0%, oklch(0.87 0.08 360) 50%, oklch(0.83 0.10 10) 100%)',
  'linear-gradient(135deg, oklch(0.89 0.06 330) 0%, oklch(0.85 0.09 340) 50%, oklch(0.81 0.11 350) 100%)'
];

function App() {
  const [screen, setScreen] = useState<Screen>('warning');
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [gradientIndex, setGradientIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const currentEmoji = noClickCount >= 2 ? '😭' : '💔';
  const currentMessageIndex = noClickCount % NO_MESSAGES.length;
  const currentNoMessage = NO_MESSAGES[currentMessageIndex];

  useEffect(() => {
    document.body.style.background = GRADIENTS[gradientIndex];
    document.body.style.transition = 'background 0.8s ease-in-out';
  }, [gradientIndex]);

  const handleContinue = () => {
    setScreen('404');
  };

  const handleRefresh = () => {
    setScreen('invitation');
  };

  const handleYes = () => {
    setShowAgreement(true);
    setShowConfetti(true);
    
    // Hide buttons after 1 second
    setTimeout(() => {
      setShowButtons(false);
    }, 1000);

    // Transition to celebration after 1.5 seconds
    setTimeout(() => {
      setScreen('celebration');
      setShowFireworks(true);
    }, 1500);

    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleNo = () => {
    setNoClickCount(prev => prev + 1);
    setGradientIndex(prev => (prev + 1) % GRADIENTS.length);
    
    // Calculate random position within middle-to-upper region of viewport
    const button = noButtonRef.current;
    if (button) {
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;
      
      // Define middle-to-upper region (20% margin from sides, 15% from top, 40% from bottom)
      const marginX = window.innerWidth * 0.2;
      const marginTop = window.innerHeight * 0.15;
      const marginBottom = window.innerHeight * 0.4;
      
      const availableWidth = window.innerWidth * 0.6 - buttonWidth;
      const availableHeight = window.innerHeight - marginTop - marginBottom - buttonHeight;
      
      const randomX = marginX + Math.random() * availableWidth;
      const randomY = marginTop + Math.random() * availableHeight;
      
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <ConfettiCanvas />}
      {showFireworks && <FireworksCanvas />}
      
      <div className={`transition-all duration-700 ${screen === 'warning' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
        {screen === 'warning' && <WarningGate onContinue={handleContinue} />}
      </div>

      <div className={`transition-all duration-700 ${screen === '404' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
        {screen === '404' && (
          <div className="text-center space-y-8 card-container">
            <div className="space-y-4">
              <h1 className="text-8xl font-bold text-primary/80">404</h1>
              <h2 className="text-3xl font-semibold text-primary/90">Page Not Found</h2>
              <p className="text-lg text-primary/70">Oops! The page you're looking for doesn't exist.</p>
            </div>
            <Button 
              onClick={handleRefresh}
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Refresh
            </Button>
          </div>
        )}
      </div>

      <div className={`transition-all duration-700 ${screen === 'invitation' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
        {screen === 'invitation' && (
          <div className="text-center space-y-8 card-container relative">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-5xl">❤️</span>
                <h1 className="text-4xl md:text-5xl font-bold text-primary/90">Coffee Date</h1>
                <span className="text-5xl">❤️</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary/80 px-4">
                Will you go on Coffee Date with me?
              </h2>
              
              {noClickCount > 0 && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                  <p className="text-xl font-medium text-primary/70 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-md">
                    {currentEmoji} {currentNoMessage}
                  </p>
                </div>
              )}

              {showAgreement && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-3 duration-700 bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <p className="text-lg font-medium text-primary/90 text-left">
                    By clicking YES you agree to:
                  </p>
                  <ul className="text-lg font-medium text-primary/90 text-left mt-2 space-y-1">
                    <li>- Unlimited cuddles</li>
                    <li>- Lifetime supply of bad puns</li>
                    <li>- Mutual pizza stealing rights</li>
                  </ul>
                  <p className="text-lg font-medium text-primary/90 text-left mt-2">
                    Effective immediately!
                  </p>
                </div>
              )}
            </div>

            <div className={`flex items-center justify-center gap-6 transition-all duration-500 ${showButtons ? 'opacity-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
              <Button
                onClick={handleYes}
                size="lg"
                disabled={!showButtons}
                className="px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                YES
              </Button>
              
              <Button
                ref={noButtonRef}
                onClick={handleNo}
                size="lg"
                variant="outline"
                disabled={!showButtons}
                className="px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm"
                style={
                  noClickCount > 0
                    ? {
                        position: 'fixed',
                        left: `${noPosition.x}px`,
                        top: `${noPosition.y}px`,
                        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                      }
                    : undefined
                }
              >
                NO
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className={`transition-all duration-700 ${screen === 'celebration' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
        {screen === 'celebration' && (
          <div className="text-center space-y-8 card-container">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-6xl animate-bounce">❤️</span>
                <h1 className="text-5xl md:text-6xl font-bold text-primary/90 animate-in fade-in slide-in-from-top-3 duration-700">
                  Yey i knew you'd say yes.
                </h1>
                <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>❤️</span>
              </div>
              
              <div className="mt-8 animate-in fade-in zoom-in duration-1000 delay-500">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <p className="text-2xl font-bold text-primary/90 mb-4">
                    You've made me the happiest! 💖
                  </p>
                  <p className="text-lg text-primary/70 italic">
                    "Every moment with you feels like a dream come true..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
