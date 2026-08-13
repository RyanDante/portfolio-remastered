"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function SlideOver({
  isOpen,
  onClose,
  title,
  children,
}: SlideOverProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(3,3,3,0.75)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Detail panel"}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl overflow-y-auto"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderLeft: "1px solid var(--color-border)",
              boxShadow: "-8px 0 40px rgba(0,255,194,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {title && (
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "var(--color-cyan)" }}
                >
                  // {title}
                </span>
              )}
              <button
                onClick={onClose}
                className="ml-auto rounded p-1.5 transition-colors"
                style={{ color: "var(--color-muted)" }}
                aria-label="Close panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
