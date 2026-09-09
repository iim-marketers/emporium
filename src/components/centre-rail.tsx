"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { CentreCard } from "@/components/centre-card";
import type { Centre } from "@/lib/centres";
import { cn } from "@/lib/utils";

/**
 * The centre cards. Three to a row on desktop; below that the column count
 * would stack ten tall cards into a page nobody scrolls to the end of, so the
 * row turns into an edge-to-edge swipe rail instead — same cards, one screen.
 */
export function CentreRail({
  items,
  label,
}: {
  items: Centre[];
  label: string;
}) {
  const railRef = React.useRef<HTMLDivElement>(null);
  /* `at` runs 0 → 1 across the scrollable width; `seen` is the visible share
     of the rail. A rail that cannot scroll — desktop, or a section short
     enough to fit — reports a share of 0, which hides the arrows. */
  const [{ at, seen }, setScroll] = React.useState({ at: 0, seen: 0 });

  React.useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScroll(
        max > 4
          ? { at: el.scrollLeft / max, seen: el.clientWidth / el.scrollWidth }
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

  /* One card plus its gap, so a nudge always lands on a snap point. */
  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollable = seen > 0;

  /* A section with one or two cards already fits every screen — a rail there
     would only shrink them below the column width for no gain. */
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
          // the rail runs to both viewport edges, inside the page gutter
          "-mx-[4vw] scroll-px-[4vw] px-[4vw] pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-none",
          // desktop keeps the original three-column grid
          "laptop:mx-0 laptop:grid laptop:snap-none laptop:grid-cols-3 laptop:gap-6",
          "laptop:overflow-visible laptop:px-0 laptop:pb-0",
        )}
      >
        {items.map((centre) => (
          <CentreCard
            key={centre.slug}
            centre={centre}
            /* `h-full` would pin the card to its own content in the rail —
               a flex item only stretches while its height is auto. */
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
