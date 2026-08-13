"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Globe, Zap, Cpu, Server, Wifi } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { TagBadge } from "@/components/ui/Badge";
import type { EdgeTelemetryNode } from "@/types";

const EDGE_NODES: EdgeTelemetryNode[] = [
  { region: "EU-WEST-1", city: "London", latencyMs: 14, loadPercent: 32, status: "optimal" },
  { region: "US-EAST-1", city: "N. Virginia", latencyMs: 42, loadPercent: 48, status: "optimal" },
  { region: "AP-NORTHEAST-1", city: "Tokyo", latencyMs: 88, loadPercent: 64, status: "optimal" },
  { region: "EU-CENTRAL-1", city: "Frankfurt", latencyMs: 22, loadPercent: 28, status: "optimal" },
];

const TELEMETRY_FEED = [
  { id: "1", time: "13:52:10", region: "EU-WEST-1", event: "RSC Payload Compiled", latency: "11ms" },
  { id: "2", time: "13:52:12", region: "US-EAST-1", event: "Gemini AI Inference Cache Hit", latency: "42ms" },
  { id: "3", time: "13:52:14", region: "AP-NORTHEAST-1", event: "Edge WASM Sandbox Spawned", latency: "88ms" },
  { id: "4", time: "13:52:15", region: "EU-CENTRAL-1", event: "mTLS Session Revocation Verification", latency: "22ms" },
];

export default function TelemetrySection() {
  const [nodes, setNodes] = useState<EdgeTelemetryNode[]>(EDGE_NODES);
  const [feed, setFeed] = useState(TELEMETRY_FEED);

  // Live telemetry pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          latencyMs: Math.max(10, n.latencyMs + Math.floor(Math.random() * 7 - 3)),
          loadPercent: Math.min(95, Math.max(15, n.loadPercent + Math.floor(Math.random() * 5 - 2))),
        }))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper id="telemetry" label="// 04 — LIVE INFRASTRUCTURE TELEMETRY">
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
          Global <span style={{ color: "var(--color-cyan)" }}>Edge Telemetry</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#AAAAAA]">
          Real-time performance indicators from 4 global edge regions powering sub-50ms user responses.
        </p>
      </div>

      {/* Global Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Global p99 Latency", val: "38ms", icon: Zap, color: "#00ffc2" },
          { label: "Global Edge Nodes", val: "4 Active", icon: Globe, color: "#00d4ff" },
          { label: "Cache Hit Ratio", val: "94.2%", icon: Cpu, color: "#ff4d8d" },
          { label: "System Status", val: "100% Operational", icon: Wifi, color: "#00c48c" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass rounded-xl p-4 border border-white/10 flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 text-[#888888]">
              <m.icon size={14} style={{ color: m.color }} />
              <span className="font-mono text-[10px] tracking-widest uppercase">{m.label}</span>
            </div>
            <span className="font-mono text-xl font-extrabold text-white">{m.val}</span>
          </motion.div>
        ))}
      </div>

      {/* Edge Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {nodes.map((node) => (
          <div
            key={node.region}
            className="glass rounded-xl p-5 border border-white/10 flex flex-col justify-between"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--color-cyan)]">
                  {node.region}
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              </div>
              <p className="text-sm font-bold text-white mb-3">{node.city}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#888888]">Latency</span>
                <span className="text-white font-bold">{node.latencyMs} ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">CPU Load</span>
                <span className="text-[var(--color-cyan)] font-bold">{node.loadPercent}%</span>
              </div>
              {/* Load progress bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-cyan)] rounded-full transition-all duration-500"
                  style={{ width: `${node.loadPercent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Telemetry Log Stream */}
      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between font-mono text-xs">
          <span className="text-[var(--color-cyan)] font-bold tracking-widest flex items-center gap-2">
            <Activity size={14} /> LIVE EVENT STREAM
          </span>
          <span className="text-[#888888]">auto-sync enabled</span>
        </div>
        <div className="p-4 space-y-2 font-mono text-xs bg-black/40">
          {feed.map((ev) => (
            <div key={ev.id} className="flex flex-wrap items-center justify-between gap-2 p-2 rounded hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[#888888]">{ev.time}</span>
                <TagBadge>{ev.region}</TagBadge>
                <span className="text-white">{ev.event}</span>
              </div>
              <span className="text-[var(--color-success)] font-bold">{ev.latency}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
