"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  value: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1500,
  suffix = "",
  prefix = "",
  className,
}: CounterProps) {
  const [display, setDisplay] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Trigger after a small delay to allow hydration
  useEffect(() => {
    const t = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Run animation when shouldAnimate becomes true
  useEffect(() => {
    if (!shouldAnimate) return;

    let raf: number;
    let start: number | null = null;
    const initial = 0;
    const delta = value - initial;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(initial + delta * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldAnimate, value, duration]);

  return (
    <span className={`counter-num ${className || ""}`}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
