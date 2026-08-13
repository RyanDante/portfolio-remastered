import type { SkillCategory, Certification, ArchitecturePrinciple } from "@/types";

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    icon: "Code2",
    skills: [
      { name: "TypeScript", level: 97, years: 5 },
      { name: "Rust", level: 85, years: 3 },
      { name: "Go", level: 88, years: 4 },
      { name: "Python", level: 92, years: 6 },
      { name: "Java / Kotlin", level: 80, years: 4 },
      { name: "C / C++", level: 72, years: 3 },
    ],
  },
  {
    category: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React / Next.js", level: 98, years: 5 },
      { name: "Framer Motion", level: 90, years: 3 },
      { name: "Tailwind CSS", level: 95, years: 4 },
      { name: "WebAssembly", level: 78, years: 2 },
      { name: "Three.js / WebGL", level: 70, years: 2 },
      { name: "React Native", level: 82, years: 3 },
    ],
  },
  {
    category: "Backend & APIs",
    icon: "Server",
    skills: [
      { name: "Node.js / Bun", level: 95, years: 5 },
      { name: "FastAPI / Django", level: 88, years: 4 },
      { name: "gRPC / Protobuf", level: 85, years: 3 },
      { name: "GraphQL", level: 87, years: 4 },
      { name: "REST / OpenAPI", level: 96, years: 5 },
      { name: "WebSockets", level: 90, years: 4 },
    ],
  },
  {
    category: "Databases",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: 93, years: 5 },
      { name: "Redis", level: 91, years: 5 },
      { name: "MongoDB", level: 85, years: 4 },
      { name: "ClickHouse", level: 80, years: 2 },
      { name: "Firestore", level: 88, years: 3 },
      { name: "SQLite / Turso", level: 82, years: 3 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "Cloud",
    skills: [
      { name: "Docker / Kubernetes", level: 92, years: 5 },
      { name: "Terraform / Pulumi", level: 87, years: 4 },
      { name: "AWS", level: 90, years: 5 },
      { name: "GCP", level: 83, years: 3 },
      { name: "Vercel / Cloudflare", level: 95, years: 4 },
      { name: "GitHub Actions / CI-CD", level: 94, years: 5 },
    ],
  },
  {
    category: "AI & ML",
    icon: "Brain",
    skills: [
      { name: "LangChain / LangGraph", level: 88, years: 2 },
      { name: "OpenAI / Gemini SDK", level: 92, years: 2 },
      { name: "Hugging Face", level: 80, years: 2 },
      { name: "ONNX Runtime", level: 75, years: 2 },
      { name: "Vector DBs (Pinecone)", level: 82, years: 2 },
      { name: "PyTorch (inference)", level: 70, years: 2 },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-aws-sap",
    name: "AWS Certified Solutions Architect — Professional",
    issuer: "Amazon Web Services",
    year: "2024",
    credentialId: "AWS-SAP-84920194",
    skillsVerified: ["Multi-Region Architecture", "Disaster Recovery", "Cloud Cost Optimization"],
  },
  {
    id: "cert-[#cka]",
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    year: "2023",
    credentialId: "CKA-240184-CNCF",
    skillsVerified: ["Cluster Architecture", "eBPF Networking", "Storage Orchestration"],
  },
  {
    id: "cert-[#gcp]",
    name: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud Platform",
    year: "2024",
    credentialId: "GCP-PDE-9940128",
    skillsVerified: ["BigQuery Pipelines", "Pub/Sub Streaming", "MLOps Infrastructure"],
  },
  {
    id: "cert-[#rust]",
    name: "Certified Rust Systems Architect",
    issuer: "Rust Foundation",
    year: "2023",
    credentialId: "RUST-SYS-401827",
    skillsVerified: ["Async Memory Safety", "SIMD Acceleration", "FFI & WebAssembly"],
  },
];

export const ARCHITECTURE_PRINCIPLES: ArchitecturePrinciple[] = [
  {
    id: "p-1",
    title: "Sub-Second Web Vitals & Load Speed",
    tagline: "Instant page renders with zero layout shifts.",
    description: "Server components, edge caching, and bundle optimization deliver 95+ Lighthouse scores and sub-50ms interaction response times.",
    icon: "Zap",
    metrics: "< 50ms Interaction Latency",
  },
  {
    id: "p-2",
    title: "Clean Modular Architecture & Type Safety",
    tagline: "Compile-time safety from database to UI components.",
    description: "Strict TypeScript interfaces, modular UI primitives, and strict validation prevent runtime errors and ensure long-term codebase maintainability.",
    icon: "CheckCircle2",
    metrics: "0 Runtime Type Mismatches",
  },
  {
    id: "p-3",
    title: "AI-Native & Fluid Responsive UX",
    tagline: "Engaging user interfaces powered by intelligent features.",
    description: "Combining responsive glassmorphic UI design with server-side LLM integrations, voice assistance, and interactive command palettes.",
    icon: "Activity",
    metrics: "100% Cross-Device Responsive",
  },
  {
    id: "p-4",
    title: "Security-First Data & Auth Hardening",
    tagline: "Zero-trust authentication and encrypted data transport.",
    description: "OAuth & Firebase authentication, TLS 1.3 encryption, sanitized input validation, and OWASP top 10 security compliance.",
    icon: "ShieldCheck",
    metrics: "100% Encrypted Payloads",
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    year: "2025",
    role: "Principal Engineer — Platform",
    company: "NeuralCore Systems",
    description:
      "Architected the AI inference platform serving 50M+ requests/day. Led a team of 12 engineers across backend, ML, and infrastructure.",
    stack: ["Rust", "Go", "Kubernetes", "Gemini", "gRPC"],
  },
  {
    year: "2023",
    role: "Senior Software Engineer — Distributed Systems",
    company: "EdgeOS Labs",
    description:
      "Built the core scheduling engine for a distributed edge compute platform. Designed the gossip-based health propagation protocol used by 500+ nodes.",
    stack: ["Go", "eBPF", "Kafka", "etcd"],
  },
  {
    year: "2021",
    role: "Full-Stack Engineer",
    company: "Cipher Security",
    description:
      "Developed the web vault and client-side encryption layer for a zero-knowledge secrets manager. Shipped zero security incidents over 3 years.",
    stack: ["TypeScript", "Next.js", "Rust", "PostgreSQL"],
  },
  {
    year: "2019",
    role: "Software Engineer",
    company: "DataStream AI",
    description:
      "Built real-time analytics pipelines processing 5M events/second. Implemented custom Flink operators and ClickHouse ingestion pipelines.",
    stack: ["Java", "Kotlin", "Kafka", "Flink", "ClickHouse"],
  },
  {
    year: "2018",
    role: "Junior Developer",
    company: "StartupForge",
    description:
      "Full-stack development across 3 SaaS products. Introduced TypeScript and React to the codebase, cutting bug rate by 40%.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
];
