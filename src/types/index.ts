export interface LearningModule {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  lessons: Lesson[];
  completed?: boolean;
  progress?: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  type: 'reading' | 'video' | 'quiz' | 'exercise';
  duration: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface IsoClause {
  id: string;
  clauseNumber: string;
  title: string;
  description: string;
  keyRequirements: string[];
  relatedControls: string[];
}

export interface AnnexAControl {
  id: string;
  controlNumber: string;
  title: string;
  description: string;
  category: ControlCategory;
  implementationGuidance: string;
  evidenceExamples: string[];
}

export type ControlCategory = 
  | 'AI Policy'
  | 'Internal Organization'
  | 'Resources'
  | 'AI System Lifecycle'
  | 'Data for AI Systems'
  | 'Information for Interested Parties'
  | 'Use of AI Systems'
  | 'Third-party Relationships';

export interface ChecklistItem {
  id: string;
  clause: string;
  requirement: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'na';
  evidence?: string;
  notes?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: ControlCategory;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  lessons: Record<string, boolean>;
  checklist: Record<string, ChecklistItem>;
  lastUpdated: string;
}

export interface ModuleProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  completedAt?: string;
}