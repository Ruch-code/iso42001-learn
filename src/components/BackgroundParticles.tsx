import { useMemo } from 'react';

const shapes = ['🤖', '🔒', '🛡️', '⚙️', '🧠', '📊', '🔐', '🎯', '⚖️', '🔍'];

export default function BackgroundParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: shapes[i % shapes.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 16 + Math.random() * 16,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: 0.04 + Math.random() * 0.06
    })),
  []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '5s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" style={{ animationDelay: '10s' }} />

      {/* Floating emoji particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}