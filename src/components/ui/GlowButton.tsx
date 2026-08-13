"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Only pass through safe, non-conflicting HTML button attributes
interface GlowButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  // Standard button attrs that don't conflict with Framer Motion
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  "aria-checked"?: boolean | "false" | "true" | "mixed";
  role?: string;
  form?: string;
  style?: React.CSSProperties;
}

export default function GlowButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  type = "button",
  disabled,
  id,
  style,
  ...rest
}: GlowButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-mono font-medium tracking-wide rounded transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none overflow-hidden";

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const variantStyle: Record<string, React.CSSProperties> = {
    primary: {
      color: "var(--color-bg)",
      backgroundColor: "var(--color-cyan)",
      border: "1px solid var(--color-cyan-dim)",
    },
    outline: {
      color: "var(--color-cyan)",
      border: "1px solid var(--color-cyan-dim)",
    },
    ghost: {
      color: "var(--color-muted-light)",
      border: "1px solid var(--color-border)",
    },
  };

  const variantClass: Record<string, string> = {
    primary:
      "hover:shadow-[0_0_20px_#00ffc250,0_0_40px_#00ffc220] active:scale-95",
    outline:
      "hover:bg-[rgba(0,255,194,0.05)] hover:shadow-[0_0_12px_#00ffc230] active:scale-95",
    ghost:
      "hover:border-[var(--color-cyan-dim)] hover:bg-[rgba(0,255,194,0.05)] active:scale-95",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      id={id}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(base, sizes[size], variantClass[variant], className)}
      style={{ ...variantStyle[variant], ...style }}
      {...(rest as object)}
    >
      {variant === "primary" && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
          }}
          aria-hidden
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
