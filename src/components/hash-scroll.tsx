"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const HEADER_FALLBACK = 72;
const MIN_AIR = 12;
/** Capped so a short target still lands near the top, not mid-screen. */
const MAX_AIR = 32;

function headerHeight() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return header?.getBoundingClientRect().height ?? HEADER_FALLBACK;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const rect = el.getBoundingClientRect();
  const header = headerHeight();
  const spare = (window.innerHeight - header - rect.height) / 2;
  const air = Math.min(MAX_AIR, Math.max(MIN_AIR, spare));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: Math.max(0, window.scrollY + rect.top - header - air),
    behavior: reduce ? "auto" : "smooth",
  });
  return true;
}

export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

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

function clearScrollIntent() {
  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {
    /* Nothing was stored in the first place. */
  }
}

/** Requests arrive from a {@link ScrollLink}, or as `#id` for links shared from
 *  elsewhere. The hash is wiped from the address bar on arrival. */
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
  to: string;
  href?: string;
};

/**
 * On the same page it scrolls outright; across pages it leaves a note for the
 * destination's {@link HashScroll} to pick up. Modified and middle clicks fall
 * through to the browser, so opening in a new tab still works.
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
