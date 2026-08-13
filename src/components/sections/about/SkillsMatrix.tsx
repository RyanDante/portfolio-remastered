"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/data/skills";

export default function SkillsMatrix() {
  return (
    <div className="space-y-8">
      {SKILLS.map((cat, ci) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: ci * 0.08, duration: 0.5 }}
        >
          <h4
            className="font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2 font-bold"
            style={{ color: "var(--color-cyan)" }}
          >
            // {cat.category}
          </h4>
          <div className="space-y-3">
            {cat.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="w-40 shrink-0 font-mono text-xs text-[#E0E0E0]">
                  {skill.name}
                </span>
                {/* Bar */}
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, var(--color-cyan), var(--color-success))`,
                      boxShadow: "0 0 8px var(--color-cyan-dim)",
                    }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-[10px] text-[#888888]">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
