"use client";

import { motion } from "framer-motion";
import { TagBadge } from "@/components/ui/Badge";
import { EXPERIENCE_TIMELINE } from "@/data/skills";

export default function Timeline() {
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
