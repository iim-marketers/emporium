"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** How far below the viewport top a heading counts as "being read" — clears
 *  the sticky site header. */
const READ_LINE = 140;

export function PolicyToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = React.useState(items[0]?.id);

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= READ_LINE)
          current = item.id;
      }
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      setActive(atEnd ? items[items.length - 1]?.id : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <ol className="mt-4 grid gap-1 border-l border-hairline p-0">
      {items.map((item) => {
        const on = item.id === active;
        return (
          <li key={item.id} className="list-none">
            <a
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-3.5 text-[14px] leading-snug transition-colors duration-200",
                on
                  ? "border-crimson font-semibold text-ink"
                  : "border-transparent text-slate hover:text-royal",
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
