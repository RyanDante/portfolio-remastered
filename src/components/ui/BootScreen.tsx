"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/data/site";

interface BootScreenProps {
  onComplete: () => void;
}

const AUTO_DISMISS_MS = 1200;

export default function BootScreen({ onComplete }: BootScreenProps) {
  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem("has_booted", "true");
    } catch {
      /* sessionStorage unavailable */
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(finishBoot, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [finishBoot]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === "Escape") finishBoot();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [finishBoot]);

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={finishBoot}
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none min-h-screen px-4"
      style={{
        backgroundColor: "var(--color-bg)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      title="Click or press Enter to skip"
    >
      <div className="flex flex-col items-center text-center gap-6 max-w-sm">
        {/* Monogram */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass border flex items-center justify-center"
          style={{
            borderColor: "var(--color-cyan-glow)",
            boxShadow: "0 0 40px var(--color-cyan-glow)",
          }}
        >
          <span
            className="font-mono font-black text-2xl sm:text-3xl tracking-widest"
            style={{ color: "var(--color-cyan)" }}
          >
            RD
          </span>
          <span
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-cyan)] animate-pulse"
            aria-hidden
          />
        </motion.div>

        {/* Name & status */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-2"
        >
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {SITE.name}
          </h1>
          <p
            className="font-mono text-xs sm:text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            Loading portfolio…
          </p>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] text-[#666]"
        >
          tap to skip
        </motion.span>
      </div>
    </motion.div>
  );
}
