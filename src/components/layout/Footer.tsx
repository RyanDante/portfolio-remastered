import Link from "next/link";
import { GitBranch, Terminal as TerminalIcon, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 mt-auto bg-[#030303] text-white"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="#home"
              className="flex items-center gap-2 font-mono font-extrabold text-base tracking-widest"
              style={{ color: "var(--color-cyan)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
              RD://SYSTEMS_v4.0.2
            </Link>
            <p className="text-xs leading-relaxed text-[#AAAAAA] max-w-sm">
              Portfolio of Ryan Dante — Principal Software Engineer specialising in high-throughput distributed systems, AI kernels, and security-first edge compute architecture.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded glass border border-white/10 font-mono text-[10px] text-[var(--color-success)] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              SYSTEMS NOMINAL — 99.97% UPTIME
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="font-bold tracking-widest text-[var(--color-cyan)] uppercase mb-4">
              // QUICK_NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[#CCCCCC]">
              {[
                { href: "#home", label: "Home" },
                { href: "#projects", label: "Projects" },
                { href: "#systems", label: "Systems" },
                { href: "#telemetry", label: "Telemetry" },
                { href: "#terminal", label: "Terminal" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-[var(--color-cyan)] transition-colors flex items-center gap-1"
                >
                  <span className="text-[10px] text-[#666]">&gt;</span> {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Tech Stack & System Specs (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="font-bold tracking-widest text-[var(--color-cyan)] uppercase mb-4">
              // ARCHITECTURE_STACK
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js 16", "React 19", "Tailwind v4", "Rust", "Go", "CUDA", "Gemini 2.0", "Firebase", "WebAssembly"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[#CCCCCC] border border-white/10 text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: PGP & Admin Link (2 cols) */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="font-bold tracking-widest text-[var(--color-cyan)] uppercase mb-4">
              // SECURITY
            </h4>
            <div className="space-y-2 text-[#888888]">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <ShieldCheck size={14} className="text-[var(--color-cyan)]" /> PGP KEY
              </div>
              <p className="text-[9px] text-[#666] font-mono break-all leading-tight">
                4F92 A81C 920E 88B4 1029 4812 ACC9
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-[#E0E0E0] hover:text-[var(--color-cyan)] transition-colors pt-2"
              >
                <TerminalIcon size={12} />
                Admin Portal <ArrowUpRight size={10} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#666666]">
          <p>© {year} Ryan Dante — All systems operational. Distributed under MIT License.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ryandante"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <GitBranch size={12} /> GitHub
            </a>
            <span className="text-white/20">|</span>
            <span>SYSTEM BUILD DLA VER 4.0.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
