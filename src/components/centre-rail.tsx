"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { CentreCard } from "@/components/centre-card";
import type { Centre } from "@/lib/centres";
import { cn } from "@/lib/utils";

export function CentreRail({
  items,
  label,
}: {
  items: Centre[];
  label: string;
}) {
  const railRef = React.useRef<HTMLDivElement>(null);
  const [{ at, seen }, setScroll] = React.useState({ at: 0, seen: 0 });

  const goingTo = React.useRef<number | null>(null);
  const settle = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Bumped per nudge, so a superseded one cannot clear the live one's state. */
  const trip = React.useRef(0);

  React.useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;

      if (
        goingTo.current !== null &&
        Math.abs(el.scrollLeft - goingTo.current) < 2
      ) {
        goingTo.current = null;
        el.style.scrollSnapType = "";
      }

      setScroll(
        max > 4
          ? {
              at: clamp(el.scrollLeft / max, 0, 1),
              seen: el.clientWidth / el.scrollWidth,
            }
          : { at: 0, seen: 0 },
      );
    };

    measure();
    el.addEventListener("scroll", measure, { passive: true });

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [items.length]);

  React.useEffect(
    () => () => {
      if (settle.current) clearTimeout(settle.current);
    },
    [],
  );

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;

    const stops = snapOffsets(el);
    if (!stops.length) return;

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const from = goingTo.current ?? el.scrollLeft;
    const next =
      dir === 1
        ? stops.find((stop) => stop > from + 1)
        : [...stops].reverse().find((stop) => stop < from - 1);

    const to = clamp(next ?? (dir === 1 ? max : 0), 0, max);
    if (Math.abs(to - from) < 1) return;

    goingTo.current = to;

    el.style.scrollSnapType = "none";

    const token = ++trip.current;
    const done = () => {
      if (token !== trip.current) return;
      if (settle.current) clearTimeout(settle.current);
      settle.current = null;
      goingTo.current = null;
      el.style.scrollSnapType = "";
    };

    /* `scrollend` where it exists, a timer everywhere else. */
    el.addEventListener("scrollend", done, { once: true });
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(done, 900);

    el.scrollTo({
      left: to,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const scrollable = seen > 0;

  if (items.length < 3) {
    return (
      <div className="grid grid-cols-3 gap-6 max-laptop:grid-cols-2 max-phone:grid-cols-1">
        {items.map((centre) => (
          <CentreCard key={centre.slug} centre={centre} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        ref={railRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain",
          "mx-[-4vw] scroll-px-[4vw] px-[4vw] pb-2",
          "scrollbar-none [&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-none",
          "laptop:mx-0 laptop:grid laptop:snap-none laptop:grid-cols-3 laptop:gap-6",
          "laptop:overflow-visible laptop:px-0 laptop:pb-0",
        )}
      >
        {items.map((centre) => (
          <CentreCard
            key={centre.slug}
            centre={centre}
            className={cn(
              "w-[clamp(255px,72vw,330px)] flex-none snap-start",
              "h-auto self-stretch laptop:h-full laptop:w-auto",
            )}
          />
        ))}
      </div>

      {scrollable ? (
        <div className="mt-6 flex items-center justify-center gap-3 laptop:hidden">
          <RailButton
            dir={-1}
            disabled={at <= 0.001}
            onClick={() => nudge(-1)}
          />
          <RailButton dir={1} disabled={at >= 0.999} onClick={() => nudge(1)} />
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(Math.max(n, lo), hi);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function snapOffsets(el: HTMLElement) {
  const railLeft = el.getBoundingClientRect().left;
  const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
  const max = Math.max(0, el.scrollWidth - el.clientWidth);

  return Array.from(el.children).map((child) =>
    clamp(
      el.scrollLeft + child.getBoundingClientRect().left - railLeft - pad,
      0,
      max,
    ),
  );
}

function RailButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 1 | -1;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = dir === 1 ? ChevronRightIcon : ChevronLeftIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Next centres" : "Previous centres"}
      className={cn(
        "grid size-9 place-items-center rounded-[999px] border border-hairline bg-white text-slate",
        "transition-[color,border-color,background,opacity] duration-200",
        "hover:border-royal hover:bg-cloud hover:text-royal",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
