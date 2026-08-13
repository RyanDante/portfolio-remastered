"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Globe } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

interface NavLinkItem {
  href: string;
  label: string;
  num: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinkItem[];
  activeId: string | null;
  onOpenResume: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
  activeId,
  onOpenResume,
}: MobileDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll & focus close button when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
          />

          {/* Right-to-Left Sliding Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] glass border-l border-white/10 p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto max-h-screen"
            style={{ backgroundColor: "rgba(5, 5, 5, 0.98)" }}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="font-mono font-bold text-sm text-[var(--color-cyan)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                  RD://NAVIGATION
                </span>
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  className="p-1.5 rounded glass text-[#888888] hover:text-white cursor-pointer outline-none focus:ring-1 focus:ring-[var(--color-cyan)]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links list */}
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => {
                  const isActive = activeId === link.href.slice(1);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 rounded-xl font-mono text-sm flex items-center justify-between transition-all"
                      style={{
                        color: isActive ? "var(--color-cyan)" : "#E0E0E0",
                        backgroundColor: isActive ? "var(--color-cyan-faint)" : "rgba(255,255,255,0.03)",
                        border: isActive ? "1px solid var(--color-cyan-glow)" : "1px solid var(--color-border)",
                      }}
                      onClick={onClose}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xs text-[#666]">{link.num}.</span>
                        {link.label}
                      </span>
                      <ChevronRight size={14} className={isActive ? "text-[var(--color-cyan)]" : "text-[#666]"} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
              <Link
                href="/links"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl glass border border-[var(--color-cyan-glow)] flex items-center justify-center gap-2 text-[var(--color-cyan)] font-bold"
              >
                <Globe size={14} /> Open Bio Hub (/links)
              </Link>
              <GlowButton
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="w-full justify-center text-xs py-2.5"
              >
                Download Resume PDF
              </GlowButton>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
