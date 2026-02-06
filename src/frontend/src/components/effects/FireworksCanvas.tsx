import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  life: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  exploded: boolean;
  particles: Particle[];
  hue: number;
}

const COLORS = [
  'oklch(0.75 0.25 350)',
  'oklch(0.80 0.22 340)',
  'oklch(0.85 0.18 330)',
  'oklch(0.78 0.20 10)',
  'oklch(0.82 0.18 20)',
  'oklch(0.88 0.15 50)'
];

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: Firework[] = [];
    let animationId: number;

    function createFirework() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const x = Math.random() * canvas.width;
      const targetY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
      
      fireworks.push({
        x,
        y: canvas.height,
        targetY,
        vy: -8 - Math.random() * 4,
        exploded: false,
        particles: [],
        hue: Math.random() * 360
      });
    }

    function explode(firework: Firework) {
      const particleCount = 80;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 4;
        
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color,
          life: 1
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new fireworks randomly
      if (Math.random() < 0.05) {
        createFirework();
      }

      fireworks.forEach((firework, index) => {
        if (!firework.exploded) {
          firework.y += firework.vy;
          firework.vy += 0.2; // gravity

          // Draw rocket
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'oklch(0.95 0.1 50)';
          ctx.fill();

          // Explode when reaching target
          if (firework.y <= firework.targetY) {
            firework.exploded = true;
            explode(firework);
          }
        } else {
          // Update and draw particles
          firework.particles.forEach((particle, pIndex) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= 0.01;
            particle.alpha = particle.life;

            if (particle.alpha > 0) {
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
              ctx.fillStyle = particle.color.replace(')', ` / ${particle.alpha})`);
              ctx.fill();
            } else {
              firework.particles.splice(pIndex, 1);
            }
          });

          // Remove firework when all particles are gone
          if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}
