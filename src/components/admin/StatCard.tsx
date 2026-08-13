"use client";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: StatCardProps) {
  return (
    <div
      className="glass rounded-lg p-4 flex flex-col gap-2"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center gap-2">
        <Icon size={14} style={{ color: "var(--color-cyan)" }} />
        <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--color-muted)" }}>
          {label}
        </span>
      </div>
      <span className="text-2xl font-bold font-mono" style={{ color: "var(--color-text)" }}>
        {value}
      </span>
      {sub && <span className="font-mono text-[10px]" style={{ color: "var(--color-success)" }}>{sub}</span>}
    </div>
  );
}
