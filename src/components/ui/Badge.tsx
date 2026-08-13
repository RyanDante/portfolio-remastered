import { cn } from "@/lib/utils";
import type { ProjectStatus, LogLevel } from "@/types";

// ── Project Status Badge ───────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  PROD_READY: {
    label: "PROD_READY",
    color: "var(--color-success)",
    bg: "rgba(0,196,140,0.1)",
  },
  STABLE: {
    label: "STABLE",
    color: "var(--color-info)",
    bg: "rgba(0,212,255,0.1)",
  },
  BETA_DEV: {
    label: "BETA_DEV",
    color: "var(--color-warn)",
    bg: "rgba(255,184,0,0.1)",
  },
  ARCHIVED: {
    label: "ARCHIVED",
    color: "var(--color-muted)",
    bg: "rgba(102,102,102,0.1)",
  },
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-semibold tracking-widest uppercase",
        className
      )}
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}40` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: cfg.color }}
        aria-hidden
      />
      {cfg.label}
    </span>
  );
}

// ── Log Level Badge ────────────────────────────────────────────────────────

const LOG_CONFIG: Record<
  LogLevel,
  { color: string; bg: string }
> = {
  INFO:    { color: "var(--color-info)",    bg: "rgba(0,212,255,0.08)" },
  SUCCESS: { color: "var(--color-success)", bg: "rgba(0,196,140,0.08)" },
  WARN:    { color: "var(--color-warn)",    bg: "rgba(255,184,0,0.08)" },
  ERROR:   { color: "var(--color-error)",   bg: "rgba(255,77,77,0.08)" },
  DEBUG:   { color: "var(--color-debug)",   bg: "rgba(167,139,250,0.08)" },
};

interface LogBadgeProps {
  level: LogLevel;
  className?: string;
}

export function LogBadge({ level, className }: LogBadgeProps) {
  const cfg = LOG_CONFIG[level];
  return (
    <span
      className={cn(
        "inline-block w-16 text-center font-mono text-[9px] font-bold tracking-widest uppercase py-0.5 rounded",
        className
      )}
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}30` }}
    >
      {level}
    </span>
  );
}

// ── Generic Tag Badge ──────────────────────────────────────────────────────

interface TagBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TagBadge({ children, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-mono rounded",
        className
      )}
      style={{
        color: "var(--color-cyan)",
        backgroundColor: "var(--color-cyan-faint)",
        border: "1px solid var(--color-cyan-glow)",
      }}
    >
      {children}
    </span>
  );
}
