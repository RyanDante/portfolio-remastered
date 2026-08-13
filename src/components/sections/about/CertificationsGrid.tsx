"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "@/data/skills";

export default function CertificationsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CERTIFICATIONS.map((cert, i) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -4 }}
          className="glass rounded-xl p-5 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.85)" }}
        >
          {/* Holographic glow accent corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-cyan)]/20 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-cyan-faint)] border border-[var(--color-cyan-glow)] flex items-center justify-center text-[var(--color-cyan)]">
                <Award size={16} />
              </div>
              <span className="font-mono text-xs font-bold text-[var(--color-cyan)]">
                {cert.year}
              </span>
            </div>

            <h4 className="font-bold text-sm text-white mb-1 leading-snug group-hover:text-[var(--color-cyan)] transition-colors">
              {cert.name}
            </h4>
            <p className="font-mono text-[11px] text-[#888888] mb-3">
              {cert.issuer}
            </p>

            {/* Verified Skills */}
            <div className="flex flex-wrap gap-1 mb-4">
              {cert.skillsVerified.map((sk) => (
                <span
                  key={sk}
                  className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-[#CCCCCC] border border-white/10"
                >
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[10px]">
            <span className="text-[#666666]">ID: {cert.credentialId}</span>
            <span className="text-[var(--color-success)] flex items-center gap-1 font-bold">
              VERIFIED <ExternalLink size={10} />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
