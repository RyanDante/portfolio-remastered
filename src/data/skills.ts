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
    title: "Zero-Trust Security by Default",
    tagline: "Never trust, always verify every network boundary.",
    description: "Every microservice payload is authenticated using cryptographically signed mTLS tokens and ephemeral session keys.",
    icon: "ShieldCheck",
    metrics: "100% End-to-End Encryption",
  },
  {
    id: "p-2",
    title: "Sub-50ms Edge Performance",
    tagline: "Compute pushed directly to the user's nearest POP.",
    description: "RSC payloads and API state are cached at global edge nodes with automatic stale-while-revalidate invalidation.",
    icon: "Zap",
    metrics: "p99 < 38ms Global Latency",
  },
  {
    id: "p-3",
    title: "Self-Healing & Circuit Breaking",
    tagline: "Graceful degradation under catastrophic loads.",
    description: "Decoupled fallback handlers automatically step in during downstream API latency spikes or outages.",
    icon: "Activity",
    metrics: "99.99% Uptime Guarantee",
  },
  {
    id: "p-4",
    title: "Type-Safe End-to-End Contracts",
    tagline: "Compile-time safety from DB schema to Client UI.",
    description: "Strict TypeScript interfaces and runtime Zod validation prevent invalid payloads from hitting production DBs.",
    icon: "CheckCircle2",
    metrics: "0 Runtime Schema Mismatches",
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
