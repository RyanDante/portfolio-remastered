"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Cpu } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SlideOver from "@/components/ui/SlideOver";
import GlowButton from "@/components/ui/GlowButton";
import type { Project } from "@/types";
import { PROJECTS } from "@/data/projects";

import ReviewMarquee from "./ReviewMarquee";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

const CATEGORIES = ["ALL", "DISTRIBUTED", "AI / ML", "SECURITY", "CLOUD / EDGE"] as const;

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
