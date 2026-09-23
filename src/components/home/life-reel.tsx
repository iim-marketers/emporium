"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import * as React from "react";

import { AutoVideo } from "@/components/home/auto-video";
import { lifeClips } from "@/lib/home-media";
import { cn } from "@/lib/utils";

const arrowBtn = [
  "grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 text-white",
  "transition-[background-color,border-color,opacity] duration-200",
  "hover:border-white hover:bg-white/10 disabled:cursor-default disabled:opacity-30",
].join(" ");

export function LifeReel({ children }: { children: React.ReactNode }) {
  const track = React.useRef<HTMLDivElement>(null);
  const [edge, setEdge] = React.useState({ start: true, end: false });

  const measure = React.useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
    });
  }, []);

  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <>
      <div className="mx-auto flex w-[min(1230px,92vw)] flex-wrap items-end justify-between gap-8">
        {children}
        <div className="flex gap-3 max-phablet:hidden">
          <button
            type="button"
            className={arrowBtn}
            onClick={() => step(-1)}
            disabled={edge.start}
            aria-label="Previous clips"
          >
            <ArrowLeftIcon className="size-4.5" />
          </button>
          <button
            type="button"
            className={arrowBtn}
            onClick={() => step(1)}
            disabled={edge.end}
            aria-label="Next clips"
          >
            <ArrowRightIcon className="size-4.5" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        onScroll={measure}
        className={cn(
          "mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          "scroll-px-[max(4vw,calc((100vw-1230px)/2))] px-[max(4vw,calc((100vw-1230px)/2))]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "max-phablet:mt-9 max-phablet:gap-3",
        )}
      >
        {lifeClips.map((clip, i) => (
          <figure
            key={clip.src}
            className="group relative aspect-9/16 w-[clamp(210px,21vw,290px)] flex-none snap-start overflow-hidden rounded-[20px] bg-navy-2 max-phablet:w-[62vw]"
          >
            <AutoVideo
              clip={clip}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0.45)_0%,transparent_22%,transparent_58%,rgba(13,22,66,0.88)_100%)]"
            />
            <span
              aria-hidden="true"
              className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] text-white/75"
            >
              {String(i + 1).padStart(2, "0")} / {lifeClips.length}
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[15.5px] leading-snug font-medium text-white max-phablet:p-4 max-phablet:text-[14.5px]">
              {clip.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
