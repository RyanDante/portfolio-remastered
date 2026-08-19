"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GitBranch,
  Globe,
  Terminal,
  Mail,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Share2,
  Check,
  Palette,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useTheme, THEMES, type ThemePalette } from "@/context/ThemeContext";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import GlowButton from "@/components/ui/GlowButton";

const MAIN_LINKS = [
  {
    id: "github",
    title: "GitHub Repository",
    subtitle: "Open source distributed systems & research",
    url: "https://github.com/ryandante",
    icon: GitBranch,
    badge: "7+ YEARS",
  },
  {
    id: "linkedin",
    title: "LinkedIn Profile",
    subtitle: "Professional career history & recommendations",
    url: "https://linkedin.com/in/ryandante",
    icon: Globe,
    badge: "VERIFIED",
  },
  {
    id: "terminal",
    title: "Interactive UNIX CLI Terminal",
    subtitle: "Run commands & query ARIA AI Assistant",
    url: "/#terminal",
    icon: Terminal,
    badge: "AI READY",
  },
  {
    id: "resume",
    title: "Executive Spec Sheet & Resume",
    subtitle: "Download 2026 Systems Architect PDF",
    url: "/#about",
    icon: FileText,
    badge: "PDF",
  },
  {
    id: "contact",
    title: "Direct Engineering Contact",
    subtitle: "SLA < 12 hrs · Open for high-throughput contracts",
    url: "/#feedback",
    icon: Mail,
    badge: "ENCRYPTED",
  },
];

export default function LinksPage() {
  const { theme, setTheme, themes } = useTheme();
  const [copiedLink, setCopiedLink] = useState(false);

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: "Ryan Dante — Link Tree & Engineering Hub",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-12 px-4 relative z-10"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Ambient gradient background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-cyan-glow) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,255,194,0.08) 0%, transparent 50%)",
          opacity: 0.4,
        }}
      />

      <main className="w-full max-w-xl flex flex-col items-center z-10 space-y-8">
        {/* Top Header Actions Bar */}
        <div className="w-full flex items-center justify-between font-mono text-xs text-[#888888]">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[var(--color-cyan)] transition-colors"
          >
            ← RD://SYSTEMS
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded glass border border-white/10 text-white hover:border-[var(--color-cyan)] transition-all cursor-pointer"
          >
            {copiedLink ? (
              <Check size={14} className="text-[var(--color-cyan)]" />
            ) : (
              <Share2 size={14} />
            )}
            <span>{copiedLink ? "Copied Link!" : "Share Bio"}</span>
          </button>
        </div>

        {/* Profile Avatar Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          {/* Avatar Container with Glow */}
          <div className="relative">
            <div
              className="relative w-28 h-28 rounded-2xl overflow-hidden glass border-2 shadow-2xl"
              style={{
                borderColor: "var(--color-cyan)",
                boxShadow: "0 0 30px var(--color-cyan-glow)",
              }}
            >
              <Image
                src={SITE.images.bioHubAvatar}
                alt="Ryan Dante"
                fill
                priority
                sizes="112px"
                className="object-cover object-center filter contrast-110"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#050505] border border-[var(--color-cyan)] flex items-center justify-center text-[var(--color-cyan)]"
              title="Verified Engineer"
            >
              <ShieldCheck size={14} />
            </div>
          </div>

          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded font-mono text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{
                color: "var(--color-cyan)",
                backgroundColor: "var(--color-cyan-faint)",
                border: "1px solid var(--color-cyan-glow)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
              // ONLINE NODE — LONDON EDGE POP
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight">
              Ryan Dante
            </h1>
            <p className="font-mono text-xs text-[var(--color-cyan)] mt-1 font-semibold">
              Principal Software Engineer & Systems Architect
            </p>
            <p className="text-xs text-[#AAAAAA] max-w-md mt-2 leading-relaxed">
              Building high-throughput distributed systems, post-quantum secrets
              vaults, and production AI kernels.
            </p>
          </div>
        </motion.div>

        {/* Theme Palette Switcher Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full glass rounded-xl p-3 border border-white/10 flex items-center justify-between gap-2"
        >
          <span className="font-mono text-[10px] text-[#888888] flex items-center gap-1.5 uppercase font-bold">
            <Palette size={12} className="text-[var(--color-cyan)]" /> Palette:
          </span>
          <div className="flex items-center gap-1.5">
            {themes.map((th) => {
              const isSelected = theme === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id as ThemePalette)}
                  className={`px-2.5 py-1 rounded font-mono text-[10px] transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] text-[var(--color-cyan)] font-bold"
                      : "bg-white/5 border border-transparent text-[#888888] hover:text-white"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: th.accent }}
                  />
                  {th.name.split(" ")[1] ?? th.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Bio Links Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full space-y-3"
        >
          {MAIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isExternal = link.url.startsWith("http");
            const linkClass =
              "w-full glass rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-cyan-glow)] transition-all flex items-center justify-between group cursor-pointer";
            const linkStyle = { backgroundColor: "rgba(10, 10, 10, 0.85)" };
            const linkContent = (
              <>
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)] shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-[11px] text-[#888888] font-mono mt-0.5 line-clamp-2">
                      {link.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-[#888888] font-bold">
                    {link.badge}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-[#666666] group-hover:text-[var(--color-cyan)] group-hover:translate-x-1 transition-all"
                  />
                </div>
              </>
            );

            if (isExternal) {
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={linkClass}
                  style={linkStyle}
                >
                  {linkContent}
                </motion.a>
              );
            }

            return (
              <motion.div
                key={link.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={link.url} className={linkClass} style={linkStyle}>
                  {linkContent}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Systems Preview Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full"
        >
          <h2 className="font-mono text-xs tracking-widest text-[#888888] uppercase mb-3 flex items-center gap-2 font-bold">
            <Layers size={12} className="text-[var(--color-cyan)]" /> Featured
            Production Systems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PROJECTS.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href="/#projects"
                className="glass rounded-lg p-3 border border-white/10 hover:border-[var(--color-cyan-glow)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="font-mono text-[9px] text-[var(--color-cyan)] font-bold">
                    {p.status}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors mt-0.5">
                    {p.title}
                  </h4>
                </div>
                <p className="text-[10px] text-[#888888] font-mono mt-2 line-clamp-1">
                  {p.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Full Portfolio Launch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full pt-4"
        >
          <Link href="/" className="block w-full">
            <GlowButton
              variant="primary"
              size="lg"
              className="w-full justify-center rounded-xl py-4 font-mono font-bold text-sm"
              icon={<ArrowRight size={16} />}
              id="links-launch-full-portfolio-btn"
            >
              Launch Full Portfolio
            </GlowButton>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-xl pt-8 border-t border-white/10 text-center font-mono text-[10px] text-[#666666] z-10 mt-8">
        © 2026 Ryan Dante · Powered by Next.js 16 & React 19
      </footer>
    </div>
  );
}
