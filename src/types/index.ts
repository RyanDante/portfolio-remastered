// ──────────────────────────────────────────────
// Global TypeScript interfaces & enums
// ──────────────────────────────────────────────

export type ProjectStatus = "PROD_READY" | "BETA_DEV" | "STABLE" | "ARCHIVED";

export interface ProjectLink {
  label: string;
  url: string;
  icon?: "github" | "external" | "docs";
}

export interface ProjectStat {
  label: string;
  value: string;
  unit?: string;
}

export interface MediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  year: string;
  category: "DISTRIBUTED" | "AI / ML" | "SECURITY" | "CLOUD / EDGE";
  description: string;
  longDescription: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  mediaGallery?: MediaItem[];
  stack: string[];
  architecture: string;
  features: string[];
  stats: ProjectStat[];
  links: ProjectLink[];
  tags: string[];
  color: string; // accent hex for card
  order: number;
  archived?: boolean;
}

export interface ProjectReview {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
  projectTitle: string;
  rating: number;
}

// ──────────────────────────────────────────────
// Telemetry & Metrics (Replacing raw Logs section)
// ──────────────────────────────────────────────

export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | "SUCCESS";

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: string;
  source: string;
}

export interface EdgeTelemetryNode {
  region: string;
  city: string;
  latencyMs: number;
  loadPercent: number;
  status: "optimal" | "warning" | "degraded";
}

// ──────────────────────────────────────────────
// Feedback / Contact Channel
// ──────────────────────────────────────────────

export type FeedbackStatus = "unread" | "read" | "resolved";
export type PriorityLevel = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface FeedbackEntry {
  id?: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  priority?: PriorityLevel;
  timestamp?: string;
  status?: FeedbackStatus;
}

// ──────────────────────────────────────────────
// Systems Architecture
// ──────────────────────────────────────────────

export type NodeType = "service" | "database" | "api" | "frontend" | "infra" | "tool";

export interface SystemNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  tech: string[];
  status: "online" | "degraded" | "offline";
  connections: string[]; // ids of connected nodes
}

// ──────────────────────────────────────────────
// Skills & Principles
// ──────────────────────────────────────────────

export interface Skill {
  name: string;
  level: number; // 0–100
  years: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  verifyUrl?: string;
  credentialId: string;
  skillsVerified: string[];
}

export interface ArchitecturePrinciple {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // lucide icon identifier
  metrics: string;
}

// ──────────────────────────────────────────────
// Admin / Feature Flags
// ──────────────────────────────────────────────

export interface FeatureFlag {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface AdminStats {
  totalVisitors: number;
  todayVisitors: number;
  totalFeedback: number;
  unresolvedFeedback: number;
  topSections: { section: string; views: number }[];
  dailyVisitors: { date: string; count: number }[];
}

// ──────────────────────────────────────────────
// Terminal
// ──────────────────────────────────────────────

export type TerminalLineType = "input" | "output" | "error" | "system" | "ai";

export interface TerminalLine {
  id: string;
  type: TerminalLineType;
  content: string;
  timestamp: string;
}
