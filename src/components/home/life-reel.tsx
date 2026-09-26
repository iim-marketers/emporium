"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import * as React from "react";

import { FixedBackdrop } from "@/components/fixed-backdrop";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { backgrounds } from "@/lib/backgrounds";
import { lifeClips } from "@/lib/home-media";
import { cn } from "@/lib/utils";

const arrowBtn = [
  "grid size-12 cursor-pointer place-items-center text-white",
  "transition-[background-color,border-color] duration-200",
  "hover:border-white hover:bg-white/10",
].join(" ");

const pad = (n: number) => String(n).padStart(2, "0");

const total = lifeClips.length;
const wrapIndex = (x: number) =>
  ((((x + total / 2) % total) + total) % total) - total / 2;

function ringGeometry(w: number, h: number) {
  const phone = w < 641;
  const cardW = Math.round(
    phone
      ? Math.min(w * 0.62, h * 0.58 * (9 / 16))
      : Math.min(w * 0.24, h * 0.66 * (9 / 16), 400),
  );
  const step = phone ? 30 : 24;
  const radius = Math.round((cardW * 1.04) / Math.sin((step * Math.PI) / 180));
  return {
    cardW,
    cardH: Math.round((cardW * 16) / 9),
    step,
    radius,
    perspective: phone ? w * 2.6 : w * 1.4,
    floor: phone ? 16 : 40,
  };
}

function ReelVideo({
  ref,
  src,
  muted,
  onTimeUpdate,
  onEnded,
}: {
  ref: React.Ref<HTMLVideoElement>;
  src: string;
  muted: boolean;
  onTimeUpdate: React.ReactEventHandler<HTMLVideoElement>;
  onEnded: () => void;
}) {
  const [ready, setReady] = React.useState(false);
  return (
    <video
      ref={ref}
      src={src}
      muted={muted}
      playsInline
      preload="auto"
      onLoadedData={() => setReady(true)}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
      className={cn(
        "pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-300",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

export function LifeReel({ children }: { children: React.ReactNode }) {
  const root = React.useRef<HTMLDivElement>(null);
  const video = React.useRef<HTMLVideoElement>(null);
  const drag = React.useRef<{
    x: number;
    start: number;
    moved: boolean;
    lastX: number;
    lastT: number;
    v: number;
  }>(null);
  const frame = React.useRef(0);

  const [pos, setPos] = React.useState(0);
  const [viewport, setViewport] = React.useState({ w: 1440, h: 900 });
  const [dragging, setDragging] = React.useState(false);
  const [progress, setProgress] = React.useState({ clip: 0, value: 0 });
  const [muted, setMuted] = React.useState(true);
  const [inView, setInView] = React.useState(false);
  const [still, setStill] = React.useState(false);

  const { cardW, cardH, step, radius, perspective, floor } = ringGeometry(
    viewport.w,
    viewport.h,
  );
  const active = ((Math.round(pos) % total) + total) % total;

  const spin = React.useCallback(
    (d: 1 | -1) => setPos((p) => Math.round(p) + d),
    [],
  );
  const spinTo = (i: number) => setPos((p) => p + wrapIndex(i - p));
  const settle = (fling = 0) => setPos((p) => Math.round(p + fling));
  const endDrag = () => {
    const d = drag.current;
    cancelAnimationFrame(frame.current);
    setDragging(false);
    const fling =
      d?.moved && Math.abs(d.v) > 0.3
        ? Math.max(-3, Math.min(3, (-d.v * 220) / cardW))
        : 0;
    settle(fling);
  };

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setStill(motion.matches);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    sync();
    motion.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      motion.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  React.useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = muted;
    if (inView && !still) el.play().catch(() => {});
    else el.pause();
  }, [active, dragging, inView, still, muted]);

  const ease = dragging
    ? "none"
    : "transform 750ms cubic-bezier(0.2,0.7,0.2,1), opacity 750ms";

  return (
    <>
      <FixedBackdrop src={backgrounds.life} />

      <div
        ref={root}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") spin(-1);
          if (event.key === "ArrowRight") spin(1);
        }}
      >
        <div className="mx-auto w-[min(1230px,92vw)]">{children}</div>

        <div
          className="relative mt-12 cursor-grab touch-pan-y select-none active:cursor-grabbing max-phablet:mt-9"
          style={{ height: cardH + floor, perspective }}
          onPointerDown={(event) => {
            drag.current = {
              x: event.clientX,
              start: pos,
              moved: false,
              lastX: event.clientX,
              lastT: event.timeStamp,
              v: 0,
            };
            setDragging(true);
          }}
          onPointerMove={(event) => {
            const d = drag.current;
            if (!d) return;
            const dt = event.timeStamp - d.lastT;
            if (dt > 0)
              d.v = 0.8 * ((event.clientX - d.lastX) / dt) + 0.2 * d.v;
            d.lastX = event.clientX;
            d.lastT = event.timeStamp;
            const dx = event.clientX - d.x;
            if (Math.abs(dx) > 6) d.moved = true;
            if (!d.moved) return;
            cancelAnimationFrame(frame.current);
            frame.current = requestAnimationFrame(() =>
              setPos(d.start - dx / cardW),
            );
          }}
          onPointerUp={() => {
            endDrag();
            setTimeout(() => {
              drag.current = null;
            });
          }}
          onPointerCancel={() => {
            endDrag();
            drag.current = null;
          }}
          onPointerLeave={() => {
            if (!drag.current) return;
            endDrag();
            drag.current = null;
          }}
        >
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-2xl"
          />
          <div
            className="absolute top-0 left-1/2"
            style={{
              width: cardW,
              height: cardH,
              marginLeft: -cardW / 2,
              transformStyle: "preserve-3d",
            }}
          >
            {lifeClips.map((item, i) => {
              const turn = wrapIndex(i - pos) * step;
              const angle = Math.abs(turn);
              const on = i === active;
              const visible = angle < 100;
              return (
                <figure
                  key={item.src}
                  onClick={() => {
                    if (!on && !drag.current?.moved) spinTo(i);
                  }}
                  className={cn(
                    "absolute inset-0 m-0 overflow-hidden rounded-[22px] bg-navy-2 ring-1 ring-white/15 [backface-visibility:hidden]",
                    on
                      ? "shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
                      : "cursor-pointer",
                    !visible && "pointer-events-none",
                  )}
                  style={{
                    transform: `translateZ(${-radius}px) rotateY(${turn}deg) translateZ(${radius}px)`,
                    opacity: visible ? 1 - angle / 130 : 0,
                    transition: ease,
                    willChange: "transform, opacity",
                  }}
                >
                  {visible ? (
                    <ImageWithSkeleton
                      src={item.poster}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 62vw, 400px"
                      className="pointer-events-none object-cover"
                      skeletonClassName="bg-navy-2 text-white/10"
                    />
                  ) : null}

                  {on && !dragging ? (
                    <ReelVideo
                      ref={video}
                      key={item.src}
                      src={item.src}
                      muted={muted}
                      onTimeUpdate={(event) => {
                        const el = event.currentTarget;
                        if (el.duration)
                          setProgress({
                            clip: i,
                            value: el.currentTime / el.duration,
                          });
                      }}
                      onEnded={() => spin(1)}
                    />
                  ) : null}

                  {!on && visible ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-black"
                      style={{ opacity: angle / 160, transition: ease }}
                    />
                  ) : null}

                  {on ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0.45)_0%,transparent_20%,transparent_62%,rgba(13,22,66,0.9)_100%)]"
                      />

                      <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-2 max-phablet:px-4">
                        <span className="block text-[14px] leading-snug font-medium max-phablet:text-[15px]">
                          {item.caption}
                        </span>
                      </figcaption>
                    </>
                  ) : null}
                </figure>
              );
            })}
          </div>

          {inView && !still
            ? [active - 1, active + 1].map((n) => {
                const src = lifeClips[(n + total) % total].src;
                return (
                  <video
                    key={src}
                    src={src}
                    muted
                    preload="auto"
                    aria-hidden="true"
                    className="hidden"
                  />
                );
              })
            : null}
        </div>

        <div className="flex items-center justify-center gap-1 ">
          <button
            type="button"
            className={arrowBtn}
            onClick={() => spin(-1)}
            aria-label="Previous clip"
          >
            <ChevronLeftIcon className="size-4.5" />
          </button>
          <span className="min-w-20 text-center font-mono text-[13px] tracking-[0.2em] text-white/80">
            {pad(active + 1)} / {pad(total)}
          </span>
          <button
            type="button"
            className={arrowBtn}
            onClick={() => spin(1)}
            aria-label="Next clip"
          >
            <ChevronRightIcon className="size-4.5" />
          </button>
        </div>
      </div>
    </>
  );
}
