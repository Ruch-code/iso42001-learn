import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, select, textarea, label, .card-hover, .quiz-option, summary';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices and when reduced motion is preferred
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current!;
    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const ctx = canvas.getContext('2d')!;

    let raf = 0;
    let width = 0;
    let height = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let speed = 0;
    let down = false;
    let hovering = false;
    let active = false;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; life: number; maxLife: number;
      hue: number; glow: number;
    }[] = [];

    const palette = [
      { h: 217, s: 91, l: 60 },
      { h: 262, s: 83, l: 58 },
      { h: 160, s: 84, l: 39 },
      { h: 24, s: 95, l: 53 },
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }

    window.addEventListener('resize', resize);
    resize();

    function spawnTrail(n: number) {
      for (let i = 0; i < n; i++) {
        const c = palette[Math.floor(Math.random() * palette.length)];
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 1.2 + 0.2;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 4,
          y: mouseY + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * spread * (0.3 + Math.random() * 0.5) + (mouseX - prevX) * 0.12,
          vy: Math.sin(angle) * spread * (0.3 + Math.random() * 0.5) + (mouseY - prevY) * 0.12,
          size: 1.5 + Math.random() * 3,
          life: 0,
          maxLife: 40 + Math.random() * 45,
          hue: c.h,
          glow: c.s,
        });
      }
    }

    function burst() {
      for (let i = 0; i < 14; i++) {
        const c = palette[Math.floor(Math.random() * palette.length)];
        const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
        const spread = 2 + Math.random() * 3;
        particles.push({
          x: mouseX, y: mouseY,
          vx: Math.cos(angle) * spread,
          vy: Math.sin(angle) * spread,
          size: 2 + Math.random() * 3,
          life: 0,
          maxLife: 50 + Math.random() * 40,
          hue: c.h,
          glow: c.s,
        });
      }
    }

    function render() {
      // Smooth lerp following — the premium "lag" feel
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      speed = Math.hypot(mouseX - prevX, mouseY - prevY);
      prevX = mouseX;
      prevY = mouseY;

      // Dot follows tightly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Ring scales on hover / click, glows on speed
      const hoverScale = hovering ? 1.55 : 1;
      const clickScale = down ? 0.78 : 1;
      const speedGlow = Math.min(speed / 30, 1);

      const scale = hoverScale * clickScale;
      const size = 40 * scale;
      ring.style.width = size + 'px';
      ring.style.height = size + 'px';
      ring.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;

      ring.style.borderColor = hovering
        ? 'rgba(99, 102, 241, 0.9)'
        : down
        ? 'rgba(245, 158, 11, 0.85)'
        : 'rgba(59, 130, 246, 0.55)';

      ring.style.boxShadow = hovering
        ? '0 0 24px rgba(99, 102, 241, 0.55), inset 0 0 18px rgba(99, 102, 241, 0.25)'
        : `0 0 ${14 + speedGlow * 18}px rgba(59, 130, 246, ${0.25 + speedGlow * 0.35}), inset 0 0 ${6 + speedGlow * 12}px rgba(59, 130, 246, ${0.12 + speedGlow * 0.2})`;

      dot.style.opacity = hovering ? '0.55' : down ? '1' : '0.9';
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${hovering ? 0.6 : down ? 1.6 : 1})`;

      // Particle trail
      spawnTrail(speed > 3 ? 2 : speed > 0.2 ? 1 : 0);

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const t = 1 - p.life / p.maxLife;
        p.x += p.vx * t;
        p.y += p.vy * t;
        p.vx *= 0.96;
        p.vy *= 0.96;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * t + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.glow}%, 65%, ${t * 0.75})`;
        ctx.fill();
        ctx.shadowColor = `hsla(${p.hue}, ${p.glow}%, 70%, ${t})`;
        ctx.shadowBlur = 8;
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(render);
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!active) {
        active = true;
        ring.style.opacity = '1';
        dot.style.opacity = '0.9';
      }
    }

    function onLeave(e: MouseEvent) {
      if (e.relatedTarget === null) {
        active = false;
        ring.style.opacity = '0';
        dot.style.opacity = '0';
      }
    }

    function onOver(e: MouseEvent) {
      const target = e.target as Element;
      hovering = !!(target.closest && target.closest(INTERACTIVE_SELECTOR));
    }

    function onDown() {
      down = true;
      burst();
    }
    function onUp() {
      down = false;
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    document.documentElement.style.cursor = 'none';
    document.documentElement.classList.add('has-custom-cursor');

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.style.cursor = '';
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}