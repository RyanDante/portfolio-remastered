"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { motion } from "framer-motion";
import { genId, generateTimestamp } from "@/lib/utils";
import type { TerminalLine } from "@/types";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";

const PROMPT_PREFIX = "ryan@portfolio:~$";

const HELP_TEXT = `
UNIX CLI TERMINAL v4.0.2 (x86_64-pc-linux-gnu)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ls / projects     — List all engineering projects
  cat / skills      — Display full technical skills matrix
  top / status      — System status and uptime telemetry
  whoami / about    — Engineering profile and experience
  clr / clear       — Clear current terminal screen
  history           — List executed command history
  date              — Display current system time (UTC)
  ai <query>        — Query ARIA (Gemini 2.0 AI Assistant)

Example: ai what distributed systems have you built in Rust?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

const PROJECTS_TEXT = PROJECTS.map(
  (p) =>
    `  [${p.status}] ${p.title.padEnd(18)} (${p.category.padEnd(12)}) — ${p.subtitle}`
).join("\n");

const SKILLS_TEXT = SKILLS.map(
  (cat) =>
    `  ${cat.category}:\n` +
    cat.skills.map((s) => `    ${s.name.padEnd(24)} [${"█".repeat(Math.floor(s.level / 10))}${"░".repeat(10 - Math.floor(s.level / 10))}] ${s.level}%`).join("\n")
).join("\n\n");

const STATUS_TEXT = `
SYSTEM TELEMETRY REPORT — UNIX KERNEL 6.8.0-RT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Host          : portfolio-prod-01 (London Edge POP)
  Kernel        : Linux 6.8.0-rt1-portfolio #1 SMP PREEMPT
  Uptime        : 99.97% (142 days, 18 hrs, 42 mins)
  Memory        : 14.2 GB / 64.0 GB (22% utilized)
  AI Module     : ARIA v2.4 (Gemini 2.0 Flash) — NOMINAL
  Active Nodes  : 4 Global POPs (London, NY, Tokyo, Frankfurt)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ALL SYSTEMS NOMINAL
`.trim();

const ABOUT_TEXT = `
USER PROFILE: ryan@portfolio.dev
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Name          : Ryan Dante
  Role          : Principal Software Engineer & Systems Architect
  Experience    : 7+ Years Production Systems
  Specialties   : Distributed Systems, AI Kernels, Security & Cryptography
  Location      : London, UK (Remote Worldwide)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

function makeOutputLine(content: string, type: TerminalLine["type"] = "output"): TerminalLine {
  return { id: genId(), type, content, timestamp: generateTimestamp() };
}

function makeLine(line: string): TerminalLine {
  return makeOutputLine(line);
}

const INITIAL_LINES: TerminalLine[] = [
  makeOutputLine("Linux portfolio 6.8.0-rt1-portfolio #1 SMP PREEMPT_RT x86_64", "system"),
  makeOutputLine("Type 'help' or 'ls' to list commands, 'ai <query>' to ask ARIA.", "system"),
  makeOutputLine("", "system"),
];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushLines = useCallback((...newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const clearLines = useCallback(() => {
    setLines([INITIAL_LINES[0]]);
  }, []);

  // Scroll internal container only
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      pushLines({
        id: genId(),
        type: "input",
        content: trimmed,
        timestamp: generateTimestamp(),
      });

      setCmdHistory((h) => [...h, trimmed].slice(-100));
      setHistoryIdx(-1);

      const [cmd, ...args] = trimmed.split(" ");
      const arg = args.join(" ");
      const lowerCmd = cmd.toLowerCase();

      // Linux Aliases & Standard Commands
      if (lowerCmd === "help") {
        pushLines(makeLine(HELP_TEXT));
      } else if (lowerCmd === "projects" || lowerCmd === "ls") {
        pushLines(makeLine("PROJECTS INDEX:"), makeLine(PROJECTS_TEXT));
      } else if (lowerCmd === "skills" || lowerCmd === "cat") {
        pushLines(makeLine("SKILLS MATRIX:"), makeLine(SKILLS_TEXT));
      } else if (lowerCmd === "status" || lowerCmd === "top" || lowerCmd === "ping") {
        pushLines(makeLine(STATUS_TEXT));
      } else if (lowerCmd === "whoami" || lowerCmd === "about") {
        pushLines(makeLine(ABOUT_TEXT));
      } else if (lowerCmd === "date") {
        pushLines(makeLine(`UTC TIME: ${new Date().toUTCString()}`));
      } else if (lowerCmd === "history") {
        const histText = cmdHistory.length
          ? cmdHistory.map((c, i) => `  ${i + 1}  ${c}`).join("\n")
          : "  No command history recorded yet.";
        pushLines(makeLine(histText));
      } else if (lowerCmd === "clear" || lowerCmd === "clr") {
        clearLines();
      } else if (lowerCmd === "ai") {
        if (!arg) {
          pushLines(makeOutputLine("Usage: ai <your prompt>", "error"));
        } else {
          setIsLoading(true);
          pushLines(makeOutputLine("ARIA > Processing AI request...", "system"));
          try {
            const res = await fetch("/api/gemini", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: arg }),
            });
            const data = await res.json();
            pushLines(makeOutputLine(data.response ?? data.error ?? "[ARIA] No response.", "ai"));
          } catch {
            pushLines(makeOutputLine("[ARIA] Connection failed.", "error"));
          } finally {
            setIsLoading(false);
          }
        }
      } else {
        pushLines(
          makeOutputLine(
            `zsh: command not found: ${cmd}. Type 'help' or 'ls' for commands.`,
            "error"
          )
        );
      }

      pushLines(makeOutputLine("", "output"));
    },
    [pushLines, clearLines, cmdHistory]
  );

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInput(cmdHistory[cmdHistory.length - 1 - next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : cmdHistory[cmdHistory.length - 1 - next] ?? "");
        return next;
      });
    }
  }

  function getLineStyle(type: TerminalLine["type"]): React.CSSProperties {
    switch (type) {
      case "input":   return { color: "var(--color-cyan)" };
      case "error":   return { color: "var(--color-error)" };
      case "system":  return { color: "#888888" };
      case "ai":      return { color: "var(--color-success)" };
      default:        return { color: "#E0E0E0" };
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden glass border border-[var(--color-border)] shadow-2xl"
      style={{ backgroundColor: "rgba(5, 5, 5, 0.95)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-white/10"
      >
        <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="ml-3 font-mono text-xs font-bold text-[#AAAAAA]">
          bash — {PROMPT_PREFIX}
        </span>
        {isLoading && (
          <span className="ml-auto font-mono text-[10px] text-[var(--color-cyan)] animate-pulse">
            AI COMPUTING...
          </span>
        )}
      </div>

      {/* Output Container */}
      <div ref={outputRef} className="h-96 overflow-y-auto p-4 font-mono text-xs leading-6">
        {lines.map((line) => (
          <div key={line.id} style={getLineStyle(line.type)}>
            {line.type === "input" ? (
              <span>
                <span style={{ color: "var(--color-success)", fontWeight: "bold" }}>
                  {PROMPT_PREFIX}{" "}
                </span>
                {line.content}
              </span>
            ) : (
              <pre className="whitespace-pre-wrap font-mono text-xs">
                {line.content}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#080808] border-t border-white/10">
        <span className="font-mono text-xs font-bold text-[var(--color-success)] shrink-0">
          {PROMPT_PREFIX}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. ls, whoami, clr, ai)..."
          className="flex-1 bg-transparent font-mono text-xs text-[var(--color-cyan)] outline-none"
          disabled={isLoading}
          aria-label="Terminal CLI input"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="animate-cursor font-mono text-xs text-[var(--color-cyan)]" aria-hidden>
          █
        </span>
      </div>
    </motion.div>
  );
}
