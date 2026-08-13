"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  ChevronRight,
  Layers,
  Cpu,
  CheckCircle2,
  BarChart3,
  Search,
  Star,
  Play,
  Filter,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SlideOver from "@/components/ui/SlideOver";
import { StatusBadge, TagBadge } from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";
import type { Project, ProjectReview } from "@/types";
import { PROJECTS, PROJECT_REVIEWS } from "@/data/projects";

const CATEGORIES = ["ALL", "DISTRIBUTED", "AI / ML", "SECURITY", "CLOUD / EDGE"] as const;

// ── Infinite Marquee Carousel for Project Reviews ────────────────────────────

function ReviewMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const doubleReviews = [...PROJECT_REVIEWS, ...PROJECT_REVIEWS];

  return (
    <div className="mb-12 overflow-hidden relative w-full py-3">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {doubleReviews.map((rev, i) => (
          <div
            key={`${rev.id}-${i}`}
            className="w-80 shrink-0 glass rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-cyan-glow)] transition-colors flex flex-col justify-between"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.75)" }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] text-[var(--color-cyan)] font-bold tracking-wider uppercase">
                  // {rev.projectTitle}
                </span>
                <div className="flex gap-0.5 text-[#ffb800]">
                  {Array.from({ length: rev.rating }).map((_, r) => (
                    <Star key={r} size={10} fill="#ffb800" />
                  ))}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#CCCCCC] italic mb-3">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <div className="w-6 h-6 rounded-full bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] flex items-center justify-center font-mono text-[10px] text-[var(--color-cyan)] font-bold">
                {rev.author[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-white leading-tight">
                  {rev.author}
                </p>
                <p className="font-mono text-[9px] text-[#888888]">
                  {rev.role} · {rev.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Enhanced 3D Project Card ───────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        borderColor: `${project.color}60`,
        boxShadow: `0 12px 35px ${project.color}20, 0 4px 24px rgba(0,0,0,0.6)`,
      }}
      onClick={onClick}
      className="group relative glass rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "rgba(10, 10, 10, 0.8)",
      }}
      aria-label={`View ${project.title} project details`}
    >
      {/* Project Thumbnail Image Header */}
      <div className="relative w-full h-44 overflow-hidden bg-[#050505]">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover object-center filter contrast-105 transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-mono text-xs"
            style={{ backgroundColor: `${project.color}15`, color: project.color }}
          >
            [ MEDIA_ASSET: {project.title} ]
          </div>
        )}

        {/* Thumbnail Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[10px] px-2 py-0.5 rounded glass font-bold text-white">
            {project.year}
          </span>
        </div>

        {/* Video Preview Badge */}
        <div className="absolute bottom-3 right-3 glass px-2 py-1 rounded flex items-center gap-1.5 font-mono text-[10px] text-white opacity-80 group-hover:opacity-100 transition-opacity">
          <Play size={10} fill="white" />
          <span>PREVIEW</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-xl font-bold mb-1 transition-colors group-hover:text-glow"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>
          <p className="text-xs mb-3 font-mono text-[#888888]">
            {project.subtitle}
          </p>
          <p className="text-xs leading-relaxed mb-4 text-[#CCCCCC] line-clamp-2">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag}>{tag}</TagBadge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex gap-1.5 flex-wrap">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] text-[#888888]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              style={{ color: project.color }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ── SlideOver Detail Panel ─────────────────────────────────────────────────

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-[#888888]">
            {project.year} · {project.category}
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-1" style={{ color: project.color }}>
          {project.title}
        </h2>
        <p className="text-sm text-[#AAAAAA]">{project.subtitle}</p>
      </div>

      {/* Main Thumbnail / Media Gallery */}
      {project.thumbnailUrl && (
        <div className="relative w-full h-56 rounded-xl overflow-hidden border border-white/10">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Description */}
      <p className="text-sm leading-relaxed text-[#E0E0E0]">
        {project.longDescription}
      </p>

      {/* Stats */}
      <div>
        <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest mb-3 text-[var(--color-cyan)] font-bold">
          <BarChart3 size={14} /> LIVE PERFORMANCE METRICS
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-3 glass border border-white/10"
            >
              <div className="font-mono text-lg font-bold" style={{ color: project.color }}>
                {stat.value}
                {stat.unit && (
                  <span className="text-xs ml-0.5 text-[#888888]">
                    {stat.unit}
                  </span>
                )}
              </div>
              <div className="font-mono text-[10px] mt-0.5 text-[#888888]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest mb-3 text-[var(--color-cyan)] font-bold">
          <Cpu size={14} /> ARCHITECTURE SPEC
        </h3>
        <div className="p-4 rounded-lg font-mono text-xs leading-relaxed bg-black/60 border border-white/10 text-white">
          {project.architecture}
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest mb-3 text-[var(--color-cyan)] font-bold">
          <CheckCircle2 size={14} /> KEY FEATURES
        </h3>
        <ul className="space-y-2">
          {project.features.map((feat, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[#E0E0E0]"
            >
              <span className="mt-0.5 text-[var(--color-success)] shrink-0">✓</span>
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest mb-3 text-[var(--color-cyan)] font-bold">
          <Layers size={14} /> TECH STACK
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TagBadge key={tech}>{tech}</TagBadge>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
        {project.links.map((link) => (
          <GlowButton
            key={link.label}
            variant={link.icon === "github" ? "ghost" : "outline"}
            size="sm"
            icon={link.icon === "github" ? <GitBranch size={14} /> : <ExternalLink size={14} />}
            onClick={() => window.open(link.url, "_blank")}
            id={`project-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
          >
            {link.label}
          </GlowButton>
        ))}
      </div>
    </div>
  );
}

// ── Main Projects Section Component ───────────────────────────────────────

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("ALL");
  const [selectedTech, setSelectedTech] = useState<string>("ALL");
  const [maxDisplay, setMaxDisplay] = useState(6);

  // Extract all unique tech stack & tags dynamically from active projects
  const availableTech = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => {
      if (!p.archived) {
        p.stack.forEach((s) => set.add(s));
        p.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set).sort();
  }, []);

  // Filter projects by search query, category, and tech stack
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (p.archived) return false;
      const matchesCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;
      const matchesTech =
        selectedTech === "ALL" ||
        p.stack.includes(selectedTech) ||
        p.tags.includes(selectedTech);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.stack.some((s) => s.toLowerCase().includes(query)) ||
        p.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedTech]);

  const visibleProjects = filteredProjects.slice(0, maxDisplay);

  return (
    <>
      <SectionWrapper id="projects" label="// 02 — FEATURED PROJECTS">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
            Featured <span style={{ color: "var(--color-cyan)" }}>Systems & Projects</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-[#AAAAAA]">
            Production software, open-source frameworks, and quantum research systems. Select any card for full architecture specs.
          </p>
        </div>

        {/* Reviews Infinite Marquee Carousel */}
        <ReviewMarquee />

        {/* Search Bar & Category Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs text-[#888888] mr-1 flex items-center gap-1">
              <Filter size={12} /> Domain:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setMaxDisplay(6);
                }}
                className="font-mono text-xs px-3 py-1.5 rounded transition-all cursor-pointer"
                style={{
                  color: selectedCategory === cat ? "var(--color-cyan)" : "#AAAAAA",
                  backgroundColor: selectedCategory === cat ? "var(--color-cyan-faint)" : "rgba(10,10,10,0.6)",
                  border: `1px solid ${selectedCategory === cat ? "var(--color-cyan-glow)" : "var(--color-border)"}`,
                }}
                id={`project-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative min-w-[260px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech, name, tag..."
              className="w-full pl-9 pr-4 py-2 rounded glass border border-[var(--color-border)] font-mono text-xs text-white outline-none focus:border-[var(--color-cyan)]"
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Tech Stack & Language Filter Pills Bar */}
        <div className="mb-8 p-3 rounded-xl glass border border-white/10 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] text-[var(--color-cyan)] uppercase font-bold flex items-center gap-1 shrink-0">
            <Cpu size={12} /> Tech Stack:
          </span>
          <button
            onClick={() => setSelectedTech("ALL")}
            className={`font-mono text-[10px] px-2.5 py-1 rounded transition-all cursor-pointer ${
              selectedTech === "ALL"
                ? "bg-[var(--color-cyan-faint)] text-[var(--color-cyan)] border border-[var(--color-cyan-glow)] font-bold"
                : "bg-white/5 text-[#888888] hover:text-white"
            }`}
          >
            All Stack
          </button>
          {availableTech.map((tech) => (
            <button
              key={tech}
              onClick={() => {
                setSelectedTech(tech);
                setMaxDisplay(6);
              }}
              className={`font-mono text-[10px] px-2.5 py-1 rounded transition-all cursor-pointer ${
                selectedTech === tech
                  ? "bg-[var(--color-cyan-faint)] text-[var(--color-cyan)] border border-[var(--color-cyan-glow)] font-bold"
                  : "bg-white/5 text-[#888888] hover:text-white border border-transparent"
              }`}
            >
              {tech}
            </button>
          ))}
          {(selectedTech !== "ALL" || selectedCategory !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTech("ALL");
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="ml-auto font-mono text-[10px] text-[var(--color-warn)] underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Projects Grid (Max 6 Paginated) */}
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center glass rounded-xl border border-white/10 font-mono text-sm text-[#888888]">
            No projects found matching &ldquo;{searchQuery}&rdquo;. Try another filter or search term.
          </div>
        )}

        {/* Show More / Show All Pagination Button */}
        {filteredProjects.length > maxDisplay && (
          <div className="mt-10 text-center">
            <GlowButton
              variant="outline"
              size="md"
              onClick={() => setMaxDisplay((prev) => prev + 6)}
              id="projects-show-more-btn"
            >
              Show More Projects ({filteredProjects.length - maxDisplay} remaining)
            </GlowButton>
          </div>
        )}
      </SectionWrapper>

      {/* Slide-over Detail View */}
      <SlideOver
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
      >
        {selected && <ProjectDetail project={selected} />}
      </SlideOver>
    </>
  );
}
