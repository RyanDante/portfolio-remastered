"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PROJECT_REVIEWS } from "@/data/projects";

export default function ReviewMarquee() {
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
