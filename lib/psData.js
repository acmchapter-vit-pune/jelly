/**
 * lib/psData.js — Canonical Problem Statement definitions
 *
 * Each PS contains: id, title, domain, color, story,
 * descriptionBlocks[], requirements[], goodToHave[], resourceLinks?[]
 *
 * descriptionBlocks is an array of:
 *   { type: 'paragraph', text: '...' }
 *   { type: 'bullets',   items: ['...', '...'] }
 *
 * Breaking Enigma PS IDs: BI-01 … BI-10
 */

export const MAX_TEAMS_PER_PS = 7;

export const PROBLEM_STATEMENTS = [

    // Domain: Gen AI
    {
        id: 'BI-01',
        title: 'AI Digital Workforce: Autonomous System for End-to-End Product Lifecycle',
        domain: 'Gen AI',
        color: '#FF4600',
        story: 'In the kingdom of Westeros, no single warrior can win a war alone. A council is formed—Strategist, Architect, Builder, Tester, and Historian. Each plays their role, passing knowledge and refining plans until a masterpiece is forged. But the challenge remains: can this council act in perfect harmony without a king?',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Modern product development—from idea validation to deployment and documentation—requires collaboration across multiple roles such as researchers, designers, developers, testers, and technical writers.',
            },
            {
                type: 'paragraph',
                text: 'However, early-stage startups, student teams, and small organizations often face:',
            },
            {
                type: 'bullets',
                items: [
                    'Limited human resources across specialized roles',
                    'Inefficiencies in communication and task handoffs',
                    'Delays due to dependency on sequential workflows',
                    'Lack of structured execution pipelines',
                ],
            },
            {
                type: 'paragraph',
                text: 'With the rise of AI, individual tools exist (e.g., code generators, design assistants), but they operate in isolation and fail to simulate real-world team collaboration and workflow continuity.',
            },
            {
                type: 'paragraph',
                text: 'The challenge is to design an AI-driven multi-agent system, where each agent represents a functional role (e.g., Researcher, Designer, Developer, QA, Documentation), capable of:',
            },
            {
                type: 'bullets',
                items: [
                    'Collaborating with other agents',
                    'Passing structured outputs between stages',
                    'Adapting to different product workflows',
                ],
            },
            {
                type: 'paragraph',
                text: 'This system should mimic how real teams operate across the product lifecycle, while allowing flexibility for teams to define or customize workflows (e.g., Research → Design → Dev, or Dev → Test → Deploy).',
            },
            {
                type: 'paragraph',
                text: 'Impact & Scale:',
            },
            {
                type: 'bullets',
                items: [
                    'Enables solo developers and small teams to simulate full teams',
                    'Reduces product development time and cost',
                    'Applicable in startups, education, rapid prototyping, and enterprises',
                    'Can redefine how software/products are built using AI-first workflows',
                ],
            },
        ],
        requirements: [
            'Design a multi-agent architecture where each agent represents a role (e.g., Researcher, Designer, Developer, etc.)',
            'Enable customizable workflows (teams should define their own agent pipelines)',
            'Provide a user interface/dashboard to trigger workflows and monitor progress',
        ],
        goodToHave: [
            'Intelligent task planning/orchestration agent (auto-decides workflow)',
            'Memory layer (vector DB / knowledge graph for context retention)',
            'Feedback loop between agents (e.g., QA → Developer iteration)',
            'Role specialization using fine-tuned or domain-specific models',
        ],
    },
    {
        id: 'BI-02',
        title: 'Legal Workflow Agent for Lawyers',
        domain: 'Gen AI',
        color: '#FF4600',
        story: 'In the courts of King’s Landing, justice is slow and buried under scrolls and chaos. Lawyers struggle to recall ancient laws, prepare documents, and meet the king’s deadlines. A mystical scribe is needed—one who remembers every law, drafts every decree, and never forgets a hearing.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Lawyers handle multiple cases simultaneously and face challenges in managing case data, legal research, document drafting, and court schedules. Most workflows are manual and fragmented across physical files, PDFs, and different platforms.',
            },
            {
                type: 'paragraph',
                text: 'Key issues include:',
            },
            {
                type: 'bullets',
                items: [
                    'Difficulty in organizing and accessing case-related documents and history',
                    'Time-consuming process of finding relevant case laws and precedents',
                    'Repetitive effort in drafting legal documents with strict formats',
                    'Risk of missing court dates, deadlines, and compliance requirements',
                    'Lack of a unified system that provides context-aware assistance across all stages of a case',
                ],
            },
            {
                type: 'paragraph',
                text: 'Existing tools are limited to basic storage or tracking and do not provide intelligent, end-to-end support, leading to inefficiencies and delays in legal processes.',
            },
        ],
        requirements: [
            'Build an AI-based agent that assists lawyers across the case lifecycle',
            'Centralized case management system (cases, clients, documents, notes)',
            'Legal research module to fetch relevant case laws and summaries',
            'Document drafting support for standard legal formats (editable)',
            'Court date & deadline tracking with reminders',
            'Simple, intuitive UI for non-technical users',
        ],
        goodToHave: [
            'Case outcome prediction / risk analysis',
            'Multi-language support',
            'Collaboration features for legal teams',
            'Document comparison and insights',
        ],
        resourceLinks: [
            { label: 'Stages of Case', url: 'https://www.mcrhrdi.gov.in/6thmesfc2023/week10/Stages%20of%20a%20Case.pdf' },
        ],
    },

    // Domain: Business & Finance
    {
        id: 'BI-03',
        title: 'Intelligent GST Invoice Reconciliation and Compliance Platform',
        color: '#3080ED',
        domain: 'BUSSINESS & FINANCE',
        story: 'Merchants across the Seven Kingdoms trade goods, but their ledgers never match. Disputes arise, taxes are miscalculated, and chaos spreads in the economy. A unified ledger system is needed—one that ensures every coin is accounted for and every trade is transparent.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Small and medium businesses (SMBs) face significant challenges in managing GST compliance due to manual invoice handling, lack of real-time coordination between buyers and sellers, and frequent data mismatches. Errors in invoice reconciliation often lead to incorrect GST filings, delayed Input Tax Credit (ITC), and financial penalties.',
            },
            {
                type: 'paragraph',
                text: 'Existing solutions are either too complex for small businesses or do not provide real-time visibility into invoice status and reconciliation. Many SMBs lack dedicated accounting teams, making compliance time-consuming and error-prone.',
            },
            {
                type: 'paragraph',
                text: 'There is a need for a simplified, intelligent platform that enables seamless invoice exchange, real-time reconciliation, and automated GST return preparation with minimal manual effort.',
            },
        ],
        requirements: [
            'Invoice creation and upload for B2B transactions',
            'Buyer-side actions: accept, reject, or request modification',
            'Real-time invoice status tracking',
            'Dashboard showing pending, accepted, and rejected invoices',
            'Generation of a mock GST return summary (GSTR-like view)',
            'Simple and user-friendly interface for non-technical users',
        ],
        goodToHave: [
            'AI-based mismatch detection and correction suggestions',
            'Reminder and notification system for pending actions',
            'Payment tracking linked to invoices',
            'Buyer-initiated request for missing invoices',
        ],
        resourceLinks: [
            { label: 'GST Invoice Format Guidelines', url: 'https://cbic-gst.gov.in/aces/Documents/draft-invoice-rules.pdf' },
            { label: 'GST Invoice Rules', url: 'https://cleartax.in/s/gst-invoice' },
        ],
    },
    {
        id: 'BI-04',
        title: 'Transparent Investment Platform for Early-Stage Startups & Small Businesses',
        domain: 'Business & Finance',
        color: '#3080ED',
        story: 'Young houses seek gold to rise in power, while small lords wish to invest in future kings. But trust is fragile—many have been betrayed. A system is needed where every coin given is tracked, every promise is visible, and every house is held accountable.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Early-stage startups and small businesses often struggle to secure funding due to limited credit history and complex finance processes. At the same time, small investors are increasingly interested in funding promising ideas but face major challenges in trust, transparency, and visibility.',
            },
            {
                type: 'paragraph',
                text: 'Current investment channels are either restricted to large investors or lack mechanisms for:',
            },
            {
                type: 'bullets',
                items: [
                    'Verifying the authenticity and credibility of early-stage ideas',
                    'Tracking how invested funds are being utilized',
                    'Monitoring progress, milestones, and returns in real time',
                    'Ensuring accountability from founders',
                ],
            },
            {
                type: 'paragraph',
                text: 'This leads to hesitation among small investors and limits funding opportunities for innovative startups. The absence of a transparent, structured, and accessible platform creates a significant gap in the early-stage investment ecosystem.',
            },
            {
                type: 'paragraph',
                text: 'There is a need for a digital platform that enables small investors to fund startups with clear visibility into fund usage, progress tracking, and performance metrics, ensuring trust and informed decision-making.',
            },
        ],
        requirements: [
            'Platform for startups to create verified profiles with business details and funding needs',
            'Transparent fund tracking system showing allocation and usage using blockchain etc.',
            'Milestone-based progress updates from startups',
            'Basic risk or credibility scoring mechanism for startups',
            'Secure user authentication and role-based access (investor/startup)',
        ],
        goodToHave: [
            'AI-based startup scoring or recommendation system',
            'Fraud detection or anomaly detection in fund usage',
            'Communication layer between investors and founders',
            'Gamified trust indicators (ratings, reviews, credibility index)',
            'Mobile-friendly or progressive web app',
        ],
    },

    // Domain: Governance & Public Administration
    {
        id: 'BI-05',
        title: 'Public Budget Allocation Optimization Platform',
        domain: 'Governance & Public Systems',
        color: '#7DA942',
        story: 'The king must divide gold among armies, farmers, healers, and builders. A wrong decision could starve the people or weaken defenses. Without wisdom, the kingdom falls. Can a system guide the crown to make perfect decisions?',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Governments allocate budgets across sectors like healthcare, education, infrastructure, and agriculture. However, current budgeting processes are often manual, politically influenced, and lack data-driven insights, leading to inefficient allocation and resource wastage.',
            },
            {
                type: 'paragraph',
                text: 'Different regions have varying needs, but uniform or outdated allocation strategies fail to address real-time demands, causing underfunding in critical sectors and overfunding in others.',
            },
            {
                type: 'paragraph',
                text: 'There is a need for a data-driven decision-support platform that helps simulate, analyze, and recommend optimal budget distribution based on socio-economic indicators, historical data, and future projections.',
            },
            {
                type: 'paragraph',
                text: 'This impacts:',
            },
            {
                type: 'bullets',
                items: [
                    'Citizens (quality of services)',
                    'Government bodies (decision efficiency)',
                    'Economy (resource optimization at scale)',
                ],
            },
        ],
        requirements: [
            'Input multiple datasets (population, GDP, sector needs, etc.)',
            'Provide budget allocation recommendations across sectors',
            'Support scenario simulation (e.g., "increase healthcare by 10%" or visual representation)',
            'Visual dashboard for insights (charts, comparisons)',
            'Basic use of data analytics / ML (optional but encouraged)',
        ],
        goodToHave: [
            'AI/ML-based predictive allocation',
            'Region-wise or district-level optimization',
            'Explainable recommendations (why allocation changed)',
            'Integration with real-time data sources',
            'Citizen transparency dashboard',
        ],
        resourceLinks: [
            { label: 'Union Budget 2024-25 & State Budgets', url: 'https://openbudgetsindia.org/dataset' },
            { label: 'Sector Comparisons', url: 'https://openbudgetsindia.org/group' },
        ],
    },
    {
        id: 'BI-06',
        title: 'Real-Time Crisis Information Verification & Source Credibility Engine',
        domain: 'Governance & Public Systems',
        color: '#7DA942',
        story: 'Rumors spread faster than ravens—false news of war, dragons, and betrayals cause panic in the kingdom. The people no longer know what to believe. A truth-seeker must emerge to verify every message before chaos consumes all.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'During emergencies such as natural disasters, pandemics, or political unrest, large volumes of information circulate rapidly across social media and news platforms. A significant portion of this information is either unverified, misleading, or deliberately false.',
            },
            {
                type: 'paragraph',
                text: 'Citizens, journalists, and authorities struggle to distinguish between credible sources and misinformation, leading to panic, poor decision-making, and erosion of trust in digital platforms.',
            },
            {
                type: 'paragraph',
                text: 'Existing solutions primarily focus on content classification (fake vs real) but fail to:',
            },
            {
                type: 'bullets',
                items: [
                    'Evaluate source credibility dynamically',
                    'Cross-verify claims across trusted sources in real-time',
                    'Provide transparent confidence scores and explanations',
                ],
            },
            {
                type: 'paragraph',
                text: 'There is a need for a system that prioritizes source validation and credibility scoring during crisis situations to ensure reliable information dissemination at scale.',
            },
        ],
        requirements: [
            'Accept input as news text / social media post / claim',
            'Perform source credibility analysis (based on domain history, trust score, etc.)',
            'Cross-verify claim with trusted news sources / datasets',
            'Ensure fast response (near real-time) for crisis scenarios',
            'Use pretrained models / APIs (no heavy training expected)',
        ],
        goodToHave: [
            'Claim similarity detection across multiple sources',
            'Real-time trending misinformation alerts',
            'Browser extension / API for integration',
            'Explainable AI (why flagged as unreliable)',
            'Basic image verification (metadata / reverse search)',
        ],
        resourceLinks: [
            { label: 'BharatFakeNewsKosh Dataset', url: 'https://www.kaggle.com/datasets/man2191989/bharatfakenewskosh' },
        ],
    },

    // Domain: War Strategy, Defense & Battlefield Intelligence
    {
        id: 'BI-07',
        title: 'Civilian Safety Zone Monitor using Satellite & Drone Imagery',
        domain: 'Security & Battlefield Systems',
        color: '#F5B301',
        story: 'War has begun. Villages burn, and danger spreads unpredictably. Civilians need safe paths to escape, but no one knows where danger lies. A divine map is needed—one that shows safe lands and warns of death zones in real time.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'In conflict zones and disaster-affected areas, civilians and response teams lack real-time clarity on which areas are safe or dangerous. Existing systems rely on delayed reports or manual analysis of aerial imagery, which is slow, fragmented, and not actionable.',
            },
            {
                type: 'paragraph',
                text: 'In rapidly evolving scenarios (e.g., war or disasters), new attack or hazard locations emerge frequently, making it difficult to track safe movement paths. This leads to unsafe evacuations, poor coordination, and increased casualties.',
            },
            {
                type: 'paragraph',
                text: 'There is a need for a system that can convert satellite/drone imagery and real-time incident inputs into clear, dynamic safety zones, enabling authorities and civilians to make informed, time-critical decisions.',
            },
        ],
        requirements: [
            'Ingest satellite/drone imagery',
            'Accept real-time inputs of attacked/hazard zones',
            'Classify regions into Safe / Moderate / Unsafe',
            'Provide a map-based interface with zone boundaries & timestamps',
            'Generate alerts and area avoidance guidance',
        ],
        goodToHave: [
            'Safe area suggestions avoiding risky zones',
            'AI-based risk prediction',
            'Integration with live feeds',
            'Heatmaps for activity/damage visualization',
            'Offline/low-connectivity support',
        ],
        resourceLinks: [
            { label: 'ISRO Bhuvan', url: 'https://bhuvan.nrsc.gov.in' },
            { label: 'NASA Earth Data', url: 'https://earthdata.nasa.gov' },
            { label: 'xView Dataset', url: 'https://xview2.org/download-links' },
        ],
    },
    {
        id: 'BI-08',
        title: 'Secure & Privacy-Preserving Multi-Modal Intelligence Sharing Platform',
        domain: 'Security & Battlefield Systems',
        color: '#F5B301',
        story: 'Spies whisper secrets across kingdoms, but enemies intercept messages. Even the shadows are no longer safe. A new method of communication is needed—one where messages are invisible, identities hidden, and secrets protected at all costs.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'In high-risk operational environments (defense, disaster response, critical infrastructure), teams rely on rapid sharing of intelligence such as text updates, images, and voice inputs. However, existing communication systems expose sensitive data during transmission, making them vulnerable to interception, unauthorized access, and metadata leakage.',
            },
            {
                type: 'paragraph',
                text: 'Even when encryption is used, intermediate systems (servers, relays, or network layers) can still infer who is communicating, what type of data is being shared, and communication patterns, leading to potential security breaches.',
            },
            {
                type: 'paragraph',
                text: 'Additionally, current systems lack fine-grained access control and privacy-preserving auditability, forcing organizations to choose between data security and operational efficiency.',
            },
            {
                type: 'paragraph',
                text: 'There is a need for a software-based platform that enables secure, real-time sharing of multi-modal intelligence (text, image, voice) with:',
            },
            {
                type: 'bullets',
                items: [
                    'Strong end-to-end encryption',
                    'Minimal metadata exposure',
                    'Controlled access without revealing sender identity',
                    'Reliable communication even in constrained environments',
                ],
            },
            {
                type: 'paragraph',
                text: 'The system should demonstrate how sensitive data can be shared securely without being exposed at any intermediate layer, while maintaining usability and performance.',
            },
        ],
        requirements: [
            'Secure sharing of text, image, and voice data',
            'End-to-end encryption',
            'Anonymous communication',
            'Real-time or near real-time messaging',
            'Privacy-preserving logs (activity tracking without content exposure)',
        ],
        goodToHave: [
            'Dynamic key exchange (secure session-based keys)',
            'Peer-to-peer communication (reduced central dependency)',
            'Ephemeral messages (auto-delete after use)',
            'Visualization dashboard (secure intel flow view)',
        ],
    },

    // Domain: Health, Healing & Disability Support
    {
        id: 'BI-09',
        title: 'Inclusive Learning Platform for Specially-Abled Students',
        domain: 'Health & Inclusion',
        color: '#7DA942',
        story: 'Not all in the kingdom learn the same way. Some cannot read scrolls, some cannot hear the maesters, and some struggle to focus. Yet every mind holds potential. A magical learning system must adapt to each individual, unlocking their true power.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Digital learning platforms today are primarily designed for neurotypical users, creating significant barriers for students with dyslexia, ADHD, visual impairments, autism spectrum disorder (ASD), and motor disabilities. These students struggle with standard content formats, lack of personalization, inaccessible interfaces, and cognitive overload.',
            },
            {
                type: 'paragraph',
                text: 'Despite the availability of assistive tools, they are often fragmented, expensive, or not integrated into mainstream learning systems. As a result, specially-abled students experience reduced engagement, poor academic outcomes, and limited independence in learning.',
            },
            {
                type: 'paragraph',
                text: 'With increasing adoption of digital education (especially post-pandemic), there is a critical need for a unified, intelligent, and adaptive learning platform that personalizes content delivery based on individual needs and disabilities.',
            },
        ],
        requirements: [
            'User profiling based on type of disability (manual + AI-based inference optional)',
            'Adaptive content delivery (text simplification, audio, visual aids, etc.)',
            'Accessibility features (text-to-speech, speech-to-text, font customization, contrast control)',
            'Personalized learning pace and difficulty adjustment',
            'Simple, distraction-free UI/UX',
        ],
        goodToHave: [
            'AI-based learning style detection and recommendation system',
            'Real-time emotion or attention detection (via webcam/sensors)',
            'Teacher/parent dashboard with insights',
            'Offline/low-bandwidth mode for rural accessibility',
        ],
        resourceLinks: [
            { label: 'Dyslexia Dataset – Kaggle', url: 'https://www.kaggle.com/datasets/luzrello/dyslexia' },
        ],
    },
    {
        id: 'BI-10',
        title: 'Cognitive Health Twin for Proactive Preventive Care',
        domain: 'Health & Inclusion',
        color: '#7DA942',
        story: 'The maesters treat illness only after it strikes. But what if a person had a mirror of their body—one that predicts sickness before it arrives? A “living twin” that evolves and warns its owner of future dangers.',
        descriptionBlocks: [
            {
                type: 'paragraph',
                text: 'Healthcare systems today are largely reactive, focusing on treatment after symptoms appear rather than prevention. Individuals generate vast amounts of health-related data (wearables, lifestyle habits, environment), but this data remains fragmented and underutilized.',
            },
            {
                type: 'paragraph',
                text: 'There is a critical need for a "Cognitive Health Twin" — a dynamic digital replica of an individual\'s health that continuously learns from:',
            },
            {
                type: 'bullets',
                items: [
                    'Physiological data (heart rate, sleep, activity)',
                    'Behavioral patterns (diet, stress, habits)',
                    'Environmental factors (air quality, temperature)',
                ],
            },
            {
                type: 'paragraph',
                text: 'Current health apps provide static insights and lack:',
            },
            {
                type: 'bullets',
                items: [
                    'Continuous learning and adaptation',
                    'Predictive simulation of future health risks',
                    'Personalized, actionable recommendations',
                ],
            },
            {
                type: 'paragraph',
                text: 'This leads to missed early warnings for chronic diseases (e.g., diabetes, cardiovascular issues), increasing healthcare costs and reducing quality of life.',
            },
            {
                type: 'paragraph',
                text: 'A scalable solution is required to:',
            },
            {
                type: 'bullets',
                items: [
                    'Integrate multi-source data',
                    'Simulate potential health outcomes',
                    'Enable proactive, personalized interventions',
                ],
            },
        ],
        requirements: [
            'Create a dynamic digital health profile (twin) for users',
            'Ingest and process multi-source data (manual input, APIs, simulated IoT data)',
            'Implement basic predictive models (risk scoring for diseases)',
            'Provide real-time insights & alerts (e.g., abnormal patterns)',
            'Generate personalized preventive recommendations',
            'Ensure data privacy and security considerations',
        ],
        goodToHave: [
            'AI-based health outcome simulation (what-if scenarios)',
            'Integration with wearable devices or IoT sensors (phone only)',
            'Voice assistant or chatbot for health guidance',
        ],
    },
];
