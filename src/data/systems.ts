import type { SystemNode } from "@/types";

export const SYSTEM_NODES: SystemNode[] = [
  {
    id: "cdn",
    label: "CDN / Edge",
    type: "infra",
    description:
      "Cloudflare global CDN with edge caching, DDoS protection, and Worker-based request routing.",
    tech: ["Cloudflare CDN", "Cloudflare Workers", "R2"],
    status: "online",
    connections: ["frontend"],
  },
  {
    id: "frontend",
    label: "Next.js App",
    type: "frontend",
    description:
      "Next.js 16 App Router with React 19. Server Components for static content, Client Components for interactive UI. Deployed on Vercel.",
    tech: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
    status: "online",
    connections: ["cdn", "api-gateway", "firebase-auth"],
  },
  {
    id: "api-gateway",
    label: "API Gateway",
    type: "api",
    description:
      "Next.js Route Handlers acting as a typed API gateway. Handles Gemini AI, feedback, projects, and admin endpoints.",
    tech: ["Next.js Route Handlers", "TypeScript", "Zod"],
    status: "online",
    connections: ["frontend", "firebase-db", "gemini-api", "cache"],
  },
  {
    id: "firebase-auth",
    label: "Firebase Auth",
    type: "service",
    description:
      "Firebase Authentication for admin access. Supports Email/Password and Google OAuth2. JWT-based session management.",
    tech: ["Firebase Auth", "Google OAuth2", "JWT"],
    status: "online",
    connections: ["frontend", "firebase-db"],
  },
  {
    id: "firebase-db",
    label: "Firestore",
    type: "database",
    description:
      "Firebase Firestore NoSQL database for projects, feedback, logs, and feature flags. Real-time listeners for the admin panel.",
    tech: ["Firestore", "Firebase SDK"],
    status: "online",
    connections: ["api-gateway", "firebase-auth"],
  },
  {
    id: "gemini-api",
    label: "Gemini AI",
    type: "api",
    description:
      "Google Gemini API powering the interactive terminal AI assistant. Context-aware responses with cyberpunk system prompt.",
    tech: ["@google/genai", "Gemini 2.0 Flash"],
    status: "online",
    connections: ["api-gateway"],
  },
  {
    id: "cache",
    label: "Edge Cache",
    type: "infra",
    description:
      "Next.js built-in data cache and `use cache` directive for static project data and aggregated analytics.",
    tech: ["Next.js Data Cache", "use cache"],
    status: "online",
    connections: ["api-gateway"],
  },
  {
    id: "analytics",
    label: "Firebase Analytics",
    type: "service",
    description:
      "Firebase Analytics for visitor tracking, section engagement heatmaps, and conversion funnels in the admin dashboard.",
    tech: ["Firebase Analytics", "Google Analytics 4"],
    status: "online",
    connections: ["frontend"],
  },
];

export const SYSTEM_STATS = {
  totalRequests: "4.2M",
  avgResponseTime: "38ms",
  errorRate: "0.02%",
  cacheHitRate: "94%",
  uptime: "99.97%",
  regionsActive: 6,
};
