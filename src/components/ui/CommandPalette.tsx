"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal,
  Sparkles,
  Palette,
  Copy,
  ExternalLink,
  FileText,
  Layers,
  Activity,
  Check,
  X,
  Globe,
  GitBranch,
  Mail,
  User,
  ChevronRight,
} from "lucide-react";
import { useTheme, THEMES, type ThemePalette } from "@/context/ThemeContext";
import { PROJECTS } from "@/data/projects";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Themes" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Close palette helper
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIdx(0);
  }, []);

  // Open palette helper
  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIdx(0);
  }, []);

  // Listen for global Cmd+K / Ctrl+K & custom events
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        close();
      }
    }

    function handleToggleEvent() {
      open();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleToggleEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleToggleEvent);
    };
  }, [isOpen, close, open]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build command items list
  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "Navigation",
      title: "Go to Home",
      subtitle: "Hero headline & overview",
      icon: User,
      action: () => {
        router.push("/#home");
        close();
      },
      keywords: ["hero", "top", "main"],
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Go to Projects",
      subtitle: "Explore production systems & repos",
      icon: Layers,
      action: () => {
        router.push("/#projects");
        close();
      },
      keywords: ["work", "code", "portfolio"],
    },
    {
      id: "nav-systems",
      category: "Navigation",
      title: "Go to System Architecture",
      subtitle: "View edge nodes & telemetry",
      icon: Activity,
      action: () => {
        router.push("/#systems");
        close();
      },
      keywords: ["infra", "nodes", "cluster"],
    },
    {
      id: "nav-terminal",
      category: "Navigation",
      title: "Open Interactive Terminal",
      subtitle: "Run CLI commands & query ARIA AI",
      icon: Terminal,
      action: () => {
        router.push("/#terminal");
        close();
      },
      keywords: ["cli", "shell", "bash", "aria", "ai"],
    },
    {
      id: "nav-links",
      category: "Navigation",
      title: "Open Dedicated Link Tree Hub",
      subtitle: "Lightweight mobile link matrix (/links)",
      icon: Globe,
      action: () => {
        router.push("/links");
        close();
      },
      keywords: ["linktree", "bio", "socials", "contact"],
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "Go to About & Architecture",
      subtitle: "Experience timeline & certifications",
      icon: FileText,
      action: () => {
        router.push("/#about");
        close();
      },
      keywords: ["experience", "bio", "skills"],
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Go to Contact / Guestbook",
      subtitle: "Send a message or hire",
      icon: Mail,
      action: () => {
        router.push("/#feedback");
        close();
      },
      keywords: ["message", "hire", "guestbook"],
    },
    {
      id: "nav-admin",
      category: "Navigation",
      title: "Go to Admin Dashboard",
      subtitle: "Analytics, flags & controls",
      icon: Sparkles,
      action: () => {
        router.push("/admin");
        close();
      },
      keywords: ["dashboard", "flags", "stats"],
    },

    // Themes
    ...Object.values(THEMES).map((th) => ({
      id: `theme-${th.id}`,
      category: "Themes" as const,
      title: `Switch Theme: ${th.name}`,
      subtitle: `Apply ${th.accent} accent palette`,
      icon: Palette,
      action: () => {
        setTheme(th.id as ThemePalette);
        close();
      },
      keywords: ["theme", "color", th.name, th.id],
    })),

    // Projects
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      category: "Projects" as const,
      title: proj.title,
      subtitle: `${proj.subtitle} (${proj.stack.slice(0, 2).join(", ")})`,
      icon: Layers,
      action: () => {
        router.push("/#projects");
        close();
      },
      keywords: [proj.title, proj.subtitle, ...proj.stack, ...proj.tags],
    })),

    // Actions
    {
      id: "act-copy-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: "ryan@ryandante.dev",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText("ryan@ryandante.dev");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        close();
      },
      keywords: ["email", "contact", "copy"],
    },
    {
      id: "act-github",
      category: "Actions",
      title: "Open GitHub Profile",
      subtitle: "github.com/ryandante",
      icon: GitBranch,
      action: () => {
        window.open("https://github.com/ryandante", "_blank");
        close();
      },
      keywords: ["github", "git", "code"],
    },
    {
      id: "act-linkedin",
      category: "Actions",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/ryandante",
      icon: ExternalLink,
      action: () => {
        window.open("https://linkedin.com/in/ryandante", "_blank");
        close();
      },
      keywords: ["linkedin", "social", "profile"],
    },
  ];

  // Filter items by search query
  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  });

  // Clamp selected index
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  // Handle arrow key navigation inside search
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIdx]) {
      e.preventDefault();
      filtered[selectedIdx].action();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-cyan-glow)] flex flex-col z-10"
            style={{ backgroundColor: "rgba(5, 5, 5, 0.95)" }}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#080808]">
              <Search size={18} className="text-[var(--color-cyan)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search (e.g. projects, theme, links)..."
                className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-[#666666]"
                spellCheck={false}
              />
              <button
                onClick={close}
                className="p-1 rounded text-[#888888] hover:text-white transition-colors"
                aria-label="Close command palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1 font-mono">
              {filtered.length > 0 ? (
                filtered.map((item, i) => {
                  const isSelected = i === selectedIdx;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIdx(i)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                        isSelected
                          ? "bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] text-[var(--color-cyan)]"
                          : "hover:bg-white/5 border border-transparent text-[#E0E0E0]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-[var(--color-cyan-faint)] text-[var(--color-cyan)] border border-[var(--color-cyan-glow)]"
                              : "bg-white/5 text-[#888888]"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-[10px] text-[#888888] mt-0.5">{item.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#666]">
                          {item.category}
                        </span>
                        <ChevronRight
                          size={14}
                          className={isSelected ? "text-[var(--color-cyan)]" : "text-[#444]"}
                        />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-[#888888]">
                  No matching commands found for &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#080808] border-t border-white/10 text-[10px] text-[#666666]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">esc</kbd> Dismiss
                </span>
              </div>
              <span className="text-[var(--color-cyan)] font-bold">
                Active Theme: {THEMES[theme]?.name ?? theme}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
