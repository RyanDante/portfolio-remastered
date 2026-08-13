"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, Filter } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface FAQItem {
  id: string;
  category: "HIRING & ROLES" | "CLIENT PROJECTS" | "TECH & PROCESS" | "SECURITY & SLAS";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "roles-avail",
    category: "HIRING & ROLES",
    question: "What roles are you open to for full-time or contract work?",
    answer:
      "I am available for Principal Systems Architect, Lead Full-Stack Engineer, or AI Integration Lead positions. I accept full-time roles, strategic consulting, and contract engineering projects. Work setup preference is Remote Worldwide or Hybrid in London, UK.",
  },
  {
    id: "turnaround-time",
    category: "CLIENT PROJECTS",
    question: "How quickly can you deliver a custom web application or MVP?",
    answer:
      "A typical full-stack web application MVP (Next.js 16, React 19, Tailwind v4, Database & Auth) takes 2 to 4 weeks from discovery to production deployment. Smaller feature implementations or performance audits can be delivered in 3 to 7 days.",
  },
  {
    id: "ai-integration",
    category: "TECH & PROCESS",
    question: "Can you integrate Google Gemini AI or LLM features into our existing product?",
    answer:
      "Yes! I specialize in server-side AI integrations using Gemini 2.0 API, Retrieval-Augmented Generation (RAG) with vector search, and autonomous AI agents. I can embed intelligent search, auto-generation, or chat capabilities cleanly into your existing stack.",
  },
  {
    id: "sla-communication",
    category: "SECURITY & SLAS",
    question: "What are your communication SLAs and response times?",
    answer:
      "I guarantee a response window under 12 hours for all active clients and hiring inquiries. Throughout active builds, I provide daily async progress updates and staging previews so you have 100% visibility into development.",
  },
  {
    id: "ip-ownership",
    category: "CLIENT PROJECTS",
    question: "Who owns the code and intellectual property after build?",
    answer:
      "You own 100% of the source code, repository rights, database schemas, and intellectual property. Upon final milestone approval, all repository access and production deployment credentials are transferred directly to your organization.",
  },
  {
    id: "tech-stack-pref",
    category: "TECH & PROCESS",
    question: "What primary technology stacks do you specialize in?",
    answer:
      "My core stack includes Next.js 16, React 19, TypeScript, Tailwind CSS v4, Node.js, Go, Rust, PostgreSQL, Redis, Docker, and Google Gemini AI APIs. I strictly enforce clean type safety, sub-second latency, and responsive glassmorphism design.",
  },
  {
    id: "post-launch-warranty",
    category: "CLIENT PROJECTS",
    question: "Do you provide ongoing support after project launch?",
    answer:
      "Every client project includes a complimentary 30-day post-launch warranty covering bug fixes, minor tweaks, and deployment stabilization. Ongoing monthly retainer options are also available for continuous feature development.",
  },
  {
    id: "get-started",
    category: "SECURITY & SLAS",
    question: "How do we get started on a project or schedule an interview?",
    answer:
      "Simply fill out the Contact / Guestbook form below, email me directly at ryan@ryandante.dev, or use the Command Palette (Cmd+K) to grab my contact details. We'll set up a brief 15-minute intro call to align on scope and next steps.",
  },
];

const CATEGORIES = ["ALL", "HIRING & ROLES", "CLIENT PROJECTS", "TECH & PROCESS", "SECURITY & SLAS"] as const;

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(["roles-avail", "turnaround-time"]));

  function toggleFAQ(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <SectionWrapper id="faq" label="// 05 — FREQUENTLY ASKED QUESTIONS">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
          Frequently Asked <span style={{ color: "var(--color-cyan)" }}>Questions</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#AAAAAA]">
          Everything you need to know about working together — hiring options, client engagements, tech stack, and SLAs.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-xs text-[#888888] mr-1 flex items-center gap-1">
            <Filter size={12} /> Topic:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[var(--color-cyan-faint)] text-[var(--color-cyan)] border border-[var(--color-cyan-glow)] font-bold"
                  : "bg-white/5 text-[#AAAAAA] border border-transparent hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. roles, AI, SLA)..."
            className="w-full pl-9 pr-4 py-2 rounded glass border border-[var(--color-border)] font-mono text-xs text-white outline-none focus:border-[var(--color-cyan)]"
            aria-label="Search FAQ"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div
                key={item.id}
                className="glass rounded-xl overflow-hidden border border-[var(--color-border)] transition-all duration-200"
                style={{
                  backgroundColor: isOpen ? "rgba(10, 10, 10, 0.9)" : "rgba(10, 10, 10, 0.7)",
                  borderColor: isOpen ? "var(--color-cyan-glow)" : "var(--color-border)",
                }}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-[var(--color-cyan)] shrink-0" />
                    <div>
                      <span className="font-mono text-[9px] text-[#888888] font-bold tracking-wider block mb-0.5">
                        // {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[#888888]"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-4 pt-1 border-t border-white/5 font-mono text-xs sm:text-sm text-[#CCCCCC] leading-relaxed pl-12">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center glass rounded-xl border border-white/10 font-mono text-xs text-[#888888]">
            No FAQ questions found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
