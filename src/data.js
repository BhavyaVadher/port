export const profile = {
  name: 'Bhavya Vadher',
  first: 'Bhavya',
  title: 'Senior Specialty Developer',
  roles: ['Senior Specialty Developer', 'Legacy Modernizer', 'Automation Engineer', 'Data Engineer'],
  location: 'Toronto, ON, Canada',
  now: 'CIBC',
  github: 'https://github.com/BhavyaVadher',
  githubUser: 'BhavyaVadher',
  linkedin: 'https://www.linkedin.com/in/bhavyavadher/',
  email: 'bhavyavadher111@gmail.com',
  site: 'https://bhavyavadher.github.io/',
  avatar: '/avatar-400.jpg',
  photo: '/avatar.jpg',
  tagline:
    'I take legacy code a business can’t afford to break and rebuild it as modern, tested automation — with zero change to what it does. Two of Canada’s Big Five banks so far.',
}

export const stats = [
  { value: 10, suffix: '+', label: 'legacy workflows modernized' },
  { value: 437, suffix: '', label: 'functions in one Python library' },
  { value: 4, suffix: '+', label: 'years in data & automation' },
  { value: 2, suffix: '', label: 'Big Five banks' },
]

export const experience = [
  {
    company: 'CIBC',
    role: 'Senior Specialty Developer',
    period: 'Jul 2026 — Present',
    place: 'Toronto · Hybrid',
    current: true,
    summary: 'Modernizing legacy security automation across CIBC’s Identity & Access Review operations.',
    points: [
      'Spearheaded the modernization of 10+ legacy security-automation workflows, migrating R and VBScript to Python and Microsoft Power Automate with zero business-logic deviation.',
      'Architected Power Automate solutions under strict enterprise DLP constraints — a standard-connector-only pattern that replaced premium Graph API dependencies and unblocked production without compliance exceptions.',
      'Delivered a 3,200-line R → 1,080-line TypeScript conversion and a 437-function Python utility library, with byte-identical output parity validated by up to 43 automated tests per module.',
      'Established a repeatable migration framework: 10-phase flow architecture, self-contained deployment packaging, handover docs and cross-file QA reviews.',
      'Technical bridge between development and operations — from source analysis and POCs through stakeholder walkthroughs to production approval.',
    ],
    tags: ['Python', 'R', 'Power Automate', 'Office Scripts', 'TypeScript', 'VBScript', 'IAM'],
  },
  {
    company: 'BMO Financial Group',
    role: 'Data Analyst',
    period: 'Apr 2025 — Jul 2026',
    place: 'Toronto · Hybrid',
    award: 'Performance Excellence Award',
    summary: 'Built the models, pipelines and dashboards behind enterprise reporting and KPIs.',
    points: [
      'Designed star & snowflake dimensional models to optimize enterprise reporting and analytics.',
      'Developed and maintained 10+ Power BI dashboards with DAX, enabling real-time KPI tracking across business units.',
      'Built and optimized ETL/ELT pipelines in Azure Data Factory and SQL, integrating 5+ cloud and on-prem sources.',
      'Led data-quality and governance initiatives with validation frameworks; completed cross-database and cloud migrations.',
    ],
    tags: ['Power BI', 'DAX', 'Azure Data Factory', 'SQL', 'Data Modeling'],
  },
  {
    company: 'ICE Robotics Canada',
    role: 'Data Analyst & Staffing Coordinator',
    period: 'Sep 2024 — Apr 2025',
    place: 'Etobicoke · On-site',
    summary: 'Made workforce performance measurable with dashboards and predictive insights.',
    points: [
      'Interactive Power BI and Tableau dashboards for workforce data and operational KPIs.',
      'SQL and API integrations feeding centralized reporting systems.',
      'Statistical analysis and predictive insights for workforce planning.',
    ],
    tags: ['Power BI', 'Tableau', 'SQL', 'APIs', 'Statistics'],
  },
  {
    company: 'BISAG-N',
    role: 'Junior Data Analyst',
    period: 'Jan 2022 — Mar 2023',
    place: 'Gandhinagar, India · On-site',
    award: 'Employee of the Year 2022',
    summary: 'Built pipelines and dashboards for government-scale datasets.',
    points: [
      'ETL pipelines and data workflows in SQL and Python for large-scale government datasets.',
      'Dimensional data models for public-sector analytics and reporting.',
      'Developed 15+ dashboards and reports with Python visualization libraries and BI tools.',
    ],
    tags: ['Python', 'SQL', 'ETL', 'Data Modeling', 'BI'],
  },
]

export const skillGroups = [
  { name: 'Languages', items: ['Python', 'SQL', 'R', 'TypeScript', 'VBScript', 'DAX'] },
  { name: 'Automation', items: ['Power Automate', 'Office Scripts', 'Test Automation', 'Legacy Migration', 'Process Automation'] },
  { name: 'Security', items: ['Identity & Access Review', 'IAM', 'Enterprise DLP', 'Compliance'] },
  { name: 'Data Engineering', items: ['Azure Data Factory', 'Databricks', 'SSIS', 'ETL / ELT', 'API Integration', 'Data Migration'] },
  { name: 'Analytics & BI', items: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib'] },
  { name: 'Modeling', items: ['Star Schema', 'Snowflake Schema', 'Data Warehousing', 'Data Governance', 'Data Quality'] },
  { name: 'AI / ML', items: ['scikit-learn', 'TensorFlow', 'Keras', 'NLP', 'Computer Vision', 'MLflow'] },
  { name: 'Cloud & DevOps', items: ['Azure', 'Git', 'CI/CD', 'Docker'] },
]

export const projects = [
  {
    title: 'AbbrivioAI',
    kind: 'NLP · Generative',
    blurb: 'Text-summarization platform built on an encoder-decoder architecture with attention, deployed on Microsoft Azure.',
    tags: ['NLP', 'Attention', 'Azure', 'Python'],
    repo: 'https://github.com/BhavyaVadher/Github_Abbrivio',
    featured: true,
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Face Recognition Attendance',
    kind: 'Computer Vision',
    blurb: 'CNN-based system that marks attendance from live video, with real-time OpenCV processing.',
    tags: ['CNN', 'OpenCV', 'Real-time'],
    featured: true,
    accent: 'from-violet-400 to-fuchsia-500',
  },
  {
    title: 'Target Marketing for a Canadian Bank',
    kind: 'Banking · Classification',
    blurb: 'Predicts which customers will respond to a campaign so marketing spend goes where it converts.',
    tags: ['scikit-learn', 'Classification', 'Banking'],
    repo: 'https://github.com/BhavyaVadher/Target_Marketing_for_canadian_bank',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Automated MCQ Generator',
    kind: 'NLP',
    blurb: 'Generates multiple-choice questions from raw text using NLP.',
    tags: ['NLP', 'Python'],
    repo: 'https://github.com/BhavyaVadher/Automated-MCQ-Generator',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Financial News ML',
    kind: 'NLP · Finance',
    blurb: 'Classifies financial news headlines to surface market-relevant signals.',
    tags: ['Text Classification', 'Finance'],
    repo: 'https://github.com/BhavyaVadher/Financial-News_ML-Project-4',
    accent: 'from-sky-400 to-indigo-500',
  },
  {
    title: 'MLflow Experiments',
    kind: 'MLOps',
    blurb: 'Experiment tracking, model versioning and reproducible ML runs.',
    tags: ['MLflow', 'MLOps'],
    repo: 'https://github.com/BhavyaVadher/Mlflow',
    accent: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'Stroke Prediction',
    kind: 'Healthcare',
    blurb: 'Risk model on imbalanced clinical data.',
    tags: ['Classification', 'Healthcare'],
    repo: 'https://github.com/BhavyaVadher/Stroke_prediction',
    accent: 'from-rose-400 to-pink-500',
  },
  {
    title: 'Employee Attrition',
    kind: 'HR Analytics',
    blurb: 'Predicts which employees are likely to leave, and why.',
    tags: ['Classification', 'People Analytics'],
    repo: 'https://github.com/BhavyaVadher/Empolyee_Attrition-ML-PROJECT_1-',
    accent: 'from-lime-400 to-emerald-500',
  },
]

export const education = [
  { school: 'Lambton College, Canada', degree: 'Graduate Certificate, AI & Machine Learning', period: 'May 2023 — Jan 2025', note: 'GPA 3.4 · Dean’s Honour List' },
  { school: 'Birla Vishvakarma Mahavidyalaya, India', degree: 'B.Tech, Electronics & Communication', period: '2018 — 2022', note: 'CPI 8.2' },
]

export const awards = [
  'Performance Excellence Award — BMO',
  'Employee of the Year 2022 — BISAG-N',
  'Best Performer — Robo Techfest 2018',
  'Web Development — Udemy',
]

// Repos the "Live from GitHub" strip should never show (personal / non-data side projects)
export const hiddenRepos = ['stick-media', 'money-canada-legal', 'Otp', 'amazon-wa-bot', 'expendy', 'port', 'portfolio', 'BhavyaVadher']
export const liveRepoLanguages = ['Jupyter Notebook', 'Python', 'R']
