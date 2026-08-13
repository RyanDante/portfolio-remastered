"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Globe,
  Terminal as TerminalIcon,
  Mail,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowButton from "@/components/ui/GlowButton";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const ROLES = [
  "Systems Architect",
  "Principal Engineer",
  "AI Integration Lead",
  "Security Specialist",
];

const SOCIAL_LINKS = [
  { icon: GitBranch,    href: "https://github.com/ryandante",   label: "GitHub" },
  { icon: Globe,        href: "https://linkedin.com/in/ryandante", label: "LinkedIn" },
  { icon: TerminalIcon, href: "#terminal",                     label: "Terminal" },
  { icon: Mail,         href: "#contact",                      label: "Contact" },
];

const FULL_BIO =
  "A personal portfolio showcasing production distributed systems, AI-powered inference kernels, post-quantum secrets vaults, and high-performance cloud architecture developed over 7+ years of engineering excellence across high-throughput enterprise scale environments.";

export default function HeroSection() {
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  // Typewriter effect for roles
  const typedRole = useTypingEffect({
    strings: ROLES,
    typingSpeed: 70,
    deletingSpeed: 40,
    pauseDuration: 2200,
    loop: true,
  });

  return (
    <SectionWrapper id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* ── LEFT COLUMN: Text Content ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col items-start z-10"
        >
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2"
          >
            <span
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded flex items-center gap-2"
              style={{
                color: "var(--color-cyan)",
                backgroundColor: "rgba(0, 255, 194, 0.08)",
                border: "1px solid rgba(0, 255, 194, 0.25)",
              }}
            >
              <Sparkles size={13} className="animate-spin-slow" />
              // WELCOME TO MY PORTFOLIO
            </span>
          </motion.div>

          {/* Main Headline Line 1: Static Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] text-white mb-2"
          >
            I&apos;m <span className="text-[var(--color-cyan)] text-glow">Ryan Dante</span>
          </motion.h1>

          {/* Animated Subheadline Role Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex items-center gap-3 mb-6 min-h-[4rem]"
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white shrink-0">
              A
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-cyan)] text-glow font-mono relative">
              {typedRole}
              <span className="animate-cursor font-mono text-3xl sm:text-5xl text-[var(--color-cyan)]">
                _
              </span>
            </span>
          </motion.div>

          {/* Truncated Bio Description with Show More / Show Less Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="max-w-2xl mb-8"
          >
            <p className="text-base sm:text-lg font-normal leading-relaxed text-[#E0E0E0]">
              {isBioExpanded ? FULL_BIO : `${FULL_BIO.slice(0, 135)}...`}
            </p>
            <button
              onClick={() => setIsBioExpanded((exp) => !exp)}
              className="mt-2 inline-flex items-center gap-1 font-mono text-xs font-bold transition-colors cursor-pointer hover:opacity-80"
              style={{ color: "var(--color-cyan)" }}
              id="hero-bio-toggle-btn"
            >
              {isBioExpanded ? (
                <>
                  Show Less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Show More <ChevronDown size={14} />
                </>
              )}
            </button>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <GlowButton
              variant="primary"
              size="lg"
              className="rounded px-8 py-4 font-mono font-bold text-base"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              icon={<ArrowRight size={18} />}
              id="hero-explore-btn"
            >
              Explore Projects
            </GlowButton>

            <GlowButton
              variant="outline"
              size="lg"
              className="rounded px-7 py-4 font-mono text-base"
              onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })}
              id="hero-terminal-btn"
            >
              Open Terminal
            </GlowButton>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-[var(--color-border)] w-full max-w-xl"
          >
            <span className="font-mono text-xs font-bold tracking-widest text-[#888888] uppercase">
              Find me on:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg glass border border-[var(--color-border)] flex items-center gap-2 text-xs font-mono text-white transition-all duration-200 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] hover:scale-105 cursor-pointer"
                  aria-label={link.label}
                >
                  <link.icon size={15} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: Studio Portrait Frame & Background Matrix Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Background Matrix Picture Asset */}
          <div className="absolute inset-x-0 -top-8 -bottom-8 rounded-3xl overflow-hidden opacity-45 pointer-events-none z-0">
            <Image
              src="/hero-bg.png"
              alt="Cyberpunk Matrix Background"
              fill
              className="object-cover object-center filter blur-[1px] brightness-125"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#030303] via-transparent to-[#030303]" />
          </div>

          <div className="relative flex items-center z-10 my-4">
            {/* Studio Portrait Frame */}
            <div
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[3/4] rounded-lg overflow-hidden glass border shadow-2xl"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "rgba(10, 10, 10, 0.85)",
                boxShadow: "0 0 50px rgba(0,0,0,0.9), 0 0 30px rgba(0,255,194,0.15)",
              }}
            >
              {/* Studio Portrait */}
              <Image
                src="/avatar.png"
                alt="Ryan Dante — Principal Engineer"
                fill
                priority
                className="object-cover object-center filter grayscale contrast-110 transition-all duration-500 hover:grayscale-0 hover:scale-105"
              />

              {/* Base Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
            </div>

            {/* Vertical Outlined Typography Alongside the Portrait */}
            <div
              className="hidden sm:block absolute -right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none writing-vertical z-20"
              aria-hidden
            >
              <span className="font-mono font-black text-4xl lg:text-5xl tracking-[0.2em] text-stroke-cyan uppercase drop-shadow-2xl">
                RYAN DANTE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
