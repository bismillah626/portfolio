export const profile = {
  name: "Bismillah Khan",
  role: "AI/ML Engineer",
  degree: "B.Tech CSE",
  college: "IIIT Bhubaneswar",
  graduation: "2023–2027",
  cgpa: "8.05",
  email: "khanbismillah2004@gmail.com",
  github: "https://github.com/bismillah626",
  linkedin: "https://www.linkedin.com/in/bismillah-khan-240953294",
  resume:
    "https://drive.google.com/file/d/1KdejxmVUTCS3Ep_du9u6GvI0_mJWhxX4/view?usp=sharing",
  tagline:
    "AI/ML Engineer building modular, scalable systems and high-accuracy predictive models.",
};

export const focusAreas = [
  "LLMs",
  "NLP pipelines",
  "RAG",
  "Agentic AI",
  "Time Series Forecasting",
];

export const languages = ["Python", "C++", "SQL (MySQL)"];

export type ProjectCategory = "LLM & Agents" | "ML" | "NLP";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  metric: string;
  tags: string[];
  github: string;
  live?: string;
  problem: string;
  architecture: string[];
  results: string[];
  role: string;
};

export const projects: Project[] = [
  {
    id: "git-guardian",
    number: "01",
    title: "Git Guardian AI",
    category: "LLM & Agents",
    summary:
      "A multi-agent DevSecOps review platform that automates pull-request review through GitHub webhooks.",
    metric: "4 parallel agents",
    tags: ["Python", "FastAPI", "LangGraph", "Docker"],
    github: "https://github.com/bismillah626/git_gUardiaN",
    problem:
      "Pull-request review needs security, quality, test-gap, and documentation checks without making the LLM the source of truth for static findings.",
    architecture: [
      "GitHub webhook",
      "LangGraph supervisor",
      "Security / Quality / Test-Gap / Documentation agents",
      "FastAPI + PostgreSQL + Streamlit",
    ],
    results: [
      "Security Agent combines Bandit, Semgrep, and Gitleaks with LLM triage.",
      "Cross-tool deduplication reduces repeated findings.",
      "Docker Compose deployment with Groq-to-Claude fallback on rate limiting.",
    ],
    role: "Designed the modular agent workflow and the tool-grounded review path.",
  },
  {
    id: "churn",
    number: "02",
    title: "Customer Churn Prediction",
    category: "ML",
    summary:
      "An end-to-end modular ML pipeline with experiment tracking, class-imbalance handling, explainability, and Flask deployment.",
    metric: "92% accuracy",
    tags: ["Python", "Scikit-learn", "MLflow", "Flask"],
    github: "https://github.com/bismillah626",
    problem:
      "Build a repeatable churn pipeline that compares classifiers, addresses imbalance, and makes predictions explainable.",
    architecture: [
      "Dataset preparation",
      "SMOTE balancing",
      "Classifier benchmarks + MLflow",
      "SHAP explanations + Flask",
    ],
    results: [
      "Gradient Boosting was the best model at 92% accuracy.",
      "The benchmark recorded 89% precision and 86% recall.",
      "SHAP explanations make individual predictions easier to inspect.",
    ],
    role: "Built the modular pipeline, model comparison flow, explainability layer, and Flask deployment.",
  },
  {
    id: "friday",
    number: "03",
    title: "Friday AI",
    category: "LLM & Agents",
    summary:
      "An LLM voice assistant with LangChain orchestration, personality modes, and semantic memory.",
    metric: "1.4s latency",
    tags: ["Python", "LangChain", "FAISS", "NLP"],
    github: "https://github.com/bismillah626/Friday_AI_Assistant-ff--_--_V2",
    problem:
      "Create a voice assistant that can coordinate tasks, retrieve prior context, and respond with reliable intent recognition.",
    architecture: [
      "Voice input",
      "Two-pass speech preprocessing",
      "LangChain orchestration",
      "FAISS + SentenceTransformers memory",
    ],
    results: [
      "Three personality modes support different interaction styles.",
      "Semantic memory retrieves across 500+ stored interactions in under 80ms.",
      "Intent accuracy increased from 71% to 91.4% on a 200-sample test set.",
    ],
    role: "Designed the orchestration, semantic-memory retrieval, and speech preprocessing flow.",
  },
  {
    id: "spam-classifier",
    number: "04",
    title: "Spam Email Classifier",
    category: "NLP",
    summary:
      "A current-site NLP project with a Flask-backed classifier repository.",
    metric: "NLP pipeline",
    tags: ["Python", "Flask", "NLP", "Scikit-learn"],
    github: "https://github.com/bismillah626/spam_project",
    problem:
      "Classify incoming email text through a small, inspectable NLP application.",
    architecture: ["Email text", "NLP preprocessing", "Classifier", "Flask interface"],
    results: ["The repository contains the classifier implementation and Flask interface."],
    role: "Built the classifier project and its Flask-backed interface.",
  },
];

export const skillGroups = [
  {
    name: "Languages",
    code: "LANG / 01",
    skills: ["Python", "C++", "SQL (MySQL)"],
    projects: ["Git Guardian AI", "Customer Churn Prediction", "Friday AI"],
  },
  {
    name: "ML / Data",
    code: "ML-DATA / 02",
    skills: ["NumPy", "Pandas", "Scikit-learn", "PyTorch", "MLflow", "Time Series Forecasting"],
    projects: ["Customer Churn Prediction", "Spam Email Classifier"],
  },
  {
    name: "GenAI / Agents",
    code: "GENAI / 03",
    skills: ["LLMs", "LangChain", "LangGraph", "Hugging Face Transformers", "FAISS", "SentenceTransformers", "RAG", "Agentic AI"],
    projects: ["Git Guardian AI", "Friday AI"],
  },
  {
    name: "Deployment / Tools",
    code: "OPS / 04",
    skills: ["FastAPI", "Flask", "Docker", "Git"],
    projects: ["Git Guardian AI", "Customer Churn Prediction", "Spam Email Classifier"],
  },
];
