import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import ConfettiCanvas from '@/components/effects/ConfettiCanvas';
import FireworksCanvas from '@/components/effects/FireworksCanvas';
import WarningGate from '@/components/WarningGate';

type Screen = 'warning' | '404' | 'invitation' | 'celebration';

const NO_MESSAGES = [
  "wait....are you sure? 😢",
  "Really? 💔",
  "try again 🥺",
  "you sure? 😭",
  "haha nice try 😏",
  "no escape saraf 😈",
  "nice try 😤",
  "you cant escape 🙃",
  "you are testing my patience 😠"
];

const GRADIENTS = [
  'linear-gradient(135deg, oklch(0.92 0.05 340) 0%, oklch(0.88 0.08 350) 50%, oklch(0.85 0.10 360) 100%)',
  'linear-gradient(135deg, oklch(0.90 0.06 320) 0%, oklch(0.86 0.09 330) 50%, oklch(0.82 0.11 340) 100%)',
  'linear-gradient(135deg, oklch(0.88 0.07 300) 0%, oklch(0.84 0.10 310) 50%, oklch(0.80 0.12 320) 100%)',
  'linear-gradient(135deg, oklch(0.91 0.05 350) 0%, oklch(0.87 0.08 360) 50%, oklch(0.83 0.10 10) 100%)',
  'linear-gradient(135deg, oklch(0.89 0.06 330) 0%, oklch(0.85 0.09 340) 50%, oklch(0.81 0.11 350) 100%)'
];

function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    // Check if URL has warning fragment
    return window.location.hash === '#warning' ? 'warning' : '404';
  });
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [gradientIndex, setGradientIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const currentEmoji = noClickCount >= 2 ? '😭' : '💔';
  const currentNoMessage = noClickCount < NO_MESSAGES.length 
    ? NO_MESSAGES[noClickCount] 
    : NO_MESSAGES[NO_MESSAGES.length - 1];

  useEffect(() => {
    document.body.style.background = GRADIENTS[gradientIndex];
    document.body.style.transition = 'background 0.8s ease-in-out';
  }, [gradientIndex]);

  const handleWarningContinue = () => {
    setScreen('404');
  };

  const handleRefresh = () => {
    setScreen('invitation');
  };

  const handleYes = () => {
    setShowAgreement(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowButtons(false);
    }, 1000);

    setTimeout(() => {
      setScreen('celebration');
      setShowFireworks(true);
    }, 1500);

    setTimeout(() => {
      setShowConfetti(false);
    }, 6500);

    setTimeout(() => {
      setShowFireworks(false);
    }, 10000);
  };

  const handleNo = () => {
    setNoClickCount(prev => prev + 1);
    setGradientIndex(prev => (prev + 1) % GRADIENTS.length);
    
    // Calculate random position within viewport
    const button = noButtonRef.current;
    if (button) {
      const maxX = window.innerWidth - button.offsetWidth - 40;
      const maxY = window.innerHeight - button.offsetHeight - 40;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <ConfettiCanvas />}
      {showFireworks && <FireworksCanvas />}
      
      <div className={`transition-all duration-700 ${screen === 'warning' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'}`}>
        {screen === 'warning' && (
          <WarningGate onContinue={handleWarningContinue} />
        )}
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
                  <p className="text-lg font-medium text-primary/90 whitespace-pre-line text-left">
                    By clicking YES you agree to:{'\n'}
                    - Unlimited cuddles{'\n'}
                    - Lifetime supply of bad puns{'\n'}
                    - Mutual pizza stealing rights{'\n'}
                    Effective immediately!
                  </p>
                </div>
              )}
            </div>

            <div className={`flex items-center justify-center gap-6 transition-all duration-500 ${showButtons ? 'opacity-100' : 'opacity-0 scale-75'}`}>
              <Button
                onClick={handleYes}
                size="lg"
                className="px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                YES
              </Button>
              
              <Button
                ref={noButtonRef}
                onClick={handleNo}
                size="lg"
                variant="outline"
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
                  Yay! 🎉
                </h1>
                <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>❤️</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-semibold text-primary/80 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
                I knew you'd say yes! 💕
              </h2>
              
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

      <footer className="fixed bottom-4 left-0 right-0 text-center text-sm text-primary/50">
        <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary/70 transition-colors underline">caffeine.ai</a></p>
      </footer>
    </div>
  );
}

export default App;
