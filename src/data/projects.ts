import type { Project, ProjectReview } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "neural-os",
    title: "NeuralOS",
    subtitle: "AI-Native Microkernel & Inference Runtime",
    status: "PROD_READY",
    year: "2024",
    category: "AI / ML",
    description:
      "High-throughput AI agent orchestration layer with embedded LLM inference engine and dynamic context window memory management.",
    longDescription:
      "NeuralOS is a production-grade microkernel designed specifically for managing autonomous AI agent swarms. Built from the ground up in Rust and C++, it offloads context management, token caching, and vector indexing to GPU memory with sub-millisecond dispatch times.",
    thumbnailUrl: "/projects/neural-os.png",
    stack: ["Rust", "C++20", "CUDA", "PyTorch", "gRPC", "WebAssembly"],
    architecture:
      "Shared-nothing actor model over RDMA with GPU zero-copy memory mapping. Custom SIMD allocator for KV-cache indexing.",
    features: [
      "Sub-millisecond token dispatch pipeline",
      "Dynamic context window paging with GPU memory pooling",
      "Built-in agent isolation via WebAssembly sandboxing",
      "Distributed consensus layer using Raft protocol",
    ],
    stats: [
      { label: "Throughput", value: "14.2K", unit: "tok/s" },
      { label: "Latency p99", value: "4.1", unit: "ms" },
      { label: "Memory Saved", value: "62%" },
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ryandante", icon: "github" },
      { label: "Architecture Paper", url: "#", icon: "docs" },
    ],
    tags: ["Rust", "AI Systems", "CUDA", "Distributed Systems"],
    color: "#00ffc2",
    order: 1,
  },
  {
    id: "phantom-grid",
    title: "PhantomGrid",
    subtitle: "Zero-Knowledge Edge Compute Fabric",
    status: "STABLE",
    year: "2024",
    category: "CLOUD / EDGE",
    description:
      "Decentralized edge computing platform utilizing zero-knowledge proofs to verify serverless workloads across untrusted nodes.",
    longDescription:
      "PhantomGrid enables privacy-critical computation at the edge. Workload authors compile WebAssembly binaries that are executed across thousands of distributed edge nodes. Nodes produce zk-SNARK cryptographic proofs of execution validity without exposing sensitive input data.",
    thumbnailUrl: "/projects/phantom-grid.png",
    stack: ["Go", "WebAssembly", "Halo2", "Libp2p", "Docker", "eBPF"],
    architecture:
      "P2P overlay network over QUIC protocol. eBPF kernel probes monitor resource usage and enforce memory bounds per node sandbox.",
    features: [
      "zk-SNARK verification for serverless WASM functions",
      "Peer-to-peer task distribution with automatic failover",
      "Kernel-level isolation via eBPF and cgroups v2",
      "Global latency-based routing with geo-sharding",
    ],
    stats: [
      { label: "Nodes Active", value: "8,420" },
      { label: "Proof Gen Time", value: "180", unit: "ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ryandante", icon: "github" },
      { label: "Live Dashboard", url: "#", icon: "external" },
    ],
    tags: ["Go", "Cryptography", "WASM", "Edge Compute"],
    color: "#00d4ff",
    order: 2,
  },
  {
    id: "cipher-vault",
    title: "CipherVault",
    subtitle: "Post-Quantum HSM & Secrets Management",
    status: "PROD_READY",
    year: "2023",
    category: "SECURITY",
    description:
      "Hardware Security Module interface implementing post-quantum lattice-based encryption algorithms for enterprise secrets.",
    longDescription:
      "CipherVault prepares security infrastructure for the post-quantum era by incorporating NIST-standardized Kyber and Dilithium cryptographic schemes alongside AES-256-GCM. Features instant secret revocation and threshold key sharing across multi-cloud regions.",
    thumbnailUrl: "/projects/cipher-vault.png",
    stack: ["Rust", "TypeScript", "Kyber", "Vault API", "OpenSSL", "PKCS#11"],
    architecture:
      "Sharded secret distribution using Shamir's Secret Sharing over TLS 1.3 with mTLS verification between HSM nodes.",
    features: [
      "NIST Round 4 lattice-based quantum resistant algorithms",
      "Shamir (M-of-N) threshold key reconstruction",
      "Hardware key isolation with PKCS#11 integration",
      "Real-time access audit logging to immutable ledger",
    ],
    stats: [
      { label: "Enc Operations", value: "2.4M", unit: "/sec" },
      { label: "Key Revocation", value: "<10", unit: "ms" },
      { label: "Security Rating", value: "FIPS 140-3" },
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ryandante", icon: "github" },
      { label: "Security Audit", url: "#", icon: "docs" },
    ],
    tags: ["Rust", "Post-Quantum", "Security", "HSM"],
    color: "#ff4d8d",
    order: 3,
  },
  {
    id: "flux-pipeline",
    title: "FluxPipeline",
    subtitle: "Real-Time Event Stream Processor",
    status: "STABLE",
    year: "2023",
    category: "DISTRIBUTED",
    description:
      "Ultra-low-latency event streaming engine handling over 5 million messages per second per node with exact-once semantics.",
    longDescription:
      "FluxPipeline solves high-volume stream ingestion for financial and telemetry workloads. Built with custom lock-free ring buffers and zero-copy network sockets, it achieves sub-millisecond end-to-end event propagation across distributed clusters.",
    thumbnailUrl: "/projects/neural-os.png",
    stack: ["C++20", "Kafka Protocol", "io_uring", "DPDK", "Prometheus"],
    architecture:
      "Kernel bypass IO via DPDK for network frames, paired with io_uring for persistent disk writes. Lock-free ring buffer IPC.",
    features: [
      "Kernel bypass networking via Linux DPDK",
      "Zero-copy io_uring disk storage backend",
      "Exact-once processing guarantees with transactional state",
      "Native Prometheus metrics exporter built-in",
    ],
    stats: [
      { label: "Throughput", value: "5.2M", unit: "msg/s" },
      { label: "Latency p99.9", value: "0.8", unit: "ms" },
      { label: "Loss Rate", value: "0.00%" },
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ryandante", icon: "github" },
      { label: "Benchmarks", url: "#", icon: "docs" },
    ],
    tags: ["C++", "Streaming", "Kernel Bypass", "High Throughput"],
    color: "#ffb800",
    order: 4,
  },
  {
    id: "ghost-auth",
    title: "GhostAuth",
    subtitle: "Zero-Trust Identity & Access Management",
    status: "PROD_READY",
    year: "2023",
    category: "SECURITY",
    description:
      "Passkey-first authentication server implementing WebAuthn, FIDO2, and continuous risk-based session validation.",
    longDescription:
      "GhostAuth eliminates passwords entirely. Utilizing device biometric enclaves and WebAuthn hardware tokens, it issues short-lived JWT credentials while continuously assessing device posture and network anomalies in real time.",
    thumbnailUrl: "/projects/cipher-vault.png",
    stack: ["Go", "WebAuthn", "Redis", "OAuth2 / OIDC", "React 19"],
    architecture:
      "Stateless session tokens backed by distributed Redis cluster. Real-time machine learning risk score engine on every request.",
    features: [
      "Passwordless WebAuthn & FIDO2 passkey integration",
      "Continuous biometric and risk score session monitoring",
      "Multi-tenant OIDC / SAML SSO identity provider",
      "Zero-knowledge credential storage",
    ],
    stats: [
      { label: "Auth Speed", value: "14", unit: "ms" },
      { label: "Phishing Rate", value: "0.00%" },
      { label: "Active Sessions", value: "1.2M" },
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ryandante", icon: "github" },
      { label: "Live Demo", url: "#", icon: "external" },
    ],
    tags: ["Go", "Authentication", "WebAuthn", "Zero-Trust"],
    color: "#a78bfa",
    order: 5,
  },
  {
    id: "terraform-ai",
    title: "TerraForm AI",
    subtitle: "Autonomous Infrastructure Compiler",
    status: "BETA_DEV",
    year: "2024",
    category: "AI / ML",
    description:
      "Natural language to HCL infrastructure compiler with automated cost estimation and security vulnerability scanning.",
    longDescription:
      "TerraForm AI translates complex architecture diagrams and natural language specifications into multi-cloud Terraform code. Includes predictive cloud cost optimization, IAM policy minimization, and automated dry-run testing.",
    thumbnailUrl: "/projects/phantom-grid.png",
    stack: ["TypeScript", "Next.js 16", "Gemini API", "Terraform CLI", "Zod"],
    architecture:
      "AST parser mapping natural language intent to audited HCL modules with real-time AWS/GCP cost API verification.",
    features: [
      "Natural language to audited HCL code generation",
      "Pre-deployment cloud cost calculation & optimization",
      "Automated security compliance policy check (CIS Benchmarks)",
      "Interactive 3D infrastructure graph renderer",
    ],
    stats: [
      { label: "Cost Savings", value: "38%" },
      { label: "Generation Time", value: "1.2", unit: "s" },
      { label: "HCL Accuracy", value: "98.4%" },
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ryandante", icon: "github" },
    ],
    tags: ["TypeScript", "Terraform", "Gemini API", "DevOps"],
    color: "#00c48c",
    order: 6,
  },
];

export const PROJECT_REVIEWS: ProjectReview[] = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    role: "VP of Infrastructure",
    company: "Vortex Data Systems",
    text: "Ryan's NeuralOS architecture cut our AI inference latency by 60%. Unbelievable precision and engineering execution.",
    projectTitle: "NeuralOS",
    rating: 5,
  },
  {
    id: "rev-2",
    author: "Marcus Vance",
    role: "Principal Security Architect",
    company: "CyberShield Labs",
    text: "CipherVault is the most elegant post-quantum HSM implementation I've audited. The NIST Kyber integration is textbook perfection.",
    projectTitle: "CipherVault",
    rating: 5,
  },
  {
    id: "rev-3",
    author: "Dr. Aris Thorne",
    role: "Chief Scientist",
    company: "Aether Edge Computing",
    text: "PhantomGrid solved our distributed zero-knowledge verification challenge. Ryan thinks 3 steps ahead of standard architecture.",
    projectTitle: "PhantomGrid",
    rating: 5,
  },
  {
    id: "rev-4",
    author: "Sarah Jenkins",
    role: "Head of Distributed Systems",
    company: "QuantStream Inc.",
    text: "FluxPipeline handled 5.2M msg/sec during peak stress testing without a single dropped byte. Outstanding C++ performance.",
    projectTitle: "FluxPipeline",
    rating: 5,
  },
  {
    id: "rev-5",
    author: "Devon Sterling",
    role: "Staff Engineer",
    company: "CloudScale Platform",
    text: "GhostAuth made our biometric passkey rollout effortless across 1.2M active accounts. Clean code, rock-solid security.",
    projectTitle: "GhostAuth",
    rating: 5,
  },
];
