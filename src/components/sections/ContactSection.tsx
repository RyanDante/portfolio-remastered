"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ShieldCheck, Mail, Copy, Check } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowButton from "@/components/ui/GlowButton";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { FeedbackEntry, PriorityLevel } from "@/types";

type FormStatus = "idle" | "loading" | "success" | "error";

const PRIORITIES: PriorityLevel[] = ["LOW", "NORMAL", "HIGH", "URGENT"];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "NORMAL" as PriorityLevel,
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText("ryan@ryandante.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");

    try {
      const entry: FeedbackEntry = {
        name: form.name,
        email: form.email,
        subject: form.subject || "Portfolio Contact Message",
        priority: form.priority,
        message: form.message,
      };

      if (isFirebaseConfigured() && db) {
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        await addDoc(collection(db, "feedback"), {
          ...entry,
          timestamp: serverTimestamp(),
          status: "unread",
        });
      } else {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", priority: "NORMAL", message: "" });
    } catch (err) {
      console.error("[Contact]", err);
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: "rgba(5,5,5,0.8)",
    border: "1px solid var(--color-border)",
    color: "#FFFFFF",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-mono)",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    transition: "border-color 0.2s",
  };

  return (
    <SectionWrapper id="contact" label="// 07 — ENCRYPTED CONTACT CHANNEL">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info & Quick Email */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
              Send a <span style={{ color: "var(--color-cyan)" }}>Direct Message</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#AAAAAA]">
              Have a principal engineering inquiry, contract opportunity, or architectural question? Send a direct encrypted message.
            </p>
          </div>

          {/* Quick Direct Email Box */}
          <div className="glass rounded-xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[var(--color-cyan)] flex items-center gap-1.5">
                <Mail size={14} /> DIRECT EMAIL ADDRESS
              </span>
              <span className="font-mono text-[10px] text-[var(--color-success)] font-bold">
                ✓ PGP VERIFIED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-black/60 border border-white/10 font-mono text-xs text-white">
              <span>ryan@ryandante.dev</span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded hover:bg-white/10 text-[var(--color-cyan)] transition-colors cursor-pointer"
                title="Copy Email Address"
                id="contact-copy-email-btn"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* SLA / Availability Box */}
          <div className="glass rounded-xl p-5 border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[#888888]">Response Window Guarantee</span>
              <span className="text-[var(--color-cyan)] font-bold">&lt; 12 Hours</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[#888888]">Availability</span>
              <span className="text-[var(--color-success)] font-bold">Open for Contracts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#888888]">Encryption Guarantee</span>
              <span className="text-white font-bold flex items-center gap-1">
                <ShieldCheck size={12} className="text-[var(--color-cyan)]" /> TLS 1.3
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Encrypted Form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.85)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ct-name" className="block font-mono text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-2">
                  YOUR NAME *
                </label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Chen"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>

              <div>
                <label htmlFor="ct-email" className="block font-mono text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@company.dev"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="ct-subject" className="block font-mono text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-2">
                  SUBJECT LINE
                </label>
                <input
                  id="ct-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Principal Engineer Opportunity"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>

              <div>
                <label htmlFor="ct-priority" className="block font-mono text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-2">
                  PRIORITY LEVEL
                </label>
                <select
                  id="ct-priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                >
                  {PRIORITIES.map((pr) => (
                    <option key={pr} value={pr} style={{ backgroundColor: "#0a0a0a", color: "#fff" }}>
                      {pr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ct-message" className="block font-mono text-xs font-bold text-[var(--color-cyan)] uppercase tracking-wider mb-2">
                TRANSMISSION MESSAGE *
              </label>
              <textarea
                id="ct-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Details about your architecture, hiring position, or contract project..."
                required
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>

            {/* Status alerts */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-lg font-mono text-xs text-[var(--color-success)] bg-[rgba(0,196,140,0.08)] border border-[rgba(0,196,140,0.3)]"
              >
                <CheckCircle size={16} />
                Message transmitted successfully. Response dispatched under 12 hours.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-lg font-mono text-xs text-[var(--color-error)] bg-[rgba(255,77,77,0.08)] border border-[rgba(255,77,77,0.3)]"
              >
                <AlertCircle size={16} />
                Transmission failed. Please retry or email ryan@ryandante.dev directly.
              </motion.div>
            )}

            <GlowButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center rounded-lg font-mono font-bold"
              disabled={status === "loading"}
              icon={<Send size={16} />}
              id="contact-submit-btn"
            >
              {status === "loading" ? "Encrypting & Transmitting..." : "Transmit Message"}
            </GlowButton>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
