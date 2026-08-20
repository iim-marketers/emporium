"use client";

import * as React from "react";

/** Glides the page to `#id`. No-op when the element is not on the page. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

/**
 * Turns an arriving `#id` into a smooth glide instead of a jump.
 *
 * Next disables smooth scrolling across route transitions, so links that want
 * this pass `scroll={false}` and hand the landing over to this component. The
 * page is pinned to the top first, so the trip looks the same no matter how
 * far down the previous page the visitor was.
 */
export function HashScroll({ id }: { id: string }) {
  React.useEffect(() => {
    if (window.location.hash !== `#${id}`) return;
    if (!document.getElementById(id)) return;

    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(frame);
  }, [id]);

  return null;
}
