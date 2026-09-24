"use client";

import * as React from "react";

import type { Clip } from "@/lib/home-media";
import { cn } from "@/lib/utils";

export function AutoVideo({
  clip,
  eager = false,
  paused = false,
  className,
}: {
  clip: Clip;
  eager?: boolean;
  paused?: boolean;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [still, setStill] = React.useState(false);

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible && !paused && !still) el.play().catch(() => {});
    else el.pause();
  }, [visible, paused, still]);

  return (
    <video
      ref={ref}
      src={clip.src}
      poster={clip.poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      className={cn("size-full object-cover", className)}
    />
  );
}
