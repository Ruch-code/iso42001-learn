export const annexAControls = [
  // A.2 AI Policy
  {
    id: 'A.2.1',
    controlNumber: 'A.2.1',
    title: 'AI Policy',
    description: 'The organization shall define, document, and communicate an AI policy appropriate to the purpose and context of the organization.',
    category: 'AI Policy',
    implementationGuidance: 'The AI policy should be approved by top management, communicated to all relevant parties, and reviewed periodically. It should address the organization\'s commitment to responsible AI development and use.',
    evidenceExamples: [
      'Documented AI policy signed by leadership',
      'Communication records (intranet, emails, training)',
      'Policy review meeting minutes',
      'Stakeholder acknowledgment records'
    ]
  },
  {
    id: 'A.2.2',
    controlNumber: 'A.2.2',
    title: 'Alignment with Other Policies',
    description: 'The AI policy shall be aligned with other relevant organizational policies.',
    category: 'AI Policy',
    implementationGuidance: 'Ensure consistency with information security, privacy, quality, risk management, and ethics policies. Map overlapping requirements.',
    evidenceExamples: [
      'Policy mapping matrix',
      'Cross-policy review records',
      'Integrated policy documentation'
    ]
  },
  
  // A.3 Internal Organization
  {
    id: 'A.3.1',
    controlNumber: 'A.3.1',
    title: 'Roles and Responsibilities',
    description: 'The organization shall define and communicate roles and responsibilities for AI governance.',
    category: 'Internal Organization',
    implementationGuidance: 'Define clear accountability for AI systems across lifecycle stages. Include AI governance board, AI system owners, data stewards, and compliance roles.',
    evidenceExamples: [
      'RACI matrix for AI governance',
      'Job descriptions with AI responsibilities',
      'Org chart showing AI governance structure',
      'Role assignment records'
    ]
  },
  {
    id: 'A.3.2',
    controlNumber: 'A.3.2',
    title: 'AI Governance Structure',
    description: 'The organization shall establish an AI governance structure with appropriate authority and resources.',
    category: 'Internal Organization',
    implementationGuidance: 'Establish cross-functional AI governance committee with executive sponsorship. Define meeting cadence, decision rights, and escalation paths.',
    evidenceExamples: [
      'Governance charter/terms of reference',
      'Meeting minutes and action items',
      'Resource allocation records',
      'Escalation procedure documentation'
    ]
  },
  {
    id: 'A.3.3',
    controlNumber: 'A.3.3',
    title: 'Reporting and Communication',
    description: 'The organization shall establish processes for reporting on AI management system performance.',
    category: 'Internal Organization',
    implementationGuidance: 'Define KPIs, reporting frequency, audience, and channels. Include incident reporting, risk dashboard, and compliance status.',
    evidenceExamples: [
      'Reporting framework and templates',
      'Sample reports and dashboards',
      'Communication logs',
      'Stakeholder feedback records'
    ]
  },
  {
    id: 'A.3.4',
    controlNumber: 'A.3.4',
    title: 'Management Review',
    description: 'Top management shall review the AI management system at planned intervals.',
    category: 'Internal Organization',
    implementationGuidance: 'Conduct structured reviews covering audit results, risk status, objective achievement, resource adequacy, and improvement opportunities.',
    evidenceExamples: [
      'Management review meeting minutes',
      'Review agenda and materials',
      'Decision and action item records',
      'Review schedule and attendance'
    ]
  },

  // A.4 Resources
  {
    id: 'A.4.1',
    controlNumber: 'A.4.1',
    title: 'Resource Determination',
    description: 'The organization shall determine and provide resources needed for the AI management system.',
    category: 'Resources',
    implementationGuidance: 'Identify human, technical, financial, and infrastructure resources. Consider competence, tools, computing resources, and budget for AI lifecycle.',
    evidenceExamples: [
      'Resource planning documents',
      'Budget allocations for AI governance',
      'Tool and infrastructure inventory',
      'Competence gap analyses'
    ]
  },
  {
    id: 'A.4.2',
    controlNumber: 'A.4.2',
    title: 'Competence and Awareness',
    description: 'The organization shall ensure competence of persons affecting AI system performance and provide awareness training.',
    category: 'Resources',
    implementationGuidance: 'Define competence requirements per role. Provide training on AI ethics, bias, risk management, and regulatory requirements. Track completion.',
    evidenceExamples: [
      'Competence matrix and requirements',
      'Training program curriculum',
      'Training completion records',
      'Awareness campaign materials'
    ]
  },

  // A.5 AI System Lifecycle
  {
    id: 'A.5.1',
    controlNumber: 'A.5.1',
    title: 'AI System Development Planning',
    description: 'The organization shall plan the development of AI systems.',
    category: 'AI System Lifecycle',
    implementationGuidance: 'Define development methodology, risk assessment integration, testing approach, documentation standards, and go/no-go criteria.',
    evidenceExamples: [
      'Development project plans',
      'Risk assessment integration checkpoints',
      'Testing and validation protocols',
      'Documentation templates'
    ]
  },
  {
    id: 'A.5.2',
    controlNumber: 'A.5.2',
    title: 'AI System Requirements',
    description: 'The organization shall define and document requirements for AI systems.',
    category: 'AI System Lifecycle',
    implementationGuidance: 'Capture functional, non-functional, ethical, legal, and stakeholder requirements. Include fairness, transparency, robustness, and safety criteria.',
    evidenceExamples: [
      'Requirements specifications',
      'Stakeholder requirement traceability',
      'Ethical requirement documentation',
      'Regulatory requirement mapping'
    ]
  },
  {
    id: 'A.5.3',
    controlNumber: 'A.5.3',
    title: 'AI System Design',
    description: 'The organization shall design AI systems according to defined requirements.',
    category: 'AI System Lifecycle',
    implementationGuidance: 'Apply responsible AI design principles. Document architecture, model selection rationale, data flows, and human oversight mechanisms.',
    evidenceExamples: [
      'Design documents and architecture diagrams',
      'Model selection rationale and evaluation',
      'Bias and fairness analysis',
      'Human oversight design documentation'
    ]
  },
  {
    id: 'A.5.4',
    controlNumber: 'A.5.4',
    title: 'AI System Verification and Validation',
    description: 'The organization shall verify and validate AI systems before deployment.',
    category: 'AI System Lifecycle',
    implementationGuidance: 'Conduct testing for accuracy, robustness, bias, security, and safety. Include adversarial testing, edge case evaluation, and independent review.',
    evidenceExamples: [
      'Test plans and test cases',
      'Test results and metrics',
      'Independent validation reports',
      'Deployment readiness sign-off'
    ]
  },
  {
    id: 'A.5.5',
    controlNumber: 'A.5.5',
    title: 'AI System Deployment',
    description: 'The organization shall manage deployment of AI systems.',
    category: 'AI System Lifecycle',
    implementationGuidance: 'Define deployment criteria, rollout strategy, monitoring setup, rollback procedures, and user training. Ensure production environment readiness.',
    evidenceExamples: [
      'Deployment plans and checklists',
      'Production readiness assessments',
      'Monitoring and alerting configuration',
      'Rollback procedure documentation'
    ]
  },

  // A.6 Data for AI Systems
  {
    id: 'A.6.1',
    controlNumber: 'A.6.1',
    title: 'Data Governance for AI',
    description: 'The organization shall establish data governance for AI system data.',
    category: 'Data for AI Systems',
    implementationGuidance: 'Define data ownership, quality standards, lineage tracking, privacy controls, and access management. Ensure compliance with data protection regulations.',
    evidenceExamples: [
      'Data governance framework',
      'Data quality metrics and reports',
      'Data lineage documentation',
      'Privacy impact assessments'
    ]
  },
  {
    id: 'A.6.2',
    controlNumber: 'A.6.2',
    title: 'Data Quality',
    description: 'The organization shall ensure data quality for AI system development and operation.',
    category: 'Data for AI Systems',
    implementationGuidance: 'Implement data quality checks for accuracy, completeness, consistency, timeliness, and representativeness. Monitor drift and bias in training and production data.',
    evidenceExamples: [
      'Data quality assessment reports',
      'Data profiling and validation results',
      'Drift monitoring dashboards',
      'Bias detection results'
    ]
  },
  {
    id: 'A.6.3',
    controlNumber: 'A.6.3',
    title: 'Data Provenance and Lineage',
    description: 'The organization shall maintain records of data origin, transformation, and usage in AI systems.',
    category: 'Data for AI Systems',
    implementationGuidance: 'Track data from source through transformations to model training and inference. Enable auditability and reproducibility.',
    evidenceExamples: [
      'Data lineage documentation',
      'Transformation pipeline documentation',
      'Data versioning records',
      'Audit trail samples'
    ]
  },

  // A.7 Information for Interested Parties
  {
    id: 'A.7.1',
    controlNumber: 'A.7.1',
    title: 'Information for Users and Affected Parties',
    description: 'The organization shall provide appropriate information to users and affected parties about AI systems.',
    category: 'Information for Interested Parties',
    implementationGuidance: 'Communicate AI system capabilities, limitations, intended use, and potential impacts. Use clear, accessible language. Provide opt-out/contest mechanisms where applicable.',
    evidenceExamples: [
      'User guides and documentation',
      'Transparency notices and disclosures',
      'Impact assessment summaries',
      'Feedback and complaint channels'
    ]
  },
  {
    id: 'A.7.2',
    controlNumber: 'A.7.2',
    title: 'Incident Reporting',
    description: 'The organization shall establish processes for reporting AI system incidents.',
    category: 'Information for Interested Parties',
    implementationGuidance: 'Define incident categories, reporting channels, escalation procedures, and communication templates. Include regulatory notification requirements.',
    evidenceExamples: [
      'Incident response procedures',
      'Incident log and tracking system',
      'Regulatory notification records',
      'Post-incident review reports'
    ]
  },
  {
    id: 'A.7.3',
    controlNumber: 'A.7.3',
    title: 'Public Disclosure',
    description: 'The organization shall determine and make appropriate public disclosures about its AI systems.',
    category: 'Information for Interested Parties',
    implementationGuidance: 'Consider publishing AI ethics reports, model cards, system cards, or transparency reports. Balance transparency with IP and security.',
    evidenceExamples: [
      'Published transparency reports',
      'Model cards for deployed systems',
      'AI ethics board publications',
      'Stakeholder engagement records'
    ]
  },
  {
    id: 'A.7.4',
    controlNumber: 'A.7.4',
    title: 'Communication with Regulators',
    description: 'The organization shall maintain communication channels with relevant regulatory authorities.',
    category: 'Information for Interested Parties',
    implementationGuidance: 'Monitor regulatory developments, participate in consultations, maintain registration/notification requirements, and establish contact points.',
    evidenceExamples: [
      'Regulatory monitoring logs',
      'Consultation response records',
      'Registration/notification confirmations',
      'Regulator correspondence'
    ]
  },
  {
    id: 'A.7.5',
    controlNumber: 'A.7.5',
    title: 'Customer and Supplier Communication',
    description: 'The organization shall communicate relevant AI management information to customers and suppliers.',
    category: 'Information for Interested Parties',
    implementationGuidance: 'Share AI capability statements, compliance certifications, contractual AI requirements, and incident notifications as appropriate.',
    evidenceExamples: [
      'Customer communication records',
      'Supplier AI requirements in contracts',
      'Compliance evidence sharing',
      'Joint governance meeting minutes'
    ]
  },

  // A.8 Use of AI Systems
  {
    id: 'A.8.1',
    controlNumber: 'A.8.1',
    title: 'AI System Use Policy',
    description: 'The organization shall define policies for the use of AI systems.',
    category: 'Use of AI Systems',
    implementationGuidance: 'Define acceptable use, prohibited use, human oversight requirements, monitoring, and access controls. Address shadow AI and unauthorized deployments.',
    evidenceExamples: [
      'AI use policy document',
      'Acceptable use guidelines',
      'Monitoring and enforcement records',
      'Shadow AI detection reports'
    ]
  },
  {
    id: 'A.8.2',
    controlNumber: 'A.8.2',
    title: 'Human Oversight',
    description: 'The organization shall ensure appropriate human oversight of AI systems.',
    category: 'Use of AI Systems',
    implementationGuidance: 'Define oversight levels (in-the-loop, on-the-loop, in-command) per system risk. Ensure overseers have competence, authority, and time to intervene.',
    evidenceExamples: [
      'Human oversight procedures',
      'Oversight role assignments',
      'Intervention logs and records',
      'Oversight effectiveness reviews'
    ]
  },
  {
    id: 'A.8.3',
    controlNumber: 'A.8.3',
    title: 'Monitoring AI System Performance',
    description: 'The organization shall monitor AI system performance in operation.',
    category: 'Use of AI Systems',
    implementationGuidance: 'Implement continuous monitoring for accuracy, drift, bias, availability, and security. Define thresholds, alerts, and automated responses.',
    evidenceExamples: [
      'Monitoring dashboards and alerts',
      'Performance metric trends',
      'Drift detection reports',
      'Incident response records'
    ]
  },
  {
    id: 'A.8.4',
    controlNumber: 'A.8.4',
    title: 'AI System Maintenance and Updates',
    description: 'The organization shall manage maintenance, updates, and retirement of AI systems.',
    category: 'Use of AI Systems',
    implementationGuidance: 'Define change management for model updates, retraining schedules, version control, and decommissioning procedures. Assess impact of changes.',
    evidenceExamples: [
      'Change management records',
      'Model retraining schedules and logs',
      'Version control and rollback records',
      'Decommissioning plans and execution'
    ]
  },
  {
    id: 'A.8.5',
    controlNumber: 'A.8.5',
    title: 'Business Continuity for AI Systems',
    description: 'The organization shall include AI systems in business continuity planning.',
    category: 'Use of AI Systems',
    implementationGuidance: 'Assess AI system criticality, define recovery objectives, test failover procedures, and plan for model/data unavailability.',
    evidenceExamples: [
      'Business impact analysis for AI systems',
      'Disaster recovery plans',
      'Failover test results',
      'Continuity exercise records'
    ]
  },

  // A.9 Third-party Relationships
  {
    id: 'A.9.1',
    controlNumber: 'A.9.1',
    title: 'Third-party AI Risk Assessment',
    description: 'The organization shall assess risks from third-party AI systems and services.',
    category: 'Third-party Relationships',
    implementationGuidance: 'Evaluate vendor AI practices, model transparency, data handling, contractual protections, and concentration risk. Apply due diligence proportionate to risk.',
    evidenceExamples: [
      'Vendor AI risk assessments',
      'Due diligence questionnaires',
      'Vendor compliance certifications',
      'Risk-based vendor tiering'
    ]
  },
  {
    id: 'A.9.2',
    controlNumber: 'A.9.2',
    title: 'Third-party AI Agreements',
    description: 'The organization shall establish agreements with third parties covering AI-related requirements.',
    category: 'Third-party Relationships',
    implementationGuidance: 'Include AI-specific clauses: model access, audit rights, incident notification, data ownership, liability, IP, and regulatory compliance.',
    evidenceExamples: [
      'Contract templates with AI clauses',
      'Executed vendor agreements',
      'Amendment records for AI requirements',
      'Contract compliance monitoring'
    ]
  },
  {
    id: 'A.9.3',
    controlNumber: 'A.9.3',
    title: 'Third-party AI Monitoring',
    description: 'The organization shall monitor third-party AI system performance and compliance.',
    category: 'Third-party Relationships',
    implementationGuidance: 'Track vendor performance, security posture, regulatory changes, and contractual compliance. Conduct periodic reviews and audits.',
    evidenceExamples: [
      'Vendor performance dashboards',
      'Periodic review reports',
      'Audit findings and remediation',
      'Contract renewal assessments'
    ]
  },

  // A.10 Acquisition of AI Systems
  {
    id: 'A.10.1',
    controlNumber: 'A.10.1',
    title: 'AI System Procurement Requirements',
    description: 'The organization shall define requirements for procuring AI systems.',
    category: 'Third-party Relationships',
    implementationGuidance: 'Specify technical, ethical, legal, and governance requirements in procurement. Require vendor transparency, documentation, and compliance evidence.',
    evidenceExamples: [
      'Procurement requirement specifications',
      'RFP/RFI templates with AI criteria',
      'Vendor evaluation scorecards',
      'Procurement approval records'
    ]
  },
  {
    id: 'A.10.2',
    controlNumber: 'A.10.2',
    title: 'AI System Supplier Evaluation',
    description: 'The organization shall evaluate and select AI system suppliers based on defined criteria.',
    category: 'Third-party Relationships',
    implementationGuidance: 'Assess supplier AI maturity, governance practices, financial stability, references, and alignment with organizational values. Document evaluation rationale.',
    evidenceExamples: [
      'Supplier evaluation criteria and matrix',
      'Evaluation reports and scorecards',
      'Reference check records',
      'Selection decision documentation'
    ]
  }
];