"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// ── Credentials ─────────────────────────────────────────────────────────────
// These are intentionally client-side only — this is a personal portfolio
// admin panel with no sensitive data, not a production multi-user system.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
const SESSION_KEY = "rd_admin_session";

// ── Types ────────────────────────────────────────────────────────────────────

interface AdminUser {
  username: string;
}

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from sessionStorage on mount (cleared on browser close)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        setUser(JSON.parse(saved) as AdminUser);
      }
    } catch {
      // sessionStorage unavailable (SSR guard)
    } finally {
      setLoading(false);
    }
  }, []);

  async function signIn(username: string, password: string): Promise<void> {
    // Simulate async check to match async pattern used by login page
    await new Promise((r) => setTimeout(r, 600));

    if (
      username.trim().toLowerCase() !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      throw new Error("Invalid username or password.");
    }

    const admin: AdminUser = { username: ADMIN_USERNAME };
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    } catch {
      // ignore write failures
    }
    setUser(admin);
  }

  function logOut() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
