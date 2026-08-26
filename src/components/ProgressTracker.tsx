import { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  moduleId: string;
  totalLessons: number;
}

export default function ProgressTracker({ moduleId, totalLessons }: ProgressTrackerProps) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('iso42001-progress');
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setCompletedLessons(progress.modules?.[moduleId]?.completedLessons || []);
      } catch {}
    }
  }, [moduleId]);

  const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Module Progress</span>
        <span className="text-sm text-gray-500">{completedLessons.length}/{totalLessons} lessons</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {progress === 100 ? '🎉 Module complete!' : `${progress}% complete`}
      </div>
    </div>
  );
}