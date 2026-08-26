import type { ChecklistItem } from '../types';

export const defaultChecklist: ChecklistItem[] = [
  {
    id: 'cl-1',
    clause: '4.3',
    requirement: 'AIMS Scope Defined',
    description: 'The scope of the AI management system has been defined and documented.',
    status: 'not-started',
    priority: 'critical',
    category: 'AI Policy'
  },
  {
    id: 'cl-2',
    clause: '5.2',
    requirement: 'AI Policy Established',
    description: 'An AI policy has been created, approved by top management, and communicated.',
    status: 'not-started',
    priority: 'critical',
    category: 'AI Policy'
  },
  {
    id: 'cl-3',
    clause: '5.3',
    requirement: 'Roles & Responsibilities Assigned',
    description: 'AI governance roles (board, owners, stewards) are defined and communicated.',
    status: 'not-started',
    priority: 'critical',
    category: 'Internal Organization'
  },
  {
    id: 'cl-4',
    clause: '6.1.2',
    requirement: 'AI Risk Assessment Conducted',
    description: 'A systematic AI risk assessment has been conducted with a defined methodology.',
    status: 'not-started',
    priority: 'critical',
    category: 'AI System Lifecycle'
  },
  {
    id: 'cl-5',
    clause: '6.2',
    requirement: 'AI Objectives Set',
    description: 'Measurable AI objectives are established at relevant functions and levels.',
    status: 'not-started',
    priority: 'high',
    category: 'Internal Organization'
  },
  {
    id: 'cl-6',
    clause: '7.2',
    requirement: 'Competence Framework Established',
    description: 'Competence requirements are defined for AI roles and training is provided.',
    status: 'not-started',
    priority: 'high',
    category: 'Internal Organization'
  },
  {
    id: 'cl-7',
    clause: '7.3',
    requirement: 'AI Awareness Training',
    description: 'Personnel are aware of AI policy, their contributions, and implications of non-conformity.',
    status: 'not-started',
    priority: 'high',
    category: 'Internal Organization'
  },
  {
    id: 'cl-8',
    clause: '7.5',
    requirement: 'Documented Information Maintained',
    description: 'All required documented information is created, maintained, and controlled.',
    status: 'not-started',
    priority: 'high',
    category: 'AI Policy'
  },
  {
    id: 'cl-9',
    clause: '8.1',
    requirement: 'Operational Planning & Control',
    description: 'Processes for AI system operation are planned, implemented, and controlled.',
    status: 'not-started',
    priority: 'critical',
    category: 'AI System Lifecycle'
  },
  {
    id: 'cl-10',
    clause: '8.2',
    requirement: 'AI System Impact Assessment',
    description: 'AI system impact assessments have been conducted for in-scope AI systems.',
    status: 'not-started',
    priority: 'critical',
    category: 'AI System Lifecycle'
  },
  {
    id: 'cl-11',
    clause: '8.3',
    requirement: 'AI Risk Treatment',
    description: 'AI risks have been treated with appropriate controls selected and implemented.',
    status: 'not-started',
    priority: 'critical',
    category: 'AI System Lifecycle'
  },
  {
    id: 'cl-12',
    clause: 'A.6.1',
    requirement: 'Data Governance for AI',
    description: 'Data governance framework for AI systems is established covering quality, privacy, and lineage.',
    status: 'not-started',
    priority: 'critical',
    category: 'Data for AI Systems'
  },
  {
    id: 'cl-13',
    clause: 'A.7.1',
    requirement: 'User & Affected Party Information',
    description: 'Appropriate information about AI systems is provided to users and affected parties.',
    status: 'not-started',
    priority: 'high',
    category: 'Information for Interested Parties'
  },
  {
    id: 'cl-14',
    clause: 'A.8.1',
    requirement: 'AI System Inventory & Use Policy',
    description: 'AI system inventory is maintained and AI system use policy is established.',
    status: 'not-started',
    priority: 'critical',
    category: 'Use of AI Systems'
  },
  {
    id: 'cl-15',
    clause: 'A.8.2',
    requirement: 'Human Oversight Established',
    description: 'Appropriate human oversight mechanisms are in place for AI systems.',
    status: 'not-started',
    priority: 'critical',
    category: 'Use of AI Systems'
  },
  {
    id: 'cl-16',
    clause: 'A.8.3',
    requirement: 'AI Performance Monitoring',
    description: 'AI system performance is monitored in operation (accuracy, drift, bias).',
    status: 'not-started',
    priority: 'high',
    category: 'Use of AI Systems'
  },
  {
    id: 'cl-17',
    clause: 'A.9.1',
    requirement: 'Third-Party AI Risk Assessment',
    description: 'Third-party AI systems and services are assessed for risk.',
    status: 'not-started',
    priority: 'high',
    category: 'Third-party Relationships'
  },
  {
    id: 'cl-18',
    clause: 'A.9.2',
    requirement: 'Third-Party AI Agreements',
    description: 'Contracts with third-party AI providers include AI-specific clauses.',
    status: 'not-started',
    priority: 'high',
    category: 'Third-party Relationships'
  },
  {
    id: 'cl-19',
    clause: '9.2',
    requirement: 'Internal Audit Program',
    description: 'Internal audit program for the AIMS is established and conducted.',
    status: 'not-started',
    priority: 'high',
    category: 'AI Policy'
  },
  {
    id: 'cl-20',
    clause: '9.3',
    requirement: 'Management Review Conducted',
    description: 'Management review of the AIMS has been conducted with required inputs.',
    status: 'not-started',
    priority: 'high',
    category: 'Internal Organization'
  },
  {
    id: 'cl-21',
    clause: '10.1',
    requirement: 'Nonconformity & Corrective Action',
    description: 'Process for handling nonconformities and corrective actions is established.',
    status: 'not-started',
    priority: 'medium',
    category: 'AI Policy'
  },
  {
    id: 'cl-22',
    clause: '10.2',
    requirement: 'Continual Improvement',
    description: 'Continual improvement of the AIMS is demonstrated.',
    status: 'not-started',
    priority: 'medium',
    category: 'AI Policy'
  }
];