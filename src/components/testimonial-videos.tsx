"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { testimonialStories, type TestimonialStory } from "@/lib/content";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

const railBtn =
  "grid size-11 cursor-pointer place-items-center rounded-full border border-hairline bg-white text-ink transition-[background-color,color,opacity] hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35";

const viewerBtn =
  "grid size-11 cursor-pointer place-items-center rounded-full bg-white/12 text-white backdrop-blur-md transition-colors hover:bg-white/25";

const sideBtn =
  "absolute top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(13,22,66,0.8)] transition-transform hover:scale-105 max-tablet:hidden";

export function TestimonialGallery() {
  const rail = React.useRef<HTMLUListElement>(null);
  const [scroll, setScroll] = React.useState({ at: 0, span: 1 });
  const [preview, setPreview] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState<number | null>(null);

  const stories = testimonialStories;

  const measure = React.useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScroll({
      at: max > 0 ? el.scrollLeft / max : 0,
      span: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
    });
  }, []);

  React.useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const nudge = (d: 1 | -1) =>
    rail.current?.scrollBy({
      left: d * rail.current.clientWidth * 0.8,
      behavior: "smooth",
    });

  return (
    <>
      <ul
        ref={rail}
        onScroll={measure}
        className="m-0 -mx-2 flex snap-x snap-mandatory scroll-px-2 gap-4 overflow-x-auto px-2 pb-3 [scrollbar-width:none] max-phablet:gap-3"
      >
        {stories.map((story, i) => (
          <li
            key={story.src}
            className="w-[clamp(168px,21vw,248px)] flex-none snap-start list-none animate-in fill-mode-both duration-500 fade-in slide-in-from-right-4"
            style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setPreview(story.src);
              }}
              onPointerLeave={() => setPreview(null)}
              aria-label={`Play student story ${pad(i + 1)} from ${story.city}`}
              className="group/story relative block aspect-9/16 w-full cursor-pointer overflow-hidden rounded-[18px] bg-cloud shadow-[0_18px_40px_-28px_rgba(13,22,66,0.8)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <Image
                src={story.poster}
                alt=""
                fill
                sizes="(max-width: 640px) 170px, 250px"
                className="object-cover transition-transform duration-700 group-hover/story:scale-105"
              />
              {preview === story.src && (
                <video
                  src={story.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  aria-hidden="true"
                  className="absolute inset-0 size-full animate-in object-cover duration-500 fade-in motion-reduce:hidden"
                />
              )}
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0.45)_0%,transparent_24%,transparent_58%,rgba(13,22,66,0.88)_100%)]" />

              <span className="absolute inset-x-3 bottom-3 flex items-end justify-end text-white">
                <span className="grid size-10 place-items-center rounded-full bg-crimson shadow-[0_8px_20px_-8px_rgba(217,31,42,0.9)] transition-transform duration-300 group-hover/story:scale-110">
                  <PlayIcon className="size-4 translate-x-px fill-white text-white" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-6 max-phablet:hidden">
        <div className="flex flex-none gap-2">
          <button
            type="button"
            className={railBtn}
            onClick={() => nudge(-1)}
            disabled={scroll.at <= 0.001}
            aria-label="Scroll stories back"
          >
            <ChevronLeftIcon className="size-4.5" />
          </button>
          <button
            type="button"
            className={railBtn}
            onClick={() => nudge(1)}
            disabled={scroll.at >= 0.999 || scroll.span >= 1}
            aria-label="Scroll stories forward"
          >
            <ChevronRightIcon className="size-4.5" />
          </button>
        </div>
      </div>

      <StoryViewer stories={stories} index={open} onIndex={setOpen} />
    </>
  );
}

function StoryViewer({
  stories,
  index,
  onIndex,
}: {
  stories: TestimonialStory[];
  index: number | null;
  onIndex: (i: number | null) => void;
}) {
  const [progress, setProgress] = React.useState(0);
  const [muted, setMuted] = React.useState(false);
  const swipe = React.useRef<number | null>(null);

  const story = index === null ? null : stories[index];
  const total = stories.length;

  const go = (d: 1 | -1) => {
    if (index === null) return;
    const next = index + d;
    setProgress(0);
    onIndex(next >= total ? null : Math.max(0, next));
  };

  return (
    <Dialog
      open={story !== null}
      onOpenChange={(o) => {
        if (o) return;
        onIndex(null);
        setProgress(0);
      }}
    >
      <DialogContent
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        className="w-[min(440px,calc(100%-1.5rem))] max-w-none gap-0 bg-transparent p-0 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">
          {story ? `Student story from ${story.city}` : "Student story"}
        </DialogTitle>

        {story && index !== null && (
          <div className="relative">
            <div
              className="relative mx-auto aspect-9/16 max-h-[86svh] overflow-hidden rounded-[22px] bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
              onPointerDown={(e) => {
                swipe.current = e.clientX;
              }}
              onPointerUp={(e) => {
                if (swipe.current === null) return;
                const dx = e.clientX - swipe.current;
                swipe.current = null;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              }}
            >
              <video
                key={story.src}
                src={story.src}
                poster={story.poster}
                autoPlay
                playsInline
                muted={muted}
                onTimeUpdate={(e) => {
                  const el = e.currentTarget;
                  if (el.duration) setProgress(el.currentTime / el.duration);
                }}
                onEnded={() => go(1)}
                onClick={(e) => {
                  const el = e.currentTarget;
                  if (el.paused) el.play().catch(() => {});
                  else el.pause();
                }}
                className="size-full cursor-pointer object-cover"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,transparent_20%,transparent_75%,rgba(0,0,0,0.6)_100%)]"
              />

              <div className="absolute inset-x-0 top-0 px-4 pt-4">
                <div
                  aria-hidden="true"
                  className="h-[3px] overflow-hidden rounded-full bg-white/30"
                >
                  <span
                    className="block h-full bg-white transition-[width] duration-300 ease-linear"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-white">
                  <span className="flex items-center gap-2 text-[14px] font-semibold">
                    {/* <MapPinIcon className="size-4 text-crimson" /> */}
                    {story.city}
                  </span>
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMuted((m) => !m)}
                      aria-label={muted ? "Unmute" : "Mute"}
                      className={cn(viewerBtn, "size-9")}
                    >
                      {muted ? (
                        <VolumeXIcon className="size-4" />
                      ) : (
                        <Volume2Icon className="size-4" />
                      )}
                    </button>
                    <DialogClose
                      aria-label="Close story"
                      className={cn(viewerBtn, "size-9")}
                    >
                      <XIcon className="size-4" />
                    </DialogClose>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous story"
              className={cn(sideBtn, "-left-16 disabled:opacity-30")}
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className={cn(sideBtn, "-right-16")}
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
