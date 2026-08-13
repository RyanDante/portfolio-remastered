"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProfilePortraitProps {
  imageSrc?: string;
  altText?: string;
}

export default function ProfilePortrait({
  imageSrc = "/images/ryan2.PNG",
  altText = "Ryan Dante — Principal Software Engineer & Systems Architect",
}: ProfilePortraitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:col-span-5 relative flex items-center justify-center"
    >
      {/* Background Matrix Picture Asset */}
      <div className="absolute inset-x-0 -top-8 -bottom-8 rounded-3xl overflow-hidden opacity-45 pointer-events-none z-0">
        <Image
          src="/hero-bg.png"
          alt="Cyberpunk Matrix Background"
          fill
          className="object-cover object-center filter blur-[1px] brightness-125"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#030303] via-transparent to-[#030303]" />
      </div>

      <div className="relative flex items-center z-10 my-4">
        {/* Studio Portrait Frame */}
        <div
          className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[3/4] rounded-lg overflow-hidden glass border shadow-2xl transition-all duration-300"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            boxShadow: "0 0 50px rgba(0,0,0,0.9), 0 0 30px var(--color-cyan-glow)",
          }}
        >
          {/* Full-Color Profile Portrait */}
          <Image
            src={imageSrc}
            alt={altText}
            fill
            priority
            className="object-cover object-center filter contrast-105 transition-all duration-500 hover:scale-105"
          />

          {/* Base Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
        </div>

        {/* Vertical Outlined Typography Alongside the Portrait */}
        <div
          className="hidden sm:block absolute -right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none writing-vertical z-20"
          aria-hidden
        >
          <span className="font-mono font-black text-4xl lg:text-5xl tracking-[0.2em] text-stroke-cyan uppercase drop-shadow-2xl">
            RYAN DANTE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
