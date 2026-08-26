import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

const tips = [
  "Did you know? ISO 42001 is the world's first AI management standard!",
  "Pro tip: 60-70% of ISO 27001 controls can be reused for ISO 42001.",
  "Start with a gap analysis — it's the foundation of your implementation!",
  "Human oversight has 3 levels: in-the-loop, on-the-loop, and in-command.",
  "The EU AI Act requires conformity assessments for high-risk AI systems.",
  "Quick win: Create an AI policy by adapting your existing infosec policy.",
  "NIST AI 600-1 provides the 'how-to' for AI risk management.",
  "Remember: AI risks include bias, transparency, robustness, and privacy.",
  "ISO 42001 follows Annex SL — same structure as ISO 27001 and 9001.",
  "An AI System Impact Assessment (AIIA) evaluates impact on people, not just risks."
];

export default function FloatingRobot() {
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showTip && !dismissed) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % tips.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showTip, dismissed]);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-24 left-6 z-40 hidden lg:block">
      {showTip && (
        <div className="mb-3 animate-slide-up">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 pr-8 max-w-[260px] relative">
            <button onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs text-gray-600 leading-relaxed">{tips[currentTip]}</p>
            <div className="flex gap-1 mt-2">
              {tips.map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full transition-colors ${i === currentTip ? 'bg-blue-500' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setShowTip(!showTip)}
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center animate-float hover:scale-110 transition-transform cursor-pointer group"
      >
        <svg viewBox="0 0 64 64" className="w-10 h-10">
          {/* Robot head */}
          <rect x="14" y="18" width="36" height="30" rx="8" fill="white" opacity="0.95"/>
          {/* Eyes */}
          <circle cx="25" cy="32" r="4" fill="#3b82f6"/>
          <circle cx="39" cy="32" r="4" fill="#3b82f6"/>
          <circle cx="26" cy="31" r="1.5" fill="white"/>
          <circle cx="40" cy="31" r="1.5" fill="white"/>
          {/* Mouth */}
          <path d="M24 40 Q32 46 40 40" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Antenna */}
          <line x1="32" y1="18" x2="32" y2="10" stroke="white" strokeWidth="2"/>
          <circle cx="32" cy="8" r="3" fill="#f59e0b"/>
          {/* Ears */}
          <rect x="8" y="28" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
          <rect x="50" y="28" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
        </svg>
      </button>
    </div>
  );
}