"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity, CheckCircle2, Cpu } from "lucide-react";
import { ARCHITECTURE_PRINCIPLES } from "@/data/skills";

const PRINCIPLE_ICONS: Record<string, React.ElementType> = {
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
};

export default function ArchitecturePrinciples() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ARCHITECTURE_PRINCIPLES.map((pr, i) => {
        const IconComp = PRINCIPLE_ICONS[pr.icon] ?? Cpu;
        return (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass rounded-xl p-5 border border-white/10 flex flex-col justify-between"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }}
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-cyan-faint)] to-white/5 border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)] mb-3">
                <IconComp size={18} />
              </div>
              <h4 className="font-bold text-base text-white mb-1">
                {pr.title}
              </h4>
              <p className="font-mono text-xs text-[var(--color-cyan)] font-semibold mb-2">
                {pr.tagline}
              </p>
              <p className="text-xs text-[#CCCCCC] leading-relaxed mb-4">
                {pr.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-[var(--color-success)] font-bold">
              {pr.metrics}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
