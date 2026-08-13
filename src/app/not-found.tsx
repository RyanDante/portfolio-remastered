"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Terminal } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const GLITCH_CHARS = "!@#$%^&*<>[]{}|\\";

function glitch(text: string) {
  return text
    .split("")
    .map((c) =>
      Math.random() < 0.15
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : c
    )
    .join("");
}

const ASCII_ART = `
 ██████╗ ██╗  ██╗ ██████╗ ██╗  ██╗
██╔═══██╗██║  ██║██╔═══██╗██║  ██║
██║   ██║███████║██║   ██║███████║
██║▄▄ ██║╚════██║██║   ██║╚════██║
╚██████╔╝     ██║╚██████╔╝     ██║
 ╚══▀▀═╝      ╚═╝ ╚═════╝      ╚═╝
`.trim();

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,77,77,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
      >
        {/* ASCII art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-mono text-[10px] sm:text-xs leading-tight mb-6"
          style={{ color: "var(--color-error)", textShadow: "0 0 12px rgba(255,77,77,0.5)" }}
          aria-label="404"
        >
          {ASCII_ART}
        </motion.pre>

        {/* Error label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-[10px] tracking-widest mb-4"
          style={{ color: "var(--color-error)" }}
        >
          // ERROR_CODE: ROUTE_NOT_FOUND
        </motion.p>

        {/* Terminal-style error */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass rounded-lg p-5 mb-8 w-full max-w-md text-left"
          style={{ border: "1px solid rgba(255,77,77,0.3)", boxShadow: "0 0 24px rgba(255,77,77,0.08)" }}
        >
          <p className="font-mono text-[10px] mb-3" style={{ color: "var(--color-muted)" }}>
            /var/log/portfolio.log
          </p>
          {[
            { label: "[KERNEL]", msg: "Segmentation fault: route table miss" },
            { label: "[ROUTER]", msg: "404 — requested path not found in manifest" },
            { label: "[KERNEL]", msg: "Core dumped. Recovery initiated..." },
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="font-mono text-xs leading-5"
              style={{ color: i === 1 ? "var(--color-error)" : "var(--color-muted-light)" }}
            >
              <span style={{ color: "var(--color-error)", opacity: 0.7 }}>{line.label}</span>{" "}
              {line.msg}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="font-mono text-xs mt-2"
            style={{ color: "var(--color-success)" }}
          >
            [RECOVERY] System stable — navigate to a valid route
          </motion.p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Page{" "}
          <span style={{ color: "var(--color-error)" }}>not found</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm mb-8"
          style={{ color: "var(--color-muted-light)" }}
        >
          The route you&apos;re looking for doesn&apos;t exist in this system.
          It may have been moved, archived, or deleted.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <GlowButton
            variant="primary"
            size="md"
            icon={<Home size={14} />}
            id="notfound-home-btn"
          >
            <Link href="/">Return Home</Link>
          </GlowButton>
          <GlowButton
            variant="ghost"
            size="md"
            icon={<Terminal size={14} />}
            id="notfound-terminal-btn"
          >
            <Link href="/#terminal">Open Terminal</Link>
          </GlowButton>
        </motion.div>

        {/* Path indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-mono text-[10px] mt-8"
          style={{ color: "var(--color-muted)" }}
        >
          SYSTEM_BUILD_DLA VER 4.0.2 — STATUS: RECOVERED
        </motion.p>
      </motion.div>
    </div>
  );
}
