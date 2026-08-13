"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import { StatusBadge, TagBadge } from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
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
