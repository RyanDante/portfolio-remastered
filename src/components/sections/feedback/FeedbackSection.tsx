"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowButton from "@/components/ui/GlowButton";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { FeedbackEntry } from "@/types";

type FormStatus = "idle" | "loading" | "success" | "error";

const INITIAL: Omit<FeedbackEntry, "id" | "timestamp" | "status"> = {
  name: "",
  email: "",
  message: "",
};

async function submitToFirestore(data: FeedbackEntry) {
  const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
  if (!db) throw new Error("Firestore not available");
  await addDoc(collection(db, "feedback"), {
    ...data,
    timestamp: serverTimestamp(),
    status: "unread",
  });
}

async function submitToApi(data: FeedbackEntry) {
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API submission failed");
}

export default function FeedbackSection() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");

    try {
      const entry: FeedbackEntry = { ...form };
      if (isFirebaseConfigured() && db) {
        await submitToFirestore(entry);
      } else {
        await submitToApi(entry);
      }
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      console.error("[Feedback]", err);
      setStatus("error");
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
    <SectionWrapper id="feedback" label="// 08 — GUESTBOOK & CONTACT">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — info */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Leave a{" "}
            <span style={{ color: "var(--color-cyan)" }}>Message</span>
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted-light)" }}>
            Working on something interesting? Hiring? Just want to say hello?
            Drop a message — I reply to every genuine note.
          </p>

          <div className="space-y-4">
            {[
              { label: "Response Time", value: "< 12 hours guarantee" },
              { label: "Availability", value: "Open to contracts & roles" },
              { label: "Location", value: "London, UK (remote OK)" },
              { label: "Email", value: "ryan@ryandante.dev" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
                style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}
              >
                <span
                  className="font-mono text-xs w-32 shrink-0"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item.label}
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--color-cyan)" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="fb-name"
                className="block font-mono text-[10px] tracking-widest mb-1.5"
                style={{ color: "var(--color-cyan)" }}
              >
                NAME
              </label>
              <input
                id="fb-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>

            <div>
              <label
                htmlFor="fb-email"
                className="block font-mono text-[10px] tracking-widest mb-1.5"
                style={{ color: "var(--color-cyan)" }}
              >
                EMAIL
              </label>
              <input
                id="fb-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.dev"
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>

            <div>
              <label
                htmlFor="fb-message"
                className="block font-mono text-[10px] tracking-widest mb-1.5"
                style={{ color: "var(--color-cyan)" }}
              >
                MESSAGE
              </label>
              <textarea
                id="fb-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="I saw your portfolio and would like to discuss..."
                required
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded text-sm"
                style={{
                  color: "var(--color-success)",
                  backgroundColor: "rgba(0,196,140,0.08)",
                  border: "1px solid rgba(0,196,140,0.25)",
                }}
              >
                <CheckCircle size={14} />
                Message transmitted successfully. I&apos;ll be in touch.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded text-sm"
                style={{
                  color: "var(--color-error)",
                  backgroundColor: "rgba(255,77,77,0.08)",
                  border: "1px solid rgba(255,77,77,0.25)",
                }}
              >
                <AlertCircle size={14} />
                Transmission failed. Please try again or email directly.
              </motion.div>
            )}

            <GlowButton
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={status === "loading"}
              icon={<Send size={14} />}
              id="feedback-submit-btn"
            >
              {status === "loading" ? "Transmitting..." : "Send Message"}
            </GlowButton>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
