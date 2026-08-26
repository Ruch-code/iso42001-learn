import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../types';

const STORAGE_KEY = 'iso42001-progress';

function getDefaultProgress(): UserProgress {
  return {
    modules: {},
    lessons: {},
    checklist: {},
    lastUpdated: new Date().toISOString()
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return getDefaultProgress();
        }
      }
    }
    return getDefaultProgress();
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const completeLesson = useCallback((moduleId: string, lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      lessons: { ...prev.lessons, [lessonId]: true },
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          completedLessons: [
            ...(prev.modules[moduleId]?.completedLessons || []).filter(id => id !== lessonId),
            lessonId
          ]
        }
      },
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  const isLessonComplete = useCallback((lessonId: string) => {
    return !!progress.lessons[lessonId];
  }, [progress.lessons]);

  const saveQuizScore = useCallback((moduleId: string, lessonId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          quizScores: {
            ...(prev.modules[moduleId]?.quizScores || {}),
            [lessonId]: score
          }
        }
      },
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  const updateChecklistItem = useCallback((itemId: string, updates: Partial<{ status: string; evidence: string; notes: string }>) => {
    setProgress(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [itemId]: {
          ...prev.checklist[itemId],
          ...updates,
          id: itemId
        } as any
      },
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  const getModuleProgress = useCallback((moduleId: string, totalLessons: number) => {
    const completed = progress.modules[moduleId]?.completedLessons?.length || 0;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  }, [progress.modules]);

  const getOverallProgress = useCallback((totalLessons: number) => {
    const completed = Object.values(progress.lessons).filter(Boolean).length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  }, [progress.lessons]);

  const resetProgress = useCallback(() => {
    setProgress(getDefaultProgress());
  }, []);

  return {
    progress,
    completeLesson,
    isLessonComplete,
    saveQuizScore,
    updateChecklistItem,
    getModuleProgress,
    getOverallProgress,
    resetProgress
  };
}