"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { LogBadge } from "@/components/ui/Badge";
import { useSystemLogs } from "@/hooks/useSystemLogs";
import type { LogLevel } from "@/types";

const FILTER_LEVELS: (LogLevel | "ALL")[] = ["ALL", "INFO", "SUCCESS", "WARN", "ERROR", "DEBUG"];

export default function LogsSection() {
  const { logs } = useSystemLogs(60, 2400);
  const [filter, setFilter] = useState<LogLevel | "ALL">("ALL");
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "ALL" ? logs : logs.filter((l) => l.level === filter);

  // Internal container scroll only — never scroll the main page window
  useEffect(() => {
    if (!paused && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, paused]);

  return (
    <SectionWrapper id="logs" label="// 04 — LOGS">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            Live{" "}
            <span style={{ color: "var(--color-cyan)" }}>System Logs</span>
          </h2>
          <p className="text-sm" style={{ color: "var(--color-muted-light)" }}>
            Real-time event stream from the portfolio infrastructure.
          </p>
        </div>

        {/* Controls */}
        <div className="sm:ml-auto flex items-center gap-2 flex-wrap">
          {/* Pause / resume */}
          <button
            onClick={() => setPaused((p) => !p)}
            className="font-mono text-[10px] px-2.5 py-1.5 rounded transition-colors cursor-pointer"
            style={{
              color: paused ? "var(--color-warn)" : "var(--color-success)",
              backgroundColor: paused ? "rgba(255,184,0,0.08)" : "rgba(0,196,140,0.08)",
              border: `1px solid ${paused ? "rgba(255,184,0,0.3)" : "rgba(0,196,140,0.3)"}`,
            }}
            id="logs-pause-btn"
          >
            {paused ? "▶ RESUME" : "⏸ PAUSE"}
          </button>

          {/* Level filters */}
          <div className="flex items-center gap-1">
            {FILTER_LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className="font-mono text-[9px] px-2 py-1 rounded transition-all cursor-pointer"
                style={{
                  color: filter === lvl ? "var(--color-cyan)" : "var(--color-muted)",
                  backgroundColor: filter === lvl ? "var(--color-cyan-faint)" : "transparent",
                  border: `1px solid ${filter === lvl ? "var(--color-cyan-glow)" : "var(--color-border)"}`,
                }}
                id={`logs-filter-${lvl.toLowerCase()}`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Log container */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--color-muted)" }}>
            /var/log/portfolio.log
          </span>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "var(--color-success)",
                animation: paused ? "none" : "glow-pulse 2s ease-in-out infinite",
              }}
            />
            <span className="font-mono text-[10px]" style={{ color: "var(--color-success)" }}>
              {filtered.length} entries
            </span>
          </div>
        </div>

        {/* Scrollable log area - internal scroll only */}
        <div ref={containerRef} className="h-80 overflow-y-auto p-4 space-y-1.5 font-mono text-xs">
          <AnimatePresence initial={false}>
            {filtered.slice().reverse().map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 rounded px-2 py-1 hover:bg-white/[0.02] transition-colors"
              >
                <span className="shrink-0 mt-0.5" style={{ color: "var(--color-muted)", minWidth: "5.5rem" }}>
                  {log.timestamp}
                </span>
                <LogBadge level={log.level} />
                <span
                  className="shrink-0 min-w-[6rem]"
                  style={{ color: "var(--color-muted)" }}
                >
                  {log.source}
                </span>
                <span style={{ color: "var(--color-text)" }}>{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
