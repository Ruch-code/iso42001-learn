export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BestPractice {
  id: string;
  title: string;
  description: string;
  tips: string[];
  commonPitfalls: string[];
  exampleTool?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  type: 'reading' | 'quiz' | 'exercise';
  duration: string;
  bestPractices?: BestPractice[];
  quiz?: QuizQuestion[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  duration: string;
  lessons: Lesson[];
}

export const learningModules: LearningModule[] = [
  {
    id: 'mod-1',
    title: 'ISO 42001 Fundamentals',
    description: 'Understand what ISO 42001 is, why it matters, and how it fits into the broader AI governance landscape.',
    icon: '📘',
    order: 1,
    duration: '30 min',
    lessons: [
      {
        id: 'mod-1-lesson-1',
        moduleId: 'mod-1',
        title: 'What is ISO 42001?',
        content: `# What is ISO 42001?

ISO/IEC 42001:2023 is the **first international standard** for Artificial Intelligence Management Systems (AIMS). Published in December 2023, it provides a framework for organizations to manage AI responsibly.

## Key Facts
- **Full name:** ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system
- **Type:** Certifiable standard (organizations can get certified)
- **Structure:** Based on Annex SL (same as ISO 27001, ISO 9001, etc.)
- **Companion documents:** ISO/IEC 42002 (guidance), ISO/IEC 42005 (impact assessment), ISO/IEC 42006 (competence bodies)

## Who should use it?
- Organizations developing or deploying AI systems
- Organizations using AI in products or services
- Consulting firms helping clients achieve AI compliance
- Any entity wanting structured AI governance

## Why does it matter?
1. **Regulatory alignment** — Supports EU AI Act, NIST AI RMF, and other frameworks
2. **Risk management** — Systematic approach to AI risks
3. **Trust** — Demonstrates responsible AI to customers and stakeholders
4. **Competitive advantage** — Early adopters gain market credibility`,
        order: 1,
        type: 'reading',
        duration: '8 min',
        bestPractices: [
          {
            id: 'bp-1-1',
            title: 'Start with the Why',
            description: 'Before diving into ISO 42001 clauses, ensure you understand your client\'s motivation for pursuing certification.',
            tips: [
              'Map ISO 42001 to client\'s business drivers (regulatory, customer demand, competitive)',
              'Identify which clients are in EU AI Act high-risk categories — ISO 42001 helps demonstrate conformity',
              'Reference NIST AI RMF alignment to show US regulatory preparedness'
            ],
            commonPitfalls: [
              'Treating it as pure compliance checkbox instead of a management system',
              'Ignoring existing management systems (ISO 27001, 9001) that can be integrated',
              'Not engaging top management early enough'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-1-1-1',
            question: 'When was ISO/IEC 42001:2023 published?',
            options: ['June 2023', 'December 2023', 'March 2024', 'July 2024'],
            correctAnswer: 1,
            explanation: 'ISO/IEC 42001:2023 was published in December 2023. It is the first international standard for AI management systems.'
          },
          {
            id: 'q-1-1-2',
            question: 'Which standard structure is ISO 42001 based on?',
            options: ['ISO 31000', 'Annex SL', 'CMMI', 'COBIT'],
            correctAnswer: 1,
            explanation: 'ISO 42001 follows Annex SL, the harmonized structure used by ISO 9001, ISO 27001, ISO 22301, and other management system standards.'
          },
          {
            id: 'q-1-1-3',
            question: 'Can organizations get certified against ISO 42001?',
            options: ['No, it is guidance only', 'Yes, it is a certifiable standard', 'Only government organizations', 'Only after ISO 27001 certification'],
            correctAnswer: 1,
            explanation: 'ISO 42001 is a certifiable standard. Certification bodies can audit and certify organizations against its requirements.'
          }
        ]
      },
      {
        id: 'mod-1-lesson-2',
        moduleId: 'mod-1',
        title: 'Clauses 4-10 Explained',
        content: `# ISO 42001 Clauses 4-10 Explained

The main body of ISO 42001 follows the Plan-Do-Check-Act (PDCA) cycle:

## Clause 4 — Context of the Organization
Understand **internal/external issues** and **interested parties** that affect your AI management system.

**Key activities:**
- SWOT analysis focused on AI capabilities and risks
- Stakeholder mapping (regulators, customers, employees, public)
- Scope definition — which AI systems, business units, geographies

## Clause 5 — Leadership
**Top management** must demonstrate commitment through an AI policy, assigned roles, and integration into business strategy.

**Key activities:**
- AI Policy creation and approval
- RACI matrix for AI governance
- AI governance board establishment

## Clause 6 — Planning
Address **risks and opportunities**, set **AI objectives**, and plan changes. This includes mandatory **AI risk assessment** and **AI system impact assessment**.

**Key activities:**
- AI risk assessment methodology
- AI system impact assessment (AIIA)
- Setting measurable AI objectives
- Change management planning

## Clause 7 — Support
Provide **resources, competence, awareness, communication**, and **documented information**.

**Key activities:**
- Competence framework for AI roles
- Training programs
- Internal/external communication plans
- Documentation management

## Clause 8 — Operation
The largest clause — covers **operational planning, AI system lifecycle, data management, third parties**, and more.

**Key activities:**
- AI system inventory and classification
- Development and deployment controls
- Data governance
- Third-party management
- Incident management

## Clause 9 — Performance Evaluation
**Monitor, measure, audit**, and conduct **management reviews**.

**Key activities:**
- KPIs and dashboards
- Internal audit program
- Management review meetings
- Compliance evaluation

## Clause 10 — Improvement
Handle **nonconformities, corrective actions**, and **continual improvement**.

**Key activities:**
- Corrective action process
- Continual improvement program
- Lessons learned integration`,
        order: 2,
        type: 'reading',
        duration: '12 min',
        bestPractices: [
          {
            id: 'bp-1-2',
            title: 'Leverage Existing Management Systems',
            description: 'If your client already has ISO 27001, ISO 9001, or similar, integrate ISO 42001 into existing processes.',
            tips: [
              'Map Annex A controls to existing ISO 27001 Annex A controls — significant overlap',
              'Reuse document control, internal audit, and management review processes',
              'Integrate AI risk into existing enterprise risk management framework',
              'Single audit scope reduces cost and disruption'
            ],
            commonPitfalls: [
              'Creating parallel processes that duplicate existing ones',
              'Forcing entirely new audit cycles when existing ones can cover AI',
              'Ignoring the relationship between AI risks and information security risks'
            ]
          },
          {
            id: 'bp-1-3',
            title: 'Prioritize High-Risk AI Systems First',
            description: 'Not all AI systems need the same level of control. Focus implementation on highest-risk systems first.',
            tips: [
              'Classify AI systems by risk tier (high/medium/low) early in the project',
              'Map to EU AI Act risk categories if clients operate in EU',
              'Start with 2-3 critical AI systems for initial scope',
              'Expand scope incrementally as the AIMS matures'
            ],
            commonPitfalls: [
              'Trying to cover all AI systems in initial certification scope',
              'Not having a clear AI system inventory before starting',
              'Applying same rigor to a chatbot as to a credit scoring model'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-1-2-1',
            question: 'Which clause requires an AI risk assessment and AI system impact assessment?',
            options: ['Clause 5', 'Clause 6', 'Clause 7', 'Clause 8'],
            correctAnswer: 1,
            explanation: 'Clause 6 (Planning) requires AI risk assessment and AI system impact assessment as part of planning actions to address risks and opportunities.'
          },
          {
            id: 'q-1-2-2',
            question: 'What is the PDCA cycle structure in ISO 42001?',
            options: [
              'Plan (4-5) Do (6-7) Check (8) Act (9-10)',
              'Plan (4-6) Do (7-8) Check (9) Act (10)',
              'Plan (5-6) Do (7-8) Check (9-10) Act (4)',
              'Plan (6) Do (7-8) Check (9) Act (10)'
            ],
            correctAnswer: 1,
            explanation: 'Plan = Clauses 4-6 (Context, Leadership, Planning). Do = Clauses 7-8 (Support, Operation). Check = Clause 9 (Performance Evaluation). Act = Clause 10 (Improvement).'
          },
          {
            id: 'q-1-2-3',
            question: 'Which clause is typically the largest and most operationally detailed?',
            options: ['Clause 6 - Planning', 'Clause 7 - Support', 'Clause 8 - Operation', 'Clause 9 - Performance Evaluation'],
            correctAnswer: 2,
            explanation: 'Clause 8 (Operation) is the largest clause, covering AI system lifecycle, data management, third parties, procurement, and more.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Annex A Controls Deep Dive',
    description: 'Master all Annex A controls — the implementation requirements that form the backbone of ISO 42001 compliance.',
    icon: '🔧',
    order: 2,
    duration: '60 min',
    lessons: [
      {
        id: 'mod-2-lesson-1',
        moduleId: 'mod-2',
        title: 'AI Policy & Governance Controls (A.2-A.4)',
        content: `# AI Policy & Governance Controls

## A.2 — AI Policy
The organization must establish an AI policy that:
- Is appropriate to the purpose of the organization
- Includes AI objectives or provides framework for setting them
- Includes commitment to meet applicable requirements
- Includes commitment to continual improvement
- Is documented, communicated, and available to interested parties
- Is approved by top management

## A.3 — Internal Organization
- **A.3.1** Roles and responsibilities for AI governance
- **A.3.2** AI governance structure with authority and resources
- **A.3.3** Reporting on AI management system performance
- **A.3.4** Management review of AI management system

## A.4 — Resources
- **A.4.1** Resource determination (human, technical, financial)
- **A.4.2** Competence and awareness for AI roles`,
        order: 1,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-2-1',
            title: 'AI Policy Best Practices',
            description: 'Create an AI policy that is actionable, not just aspirational.',
            tips: [
              'Include specific commitments (e.g., bias testing, transparency, human oversight)',
              'Make it board-level approved to demonstrate top management commitment',
              'Publish internally and consider external publication for transparency',
              'Review annually or when significant changes occur',
              'Reference applicable regulations (EU AI Act, sector-specific rules)'
            ],
            commonPitfalls: [
              'Generic policy that doesn\'t address AI-specific risks',
              'Policy created by IT/legal without cross-functional input',
              'No enforcement mechanism or accountability',
              'Policy exists but isn\'t communicated to affected staff'
            ]
          },
          {
            id: 'bp-2-2',
            title: 'Governance Structure Best Practices',
            description: 'Design governance that is lean enough to function but rigorous enough to be effective.',
            tips: [
              'AI governance board should include: CTO, DPO, Legal, Ethics, Business, Risk, Engineering',
              'Executive sponsor (C-level) must be assigned',
              'Define clear decision rights: who approves new AI deployments, who handles incidents',
              'Meeting cadence: monthly for operational, quarterly for strategic',
              'Use RACI matrix to eliminate ambiguity'
            ],
            commonPitfalls: [
              'Governance board meets but has no decision authority',
              'Too many members — slows decision-making',
              'No representation from business units that actually use AI',
              'Resourcing left to volunteers rather than formally allocated'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-2-1-1',
            question: 'What must an AI policy include according to A.2.1?',
            options: [
              'Only a commitment to responsible AI',
              'AI objectives or framework for setting them, plus commitment to meet applicable requirements',
              'Detailed technical specifications for all AI systems',
              'Names of all AI system owners'
            ],
            correctAnswer: 1,
            explanation: 'A.2.1 requires the AI policy to include AI objectives or framework for setting them, commitment to meet applicable requirements, and commitment to continual improvement.'
          },
          {
            id: 'q-2-1-2',
            question: 'Who must approve the AI policy?',
            options: ['The IT department', 'The AI governance board', 'Top management', 'The compliance team'],
            correctAnswer: 2,
            explanation: 'Top management must approve the AI policy, demonstrating leadership commitment as required by Clause 5 and A.2.1.'
          },
          {
            id: 'q-2-1-3',
            question: 'Which control addresses competence and awareness for AI roles?',
            options: ['A.2.2', 'A.3.1', 'A.4.2', 'A.5.1'],
            correctAnswer: 2,
            explanation: 'A.4.2 requires the organization to ensure competence of persons affecting AI system performance and provide awareness training.'
          }
        ]
      },
      {
        id: 'mod-2-lesson-2',
        moduleId: 'mod-2',
        title: 'AI System Lifecycle Controls (A.5)',
        content: `# AI System Lifecycle Controls (A.5)

These controls cover the entire AI system lifecycle from planning through deployment.

## A.5.1 — AI System Development Planning
Plan the development lifecycle with risk assessment integration.

**What auditors look for:**
- Development methodology documentation
- Risk checkpoints at each lifecycle stage
- Testing and validation protocols
- Documentation standards

## A.5.2 — AI System Requirements
Define and document requirements including ethical and fairness criteria.

**What auditors look for:**
- Requirements traceability matrix
- Ethical requirement documentation
- Regulatory requirement mapping
- Stakeholder requirements

## A.5.3 — AI System Design
Design AI systems according to requirements with responsible AI principles.

**What auditors look for:**
- Architecture documentation
- Model selection rationale
- Bias and fairness analysis
- Human oversight design

## A.5.4 — AI System Verification and Validation
Verify and validate before deployment with independent review.

**What auditors look for:**
- Test plans and results
- Adversarial testing
- Independent validation reports
- Deployment readiness sign-off

## A.5.5 — AI System Deployment
Manage deployment with monitoring, rollback, and training.

**What auditors look for:**
- Deployment plans and checklists
- Monitoring configuration
- Rollback procedures
- User training records`,
        order: 2,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-2-3',
            title: 'Lifecycle Documentation Best Practices',
            description: 'Every AI system should have a "birth certificate" — a complete lifecycle record.',
            tips: [
              'Create an AI System Card for each deployed system (model card + system card approach)',
              'Document model selection rationale — why this approach over alternatives',
              'Maintain version control for models, training data, and configurations',
              'Require sign-off gates at each lifecycle stage before progression',
              'Keep audit trails that satisfy both ISO 42001 and EU AI Act transparency requirements'
            ],
            commonPitfalls: [
              'Documentation created after deployment (retrofit documentation)',
              'No version control on models — can\'t reproduce or rollback',
              'Missing human oversight design for high-risk systems',
              'Validation done by same team that built the system (no independence)'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-2-2-1',
            question: 'Which A.5 control requires independent validation before deployment?',
            options: ['A.5.1', 'A.5.2', 'A.5.4', 'A.5.5'],
            correctAnswer: 2,
            explanation: 'A.5.4 (Verification and Validation) requires independent review and validation before deployment to ensure objectivity.'
          },
          {
            id: 'q-2-2-2',
            question: 'What should be documented in A.5.2 (AI System Requirements)?',
            options: [
              'Only technical specifications',
              'Only ethical requirements',
              'Functional, non-functional, ethical, legal, and stakeholder requirements',
              'Just the data requirements'
            ],
            correctAnswer: 2,
            explanation: 'A.5.2 requires comprehensive requirements including functional, non-functional, ethical, legal, and stakeholder requirements, plus fairness, transparency, and safety criteria.'
          },
          {
            id: 'q-2-2-3',
            question: 'What does A.5.5 require for AI system deployment?',
            options: [
              'Just push to production',
              'Deployment plans, monitoring setup, rollback procedures, and user training',
              'Only management approval',
              'External audit before deployment'
            ],
            correctAnswer: 1,
            explanation: 'A.5.5 requires comprehensive deployment management including rollout strategy, monitoring, rollback procedures, and user training.'
          }
        ]
      },
      {
        id: 'mod-2-lesson-3',
        moduleId: 'mod-2',
        title: 'Data & Third-Party Controls (A.6-A.10)',
        content: `# Data, Information, Use, and Third-Party Controls

## A.6 — Data for AI Systems
- **A.6.1** Data governance for AI — ownership, quality, privacy, access
- **A.6.2** Data quality — accuracy, completeness, consistency, timeliness, representativeness
- **A.6.3** Data provenance and lineage — origin, transformation, usage tracking

## A.7 — Information for Interested Parties
- **A.7.1** Information for users and affected parties
- **A.7.2** Incident reporting processes
- **A.7.3** Public disclosure (transparency reports, model cards)
- **A.7.4** Communication with regulators
- **A.7.5** Customer and supplier communication

## A.8 — Use of AI Systems
- **A.8.1** AI system use policy (acceptable use, shadow AI)
- **A.8.2** Human oversight (in-the-loop, on-the-loop, in-command)
- **A.8.3** Monitoring AI system performance (drift, bias, accuracy)
- **A.8.4** Maintenance, updates, and retirement
- **A.8.5** Business continuity for AI systems

## A.9 — Third-party Relationships
- **A.9.1** Third-party AI risk assessment
- **A.9.2** Third-party AI agreements (AI-specific clauses)
- **A.9.3** Third-party AI monitoring

## A.10 — Acquisition of AI Systems
- **A.10.1** Procurement requirements
- **A.10.2** Supplier evaluation`,
        order: 3,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-2-4',
            title: 'Data Governance for AI Best Practices',
            description: 'AI systems are only as good as the data they use. Treat data governance as a first-class concern.',
            tips: [
              'Implement data lineage tracking from source through training to inference',
              'Conduct bias audits on training data before model development',
              'Define data quality metrics with thresholds (e.g., completeness > 95%)',
              'Map data to privacy regulations (GDPR, CCPA, sector-specific)',
              'Maintain data inventory that links datasets to specific AI systems',
              'Version training datasets to enable reproducibility'
            ],
            commonPitfalls: [
              'No data quality metrics — discovering issues in production',
              'Training data not documented — can\'t prove provenance during audit',
              'Bias in historical data goes undetected until harm occurs',
              'No data retention/deletion policies aligned with AI lifecycle'
            ]
          },
          {
            id: 'bp-2-5',
            title: 'Human Oversight Best Practices',
            description: 'Human oversight is not optional — it must be designed, documented, and tested.',
            tips: [
              'Classify oversight levels per AI system risk: in-the-loop (always), on-the-loop (monitor), in-command (high-level)',
              'Ensure overseers have domain expertise, not just technical knowledge',
              'Test override/intervention mechanisms regularly',
              'Document when and how humans override AI decisions',
              'Establish clear escalation paths when overseers detect issues'
            ],
            commonPitfalls: [
              'Human oversight exists on paper but overseers rubber-stamp AI decisions',
              'Overseers lack training to identify AI errors',
              'No monitoring of whether oversight is actually effective',
              'Override mechanisms not tested — fails when needed most'
            ]
          },
          {
            id: 'bp-2-6',
            title: 'Third-Party Management Best Practices',
            description: 'Most organizations depend on third-party AI. Your certification covers your vendor ecosystem.',
            tips: [
              'Tier vendors by risk: critical/high/medium/low — apply controls proportionately',
              'Include AI-specific clauses in contracts: audit rights, data ownership, incident notification, model transparency',
              'Require vendors to provide model cards or equivalent documentation',
              'Conduct annual vendor reviews for critical AI providers',
              'Monitor vendor compliance status and regulatory changes',
              'Have exit strategy for critical AI vendor dependencies'
            ],
            commonPitfalls: [
              'No AI-specific vendor risk assessment — treating AI like standard software procurement',
              'Contracts missing AI clauses — no audit rights or incident notification',
              'Concentration risk — too dependent on single AI provider (e.g., one LLM vendor)',
              'Shadow AI from third parties not tracked'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-2-3-1',
            question: 'What are the three data governance controls in Annex A?',
            options: [
              'A.6.1 Data Governance, A.6.2 Data Quality, A.6.3 Data Provenance',
              'A.7.1 Information, A.7.2 Reporting, A.7.3 Disclosure',
              'A.5.1 Planning, A.5.2 Requirements, A.5.3 Design',
              'A.8.1 Use, A.8.2 Oversight, A.8.3 Monitoring'
            ],
            correctAnswer: 0,
            explanation: 'A.6 covers data governance (A.6.1), data quality (A.6.2), and data provenance/lineage (A.6.3) for AI systems.'
          },
          {
            id: 'q-2-3-2',
            question: 'What are the three levels of human oversight?',
            options: [
              'Review, Approve, Deploy',
              'In-the-loop, On-the-loop, In-command',
              'Monitor, Alert, Act',
              'Observe, Decide, Override'
            ],
            correctAnswer: 1,
            explanation: 'The three levels are: in-the-loop (human makes every decision), on-the-loop (human monitors AI decisions), and in-command (human provides high-level direction).'
          },
          {
            id: 'q-2-3-3',
            question: 'Which control addresses shadow AI?',
            options: ['A.6.1', 'A.7.1', 'A.8.1', 'A.9.1'],
            correctAnswer: 2,
            explanation: 'A.8.1 (AI System Use Policy) addresses acceptable use of AI systems, including detection and management of shadow AI (unauthorized AI deployments).'
          },
          {
            id: 'q-2-3-4',
            question: 'What should third-party AI agreements include?',
            options: [
              'Standard software license terms only',
              'AI-specific clauses: audit rights, data ownership, incident notification, model transparency',
              'Just a data processing agreement',
              'No special requirements beyond standard procurement'
            ],
            correctAnswer: 1,
            explanation: 'A.9.2 requires AI-specific contract clauses including audit rights, data ownership, incident notification, liability, IP, and regulatory compliance.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Risk Assessment & Impact Assessment',
    description: 'Learn how to conduct AI risk assessments and AI system impact assessments — core requirements of ISO 42001.',
    icon: '⚠️',
    order: 3,
    duration: '45 min',
    lessons: [
      {
        id: 'mod-3-lesson-1',
        moduleId: 'mod-3',
        title: 'AI Risk Assessment Methodology',
        content: `# AI Risk Assessment Methodology

ISO 42001 Clause 6.1 requires the organization to conduct AI risk assessments. While it doesn't mandate a specific methodology, here's how to approach it:

## Step 1: Establish Context
- Identify AI systems in scope
- Determine organizational risk appetite
- Define risk criteria and impact categories

## Step 2: Identify AI-Specific Risks
Categories of AI risks to assess:
- **Bias and fairness** — discriminatory outcomes
- **Transparency** — inability to explain decisions
- **Robustness** — adversarial attacks, edge cases
- **Privacy** — data protection violations
- **Security** — model theft, data poisoning, prompt injection
- **Reliability** — hallucinations, errors, drift
- **Environmental** — compute costs, energy consumption
- **Legal/Regulatory** — non-compliance with laws
- **Reputational** — public trust damage
- **Societal** — broader impact on people and communities

## Step 3: Analyze Risks
For each identified risk:
- **Likelihood:** How probable is this risk to materialize?
- **Impact:** What would be the consequence?
- **Risk level:** Likelihood × Impact

## Step 4: Evaluate and Prioritize
- Compare against risk acceptance criteria
- Prioritize for treatment
- Document rationale for acceptance of any risks

## Step 5: Treat Risks
- **Mitigate** — implement controls to reduce risk
- **Transfer** — share risk via insurance or contracts
- **Avoid** — stop the activity causing the risk
- **Accept** — acknowledge and monitor

## Step 6: Monitor and Review
- Review risks at planned intervals
- Update when context changes
- Track risk indicators`,
        order: 1,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-3-1',
            title: 'AI Risk Assessment Best Practices',
            description: 'AI risks differ from traditional IT risks. Your methodology must account for AI-specific failure modes.',
            tips: [
              'Extend existing enterprise risk framework rather than creating separate AI risk process',
              'Include cross-functional reviewers (ethics, legal, domain experts) not just technical team',
              'Use scenario-based analysis — "what if the model is wrong?" for each use case',
              'Quantify where possible (financial impact, number of affected people, regulatory penalties)',
              'Review risks at least quarterly or when significant changes occur',
              'Map AI risks to specific Annex A controls for traceability',
              'Consider cascading risks (e.g., bias → reputational → regulatory → financial)'
            ],
            commonPitfalls: [
              'Treating AI risk as subset of IT risk without AI-specific considerations',
              'Risk assessment done once and never updated',
              'No quantitative impact analysis — risks described qualitatively only',
              'Risks identified but no treatment plan assigned',
              'Ownership of risks not assigned to specific roles'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-3-1-1',
            question: 'What is the correct order of steps in AI risk assessment?',
            options: [
              'Identify, Treat, Analyze, Monitor',
              'Context, Identify, Analyze, Evaluate, Treat, Monitor',
              'Analyze, Identify, Evaluate, Treat',
              'Treat, Identify, Analyze, Monitor'
            ],
            correctAnswer: 1,
            explanation: 'The correct sequence is: Establish Context → Identify Risks → Analyze Risks → Evaluate and Prioritize → Treat Risks → Monitor and Review.'
          },
          {
            id: 'q-3-1-2',
            question: 'Which of these is an AI-specific risk category?',
            options: ['Fire damage', 'Hallucinations', 'Equipment theft', 'Office relocation'],
            correctAnswer: 1,
            explanation: 'Hallucinations (AI generating false or misleading outputs) is a risk specific to AI systems. The others are traditional operational risks.'
          },
          {
            id: 'q-3-1-3',
            question: 'What are the four risk treatment options?',
            options: [
              'Identify, Analyze, Evaluate, Monitor',
              'Mitigate, Transfer, Avoid, Accept',
              'Prevent, Detect, Correct, Ignore',
              'Plan, Do, Check, Act'
            ],
            correctAnswer: 1,
            explanation: 'The four risk treatment options are: Mitigate (reduce), Transfer (share), Avoid (stop), and Accept (acknowledge).'
          }
        ]
      },
      {
        id: 'mod-3-lesson-2',
        moduleId: 'mod-3',
        title: 'AI System Impact Assessment (AIIA)',
        content: `# AI System Impact Assessment (AIIA)

ISO 42001 requires an AI System Impact Assessment — distinct from the risk assessment. It evaluates the impact of AI systems on individuals and groups.

## What is an AIIA?
A structured evaluation of how an AI system may affect people — directly or indirectly — including potential harms, benefits, and unintended consequences.

## AIIA Framework

### 1. System Description
- Purpose and intended use
- Data sources and types
- Model architecture and approach
- Deployment context

### 2. Affected Parties Analysis
- Who is directly affected (users, subjects, decision recipients)?
- Who is indirectly affected (communities, ecosystems)?
- Are vulnerable groups involved?

### 3. Impact Categories to Assess
- **Fairness & Non-discrimination** — disparate impact analysis
- **Privacy & Data Protection** — PII handling, consent, data minimization
- **Transparency & Explainability** — can affected parties understand decisions?
- **Autonomy & Human Agency** — does AI undermine human decision-making?
- **Safety & Security** — physical, psychological, financial harm potential
- **Environmental** — energy consumption, carbon footprint
- **Societal** — job displacement, inequality, democratic processes

### 4. Risk-Benefit Analysis
- Document benefits of the AI system
- Document potential harms
- Assess proportionality
- Consider alternatives

### 5. Mitigation Measures
- Technical safeguards (anonymization, bias detection, etc.)
- Organizational measures (policies, training, oversight)
- Legal measures (contracts, consent, redress mechanisms)

### 6. Monitoring and Review
- Ongoing monitoring plan
- Trigger conditions for re-assessment
- Stakeholder feedback mechanisms

## AIIA vs Risk Assessment
| Aspect | Risk Assessment | AIIA |
|--------|----------------|------|
| Focus | Organizational risks | People impacts |
| Trigger | All AI systems | Higher-risk systems |
| Audience | Internal governance | May be shared externally |
| Standard | ISO 42001 Clause 6 | ISO 42001 Clause 8 + ISO/IEC 42005 |`,
        order: 2,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-3-2',
            title: 'AIIA Best Practices',
            description: 'The AIIA is your proof that you considered human impact — make it thorough and genuine.',
            tips: [
              'Conduct AIIA early — during design, not after deployment',
              'Involve diverse perspectives: ethics board, affected communities, domain experts',
              'Use structured templates to ensure consistency across assessments',
              'Consider both direct and indirect effects (e.g., credit denial → housing impact)',
              'Link AIIA findings to specific controls and mitigations',
              'Make higher-level AIIA summaries public for transparency (A.7.3)',
              'Review and update AIIA whenever the system changes'
            ],
            commonPitfalls: [
              'AIIA done as paperwork exercise — no genuine impact analysis',
              'Only technical team involved — missing ethics, legal, affected party perspectives',
              'AIIA completed after deployment when changes are expensive',
              'No follow-through — AIIA identifies issues but they aren\'t mitigated',
              'AIIA treated as one-time event rather than living document'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-3-2-1',
            question: 'What is the primary focus of an AI System Impact Assessment?',
            options: [
              'Organizational financial risks',
              'Impact on individuals and groups affected by the AI system',
              'Technical performance metrics',
              'Vendor compliance status'
            ],
            correctAnswer: 1,
            explanation: 'An AIIA evaluates how an AI system may affect people — directly or indirectly — focusing on fairness, privacy, transparency, autonomy, and safety impacts.'
          },
          {
            id: 'q-3-2-2',
            question: 'When should the AIIA be conducted?',
            options: [
              'After deployment when issues arise',
              'During design and before deployment, and updated when changes occur',
              'Only during certification audit',
              'Once every 5 years'
            ],
            correctAnswer: 1,
            explanation: 'AIIA should be conducted early (during design), before deployment, and updated whenever the system or its context changes significantly.'
          },
          {
            id: 'q-3-2-3',
            question: 'How does AIIA differ from AI risk assessment?',
            options: [
              'They are the same thing',
              'AIIA focuses on people impacts; risk assessment focuses on organizational risks',
              'AIIA is optional; risk assessment is mandatory',
              'AIIA is for high-risk systems only; risk assessment is for all'
            ],
            correctAnswer: 1,
            explanation: 'Risk assessment addresses organizational risks (financial, operational, regulatory), while AIIA evaluates impacts on individuals and groups (fairness, privacy, autonomy, safety).'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Client Readiness Assessment',
    description: 'How to assess whether a client is ready for ISO 42001 certification and create a gap analysis.',
    icon: '✅',
    order: 4,
    duration: '30 min',
    lessons: [
      {
        id: 'mod-4-lesson-1',
        moduleId: 'mod-4',
        title: 'Conducting a Gap Analysis',
        content: `# Conducting an ISO 42001 Gap Analysis

A gap analysis is the first step in helping a client achieve ISO 42001 compliance. It identifies where the client stands versus where they need to be.

## Gap Analysis Process

### Phase 1: Preparation (1-2 days)
1. **Understand the client's scope:**
   - What AI systems do they have?
   - Which business units are in scope?
   - What certifications do they already hold?
   
2. **Request documentation:**
   - Existing policies (infosec, quality, privacy)
   - AI system inventory
   - Organizational charts
   - Existing risk registers
   - Previous audit findings

3. **Schedule interviews:**
   - Executive sponsor
   - IT/AI team leads
   - Legal/compliance
   - Business unit heads
   - Data governance team

### Phase 2: Assessment (3-5 days)
For each ISO 42001 requirement:
1. **Review documentary evidence** against requirements
2. **Conduct structured interviews** to verify implementation
3. **Observe practices** (how things actually work vs. documented)
4. **Rate maturity:**
   - **Not Started (0)** — No evidence of implementation
   - **Initial (1)** — Ad-hoc, inconsistent
   - **Developing (2)** — Partial implementation
   - **Defined (3)** — Documented and consistently applied
   - **Managed (4)** — Monitored and measured
   - **Optimizing (5)** — Continually improving

### Phase 3: Reporting (2-3 days)
1. **Executive summary** with overall readiness rating
2. **Clause-by-clause findings** with maturity ratings
3. **Prioritized recommendations** (critical/high/medium/low)
4. **Implementation roadmap** with timeline and resource estimates
5. **Quick wins** that can be implemented immediately

## Key Interview Questions

**For Leadership (Clause 5):**
- Who has overall accountability for AI governance?
- How is AI governance integrated into business strategy?
- What budget/resources are allocated to AI governance?

**For Operations (Clause 8):**
- Walk me through your AI system development lifecycle.
- How do you manage data for AI systems?
- What monitoring is in place for deployed AI systems?

**For Risk (Clause 6):**
- How do you identify and assess AI risks?
- When was your last AI risk assessment?
- How do you handle AI incidents?

**For Third Parties (A.9):**
- What third-party AI systems/services do you use?
- How do you assess vendor AI risks?
- What AI-specific clauses exist in vendor contracts?`,
        order: 1,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-4-1',
            title: 'Gap Analysis Best Practices',
            description: 'A thorough gap analysis sets the foundation for the entire engagement.',
            tips: [
              'Always start with the client\'s existing management system — identify reuse opportunities',
              'Use consistent assessment criteria across all clauses for reliable comparisons',
              'Provide maturity ratings, not just pass/fail — shows improvement path',
              'Include quick wins in your report — immediate value demonstrates competence',
              'Interview multiple stakeholders, not just the "official" contacts',
              'Compare against peer organizations (anonymized) for benchmarking context',
              'Tie findings to business risks — executives care about impact, not just compliance'
            ],
            commonPitfalls: [
              'Focusing only on documentation — missing implementation gaps',
              'Not interviewing enough people — single point of view is unreliable',
              'Producing a report that\'s too technical for leadership to act on',
              'No prioritization — everything seems equally urgent',
              'Not following up on critical findings immediately'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-4-1-1',
            question: 'What are the phases of an ISO 42001 gap analysis?',
            options: [
              'Assessment, Reporting, Remediation',
              'Preparation, Assessment, Reporting',
              'Planning, Execution, Closure',
              'Review, Audit, Certification'
            ],
            correctAnswer: 1,
            explanation: 'The three phases are: Preparation (documentation review, scheduling), Assessment (interviews, evidence review, maturity rating), and Reporting (findings, roadmap, quick wins).'
          },
          {
            id: 'q-4-1-2',
            question: 'What does a maturity rating of "2 - Developing" indicate?',
            options: [
              'No evidence of implementation',
              'Documented and consistently applied',
              'Partial implementation — some processes exist but are inconsistent',
              'Continually improving'
            ],
            correctAnswer: 2,
            explanation: 'Maturity level 2 (Developing) means partial implementation — some processes exist but are inconsistent or not fully documented.'
          }
        ]
      },
      {
        id: 'mod-4-lesson-2',
        moduleId: 'mod-4',
        title: 'Implementation Roadmap',
        content: `# ISO 42001 Implementation Roadmap

After gap analysis, help the client plan their path to certification.

## Typical Timeline: 6-12 months

### Phase 1: Foundation (Months 1-2)
- [ ] Secure executive sponsorship and budget
- [ ] Establish AI governance structure
- [ ] Define scope and boundaries
- [ ] Create/update AI policy
- [ ] Conduct AI system inventory
- [ ] Initialize AI risk register

### Phase 2: Core Implementation (Months 3-6)
- [ ] Implement Annex A controls
- [ ] Conduct AI risk assessments
- [ ] Conduct AI system impact assessments
- [ ] Establish data governance for AI
- [ ] Implement lifecycle controls
- [ ] Manage third-party AI relationships
- [ ] Create required documentation

### Phase 3: Operate and Monitor (Months 7-9)
- [ ] Train personnel
- [ ] Run the system — collect evidence of operation
- [ ] Conduct internal audit
- [ ] Address nonconformities
- [ ] Conduct management review
- [ ] Collect performance data

### Phase 4: Certification Readiness (Months 10-12)
- [ ] Pre-assessment audit (optional but recommended)
- [ ] Address pre-assessment findings
- [ ] Final documentation review
- [ ] Stage 1 audit (documentation review)
- [ ] Stage 2 audit (implementation audit)
- [ ] Address any findings
- [ ] Achieve certification

## Key Success Factors
1. **Executive commitment** — without it, the program will stall
2. **Cross-functional involvement** — AI governance isn't just IT
3. **Integration, not duplication** — leverage existing management systems
4. **Evidence-based approach** — audit readiness from day one
5. **Realistic timeline** — rushing leads to superficial implementation`,
        order: 2,
        type: 'reading',
        duration: '15 min',
        bestPractices: [
          {
            id: 'bp-4-2',
            title: 'Roadmap Planning Best Practices',
            description: 'A realistic roadmap is the difference between successful certification and failed projects.',
            tips: [
              'Start with quick wins: AI policy, governance board, AI system inventory — builds momentum',
              'Parallel workstreams: governance setup while technical controls are implemented',
              'Build evidence collection into daily operations — not a last-minute scramble',
              'Schedule internal audit at month 7-8 to allow time for corrections',
              'Include buffer time — most organizations underestimate documentation effort',
              'Plan management review at month 9 — need evidence to present',
              'Pre-assessment audit at month 10 catches issues before the real audit'
            ],
            commonPitfalls: [
              'Overly aggressive timeline — burnout and superficial implementation',
              'No buffer for addressing audit findings',
              'Documentation sprint at the end — evidence must be collected throughout',
              'Forgetting about training — people need time to learn new processes',
              'Not planning for the post-certification maintenance (surveillance audits)'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-4-2-1',
            question: 'What is the typical timeline for ISO 42001 implementation?',
            options: ['1-3 months', '3-6 months', '6-12 months', '18-24 months'],
            correctAnswer: 2,
            explanation: 'A typical ISO 42001 implementation takes 6-12 months depending on organization size, AI maturity, and existing management systems.'
          },
          {
            id: 'q-4-2-2',
            question: 'Which phase should include the internal audit?',
            options: ['Foundation (Months 1-2)', 'Core Implementation (Months 3-6)', 'Operate and Monitor (Months 7-9)', 'Certification Readiness (Months 10-12)'],
            correctAnswer: 2,
            explanation: 'Internal audit should be conducted during the Operate and Monitor phase (typically month 7-8) to allow time for addressing findings before certification.'
          },
          {
            id: 'q-4-2-3',
            question: 'What is a critical success factor for ISO 42001 implementation?',
            options: [
              'Hiring the most expensive consultants',
              'Using the latest AI technology',
              'Executive commitment and cross-functional involvement',
              'Completing all documentation in week one'
            ],
            correctAnswer: 2,
            explanation: 'Executive commitment and cross-functional involvement are critical success factors. Without leadership support and broad participation, the program will stall.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'Documentation & Evidence',
    description: 'Create the documentation and evidence artifacts needed for ISO 42001 certification audits.',
    icon: '📄',
    order: 5,
    duration: '40 min',
    lessons: [
      {
        id: 'mod-5-lesson-1',
        moduleId: 'mod-5',
        title: 'Required Documentation',
        content: `# Required Documentation for ISO 42001

ISO 42001 requires documented information. Here's what you need:

## Mandatory Documented Information

### From the Standard (Clauses 4-10):
1. **Scope of the AIMS** (Clause 4.3)
2. **AI Policy** (Clause 5.2)
3. **AI objectives** (Clause 6.2)
4. **Roles and responsibilities** (Clause 5.3)
5. **Risk assessment methodology** (Clause 6.1.2)
6. **AI risk register** (Clause 6.1.2)
7. **AI system impact assessment results** (Clause 8.2)
8. **Evidence of competence** (Clause 7.2)
9. **Documented information required by the standard**
10. **Internal audit program and results** (Clause 9.2)
11. **Management review results** (Clause 9.3)
12. **Nonconformities and corrective actions** (Clause 10.1)

### From Annex A Controls:
13. **AI system inventory** (A.8.1)
14. **AI system use policy** (A.8.1)
15. **Human oversight procedures** (A.8.2)
16. **Data governance framework** (A.6.1)
17. **Third-party AI agreements** (A.9.2)
18. **Incident management procedures** (A.7.2)
19. **Business continuity plans for AI** (A.8.5)
20. **Training and awareness records** (A.4.2)

## Document Template Structure
Each document should include:
- Document ID and version
- Author and approver
- Effective date and review date
- Table of contents
- Content sections
- Appendices (evidence, forms, templates)
- Change history`,
        order: 1,
        type: 'reading',
        duration: '12 min',
        bestPractices: [
          {
            id: 'bp-5-1',
            title: 'Documentation Best Practices',
            description: 'Good documentation is your defense during an audit. Make it clear, complete, and current.',
            tips: [
              'Use templates — consistency across documents shows organizational maturity',
              'Keep a document register with status, owner, and next review date',
              'Version control everything — auditors will ask for change history',
              'Make documents accessible to relevant personnel — no hidden docs',
              'Use real-world examples and case studies — makes documentation relatable',
              'Review and update at least annually or when significant changes occur',
              'Keep a balance — sufficient detail for compliance without being bureaucratic'
            ],
            commonPitfalls: [
              'Documentation created only for audit — not used in practice',
              'Documents not updated after changes — stale documentation',
              'Inconsistent formatting and structure across documents',
              'Documents written in jargon — not understandable by intended audience',
              'No version control — impossible to track changes'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-5-1-1',
            question: 'Which document is NOT explicitly required by ISO 42001?',
            options: ['AI Policy', 'Risk assessment methodology', 'Employee performance reviews', 'AI system inventory'],
            correctAnswer: 2,
            explanation: 'Employee performance reviews are not an ISO 42001 requirement. The AI Policy, risk assessment methodology, and AI system inventory are all required.'
          },
          {
            id: 'q-5-1-2',
            question: 'What should every ISO 42001 document include?',
            options: [
              'Only the main content',
              'Document ID, version, author, approver, effective date, review date, and change history',
              'Just the approval signature',
              'Only the date it was created'
            ],
            correctAnswer: 1,
            explanation: 'Every document should include document ID and version, author and approver, effective date and review date, and change history for proper document control.'
          }
        ]
      },
      {
        id: 'mod-5-lesson-2',
        moduleId: 'mod-5',
        title: 'Audit Evidence Collection',
        content: `# Audit Evidence Collection

During certification audits, you need to provide evidence that controls are implemented and effective.

## Types of Evidence

### 1. Documentary Evidence
- Policies, procedures, and guidelines
- Risk assessments and treatment plans
- Training records and certifications
- Meeting minutes and decision records
- Contracts and agreements

### 2. Technical Evidence
- System configurations and settings
- Monitoring logs and dashboards
- Access control lists and permissions
- Change management records
- Incident reports and resolution records

### 3. Interview Evidence
- Personnel can describe their roles and responsibilities
- Staff demonstrate awareness of AI policy
- Management discusses governance and oversight
- Technical teams explain development lifecycle

### 4. Observational Evidence
- Processes being followed in practice
- Tools being used as intended
- Physical security controls
- Workspace observations

## Evidence Collection Tips

1. **Create an evidence tracker** — map each requirement to evidence sources
2. **Collect continuously** — don't scramble before the audit
3. **Use real examples** — generic templates are less convincing than actual artifacts
4. **Cross-reference evidence** — same evidence may satisfy multiple requirements
5. **Prepare evidence packages** — organized by clause for easy auditor access
6. **Practice mock audits** — identify gaps before the real audit
7. **Have witnesses ready** — auditors will want to interview key personnel

## Common Evidence Gaps
- Risk assessment conducted but not reviewed/updated
- Training completed but no records of attendance
- Incidents handled but no formal documentation
- Management review held but no minutes captured
- Third-party agreements missing AI-specific clauses`,
        order: 2,
        type: 'reading',
        duration: '12 min',
        bestPractices: [
          {
            id: 'bp-5-2',
            title: 'Evidence Collection Best Practices',
            description: 'Evidence should demonstrate ongoing practice, not just point-in-time compliance.',
            tips: [
              'Build evidence collection into daily workflows — not a separate activity',
              'Use a centralized repository (SharePoint, Confluence, Google Drive) for easy access',
              'Create an evidence matrix mapping each ISO 42001 clause to specific evidence items',
              'Collect both "positive" and "negative" evidence — showing how you handle failures',
              'Take screenshots of dashboards, logs, and configurations with timestamps',
              'Record lessons learned from incidents — auditors value transparency',
              'Maintain an evidence log showing what was collected, when, and by whom'
            ],
            commonPitfalls: [
              'Evidence collected last minute — incomplete or fabricated',
              'Only documentary evidence — missing interview and observational evidence',
              'Evidence doesn\'t match what people describe in interviews',
              'No evidence of effectiveness — just evidence of existence',
              'Missing evidence for newly implemented controls (not enough time to collect data)'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-5-2-1',
            question: 'What are the four types of audit evidence?',
            options: [
              'Technical, Financial, Legal, Operational',
              'Documentary, Technical, Interview, Observational',
              'Written, Oral, Digital, Physical',
              'Internal, External, Primary, Secondary'
            ],
            correctAnswer: 1,
            explanation: 'The four types are: Documentary (policies, records), Technical (system configs, logs), Interview (personnel discussions), and Observational (seeing processes in action).'
          },
          {
            id: 'q-5-2-2',
            question: 'What is the most common evidence gap found during audits?',
            options: [
              'Missing AI policy',
              'No risk assessment methodology',
              'Evidence of effectiveness vs. evidence of existence',
              'No organizational chart'
            ],
            correctAnswer: 2,
            explanation: 'Many organizations can show evidence that controls exist but struggle to demonstrate they are actually effective and working as intended in practice.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    title: 'Best Practices for Client Engagement',
    description: 'How to effectively work with clients to achieve and maintain ISO 42001 compliance.',
    icon: '🤝',
    order: 6,
    duration: '25 min',
    lessons: [
      {
        id: 'mod-6-lesson-1',
        moduleId: 'mod-6',
        title: 'Engagement Best Practices',
        content: `# Client Engagement Best Practices

Helping clients achieve ISO 42001 is more than technical compliance — it's a transformation.

## Engagement Model

### 1. Discovery (Week 1-2)
- Understand business context and drivers
- Identify key stakeholders
- Review existing certifications and management systems
- Establish communication cadence
- Set expectations and success criteria

### 2. Assessment (Week 2-4)
- Conduct gap analysis
- Identify quick wins and critical gaps
- Present findings to leadership
- Agree on implementation approach

### 3. Implementation Support (Month 2-9)
- Guide policy creation and governance setup
- Support risk and impact assessments
- Review documentation and evidence
- Conduct readiness reviews
- Provide training and awareness

### 4. Pre-Certification (Month 10-12)
- Conduct internal audit (or review client's internal audit)
- Pre-assessment audit support
- Address findings
- Prepare for Stage 1 and Stage 2 audits
- Support during certification audit

### 5. Post-Certification (Ongoing)
- Surveillance audit preparation (annual)
- Continual improvement support
- Scope expansion support
- Regulatory update briefings

## Communication Tips
- **Speak business language** — avoid jargon, connect to business outcomes
- **Use visuals** — maturity radar charts, roadmap timelines, RAG status
- **Provide regular updates** — weekly status, monthly executive summaries
- **Be transparent about challenges** — trust is built through honesty
- **Celebrate milestones** — policy approval, governance board launch, internal audit completion`,
        order: 1,
        type: 'reading',
        duration: '10 min',
        bestPractices: [
          {
            id: 'bp-6-1',
            title: 'Client Engagement Best Practices',
            description: 'Your role is to enable, not create dependency. Build client capability throughout the engagement.',
            tips: [
              'Train client team members — they need to sustain the AIMS after you leave',
              'Co-create documentation — don\'t write it for them; guide them to create it',
              'Transfer knowledge through workshops, not just document dumps',
              'Establish a single point of contact on client side for efficiency',
              'Document decisions and rationale — helps new team members onboard',
              'Build internal champions — people who will maintain momentum after certification',
              'Share industry benchmarks and peer examples for context'
            ],
            commonPitfalls: [
              'Doing everything for the client — they can\'t sustain it without you',
              'Over-promising timeline — setting unrealistic expectations',
              'Ignoring organizational culture — every company works differently',
              'Skipping stakeholder management — resistance can derail the project',
              'Not escalating blockers early — hoping issues resolve themselves'
            ]
          }
        ],
        quiz: [
          {
            id: 'q-6-1-1',
            question: 'What is the recommended approach to creating client documentation?',
            options: [
              'Write all documentation yourself for speed',
              'Use templates from other clients without customization',
              'Co-create with the client — guide them to create it',
              'Skip documentation and focus on technical implementation'
            ],
            correctAnswer: 2,
            explanation: 'Co-creating documentation ensures client ownership and sustainability. Writing everything for them creates dependency; using templates without customization produces generic results.'
          },
          {
            id: 'q-6-1-2',
            question: 'Why is building internal champions important?',
            options: [
              'They help you get more billable hours',
              'They maintain momentum and sustain the AIMS after certification',
              'They replace the need for executive sponsorship',
              'They handle all technical implementation'
            ],
            correctAnswer: 1,
            explanation: 'Internal champions are people within the client organization who are invested in the AIMS and will maintain momentum after the engagement ends and certification is achieved.'
          }
        ]
      }
    ]
  }
];