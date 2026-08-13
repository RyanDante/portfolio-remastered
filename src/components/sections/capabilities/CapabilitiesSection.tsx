"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Briefcase,
  Download,
  ArrowRight,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowButton from "@/components/ui/GlowButton";
import ResumeModal from "@/components/ui/ResumeModal";
import { useState } from "react";

const COMPETENCY_PILLARS = [
  {
    id: "fullstack",
    title: "Modern Web & Full-Stack Architecture",
    subtitle: "High-performance Next.js 16 & React 19 web applications",
    icon: Layers,
    highlights: [
      "Sub-second page load times with server components & edge caching",
      "Tailwind CSS v4 custom design systems & reactive micro-animations",
      "Strict TypeScript type safety & automated CI/CD deployment",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Node.js"],
  },
  {
    id: "distributed",
    title: "Distributed Systems & High-Throughput APIs",
    subtitle: "Resilient microservices, streaming, and data storage",
    icon: Cpu,
    highlights: [
      "Low-latency REST, GraphQL, and gRPC backend microservices",
      "Event-driven architecture with WebSockets, Kafka, and Redis caching",
      "Database design & query optimization for PostgreSQL, MongoDB, and Redis",
    ],
    tech: ["Go", "Rust", "PostgreSQL", "Redis", "WebSockets", "Kafka"],
  },
  {
    id: "ai",
    title: "AI & LLM Integration / RAG Engines",
    subtitle: "Next-gen intelligent applications & agentic workflows",
    icon: Zap,
    highlights: [
      "Google Gemini 2.0 & OpenAI API server-side integrations",
      "Retrieval-Augmented Generation (RAG) with vector databases",
      "Custom AI CLI tools, prompt pipelines, and autonomous agent systems",
    ],
    tech: ["Gemini AI", "Vector DBs", "Python", "LangChain", "OpenAI"],
  },
  {
    id: "cloud-security",
    title: "Cloud DevOps & Security Engineering",
    subtitle: "Zero-trust security, containerization, and monitoring",
    icon: ShieldCheck,
    highlights: [
      "Containerized microservice deployments with Docker & Kubernetes",
      "TLS 1.3 encryption, post-quantum vaults, and OWASP security compliance",
      "Real-time telemetry, Prometheus metrics, and automated alert logging",
    ],
    tech: ["Docker", "Kubernetes", "AWS / GCP", "TLS 1.3", "Prometheus"],
  },
];

const IMPACT_METRICS = [
  { label: "Production Uptime SLA", value: "99.99%", unit: "guaranteed" },
  { label: "Average P99 Latency", value: "< 45ms", unit: "global edge" },
  { label: "Daily API Volume", value: "10M+", unit: "requests" },
  { label: "Security Incident Record", value: "Zero", unit: "breaches" },
];

export default function CapabilitiesSection() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <SectionWrapper id="systems" label="// 03 — CORE COMPETENCIES & HIRER HUB">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
            Core <span style={{ color: "var(--color-cyan)" }}>Technical Capabilities</span>
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-[#AAAAAA] leading-relaxed">
            What I bring to your engineering organization — production-proven architectural leadership, full-stack mastery, and measurable business results.
          </p>
        </div>

        {/* Quantified Business Impact Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {IMPACT_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass rounded-xl p-5 border border-white/10 flex flex-col justify-between"
              style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }}
            >
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--color-cyan)]">
                  {metric.value}
                </span>
                <span className="font-mono text-[10px] text-[#888888] ml-1.5 uppercase">
                  {metric.unit}
                </span>
              </div>
              <p className="font-mono text-xs text-[#E0E0E0] mt-2 font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 4 Technical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {COMPETENCY_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-[var(--color-cyan-glow)] transition-all flex flex-col justify-between group"
                style={{ backgroundColor: "rgba(10, 10, 10, 0.85)" }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)] shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="font-mono text-xs text-[#888888]">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pillar.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                        <CheckCircle2 size={14} className="text-[var(--color-cyan)] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {pillar.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--color-cyan)] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hiring Availability Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 sm:p-8 border border-[var(--color-cyan-glow)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ backgroundColor: "rgba(0, 255, 194, 0.03)" }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded font-mono text-[10px] font-bold text-[var(--color-cyan)] bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
              EMPLOYMENT STATUS: OPEN FOR SENIOR / PRINCIPAL ROLES & CONTRACTS
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Briefcase size={22} className="text-[var(--color-cyan)]" /> Ready to Scale Your Team
            </h3>
            <p className="text-xs sm:text-sm text-[#CCCCCC] max-w-xl leading-relaxed">
              Targeting Principal Systems Architect, Lead Full-Stack Engineer, or Technical Co-founder roles. Available Remote Worldwide or Hybrid in London, UK.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <GlowButton
              variant="primary"
              size="md"
              onClick={() => setResumeOpen(true)}
              icon={<Download size={14} />}
              id="hirer-resume-btn"
            >
              Download Spec Sheet PDF
            </GlowButton>
            <GlowButton
              variant="outline"
              size="md"
              onClick={() => document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth" })}
              icon={<ArrowRight size={14} />}
              id="hirer-contact-btn"
            >
              Schedule Interview
            </GlowButton>
          </div>
        </motion.div>
      </SectionWrapper>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
