"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, AlertCircle, Lock, User } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(username, password);
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
    borderRadius: "0.375rem",
    fontFamily: "var(--font-mono)",
    fontSize: "0.75rem",
    outline: "none",
    width: "100%",
    padding: "0.625rem 0.875rem",
    transition: "border-color 0.2s",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{
              backgroundColor: "var(--color-cyan-faint)",
              border: "1px solid var(--color-cyan-glow)",
              boxShadow: "var(--shadow-glow-sm)",
            }}
          >
            <Lock size={22} style={{ color: "var(--color-cyan)" }} />
          </div>
          <p
            className="font-mono text-[10px] tracking-widest mb-2"
            style={{ color: "var(--color-cyan)" }}
          >
            // SECURE_AUTH_GATEWAY v3.0
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
            Admin Control Center
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
            Authorised personnel only
          </p>
        </div>

        {/* Terminal card */}
        <div
          className="glass rounded-xl overflow-hidden"
          style={{ boxShadow: "var(--shadow-glow-sm)" }}
        >
          {/* macOS-style window bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-60" />
            <span className="ml-2 font-mono text-[10px]" style={{ color: "var(--color-muted)" }}>
              auth@portfolio:~$ sudo access --admin
            </span>
          </div>

          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              {/* Username */}
              <div>
                <label
                  htmlFor="login-username"
                  className="block font-mono text-[10px] tracking-widest mb-1.5 flex items-center gap-1.5"
                  style={{ color: "var(--color-cyan)" }}
                >
                  <User size={11} /> USERNAME
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  disabled={loading}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block font-mono text-[10px] tracking-widest mb-1.5 flex items-center gap-1.5"
                  style={{ color: "var(--color-cyan)" }}
                >
                  <Lock size={11} /> PASSWORD
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-2.5 rounded text-xs"
                  style={{
                    color: "var(--color-error)",
                    backgroundColor: "rgba(255,77,77,0.06)",
                    border: "1px solid rgba(255,77,77,0.2)",
                  }}
                >
                  <AlertCircle size={12} className="shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}

              <GlowButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center"
                disabled={loading}
                icon={<LogIn size={14} />}
                id="login-submit-btn"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </GlowButton>
            </form>
          </div>
        </div>

        <p className="text-center font-mono text-[10px] mt-6" style={{ color: "var(--color-muted)" }}>
          ←{" "}
          <a href="/" className="hover:opacity-80 transition-opacity" style={{ color: "var(--color-muted-light)" }}>
            Return to portfolio
          </a>
        </p>
      </motion.div>
    </div>
  );
}
