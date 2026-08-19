"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/data/site";

interface ProfilePortraitProps {
  imageSrc?: string;
  altText?: string;
}

export default function ProfilePortrait({
  imageSrc = SITE.images.heroPortrait,
  altText = "Ryan Dante — Principal Software Engineer & Systems Architect",
}: ProfilePortraitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:col-span-5 relative flex items-center justify-center overflow-hidden px-2 sm:px-0"
    >
      {/* Subtle cyberpunk glow — no duplicate background image */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, var(--color-cyan-glow) 0%, transparent 70%)",
          opacity: 0.35,
        }}
      />

      <div className="relative flex items-center justify-center z-10 my-4 w-full">
        {/* Studio Portrait Frame */}
        <div
          className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[420px] aspect-[3/4] rounded-lg overflow-hidden glass border shadow-2xl transition-all duration-300"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            boxShadow: "0 0 50px rgba(0,0,0,0.9), 0 0 30px var(--color-cyan-glow)",
          }}
        >
          <Image
            src={imageSrc}
            alt={altText}
            fill
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
            className="object-cover object-center filter contrast-105 transition-all duration-500 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
        </div>

        {/* Vertical Outlined Typography Alongside the Portrait */}
        <div
          className="hidden md:block absolute -right-6 lg:-right-10 xl:-right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none writing-vertical z-20"
          aria-hidden
        >
          <span className="font-mono font-black text-3xl lg:text-4xl xl:text-5xl tracking-[0.2em] text-stroke-cyan uppercase drop-shadow-2xl">
            RYAN DANTE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
