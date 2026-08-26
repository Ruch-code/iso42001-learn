import { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const colors = ['#2563eb', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];

export default function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<{ id: number; left: string; color: string; delay: string; size: string; shape: string }[]>([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 0.5}s`,
      size: `${Math.random() * 8 + 6}px`,
      shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm'
    }));
    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), duration);
    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      {pieces.map(p => (
        <div
          key={p.id}
          className={`confetti-piece ${p.shape}`}
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDuration: `${1.5 + Math.random() * 2}s`,
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
}