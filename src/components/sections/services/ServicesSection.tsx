"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  Gauge,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowButton from "@/components/ui/GlowButton";

const SERVICES = [
  {
    id: "web-apps",
    title: "Custom Full-Stack Web Applications",
    subtitle: "High-performance Next.js 16 & React 19 web platforms",
    icon: Globe,
    deliverables: [
      "Modern glassmorphism & responsive mobile-first UI",
      "Serverless route handlers & database integration",
      "100% source code ownership & Vercel/AWS deployment",
    ],
    turnaround: "2 – 4 Weeks",
    tag: "MOST POPULAR",
  },
  {
    id: "ai-rag",
    title: "AI & LLM Systems Integration",
    subtitle: "Gemini 2.0, RAG pipelines, and intelligent AI agents",
    icon: Zap,
    deliverables: [
      "Custom AI chatbot & document search vector database",
      "Structured prompt pipelines & Gemini/OpenAI API integration",
      "Autonomous CLI & browser AI assistants",
    ],
    turnaround: "1 – 2 Weeks",
    tag: "HIGH DEMAND",
  },
  {
    id: "performance",
    title: "Performance & Web Vitals Optimization",
    subtitle: "Sub-second load times & Core Web Vitals score tuning",
    icon: Gauge,
    deliverables: [
      "Lighthouse 95+ score optimization & bundle size reduction",
      "API response caching, database query tuning, and CDN setup",
      "Detailed audit report + direct code PR fixes",
    ],
    turnaround: "3 – 5 Days",
    tag: "QUICK WIN",
  },
  {
    id: "security",
    title: "Security, Auth & Infrastructure Hardening",
    subtitle: "Zero-trust auth, TLS 1.3, and architecture audits",
    icon: ShieldCheck,
    deliverables: [
      "Firebase / OAuth authentication & RBAC authorization",
      "OWASP top 10 vulnerability audit & API rate limiting",
      "Infrastructure security spec & encrypted storage setup",
    ],
    turnaround: "1 Week",
    tag: "ESSENTIAL",
  },
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Discovery & Spec", desc: "We review your requirements, goals, and technical scope." },
  { step: "02", title: "Architecture & UI", desc: "Interactive UI wireframes and database schema design." },
  { step: "03", title: "Rapid Iterative Build", desc: "Clean TypeScript code built with daily progress updates." },
  { step: "04", title: "Launch & Support", desc: "Deployment to production with 30-day post-launch warranty." },
];

export default function ServicesSection() {
  return (
    <SectionWrapper id="logs" label="// 04 — CLIENT SERVICES & SOLUTIONS">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
          Client <span style={{ color: "var(--color-cyan)" }}>Services & Solutions</span>
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-[#AAAAAA] leading-relaxed">
          From zero-to-one MVP web app builds to AI system integrations — I help founders, startups, and enterprises build fast, secure, and scalable digital products.
        </p>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-[var(--color-cyan-glow)] transition-all flex flex-col justify-between group"
              style={{ backgroundColor: "rgba(10, 10, 10, 0.85)" }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)] shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-white/5 text-[var(--color-cyan)] border border-white/10">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--color-cyan)] transition-colors">
                  {service.title}
                </h3>
                <p className="font-mono text-xs text-[#888888] mb-4">
                  {service.subtitle}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                      <CheckCircle2 size={14} className="text-[var(--color-cyan)] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[#888888] flex items-center gap-1">
                  <Clock size={13} className="text-[var(--color-cyan)]" /> Turnaround:
                </span>
                <span className="text-white font-bold">{service.turnaround}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4-Step Process Section */}
      <div className="mb-16">
        <h3 className="font-mono text-xs tracking-widest text-[#888888] uppercase mb-6 font-bold flex items-center gap-2">
          // CLIENT_DELIVERY_WORKFLOW
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass rounded-xl p-5 border border-white/10 relative"
              style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }}
            >
              <span className="font-mono text-2xl font-black text-[var(--color-cyan)] block mb-2 opacity-80">
                {step.step}.
              </span>
              <h4 className="font-bold text-sm text-white mb-1">{step.title}</h4>
              <p className="text-xs text-[#AAAAAA] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SLA Guarantees & Contact Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ backgroundColor: "rgba(10, 10, 10, 0.9)" }}
      >
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <MessageSquare size={22} className="text-[var(--color-cyan)]" /> Have a Project in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-[#CCCCCC] max-w-xl leading-relaxed">
            I respond to all genuine project inquiries within 12 hours with a clear timeline and fixed-price quote.
          </p>
        </div>

        <GlowButton
          variant="primary"
          size="lg"
          onClick={() => document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth" })}
          icon={<ArrowRight size={16} />}
          id="services-quote-btn"
        >
          Request Project Quote
        </GlowButton>
      </motion.div>
    </SectionWrapper>
  );
}
