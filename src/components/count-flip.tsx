"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Full 0-9 turns a digit rolls through before it lands on its value. */
const TURNS = 2;
const REEL = Array.from({ length: TURNS * 10 + 10 }, (_, i) => i % 10);

type Token = { text: string; digits: boolean };

/** "Over 50,000+" -> [Over ][5][,][0][0][0][0][+], digits kept as single chars. */
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  for (const char of text) {
    const digits = char >= "0" && char <= "9";
    const last = tokens[tokens.length - 1];
    if (digits || !last || last.digits) tokens.push({ text: char, digits });
    else last.text += char;
  }
  return tokens;
}

/** The markup ships with the final number already in place, so no-JS and
 *  reduced-motion readers still see it as text. */
export function CountFlip({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reels = Array.from(el.querySelectorAll<HTMLElement>("[data-reel]"));
    if (!reels.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Rewind to zero before the reels are ever on screen.
    reels.forEach((reel) => {
      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
    });
    void el.offsetWidth;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          reels.forEach((reel, i) => {
            const ms = 900 + i * 130;
            reel.style.transition = `transform ${ms}ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`;
            reel.style.transform = `translateY(-${reel.dataset.reel}em)`;
          });
        });
      },
      { threshold: 0.6 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  return (
    <span ref={ref} className={cn("inline-flex tabular-nums", className)}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="inline-flex">
        {tokenize(text).map((token, i) => {
          if (!token.digits) {
            return (
              <span key={i} className="h-[1em] leading-none whitespace-pre">
                {token.text}
              </span>
            );
          }

          const offset = TURNS * 10 + Number(token.text);

          return (
            <span key={i} className="inline-block h-[1em] overflow-hidden">
              <span
                data-reel={offset}
                style={{ transform: `translateY(-${offset}em)` }}
                className="flex flex-col text-center will-change-transform"
              >
                {REEL.map((digit, d) => (
                  <span key={d} className="h-[1em] leading-none">
                    {digit}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
