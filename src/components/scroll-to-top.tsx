"use client";

import { scrollToTop } from "@/components/hash-scroll";
import { cn } from "@/lib/utils";

/**
 * "Back to top" for visitors who have read all the way down to the footer.
 *
 * It sits in the footer's legal bar rather than floating over the page, so it
 * never covers content. It goes full width once that bar stacks on phones.
 */
export function ScrollToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToTop()}
      className={cn(
        "group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2",
        "rounded-[999px] border border-(--line-d) px-4.5 py-2.5",
        "font-heading text-[13.5px] font-semibold text-haze",
        "transition-colors duration-200 hover:bg-white/6 hover:text-white",
        "max-phablet:w-full",
        className,
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="flex-none transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        <path d="M8 12.5V3.5M4.5 7 8 3.5 11.5 7" />
      </svg>
      Back to top
    </button>
  );
}
