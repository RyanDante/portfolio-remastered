"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SYSTEM_NODES, SYSTEM_STATS } from "@/data/systems";

const NODE_TYPE_COLORS: Record<string, string> = {
  frontend: "var(--color-cyan)",
  api:      "var(--color-success)",
  database: "var(--color-warn)",
  service:  "var(--color-info)",
  infra:    "var(--color-muted-light)",
  tool:     "var(--color-debug)",
};

const NODE_TYPE_BG: Record<string, string> = {
  frontend: "rgba(0,255,194,0.06)",
  api:      "rgba(0,196,140,0.06)",
  database: "rgba(255,184,0,0.06)",
  service:  "rgba(0,212,255,0.06)",
  infra:    "rgba(136,136,136,0.06)",
  tool:     "rgba(167,139,250,0.06)",
};

export default function SystemsSection() {
  return (
    <SectionWrapper id="systems" label="// 03 — SYSTEMS">
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
          System{" "}
          <span style={{ color: "var(--color-cyan)" }}>Architecture</span>
        </h2>
        <p className="max-w-xl text-sm" style={{ color: "var(--color-muted-light)" }}>
          Live infrastructure overview — microservices, databases, AI, and edge compute nodes powering this portfolio.
        </p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {Object.entries(SYSTEM_STATS).map(([key, val], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="glass rounded-lg p-3 flex flex-col gap-1"
          >
            <span
              className="font-mono text-base font-bold"
              style={{ color: "var(--color-cyan)" }}
            >
              {String(val)}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-wide"
              style={{ color: "var(--color-muted)" }}
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Nodes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SYSTEM_NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className="rounded-lg p-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200"
            style={{
              backgroundColor: NODE_TYPE_BG[node.type] ?? "rgba(10,10,10,0.8)",
              border: `1px solid ${NODE_TYPE_COLORS[node.type]}25`,
            }}
          >
            {/* Status dot */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                style={{
                  color: NODE_TYPE_COLORS[node.type],
                  backgroundColor: `${NODE_TYPE_COLORS[node.type]}15`,
                  border: `1px solid ${NODE_TYPE_COLORS[node.type]}30`,
                }}
              >
                {node.type}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      node.status === "online"
                        ? "var(--color-success)"
                        : node.status === "degraded"
                        ? "var(--color-warn)"
                        : "var(--color-error)",
                    animation: node.status === "online" ? "glow-pulse 2s ease-in-out infinite" : undefined,
                  }}
                />
                <span
                  className="font-mono text-[9px] uppercase"
                  style={{
                    color:
                      node.status === "online"
                        ? "var(--color-success)"
                        : node.status === "degraded"
                        ? "var(--color-warn)"
                        : "var(--color-error)",
                  }}
                >
                  {node.status}
                </span>
              </div>
            </div>

            <h3
              className="font-bold text-sm mb-1"
              style={{ color: NODE_TYPE_COLORS[node.type] }}
            >
              {node.label}
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-muted-light)" }}>
              {node.description}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1">
              {node.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                  style={{
                    color: "var(--color-muted)",
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Connection lines indicator */}
            <div
              className="absolute bottom-2 right-2 flex items-center gap-1 opacity-50"
              aria-hidden
            >
              <Activity size={10} style={{ color: NODE_TYPE_COLORS[node.type] }} />
              <span className="font-mono text-[9px]" style={{ color: NODE_TYPE_COLORS[node.type] }}>
                {node.connections.length} conn
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
