"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  as = "div",
  className,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      el.dataset.shown = "true";
      return;
    }

    // Older browsers without the observer would keep every block at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.shown = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.shown = "true";
            io.unobserve(entry.target);
          }
        });
      },
      // A block taller than the viewport can never reach a fractional threshold
      // — its visible share is capped — so trigger on its top edge instead.
      // The bottom margin grows the root rather than shrinking it: a card that
      // straddles the fold has to reveal, or the first screen shows a blank
      // strip under the last visible block.
      { rootMargin: "0px 0px 8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      data-shown="false"
      className={cn(
        "translate-y-6.5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        "data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
