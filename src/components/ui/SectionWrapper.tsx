"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  label?: string; // e.g. "// section_01"
}

export default function SectionWrapper({
  id,
  children,
  className,
  label,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("py-24 px-4 md:pl-72 md:pr-8 lg:px-16 max-w-7xl mx-auto w-full", className)}
    >
      {label && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs mb-6 tracking-widest"
          style={{ color: "var(--color-cyan)" }}
          aria-hidden
        >
          {label}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
