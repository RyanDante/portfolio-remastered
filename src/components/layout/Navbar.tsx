"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wifi, ChevronRight, Terminal as TerminalIcon, Search, Globe } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import GlowButton from "@/components/ui/GlowButton";
import ResumeModal from "@/components/ui/ResumeModal";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#home", label: "Home", num: "01" },
  { href: "#projects", label: "Projects", num: "02" },
  { href: "#systems", label: "Capabilities", num: "03" },
  { href: "#logs", label: "Services", num: "04" },
  { href: "#faq", label: "FAQ", num: "05" },
  { href: "#terminal", label: "Terminal", num: "06" },
  { href: "#about", label: "Experience", num: "07" },
  { href: "#feedback", label: "Contact", num: "08" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <>
      {/* ── 1. DESKTOP & MOBILE TOP HEADER BAR ────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 lg:block"
        style={{
          backgroundColor: "rgba(3,3,3,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2 font-mono font-extrabold text-base tracking-widest transition-all hover:opacity-80"
            style={{ color: "var(--color-cyan)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
            RD://SYSTEMS_v4.0.2
          </Link>

          {/* Desktop Nav Links (lg and above) */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded font-mono text-xs tracking-wider transition-all duration-200",
                    isActive
                      ? "text-cyan font-bold"
                      : "hover:text-cyan"
                  )}
                  style={{
                    color: isActive ? "var(--color-cyan)" : "var(--color-muted-light)",
                    backgroundColor: isActive ? "var(--color-cyan-faint)" : "transparent",
                    border: isActive ? "1px solid var(--color-cyan-glow)" : "1px solid transparent",
                  }}
                >
                  {isActive && <span className="mr-1">›</span>}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
              className="flex items-center gap-2 px-3 py-1 rounded glass border border-[var(--color-cyan-glow)] font-mono text-xs text-[var(--color-cyan)] hover:bg-[var(--color-cyan-faint)] transition-all cursor-pointer"
              title="Open Command Palette (Cmd+K)"
              id="navbar-cmd-k-btn"
            >
              <Search size={12} />
              <span>Cmd+K</span>
            </button>

            <Link
              href="/links"
              className="flex items-center gap-1 px-3 py-1 rounded glass border border-white/10 font-mono text-xs text-white hover:border-[var(--color-cyan)] transition-all"
              id="navbar-links-btn"
            >
              <Globe size={12} className="text-[var(--color-cyan)]" />
              <span>Bio Hub</span>
            </Link>

            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded font-mono text-[10px] tracking-widest font-bold"
              style={{
                color: "var(--color-success)",
                backgroundColor: "rgba(0,196,140,0.08)",
                border: "1px solid rgba(0,196,140,0.25)",
              }}
            >
              <Wifi size={11} />
              ONLINE
            </div>

            <GlowButton
              variant="outline"
              size="sm"
              onClick={() => setResumeOpen(true)}
              id="navbar-resume-btn"
            >
              Resume
            </GlowButton>
          </div>

          {/* Mobile Hamburger Toggle Button (md:hidden) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
              className="p-1.5 rounded glass border border-[var(--color-cyan-glow)] text-[var(--color-cyan)]"
              title="Search"
            >
              <Search size={16} />
            </button>
            <GlowButton
              variant="outline"
              size="sm"
              onClick={() => setResumeOpen(true)}
              className="py-1 px-2.5 text-xs"
            >
              Resume
            </GlowButton>
            <button
              className="p-2 rounded glass border border-white/10 text-white"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              id="mobile-menu-toggle-btn"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Right-to-Left Off-Canvas Sliding Drawer (md:hidden) */}
        <AnimatePresence>
          {mobileOpen && (
            <div className="md:hidden fixed inset-0 z-50">
              {/* Dark Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Right-to-Left Sliding Panel */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed inset-y-0 right-0 w-80 max-w-[85vw] glass border-l border-white/10 p-6 flex flex-col justify-between z-10 shadow-2xl"
                style={{ backgroundColor: "rgba(5, 5, 5, 0.96)" }}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <span className="font-mono font-bold text-sm text-[var(--color-cyan)] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                      RD://NAVIGATION
                    </span>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="p-1.5 rounded glass text-[#888888] hover:text-white cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Links list */}
                  <nav className="flex flex-col gap-2.5">
                    {NAV_LINKS.map((link) => {
                      const isActive = activeId === link.href.slice(1);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="px-4 py-3 rounded-xl font-mono text-sm flex items-center justify-between transition-all"
                          style={{
                            color: isActive ? "var(--color-cyan)" : "#E0E0E0",
                            backgroundColor: isActive ? "var(--color-cyan-faint)" : "rgba(255,255,255,0.03)",
                            border: isActive ? "1px solid var(--color-cyan-glow)" : "1px solid var(--color-border)",
                          }}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-xs text-[#666]">{link.num}.</span>
                            {link.label}
                          </span>
                          <ChevronRight size={14} className={isActive ? "text-[var(--color-cyan)]" : "text-[#666]"} />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Actions inside drawer */}
                <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
                  <Link
                    href="/links"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-2.5 rounded-xl glass border border-[var(--color-cyan-glow)] flex items-center justify-center gap-2 text-[var(--color-cyan)] font-bold"
                  >
                    <Globe size={14} /> Open Bio Hub (/links)
                  </Link>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMobileOpen(false);
                      setResumeOpen(true);
                    }}
                    className="w-full justify-center text-xs py-2.5"
                  >
                    Download Resume PDF
                  </GlowButton>
                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 2. TABLET LEFT SIDEBAR NAVIGATION (md:flex lg:hidden) ─────────── */}
      <aside
        className="hidden md:flex lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 glass border-r flex-col p-6 justify-between"
        style={{
          backgroundColor: "rgba(6, 6, 6, 0.95)",
          borderColor: "var(--color-border)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div>
          {/* Tablet Logo Header */}
          <Link
            href="#home"
            className="flex items-center gap-2 font-mono font-extrabold text-sm tracking-widest mb-8"
            style={{ color: "var(--color-cyan)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
            RD://SYSTEMS
          </Link>

          {/* Online Pill */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded font-mono text-[10px] tracking-widest font-bold mb-8"
            style={{
              color: "var(--color-success)",
              backgroundColor: "rgba(0,196,140,0.08)",
              border: "1px solid rgba(0,196,140,0.25)",
            }}
          >
            <Wifi size={10} />
            ONLINE NODE
          </div>

          {/* Vertical Menu Links */}
          <nav className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666] mb-1">
              // NAV_GATEWAY
            </span>
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2.5 rounded font-mono text-xs flex items-center justify-between transition-all"
                  style={{
                    color: isActive ? "var(--color-cyan)" : "#E0E0E0",
                    backgroundColor: isActive ? "var(--color-cyan-faint)" : "transparent",
                    border: isActive ? "1px solid var(--color-cyan-glow)" : "1px solid transparent",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] text-[#666]">{link.num}</span>
                    {link.label}
                  </span>
                  {isActive && <span className="text-[var(--color-cyan)]">●</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tablet Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <GlowButton
            variant="outline"
            size="sm"
            onClick={() => setResumeOpen(true)}
            className="w-full justify-center text-xs"
            id="tablet-resume-btn"
          >
            Resume PDF
          </GlowButton>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-1.5 font-mono text-xs text-[#666] hover:text-[#00ffc2] transition-colors"
          >
            <TerminalIcon size={12} />
            /admin
          </Link>
        </div>
      </aside>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
