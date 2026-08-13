"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Timeline from "./Timeline";
import ArchitecturePrinciples from "./ArchitecturePrinciples";
import CertificationsGrid from "./CertificationsGrid";
import SkillsMatrix from "./SkillsMatrix";

export default function AboutSection() {
  return (
    <SectionWrapper id="about" label="// 06 — EXPERIENCE & CAREER">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white">
          Career Experience{" "}
          <span style={{ color: "var(--color-cyan)" }}>& Web Architecture</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#AAAAAA]">
          A timeline of my engineering leadership, production impact, verified certifications, and core software principles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left col: 3D Timeline & Architecture Principles */}
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // EXPERIENCE_TIMELINE (3D INTERACTIVE)
            </h3>
            <Timeline />
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // SOFTWARE_ARCHITECTURE_PRINCIPLES
            </h3>
            <ArchitecturePrinciples />
          </div>
        </div>

        {/* Right col: Certifications Grid + Skills Matrix */}
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // VERIFIED_CERTIFICATIONS
            </h3>
            <CertificationsGrid />
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest mb-6 font-bold text-[var(--color-cyan)] uppercase">
              // SKILLS_MATRIX
            </h3>
            <SkillsMatrix />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
