export const iso42001Clauses = [
  {
    id: 'clause-4',
    clauseNumber: '4',
    title: 'Context of the Organization',
    description: 'Understanding the organization and its context, interested parties, and determining the scope of the AI management system.',
    keyRequirements: [
      'Identify internal and external issues relevant to AI management',
      'Determine interested parties and their requirements',
      'Define the scope and boundaries of the AI management system',
      'Establish and maintain the AI management system'
    ],
    relatedControls: ['A.2.1', 'A.2.2', 'A.3.1']
  },
  {
    id: 'clause-5',
    clauseNumber: '5',
    title: 'Leadership',
    description: 'Top management commitment, AI policy, roles and responsibilities.',
    keyRequirements: [
      'Demonstrate leadership and commitment to AI management system',
      'Establish AI policy aligned with organizational strategy',
      'Assign roles, responsibilities, and authorities',
      'Ensure integration of AI management into business processes'
    ],
    relatedControls: ['A.2.1', 'A.2.2', 'A.3.1', 'A.3.2']
  },
  {
    id: 'clause-6',
    clauseNumber: '6',
    title: 'Planning',
    description: 'Actions to address risks and opportunities, AI objectives, and planning changes.',
    keyRequirements: [
      'Assess AI risks and opportunities',
      'Establish AI objectives at relevant functions and levels',
      'Plan changes to the AI management system',
      'Conduct AI risk assessment and AI system impact assessment'
    ],
    relatedControls: ['A.4.1', 'A.4.2', 'A.5.1', 'A.5.2', 'A.5.3', 'A.5.4', 'A.5.5']
  },
  {
    id: 'clause-7',
    clauseNumber: '7',
    title: 'Support',
    description: 'Resources, competence, awareness, communication, and documented information.',
    keyRequirements: [
      'Provide resources for AI management system',
      'Ensure competence of personnel affecting AI performance',
      'Create awareness of AI policy and objectives',
      'Establish internal and external communication processes',
      'Maintain documented information required by ISO 42001'
    ],
    relatedControls: ['A.3.1', 'A.3.2', 'A.3.3', 'A.3.4', 'A.6.1', 'A.6.2', 'A.6.3']
  },
  {
    id: 'clause-8',
    clauseNumber: '8',
    title: 'Operation',
    description: 'Operational planning and control, AI risk assessment, AI system impact assessment, and treatment.',
    keyRequirements: [
      'Plan, implement, and control AI management system processes',
      'Conduct AI risk assessment at planned intervals',
      'Conduct AI system impact assessment',
      'Implement AI risk treatment',
      'Manage AI system lifecycle (development, deployment, operation)',
      'Manage data for AI systems',
      'Communicate information to interested parties',
      'Manage third-party relationships and procurement'
    ],
    relatedControls: ['A.4.1', 'A.4.2', 'A.5.1', 'A.5.2', 'A.5.3', 'A.5.4', 'A.5.5', 'A.7.1', 'A.7.2', 'A.7.3', 'A.7.4', 'A.7.5', 'A.8.1', 'A.8.2', 'A.8.3', 'A.8.4', 'A.8.5', 'A.9.1', 'A.9.2', 'A.9.3', 'A.10.1', 'A.10.2']
  },
  {
    id: 'clause-9',
    clauseNumber: '9',
    title: 'Performance Evaluation',
    description: 'Monitoring, measurement, analysis, evaluation, internal audit, and management review.',
    keyRequirements: [
      'Monitor, measure, analyze, and evaluate AI management system performance',
      'Conduct internal audits at planned intervals',
      'Conduct management reviews at planned intervals',
      'Evaluate compliance with legal and other requirements'
    ],
    relatedControls: ['A.2.2', 'A.3.3', 'A.3.4']
  },
  {
    id: 'clause-10',
    clauseNumber: '10',
    title: 'Improvement',
    description: 'Nonconformity and corrective action, continual improvement.',
    keyRequirements: [
      'React to nonconformities and take corrective action',
      'Continually improve the AI management system',
      'Update the AI management system to maintain relevance and effectiveness'
    ],
    relatedControls: ['A.2.2', 'A.3.3', 'A.3.4']
  }
];