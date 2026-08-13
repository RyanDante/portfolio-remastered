import SectionWrapper from "@/components/ui/SectionWrapper";
import Terminal from "@/components/ui/Terminal";

export default function TerminalSection() {
  return (
    <SectionWrapper id="terminal" label="// 05 — TERMINAL">
      <div className="mb-8">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Interactive{" "}
          <span style={{ color: "var(--color-cyan)" }}>Terminal</span>
        </h2>
        <p className="max-w-xl text-sm" style={{ color: "var(--color-muted-light)" }}>
          A real CLI. Run <code className="font-mono" style={{ color: "var(--color-cyan)" }}>help</code> to see all commands,
          or use{" "}
          <code className="font-mono" style={{ color: "var(--color-cyan)" }}>ai &lt;query&gt;</code>{" "}
          to chat with ARIA — my AI assistant powered by Google Gemini.
        </p>
      </div>
      <Terminal />
    </SectionWrapper>
  );
}
