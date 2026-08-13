"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Terminal,
  ToggleLeft,
  LogOut,
  Activity,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import GlowButton from "@/components/ui/GlowButton";
import { StatusBadge, LogBadge } from "@/components/ui/Badge";
import { PROJECTS } from "@/data/projects";

// ── Mock Analytics Data ────────────────────────────────────────────────────

const DAILY_VISITORS = [
  { date: "Jul 31", count: 142 },
  { date: "Aug 1",  count: 198 },
  { date: "Aug 2",  count: 167 },
  { date: "Aug 3",  count: 231 },
  { date: "Aug 4",  count: 189 },
  { date: "Aug 5",  count: 287 },
  { date: "Aug 6",  count: 312 },
];

const SECTION_INTEREST = [
  { section: "Projects",  views: 487 },
  { section: "Terminal",  views: 342 },
  { section: "About",     views: 298 },
  { section: "Systems",   views: 241 },
  { section: "Logs",      views: 187 },
  { section: "Feedback",  views: 124 },
];

const MOCK_FEEDBACK = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@startup.io",
    message: "Love the NeuralOS project! Would love to collaborate on something similar.",
    timestamp: "2026-08-06T09:12:00Z",
    status: "unread",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@techcorp.com",
    message: "Incredible portfolio. We have an open Principal Engineer role — interested?",
    timestamp: "2026-08-05T14:30:00Z",
    status: "read",
  },
  {
    id: "3",
    name: "Marco Rossi",
    email: "marco@oss.dev",
    message: "PhantomGrid is exactly what we need for our edge project. Is it open source?",
    timestamp: "2026-08-04T11:00:00Z",
    status: "resolved",
  },
];

const INITIAL_FLAGS = [
  { id: "maintenance_mode", label: "Maintenance Mode",      enabled: false },
  { id: "show_terminal",    label: "Terminal Section",      enabled: true },
  { id: "show_logs",        label: "Live Logs Feed",        enabled: true },
  { id: "show_systems",     label: "Systems Section",       enabled: true },
  { id: "ai_enabled",       label: "ARIA AI Assistant",     enabled: true },
];

// ── Tab Types ──────────────────────────────────────────────────────────────

type AdminTab = "analytics" | "projects" | "feedback" | "logs" | "flags";

const TABS: { id: AdminTab; label: string; Icon: React.ElementType }[] = [
  { id: "analytics", label: "Analytics",  Icon: LayoutDashboard },
  { id: "projects",  label: "Projects",   Icon: FolderOpen },
  { id: "feedback",  label: "Feedback",   Icon: MessageSquare },
  { id: "logs",      label: "Logs",       Icon: Terminal },
  { id: "flags",     label: "Flags",      Icon: ToggleLeft },
];

const CHART_COLORS = {
  grid:    "#1a1a1a",
  text:    "#666",
  cyan:    "#00ffc2",
  warn:    "#ffb800",
  accent2: "#7b61ff",
};

import StatCard from "@/components/admin/StatCard";
import PushLogForm from "@/components/admin/PushLogForm";

// ── Admin Page ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");
  const [flags, setFlags] = useState(INITIAL_FLAGS);

  function handleLogout() {
    logOut();
    router.push("/login");
  }

  function toggleFlag(id: string) {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-30 flex items-center gap-4 px-6 py-3"
        style={{
          backgroundColor: "rgba(3,3,3,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span className="font-mono font-bold text-sm" style={{ color: "var(--color-cyan)" }}>
          ADMIN://DLA
        </span>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px]"
          style={{
            color: "var(--color-success)",
            backgroundColor: "rgba(0,196,140,0.08)",
            border: "1px solid rgba(0,196,140,0.2)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
          AUTH OK — {user?.username}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <GlowButton
            variant="ghost"
            size="sm"
            icon={<LogOut size={12} />}
            onClick={handleLogout}
            id="admin-logout-btn"
          >
            Sign Out
          </GlowButton>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Tab nav */}
        <div className="flex gap-1 mb-8 flex-wrap">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2 rounded font-mono text-xs transition-all"
              style={{
                color: activeTab === id ? "var(--color-cyan)" : "var(--color-muted)",
                backgroundColor: activeTab === id ? "var(--color-cyan-faint)" : "transparent",
                border: `1px solid ${activeTab === id ? "var(--color-cyan-glow)" : "var(--color-border)"}`,
              }}
              id={`admin-tab-${id}`}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Analytics ─────────────────────────────────────────────── */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Users}       label="TOTAL VISITORS"   value="1,826"  sub="+12% this week" />
              <StatCard icon={TrendingUp}  label="TODAY"            value="312"    sub="+8% vs yesterday" />
              <StatCard icon={MessageSquare} label="FEEDBACK"       value="47"     sub="3 unread" />
              <StatCard icon={Activity}    label="AVG SESSION"      value="4m 12s" sub="↑ from 3m 40s" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="glass rounded-xl p-6"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "var(--color-cyan)" }}>
                  // DAILY_VISITORS
                </p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={DAILY_VISITORS}>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: CHART_COLORS.text, fontSize: 10, fontFamily: "var(--font-mono)" }} />
                    <YAxis tick={{ fill: CHART_COLORS.text, fontSize: 10, fontFamily: "var(--font-mono)" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-text)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke={CHART_COLORS.cyan}
                      strokeWidth={2}
                      dot={{ fill: CHART_COLORS.cyan, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div
                className="glass rounded-xl p-6"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "var(--color-cyan)" }}>
                  // SECTION_INTEREST
                </p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={SECTION_INTEREST} layout="vertical">
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fill: CHART_COLORS.text, fontSize: 10, fontFamily: "var(--font-mono)" }} />
                    <YAxis dataKey="section" type="category" tick={{ fill: CHART_COLORS.text, fontSize: 10, fontFamily: "var(--font-mono)" }} width={65} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-text)",
                      }}
                    />
                    <Bar dataKey="views" fill={CHART_COLORS.cyan} radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Projects ──────────────────────────────────────────────── */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
                {PROJECTS.length} projects — {PROJECTS.filter((p) => !p.archived).length} active
              </p>
              <GlowButton variant="primary" size="sm" id="admin-add-project-btn">
                + Add Project
              </GlowButton>
            </div>

            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="glass rounded-lg p-4 flex items-center gap-4"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm" style={{ color: project.color }}>
                      {project.title}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
                    {project.subtitle} · {project.year}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <GlowButton variant="ghost" size="sm" id={`admin-edit-${project.id}`}>
                    Edit
                  </GlowButton>
                  <GlowButton variant="ghost" size="sm" id={`admin-archive-${project.id}`}>
                    Archive
                  </GlowButton>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Feedback ──────────────────────────────────────────────── */}
        {activeTab === "feedback" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {MOCK_FEEDBACK.map((fb) => (
              <div
                key={fb.id}
                className="glass rounded-lg p-5"
                style={{
                  border: `1px solid ${fb.status === "unread" ? "var(--color-cyan-glow)" : "var(--color-border)"}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                        {fb.name}
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: "var(--color-muted)" }}>
                        {fb.email}
                      </span>
                      <LogBadge
                        level={
                          fb.status === "unread"
                            ? "INFO"
                            : fb.status === "resolved"
                            ? "SUCCESS"
                            : "DEBUG"
                        }
                      />
                    </div>
                    <p className="text-sm" style={{ color: "var(--color-text)" }}>
                      {fb.message}
                    </p>
                    <p className="font-mono text-[10px] mt-2" style={{ color: "var(--color-muted)" }}>
                      {new Date(fb.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <GlowButton
                    variant="ghost"
                    size="sm"
                    icon={<CheckCircle size={12} />}
                    id={`admin-resolve-${fb.id}`}
                  >
                    Resolve
                  </GlowButton>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Logs ──────────────────────────────────────────────────── */}
        {activeTab === "logs" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6"
            style={{ border: "1px solid var(--color-border)" }}
          >
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "var(--color-cyan)" }}>
              // PUSH_LOG_ENTRY
            </p>
            <PushLogForm />
          </motion.div>
        )}

        {/* ── Feature Flags ─────────────────────────────────────────── */}
        {activeTab === "flags" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {flags.map((flag) => (
              <div
                key={flag.id}
                className="glass rounded-lg px-5 py-4 flex items-center justify-between"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                    {flag.label}
                  </p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: "var(--color-muted)" }}>
                    {flag.id}
                  </p>
                </div>
                <button
                  onClick={() => toggleFlag(flag.id)}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: flag.enabled
                      ? "var(--color-cyan)"
                      : "var(--color-border)",
                  }}
                  aria-label={`Toggle ${flag.label}`}
                  aria-checked={flag.enabled}
                  role="switch"
                  id={`flag-toggle-${flag.id}`}
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                    style={{
                      transform: flag.enabled ? "translateX(20px)" : "translateX(0)",
                    }}
                  />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}


