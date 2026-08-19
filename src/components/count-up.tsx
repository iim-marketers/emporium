"use client";

import * as React from "react";

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          if (reduce) {
            el.textContent = to.toLocaleString("en-IN") + suffix;
            return;
          }

          const duration = 1400;
          let start: number | null = null;

          const step = (t: number) => {
            if (start === null) start = t;
            const p = Math.min((t - start) / duration, 1);
            const value = Math.floor((1 - Math.pow(1 - p, 3)) * to);
            el.textContent = value.toLocaleString("en-IN") + suffix;
            if (p < 1) frame = requestAnimationFrame(step);
            else el.textContent = to.toLocaleString("en-IN") + suffix;
          };

          frame = requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, suffix]);

  return (
    <div
      className="font-heading text-[clamp(38px,4.6vw,54px)] leading-none font-bold tracking-[-0.03em] text-royal"
      ref={ref}
    >
      0
    </div>
  );
}
