"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
 * Where the last click wanted to land. Carrying the id here rather than in a
 * `#hash` keeps the address bar showing the plain page URL.
 */
const INTENT_KEY = "scroll-intent";

function setScrollIntent(id: string) {
  try {
    sessionStorage.setItem(INTENT_KEY, id);
  } catch {
    /* Private modes can refuse storage; the visitor just lands at the top. */
  }
}

function peekScrollIntent() {
  try {
    return sessionStorage.getItem(INTENT_KEY);
  } catch {
    return null;
  }
}

/**
 * Clearing waits until the glide is actually under way. React remounts effects
 * in development, so anything that erases the request — this note, or the hash
 * in the address bar — has to hold off until the mount that sticks acts on it.
 */
function clearScrollIntent() {
  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {
    /* Nothing was stored in the first place. */
  }
}

/**
 * Turns an arriving landing request into a smooth glide instead of a jump.
 *
 * Next disables smooth scrolling across route transitions, so links that want
 * this pass `scroll={false}` and hand the landing over to this component. The
 * page is pinned to the top first, so the trip looks the same no matter how
 * far down the previous page the visitor was.
 *
 * Requests arrive either from a {@link ScrollLink} or, for links shared from
 * elsewhere, as `#id`. The hash is wiped from the address bar on arrival.
 */
export function HashScroll({ id }: { id: string }) {
  React.useEffect(() => {
    const hashed = () => window.location.hash === `#${id}`;
    if (!hashed() && peekScrollIntent() !== id) return;

    if (!document.getElementById(id)) {
      clearScrollIntent();
      return;
    }

    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => {
      clearScrollIntent();
      if (hashed()) {
        const { pathname, search } = window.location;
        window.history.replaceState(null, "", `${pathname}${search}`);
      }
      scrollToId(id);
    });
    return () => cancelAnimationFrame(frame);
  }, [id]);

  return null;
}

type ScrollLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "scroll"
> & {
  /** Id of the element to land on. */
  to: string;
  /** Page holding that element. Omit when it sits on the current page. */
  href?: string;
};

/**
 * A link that lands on a section without writing `#id` into the address bar.
 *
 * On the same page it scrolls outright; across pages it leaves a note for the
 * destination's {@link HashScroll} to pick up. Modified clicks and middle
 * clicks fall through to the browser, so opening in a new tab still works.
 */
export function ScrollLink({ to, href, onClick, ...props }: ScrollLinkProps) {
  const pathname = usePathname();
  const target = href ?? pathname;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const modified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (modified || event.button !== 0) return;

    if (target !== pathname) {
      setScrollIntent(to);
      return;
    }

    if (scrollToId(to)) event.preventDefault();
  };

  return <Link href={target} scroll={false} onClick={handleClick} {...props} />;
}
