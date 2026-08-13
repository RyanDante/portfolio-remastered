"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import GlowButton from "./GlowButton";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
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
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(3,3,3,0.85)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="fixed inset-4 md:inset-12 z-50 flex flex-col rounded-lg overflow-hidden"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-glow-sm)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "var(--color-cyan)" }}
                >
                  // resume.pdf
                </span>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded"
                  style={{
                    color: "var(--color-success)",
                    backgroundColor: "rgba(0,196,140,0.08)",
                    border: "1px solid rgba(0,196,140,0.2)",
                  }}
                >
                  VERIFIED
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GlowButton
                  variant="outline"
                  size="sm"
                  icon={<ExternalLink size={12} />}
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Open
                </GlowButton>
                <GlowButton
                  variant="primary"
                  size="sm"
                  icon={<Download size={12} />}
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = "/resume.pdf";
                    a.download = "Ryan_Dante_Resume.pdf";
                    a.click();
                  }}
                >
                  Download
                </GlowButton>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded ml-2 transition-colors"
                  style={{ color: "var(--color-muted)" }}
                  aria-label="Close resume modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PDF embed */}
            <div className="flex-1 relative">
              <iframe
                src="/resume.pdf#toolbar=0"
                title="Ryan Dante — Resume"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
