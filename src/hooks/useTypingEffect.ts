"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingEffectOptions {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

/**
 * Cycles through an array of strings with a typewriter effect.
 */
export function useTypingEffect({
  strings,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
  loop = true,
}: UseTypingEffectOptions) {
  const [displayed, setDisplayed] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );
  const [charIndex, setCharIndex] = useState(0);

  const tick = useCallback(() => {
    const currentString = strings[stringIndex];

    if (phase === "typing") {
      if (charIndex < currentString.length) {
        setDisplayed(currentString.slice(0, charIndex + 1));
        setCharIndex((i) => i + 1);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      // handled by a separate timeout below
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        setDisplayed(currentString.slice(0, charIndex - 1));
        setCharIndex((i) => i - 1);
      } else {
        setStringIndex((i) => (loop ? (i + 1) % strings.length : i));
        setPhase("typing");
      }
    }
  }, [charIndex, phase, strings, stringIndex, loop]);

  useEffect(() => {
    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(t);
    }
    const speed = phase === "typing" ? typingSpeed : deletingSpeed;
    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [phase, tick, typingSpeed, deletingSpeed, pauseDuration]);

  return displayed;
}

/**
 * Simple glitch effect — randomly replaces chars with glitch chars.
 */
export function useGlitchEffect(text: string, active = true): string {
  const [glitched, setGlitched] = useState(text);
  const glitchChars = "!@#$%^&*<>[]{}|/\\";

  useEffect(() => {
    if (!active) {
      setGlitched(text);
      return;
    }
    let count = 0;
    const interval = setInterval(() => {
      if (count > 3) {
        setGlitched(text);
        clearInterval(interval);
        return;
      }
      setGlitched(
        text
          .split("")
          .map((c) =>
            Math.random() < 0.08
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : c
          )
          .join("")
      );
      count++;
    }, 80);
    return () => clearInterval(interval);
  }, [text, active]); // eslint-disable-line react-hooks/exhaustive-deps

  return glitched;
}
