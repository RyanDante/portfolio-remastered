"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity, CheckCircle2, Award, ExternalLink, Cpu } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { TagBadge } from "@/components/ui/Badge";
import {
  SKILLS,
  CERTIFICATIONS,
  ARCHITECTURE_PRINCIPLES,
  EXPERIENCE_TIMELINE,
} from "@/data/skills";

const PRINCIPLE_ICONS: Record<string, React.ElementType> = {
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
};

// ── 3D Animated Experience Timeline ────────────────────────────────────────

function Timeline() {
  return (
    <div className="relative pl-2 md:pl-4" style={{ perspective: 1200 }}>
      {/* Animated Glowing Vertical Line */}
      <div
        className="absolute left-[13px] md:left-[17px] top-4 bottom-4 w-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(180deg, var(--color-cyan) 0%, var(--color-info) 50%, var(--color-border) 100%)",
          boxShadow: "0 0 10px var(--color-cyan-dim)",
        }}
        aria-hidden
      />

      <div className="space-y-8">
        {EXPERIENCE_TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30, rotateX: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.12,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.025,
              rotateX: 4,
              rotateY: -4,
              z: 25,
            }}
            className="relative pl-10 md:pl-12 cursor-pointer group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Pulsing Glowing Timeline Node */}
            <div
              className="absolute left-[7px] md:left-[11px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-cyan)",
                boxShadow: "0 0 14px var(--color-cyan), inset 0 0 6px var(--color-cyan)",
              }}
            >
              <div className="w-full h-full rounded-full bg-[var(--color-cyan)] animate-ping opacity-75" />
            </div>

            {/* 3D Glass Card */}
            <div
              className="glass rounded-xl p-5 md:p-6 transition-all duration-300"
              style={{
                backgroundColor: "rgba(10, 10, 10, 0.8)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(0,255,194,0.05)",
              }}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-0.5 rounded"
                  style={{
                    color: "var(--color-cyan)",
                    backgroundColor: "var(--color-cyan-faint)",
                    border: "1px solid var(--color-cyan-glow)",
                  }}
                >
                  {item.year}
                </span>
                <span className="font-mono text-xs font-medium text-[#888888]">
                  {item.company}
                </span>
              </div>

              {/* Role Title */}
              <h4 className="text-base md:text-lg font-bold text-white mb-2 transition-colors group-hover:text-[var(--color-cyan)]">
                {item.role}
              </h4>

              {/* Description */}
              <p className="text-xs md:text-sm leading-relaxed text-[#CCCCCC] mb-4">
                {item.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5">
                {item.stack.map((t) => (
                  <TagBadge key={t}>{t}</TagBadge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Holographic Certifications Grid ────────────────────────────────────────

function CertificationsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CERTIFICATIONS.map((cert, i) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -4 }}
          className="glass rounded-xl p-5 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.85)" }}
        >
          {/* Holographic glow accent corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-cyan)]/20 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)]">
                <Award size={16} />
              </div>
              <span className="font-mono text-xs font-bold text-[var(--color-cyan)]">
                {cert.year}
              </span>
            </div>

            <h4 className="font-bold text-sm text-white mb-1 leading-snug group-hover:text-[var(--color-cyan)] transition-colors">
              {cert.name}
            </h4>
            <p className="font-mono text-[11px] text-[#888888] mb-3">
              {cert.issuer}
            </p>

            {/* Verified Skills */}
            <div className="flex flex-wrap gap-1 mb-4">
              {cert.skillsVerified.map((sk) => (
                <span
                  key={sk}
                  className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-[#CCCCCC] border border-white/10"
                >
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[10px]">
            <span className="text-[#666666]">ID: {cert.credentialId}</span>
            <span className="text-[var(--color-success)] flex items-center gap-1 font-bold">
              VERIFIED <ExternalLink size={10} />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Engineering Architecture Principles Grid (Replacing Hardware Specs) ────

function ArchitecturePrinciples() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ARCHITECTURE_PRINCIPLES.map((pr, i) => {
        const IconComp = PRINCIPLE_ICONS[pr.icon] ?? Cpu;
        return (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass rounded-xl p-5 border border-white/10 flex flex-col justify-between"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }}
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-cyan-faint)] to-white/5 border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)] mb-3">
                <IconComp size={18} />
              </div>
              <h4 className="font-bold text-base text-white mb-1">
                {pr.title}
              </h4>
              <p className="font-mono text-xs text-[var(--color-cyan)] font-semibold mb-2">
                {pr.tagline}
              </p>
              <p className="text-xs text-[#CCCCCC] leading-relaxed mb-4">
                {pr.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-[var(--color-success)] font-bold">
              {pr.metrics}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Skills Matrix ──────────────────────────────────────────────────────────

function SkillsMatrix() {
  return (
    <div className="space-y-8">
      {SKILLS.map((cat, ci) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: ci * 0.08, duration: 0.5 }}
        >
          <h4
            className="font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2 font-bold"
            style={{ color: "var(--color-cyan)" }}
          >
            // {cat.category}
          </h4>
          <div className="space-y-3">
            {cat.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="w-40 shrink-0 font-mono text-xs text-[#E0E0E0]">
                  {skill.name}
                </span>
                {/* Bar */}
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, var(--color-cyan), var(--color-success))`,
                      boxShadow: "0 0 8px var(--color-cyan-dim)",
                    }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-[10px] text-[#888888]">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── About Section Main Component ───────────────────────────────────────────

export default function AboutSection() {
  return (
    <SectionWrapper id="about" label="// 06 — EXPERIENCE & CAREER">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
          Career Experience{" "}
          <span style={{ color: "var(--color-cyan)" }}>& Web Architecture</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#AAAAAA]">
          A timeline of my engineering leadership, production impact, verified certifications, and core software principles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left col: 3D Timeline */}
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // EXPERIENCE_TIMELINE (3D INTERACTIVE)
            </h3>
            <Timeline />
          </div>

          {/* Architecture Principles (Replaced Hardware Specs) */}
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // ARCHITECTURE_PRINCIPLES
            </h3>
            <ArchitecturePrinciples />
          </div>
        </div>

        {/* Right col: Certifications Grid + Skills Matrix */}
        <div className="space-y-12">
          {/* Holographic Certifications */}
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // VERIFIED_CERTIFICATIONS
            </h3>
            <CertificationsGrid />
          </div>

          {/* Skills Matrix */}
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // SKILLS_MATRIX
            </h3>
            <SkillsMatrix />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
