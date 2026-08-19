// Shared Framer Motion presets for slide-over panels and mobile drawer

export const backdropFade = { duration: 0.3 } as const;

export const panelSpring = {
  type: "spring" as const,
  damping: 28,
  stiffness: 280,
};

export const drawerStagger = {
  staggerChildren: 0.04,
  delayChildren: 0.08,
};

export const drawerItem = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8 },
  transition: { duration: 0.2 },
};
