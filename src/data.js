export const profile = {
  name: 'Bhavya Vadher',
  first: 'Bhavya',
  roles: ['Senior Developer', 'Data Engineer', 'Analytics Engineer', 'AI/ML Builder'],
  location: 'Toronto, ON, Canada',
  now: 'CIBC',
  github: 'https://github.com/BhavyaVadher',
  githubUser: 'BhavyaVadher',
  linkedin: 'https://www.linkedin.com/in/bhavyavadher/',
  avatar: 'https://github.com/BhavyaVadher.png',
  tagline:
    'I turn legacy code and messy data into clean pipelines, reliable reports and dashboards executives actually use — for two of Canada’s Big Five banks.',
}

export const stats = [
  { value: 4, suffix: '+', label: 'years in data' },
  { value: 2, suffix: '', label: 'Big Five banks' },
  { value: 4, suffix: '', label: 'companies, 2 countries' },
  { value: 3.42, suffix: '', label: 'GPA · Dean’s Honour List', decimals: 2 },
]

export const experience = [
  {
    company: 'CIBC',
    role: 'Senior Developer',
    period: 'Jun 2026 — Present',
    place: 'Toronto, Canada',
    current: true,
    summary: 'Leading the migration of enterprise reporting and scheduled analytics jobs from R to production Python.',
    points: [
      'Refactor legacy R scripts into tested, modular Python apps — mapping every dependency to its Python equivalent.',
      'Design, test and deploy automated reporting on Python, Pandas, NumPy, SQL and Databricks.',
      'Build reusable Python modules and automate scheduled jobs on enterprise schedulers.',
      'Run code reviews, testing and production deployments with cross-functional teams.',
    ],
    tags: ['Python', 'R', 'Databricks', 'SQL', 'ETL'],
  },
  {
    company: 'BMO Financial Group',
    role: 'Data Analyst',
    period: 'Apr 2025 — Jun 2026',
    place: 'Toronto, Canada',
    award: 'Performance Excellence Award',
    summary: 'Built the models, pipelines and dashboards behind enterprise reporting and executive KPIs.',
    points: [
      'Designed star & snowflake dimensional models for enterprise reporting.',
      'Shipped Power BI + DAX dashboards for real-time executive KPI tracking.',
      'Built ETL/ELT pipelines in Azure Data Factory across cloud and on-prem systems.',
      'Owned data-quality, governance and validation frameworks; CI/CD with Git and containers.',
    ],
    tags: ['Power BI', 'DAX', 'Azure Data Factory', 'Data Modeling', 'CI/CD'],
  },
  {
    company: 'ICE Robotics',
    role: 'Data Analyst & Staffing Coordinator',
    period: 'Sep 2024 — Apr 2025',
    place: 'Canada',
    summary: 'Made workforce performance measurable with dashboards and predictive insights.',
    points: [
      'Power BI and Tableau dashboards for workforce and operational KPIs.',
      'Integrated data from SQL, APIs and cloud systems to improve accessibility.',
      'Applied statistical analysis to support workforce planning.',
    ],
    tags: ['Tableau', 'Power BI', 'SQL', 'APIs', 'Statistics'],
  },
  {
    company: 'BISAG-N',
    role: 'Junior Data Analyst',
    period: 'Jan 2022 — Mar 2023',
    place: 'India',
    award: 'Employee of the Year 2022',
    summary: 'Built pipelines and dashboards for government-scale data initiatives.',
    points: [
      'SQL and Python ETL workflows for large-scale datasets.',
      'Structured data models for analytics and BI use cases.',
      'Dashboards that turned national datasets into actionable insight.',
    ],
    tags: ['Python', 'SQL', 'ETL', 'BI'],
  },
]

export const skillGroups = [
  { name: 'Languages', items: ['Python', 'R', 'SQL', 'Databricks SQL', 'DAX'] },
  { name: 'Data Engineering', items: ['Databricks', 'Azure Data Factory', 'SSIS', 'ETL / ELT', 'API Integration', 'Data Migration'] },
  { name: 'Analytics & BI', items: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'dplyr / tidyr'] },
  { name: 'Modeling', items: ['Star Schema', 'Snowflake Schema', 'Data Warehousing', 'Data Lineage', 'Data Governance'] },
  { name: 'AI / ML', items: ['scikit-learn', 'TensorFlow', 'Keras', 'NLP', 'Computer Vision', 'OpenCV', 'MLflow'] },
  { name: 'Cloud & DevOps', items: ['Azure', 'Docker', 'Kubernetes', 'Terraform', 'ARM Templates', 'Git', 'CI/CD'] },
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
  { school: 'Lambton College, Canada', degree: 'Post-Graduate Certificate, AI & Machine Learning', period: '2023 — 2024', note: 'GPA 3.42 · Dean’s Honour List' },
  { school: 'Birla Vishvakarma Mahavidyalaya, India', degree: 'B.E. Electronics & Communication', period: '2018 — 2022' },
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
