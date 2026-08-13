"use client";

import { useState } from "react";
import GlowButton from "@/components/ui/GlowButton";

export default function PushLogForm() {
  const [msg, setMsg] = useState("");
  const [level, setLevel] = useState("INFO");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setMsg("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-mono text-[10px] tracking-widest mb-1.5" style={{ color: "var(--color-cyan)" }}>
          LEVEL
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-3 py-2 rounded font-mono text-xs outline-none"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          {["INFO", "SUCCESS", "WARN", "ERROR", "DEBUG"].map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-mono text-[10px] tracking-widest mb-1.5" style={{ color: "var(--color-cyan)" }}>
          MESSAGE
        </label>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="System alert message..."
          required
          className="w-full px-3 py-2 rounded font-mono text-xs outline-none"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        />
      </div>
      <GlowButton type="submit" variant="primary" size="sm" id="admin-push-log-btn">
        {sent ? "✓ Pushed" : "Push Log Entry"}
      </GlowButton>
    </form>
  );
}
