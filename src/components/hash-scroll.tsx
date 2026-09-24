"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const HEADER_FALLBACK = 72;
const MIN_AIR = 12;
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
  } catch {}
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
  } catch {}
}

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
