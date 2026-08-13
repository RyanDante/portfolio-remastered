"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home, AlertOctagon } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,184,0,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{
            backgroundColor: "rgba(255,184,0,0.08)",
            border: "1px solid rgba(255,184,0,0.3)",
            boxShadow: "0 0 24px rgba(255,184,0,0.1)",
          }}
        >
          <AlertOctagon size={28} style={{ color: "var(--color-warn)" }} />
        </div>

        <p
          className="font-mono text-[10px] tracking-widest mb-3"
          style={{ color: "var(--color-warn)" }}
        >
          // RUNTIME_EXCEPTION_CAUGHT
        </p>

        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Something went{" "}
          <span style={{ color: "var(--color-warn)" }}>wrong</span>
        </h1>

        <p className="text-sm mb-4" style={{ color: "var(--color-muted-light)" }}>
          An unexpected runtime error occurred. The error boundary has intercepted it.
        </p>

        {error.message && (
          <div
            className="w-full rounded-lg p-3 mb-6 text-left"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid rgba(255,184,0,0.2)",
            }}
          >
            <p className="font-mono text-[10px] mb-1" style={{ color: "var(--color-muted)" }}>
              error.message
            </p>
            <p className="font-mono text-xs" style={{ color: "var(--color-warn)" }}>
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-[10px] mt-1" style={{ color: "var(--color-muted)" }}>
                digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3 flex-wrap justify-center">
          <GlowButton
            variant="primary"
            size="md"
            icon={<RotateCcw size={14} />}
            onClick={reset}
            id="error-retry-btn"
          >
            Try Again
          </GlowButton>
          <GlowButton
            variant="ghost"
            size="md"
            icon={<Home size={14} />}
            onClick={() => (window.location.href = "/")}
            id="error-home-btn"
          >
            Return Home
          </GlowButton>
        </div>
      </motion.div>
    </div>
  );
}
