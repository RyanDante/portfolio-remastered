"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { LogEntry, LogLevel } from "@/types";
import { genId, generateTimestamp } from "@/lib/utils";

const LOG_SOURCES = [
  "KERNEL",
  "NET::MONITOR",
  "AUTH::SVC",
  "DB::POOL",
  "CACHE",
  "API::ROUTER",
  "SCHEDULER",
  "HEALTH::CHK",
];

const LOG_TEMPLATES: { level: LogLevel; messages: string[] }[] = [
  {
    level: "INFO",
    messages: [
      "Connection pool saturation: 23/100 active threads",
      "Cache hit ratio: 94.2% — optimal performance",
      "Health check passed — all 8 services nominal",
      "Scheduled job SYNC_PROJECTS completed in 142ms",
      "Edge node geo-routed to region: EU-WEST-1",
      "SSL certificate renewed — expires 2026-09-12",
      "Compiled 847 RSC payloads — avg 12ms/payload",
      "Garbage collection cycle complete — freed 48MB",
    ],
  },
  {
    level: "SUCCESS",
    messages: [
      "Deployment DLA_v4.0.2 → PROD completed successfully",
      "Firebase snapshot restored — 0 records lost",
      "Rate limit rules updated — 1000 req/min enforced",
      "Auth token refresh batch: 2,401 sessions extended",
    ],
  },
  {
    level: "WARN",
    messages: [
      "Memory pressure detected — RSS at 78% threshold",
      "API rate limit approaching: 847/1000 req/min",
      "Slow query detected: feedback_entries scan 420ms",
      "DNS TTL expiry in 10min — prefetch queued",
      "Gemini API latency spike: p99 = 1.8s (threshold 1s)",
    ],
  },
  {
    level: "ERROR",
    messages: [
      "Firestore write failed — retrying (attempt 2/3)",
      "Circuit breaker OPEN — downstream timeout exceeded",
      "CORS policy violation blocked request from origin",
    ],
  },
  {
    level: "DEBUG",
    messages: [
      "Request trace: GET /api/projects → 200 in 34ms",
      "Auth middleware resolved user: admin@portfolio.dev",
      "Cache miss for key: projects::list — fetching origin",
    ],
  },
];

function generateLog(): LogEntry {
  const template =
    LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
  const messages = template.messages;
  return {
    id: genId(),
    level: template.level,
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: generateTimestamp(),
    source: LOG_SOURCES[Math.floor(Math.random() * LOG_SOURCES.length)],
  };
}

const INITIAL_LOGS: LogEntry[] = Array.from({ length: 12 }, generateLog);

/**
 * Generates a live-updating stream of fake system log entries.
 */
export function useSystemLogs(maxEntries = 80, intervalMs = 2200) {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pushLog = useCallback((entry?: LogEntry) => {
    const newLog = entry ?? generateLog();
    setLogs((prev) => [newLog, ...prev].slice(0, maxEntries));
  }, [maxEntries]);

  useEffect(() => {
    intervalRef.current = setInterval(() => pushLog(), intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pushLog, intervalMs]);

  return { logs, pushLog };
}
