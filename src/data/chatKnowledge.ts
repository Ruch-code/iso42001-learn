export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: string;
  helpful?: number;
  notHelpful?: number;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'what-is-iso42001',
    keywords: ['what is iso 42001', 'iso42001', 'iso 42001', 'about iso', 'tell me about', 'what is this standard'],
    question: 'What is ISO 42001?',
    answer: 'ISO/IEC 42001:2023 is the first international standard for AI Management Systems (AIMS). It provides a framework for organizations to manage AI responsibly, covering governance, risk assessment, data management, lifecycle controls, and more. It follows the Annex SL structure (same as ISO 27001) and is certifiable.',
    category: 'fundamentals'
  },
  {
    id: 'who-needs-it',
    keywords: ['who needs', 'who should', 'which organizations', 'do i need', 'who is it for'],
    question: 'Who needs ISO 42001?',
    answer: 'ISO 42001 is for any organization that develops, deploys, or uses AI systems. This includes: AI product companies, enterprises using AI in products/services, consulting firms helping clients with AI governance, and any entity wanting structured AI management. It\'s especially relevant for organizations operating in the EU (EU AI Act compliance).',
    category: 'fundamentals'
  },
  {
    id: 'certified',
    keywords: ['certified', 'certification', 'can i get certified', 'audit', 'certifiable'],
    question: 'Can organizations get certified against ISO 42001?',
    answer: 'Yes! ISO 42001 is a certifiable standard. Certification bodies can audit and certify organizations. The process involves Stage 1 (documentation review) and Stage 2 (implementation audit). Certification is valid for 3 years with annual surveillance audits.',
    category: 'fundamentals'
  },
  {
    id: 'clauses',
    keywords: ['clauses', 'structure', 'sections', 'what are the clauses', 'main parts'],
    question: 'What are the main clauses of ISO 42001?',
    answer: 'ISO 42001 follows the Plan-Do-Check-Act cycle:\n\n• Clause 4: Context of the Organization\n• Clause 5: Leadership (AI policy, roles)\n• Clause 6: Planning (risk assessment, objectives)\n• Clause 7: Support (resources, competence, documentation)\n• Clause 8: Operation (lifecycle, data, third parties)\n• Clause 9: Performance Evaluation (monitoring, audits)\n• Clause 10: Improvement (corrective actions)\n\nPlus Annex A controls for implementation.',
    category: 'fundamentals'
  },
  {
    id: 'annex-a',
    keywords: ['annex a', 'controls', 'what controls', 'annex a controls', 'control categories'],
    question: 'What are the Annex A controls?',
    answer: 'ISO 42001 Annex A has 24 controls across 8 categories:\n\n• A.2: AI Policy (2 controls)\n• A.3: Internal Organization (4 controls)\n• A.4: Resources (2 controls)\n• A.5: AI System Lifecycle (5 controls)\n• A.6: Data for AI Systems (3 controls)\n• A.7: Information for Interested Parties (5 controls)\n• A.8: Use of AI Systems (5 controls)\n• A.9: Third-party Relationships (3 controls)\n• A.10: Acquisition of AI Systems (2 controls)\n\nThese are the implementation requirements.',
    category: 'controls'
  },
  {
    id: 'risk-assessment',
    keywords: ['risk assessment', 'how to do risk', 'ai risk', 'risk management', 'risk methodology'],
    question: 'How do I conduct an AI risk assessment?',
    answer: 'AI Risk Assessment Steps:\n\n1. Establish Context — identify AI systems, define risk criteria\n2. Identify Risks — bias, transparency, robustness, privacy, security, reliability, environmental, legal, reputational, societal\n3. Analyze Risks — likelihood × impact for each\n4. Evaluate & Prioritize — compare against acceptance criteria\n5. Treat Risks — mitigate, transfer, avoid, or accept\n6. Monitor & Review — review at planned intervals\n\nRemember: AI risks differ from traditional IT risks. Include AI-specific failure modes like hallucinations, bias, and adversarial attacks.',
    category: 'assessment'
  },
  {
    id: 'aiia',
    keywords: ['impact assessment', 'aiia', 'ai system impact', 'impact assessment', 'how to do impact'],
    question: 'What is an AI System Impact Assessment (AIIA)?',
    answer: 'An AIIA evaluates how an AI system affects people — directly or indirectly. It\'s different from risk assessment (which focuses on organizational risks).\n\nAIIA covers:\n• Fairness & Non-discrimination\n• Privacy & Data Protection\n• Transparency & Explainability\n• Autonomy & Human Agency\n• Safety & Security\n• Environmental impact\n• Societal impact\n\nConduct it during design, before deployment, and update when the system changes. The EU AI Act also requires impact assessments for high-risk AI.',
    category: 'assessment'
  },
  {
    id: '27001-overlap',
    keywords: ['27001', 'iso 27001', 'overlap', 'reuse', 'existing certification', 'already have 27001'],
    question: 'How does ISO 42001 overlap with ISO 27001?',
    answer: 'Great news — 60-70% of ISO 42001 controls can be reused from ISO 27001!\n\nHigh overlap: Clauses 4-10 (management system structure), roles & responsibilities, risk assessment process, internal audit, management review, incident management\n\nMedium overlap: Development lifecycle, data governance, monitoring, third-party management\n\nNew for 42001: AI policy, AI governance board, human oversight, AI-specific transparency, model monitoring\n\nTip: If your client has ISO 27001, leverage existing processes. Many certifiers offer combined audits.',
    category: 'integration'
  },
  {
    id: 'eu-ai-act',
    keywords: ['eu ai act', 'eu regulation', 'european', 'eu law', 'regulation', 'europe'],
    question: 'How does ISO 42001 relate to the EU AI Act?',
    answer: 'ISO 42001 is listed as a harmonized standard under the EU AI Act. Certification provides presumption of conformity with relevant EU AI Act requirements.\n\nKey mapping:\n• Risk Management (Art. 9) → Clause 6 + A.5\n• Data Governance (Art. 10) → A.6.1-A.6.3\n• Transparency (Art. 13) → A.7.1, A.7.3\n• Human Oversight (Art. 14) → A.8.2\n• Quality Management (Art. 17) → Entire AIMS\n\nISO 42001 covers 9 out of 11 high-risk AI requirements. But you still need EU-specific conformity assessment and CE marking separately.',
    category: 'regulation'
  },
  {
    id: 'nist',
    keywords: ['nist', 'nist 600', 'nist ai', 'nist framework', 'ai rmf', 'risk management framework'],
    question: 'What is NIST AI 600-1 and how does it relate to ISO 42001?',
    answer: 'NIST AI 600-1 is the AI Risk Management Playbook — practical guidance for the NIST AI RMF 1.0. Published January 2024 by the US National Institute of Standards and Technology.\n\nIt covers 4 core functions: GOVERN, MAP, MEASURE, MANAGE\n\nBest of both worlds:\n• NIST 600-1 provides detailed "how-to" risk measurement guidance\n• ISO 42001 provides the certifiable management system structure\n• Use NIST for depth, ISO 42001 for the framework\n\nThey complement each other — many organizations implement both.',
    category: 'regulation'
  },
  {
    id: 'implementation-time',
    keywords: ['how long', 'timeline', 'implementation time', 'how many months', 'days', '30 days', '45 days', 'fast'],
    question: 'How long does ISO 42001 implementation take?',
    answer: 'Timeline depends on your starting point:\n\n• With existing ISO 27001: 30-45 days (fast track)\n• Without existing certification: 6-12 months\n• Enterprise-wide rollout: 12-18 months\n\nFast track (30-45 days) assumes:\n- Existing management system\n- Dedicated project team (3-5 people)\n- Scope limited to 3-5 critical AI systems\n- Executive sponsorship secured\n\nCheck the Roadmap page for a detailed week-by-week plan!',
    category: 'implementation'
  },
  {
    id: 'gap-analysis',
    keywords: ['gap analysis', 'where to start', 'first step', 'getting started', 'starting point'],
    question: 'Where should I start with ISO 42001?',
    answer: 'Start with a Gap Analysis! Here\'s the process:\n\n1. Preparation (1-2 days)\n   - Understand client scope and AI systems\n   - Request existing documentation\n   - Schedule stakeholder interviews\n\n2. Assessment (3-5 days)\n   - Review evidence against each clause\n   - Conduct structured interviews\n   - Rate maturity (0-5 scale)\n\n3. Reporting (2-3 days)\n   - Executive summary with readiness rating\n   - Prioritized recommendations\n   - Implementation roadmap\n\nCheck the Checklist page for all 22 requirements to assess!',
    category: 'implementation'
  },
  {
    id: 'documentation',
    keywords: ['documentation', 'documents', 'what documents', 'documented information', 'paperwork'],
    question: 'What documentation is required for ISO 42001?',
    answer: 'Key documented information needed:\n\nMandatory:\n• AI Policy (Clause 5.2)\n• AI System Scope (Clause 4.3)\n• AI Risk Assessment (Clause 6.1)\n• AI System Impact Assessment (Clause 8.2)\n• Roles & Responsibilities (Clause 5.3)\n• Internal Audit Results (Clause 9.2)\n• Management Review Minutes (Clause 9.3)\n\nFrom Annex A:\n• AI System Inventory\n• AI System Use Policy\n• Human Oversight Procedures\n• Data Governance Framework\n• Third-party AI Agreements\n• Incident Management Procedures\n\nTip: Don\'t create parallel processes — extend existing documentation.',
    category: 'implementation'
  },
  {
    id: 'human-oversight',
    keywords: ['human oversight', 'human in the loop', 'human control', 'oversight', 'monitoring'],
    question: 'What is human oversight in ISO 42001?',
    answer: 'Human oversight (A.8.2) ensures appropriate human control over AI systems. There are three levels:\n\n1. In-the-Loop: Human makes every decision. AI assists but human approves all outputs. Used for high-risk systems.\n\n2. On-the-Loop: Human monitors AI decisions and intervenes when needed. AI operates autonomously but human watches.\n\n3. In-Command: Human provides high-level direction. AI operates independently within defined parameters.\n\nBest practice: Match oversight level to system risk. Ensure overseers have domain expertise, authority, and time to intervene.',
    category: 'controls'
  },
  {
    id: 'data-governance',
    keywords: ['data governance', 'data quality', 'training data', 'data management', 'data lineage'],
    question: 'What are the data governance requirements?',
    answer: 'ISO 42001 has three data controls:\n\nA.6.1 Data Governance:\n• Define data ownership and accountability\n• Establish data quality standards\n• Map data to privacy regulations\n• Maintain data inventory linked to AI systems\n\nA.6.2 Data Quality:\n• Accuracy, completeness, consistency, timeliness\n• Representativeness in training data\n• Monitor for drift and bias\n\nA.6.3 Data Provenance:\n• Track data from source through transformations\n• Document training data lineage\n• Version control for datasets\n• Enable auditability and reproducibility',
    category: 'controls'
  },
  {
    id: 'third-party',
    keywords: ['third party', 'vendor', 'supplier', 'outsourcing', 'external ai', 'procurement'],
    question: 'How to manage third-party AI risks?',
    answer: 'ISO 42001 requires three controls for third parties:\n\nA.9.1 Risk Assessment:\n- Tier vendors by risk (critical/high/medium/low)\n- Evaluate AI practices, model transparency, data handling\n- Apply due diligence proportionate to risk\n\nA.9.2 Agreements:\n- AI-specific contract clauses\n- Audit rights, data ownership, incident notification\n- Model transparency, liability, IP protection\n\nA.9.3 Monitoring:\n- Track vendor performance continuously\n- Conduct periodic reviews and audits\n- Monitor regulatory changes\n- Have exit strategy for critical dependencies\n\nTip: Most organizations underestimate third-party AI risk. Start with an AI system inventory to find all external AI dependencies.',
    category: 'controls'
  },
  {
    id: 'quiz-tips',
    keywords: ['quiz', 'how to pass', 'test', 'assessment', 'exam'],
    question: 'Any tips for the quizzes?',
    answer: 'Here are some tips:\n\n1. Read the lesson content first — quizzes test key concepts\n2. Pay attention to clause numbers and control numbers\n3. Remember: ISO 42001 follows Annex SL (same as 27001)\n4. Risk assessment ≠ Impact assessment (different focus)\n5. Human oversight has 3 levels: in-the-loop, on-the-loop, in-command\n6. You need 70% to pass — you can retry any quiz\n7. Check the Reference page if you\'re unsure about specific controls\n\nGood luck! 🎯',
    category: 'general'
  },
  {
    id: 'ai-policy',
    keywords: ['ai policy', 'policy', 'what should policy include', 'policy requirements'],
    question: 'What should an AI policy include?',
    answer: 'Your AI policy (A.2.1) must include:\n\n• AI objectives or framework for setting them\n• Commitment to meet applicable requirements\n• Commitment to continual improvement\n• Appropriate to the organization\'s purpose\n\nBest practices:\n- Get board-level approval (top management commitment)\n- Include specific commitments (bias testing, transparency, human oversight)\n- Publish internally and consider external publication\n- Reference applicable regulations (EU AI Act)\n- Review annually or when significant changes occur\n- Make it cross-functional, not just IT/legal',
    category: 'controls'
  },
  {
    id: 'governance-board',
    keywords: ['governance board', 'ai board', 'committee', 'governance structure', 'who oversees'],
    question: 'How to set up an AI governance board?',
    answer: 'Establish an AI governance board (A.3.2) with:\n\nMembers: CTO, DPO, Legal, Ethics, Business, Risk, Engineering\nExecutive sponsor: C-level (mandatory)\n\nDefine:\n- Clear decision rights (who approves deployments, who handles incidents)\n- Meeting cadence: monthly operational, quarterly strategic\n- RACI matrix for AI decisions\n- Escalation paths for issues\n\nKey success factors:\n- Must have real authority (not just advisory)\n- Include business units that use AI\n- Formal resource allocation\n- Document decisions and action items',
    category: 'controls'
  },
  {
    id: 'monitoring',
    keywords: ['monitoring', 'performance monitoring', 'drift', 'bias detection', 'ai monitoring'],
    question: 'What should we monitor for AI systems?',
    answer: 'AI performance monitoring (A.8.3) should track:\n\nTechnical metrics:\n- Accuracy, precision, recall, F1 score\n- Model drift (data drift, concept drift)\n- Availability and response times\n- Error rates and failure modes\n\nFairness metrics:\n- Bias across protected groups\n- Disparate impact ratios\n- Equal opportunity measures\n\nOperational metrics:\n- Override/override rates\n- Human intervention frequency\n- Incident counts and severity\n\nSet thresholds and alerts. Review monitoring results in management reviews. Document everything for audit evidence.',
    category: 'controls'
  },
  {
    id: 'internal-audit',
    keywords: ['internal audit', 'audit', 'how to audit', 'audit program', 'pre-assessment'],
    question: 'How to prepare for the certification audit?',
    answer: 'Audit preparation timeline:\n\nMonth 7-8: Internal Audit\n- Create audit program covering all clauses\n- Use qualified auditors (independent of area audited)\n- Document findings as nonconformities\n- Track corrective actions to closure\n\nMonth 9: Management Review\n- Present audit results, risk status, objectives achievement\n- Get management decisions and resource commitments\n- Document minutes with action items\n\nMonth 10: Pre-Assessment (optional)\n- Simulate certification audit\n- Identify remaining gaps\n- Fix issues before real audit\n\nMonth 11-12: Certification Audit\n- Stage 1: Documentation review\n- Stage 2: Implementation audit\n- Address any findings\n- Receive certificate!',
    category: 'implementation'
  },
  {
    id: 'quick-wins',
    keywords: ['quick wins', 'easy wins', 'start here', 'first things', 'low hanging fruit'],
    question: 'What are the quick wins for ISO 42001?',
    answer: 'Start with these quick wins in Week 1:\n\n1. AI Policy — adapt from existing infosec policy (1-2 days)\n2. AI System Inventory — list all AI systems in scope (1 day)\n3. Governance Board — assign roles, schedule first meeting (1 day)\n4. Scope Document — define boundaries (half day)\n5. Risk Methodology — extend existing risk process for AI (1 day)\n\nThese build momentum and show immediate progress to leadership. They\'re also pre-requisites for everything else.',
    category: 'implementation'
  },
  {
    id: 'cost',
    keywords: ['cost', 'how much', 'budget', 'expensive', 'price', 'money'],
    question: 'How much does ISO 42001 implementation cost?',
    answer: 'Estimated costs:\n\n• Consulting support: $15K-40K\n• Certification audit: $10K-25K\n• Tools & platform: $2K-5K\n• Training: $2K-5K\n• Internal resources: varies by org size\n\nTotal for mid-size org: $30K-75K\n\nWays to save:\n- Leverage existing ISO 27001 (reduces scope)\n- Use internal resources where possible\n- Combine with existing certification audits\n- Start with limited scope (3-5 critical AI systems)',
    category: 'general'
  },
  {
    id: 'difference-27001',
    keywords: ['difference between', '27001 vs 42001', 'how is it different', 'compare'],
    question: 'What is the difference between ISO 27001 and ISO 42001?',
    answer: 'Key differences:\n\nISO 27001 focuses on information security management.\nISO 42001 focuses on AI management.\n\nStructure: Same (Annex SL)\nScope: 27001 = all information; 42001 = AI-specific\nRisk: 27001 = infosec risks; 42001 = AI risks (bias, transparency, etc.)\nControls: 27001 has 93 controls; 42001 has 24 AI-specific controls\nUnique to 42001: AI policy, AI governance board, human oversight, AI lifecycle, data governance for AI, AI impact assessment\n\nThey complement each other — most orgs implement 42001 alongside 27001.',
    category: 'fundamentals'
  },
  {
    id: 'lifecycle',
    keywords: ['lifecycle', 'development lifecycle', 'ai lifecycle', 'model lifecycle', 'deployment'],
    question: 'What are the AI system lifecycle controls?',
    answer: 'ISO 42001 Annex A.5 covers the full AI lifecycle:\n\nA.5.1 Development Planning — methodology, risk checkpoints, documentation standards\nA.5.2 Requirements — functional, ethical, legal, stakeholder requirements\nA.5.3 Design — architecture, model selection rationale, human oversight design\nA.5.4 Verification & Validation — testing, adversarial testing, independent review\nA.5.5 Deployment — rollout strategy, monitoring setup, rollback procedures\n\nBest practice: Create an AI System Card for each deployed system. Require sign-off gates at each stage before progression.',
    category: 'controls'
  },
  {
    id: 'incident',
    keywords: ['incident', 'breach', 'what if something goes wrong', 'incident response', 'reporting'],
    question: 'How to handle AI incidents?',
    answer: 'AI incident management (A.7.2):\n\n1. Define incident categories specific to AI:\n   - Bias incidents (discriminatory outputs)\n   - Safety incidents (physical/psychological harm)\n   - Security incidents (data poisoning, adversarial attacks)\n   - Reliability incidents (hallucinations, errors)\n\n2. Establish reporting channels:\n   - Internal reporting (employees, users)\n   - External reporting (regulators, affected parties)\n   - EU AI Act requires serious incident notification within 15 days\n\n3. Response process:\n   - Triage and classify severity\n   - Contain the incident\n   - Investigate root cause\n   - Implement corrective actions\n   - Document lessons learned\n   - Update risk assessment if needed',
    category: 'controls'
  }
];