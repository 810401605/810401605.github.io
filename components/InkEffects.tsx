import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 2; // Ink blot size
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    // Dark gray to black ink colors
    const gray = Math.floor(Math.random() * 50);
    this.color = `rgba(${gray}, ${gray}, ${gray},`;
    this.life = 1.0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
    this.life -= 0.02; // Fade out
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color + (this.life * 0.5) + ')'; // Keeping opacity low for subtlety
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const InkEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      // Add particles on move
      for(let i = 0; i < 2; i++) {
        particles.current.push(new Particle(e.x, e.y));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        particles.current[i].draw(ctx);
        
        if (particles.current[i].life <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
};

export default InkEffects;