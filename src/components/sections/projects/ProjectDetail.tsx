"use client";

import Image from "next/image";
import {
  ExternalLink,
  GitBranch,
  Layers,
  Cpu,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { StatusBadge, TagBadge } from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";
import type { Project } from "@/types";

export default function ProjectDetail({ project }: { project: Project }) {
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
