"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES: string[] = [
  "INITIALIZING SYSTEM BIOS v4.2.1 ...",
  "POST CHECK ........... [OK]",
  "MEMORY TEST 65536 KB ............. [OK]",
  "LOADING KERNEL MODULE: portfolio_core.ko",
  "MOUNTING FS: /dev/nvme0n1p1 on / .... [OK]",
  "STARTING NETWORK INTERFACES ...... [OK]",
  "ESTABLISHING SECURE CHANNEL ...... [AES-256-GCM]",
  "LOADING AI MODULE: aria_v2.4.bin .... [OK]",
  "RUNNING SELF-DIAGNOSTICS ......... [PASS]",
  "SYSTEMS NOMINAL — BOOT SEQUENCE COMPLETE",
  "",
  "╔═══════════════════════════════════════════╗",
  "║  RYAN DANTE // PRINCIPAL ENGINEER         ║",
  "║  SYSTEM BUILD DLA VER 4.0.2               ║",
  "║  ALL SYSTEMS ONLINE ■■■■■■■■■■■■■■■■■     ║",
  "╚═══════════════════════════════════════════╝",
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem("has_booted", "true");
    } catch {}
    setDone(true);
    onComplete();
  }, [onComplete]);

  // Check if session has already booted
  useEffect(() => {
    try {
      if (sessionStorage.getItem("has_booted") === "true") {
        setDone(true);
        onComplete();
        return;
      }
    } catch {}

    let isMounted = true;
    function printNext() {
      if (!isMounted) return;
      if (indexRef.current >= BOOT_LINES.length) {
        timerRef.current = setTimeout(() => {
          if (isMounted) finishBoot();
        }, 600);
        return;
      }
      const line = BOOT_LINES[indexRef.current];
      if (typeof line === "string") {
        setVisibleLines((prev) => [...prev, line]);
      }
      indexRef.current += 1;
      const delay = indexRef.current < 10 ? 90 : 40;
      timerRef.current = setTimeout(printNext, delay);
    }
    printNext();

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [finishBoot, onComplete]);

  // Skip boot on click or keypress
  const handleSkip = useCallback(() => {
    if (!done) finishBoot();
  }, [done, finishBoot]);

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleSkip}
        className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none"
        style={{ backgroundColor: "var(--color-bg)" }}
        title="Click to skip boot sequence"
      >
        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute left-0 right-0 h-px opacity-10"
            style={{
              background: "var(--color-cyan)",
              animation: "scan-line 3s linear infinite",
            }}
          />
        </div>

        <div className="w-full max-w-2xl px-6 py-10">
          {/* Terminal header */}
          <div
            className="glass rounded-t border-b-0 px-4 py-2 flex items-center justify-between"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <span
                className="ml-4 text-xs font-mono"
                style={{ color: "var(--color-muted)" }}
              >
                /dev/boot0 — SYSTEM INIT
              </span>
            </div>
            <span
              className="font-mono text-[10px] opacity-60"
              style={{ color: "var(--color-cyan)" }}
            >
              [Click to skip]
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="glass rounded-b p-6 min-h-[340px]"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="space-y-0.5">
              {visibleLines.map((line, i) => {
                const text = line ?? "";
                const isBorder =
                  text.startsWith("║") ||
                  text.startsWith("╔") ||
                  text.startsWith("╚");
                const isOk = text.includes("[OK]") || text.includes("[PASS]");
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.08 }}
                    className="font-mono text-xs leading-5"
                    style={{
                      color: isBorder
                        ? "var(--color-cyan)"
                        : isOk
                          ? "var(--color-success)"
                          : text === ""
                            ? "transparent"
                            : "var(--color-text)",
                    }}
                  >
                    {text || "\u00A0"}
                  </motion.p>
                );
              })}

              {!done && (
                <span
                  className="inline-block font-mono text-xs animate-cursor"
                  style={{ color: "var(--color-cyan)" }}
                  aria-hidden
                >
                  _
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
