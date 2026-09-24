"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { frameBtn } from "@/components/home/frame-btn";
import { courseArt } from "@/lib/home-media";
import type { Program } from "@/lib/programs";
import { cn } from "@/lib/utils";

const sideCard = [
  "relative flex h-110 w-72 flex-none cursor-pointer flex-col border border-white/35 p-7 text-left",
  "transition-[border-color,background-color] duration-300 hover:border-white/80 hover:bg-white/5",
  "max-wide:w-60 max-laptop:hidden",
].join(" ");

export function CourseCarousel({
  items,
  children,
}: {
  items: Program[];
  children: React.ReactNode;
}) {
  const [{ active, dir, moves }, setSlide] = React.useState({
    active: 0,
    dir: 0,
    moves: 0,
  });
  const touchX = React.useRef<number | null>(null);
  const row = React.useRef<HTMLDivElement>(null);

  const at = (offset: number) =>
    (active + offset + items.length) % items.length;
  const go = (offset: number) =>
    setSlide({ active: at(offset), dir: Math.sign(offset), moves: moves + 1 });

  /** The centre card slides in from the side slot it came from; the side
   *  cards follow, one out of the centre and one in from the far edge. */
  React.useLayoutEffect(() => {
    const el = row.current;
    if (!moves || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [prev, centre, next] = Array.from(el.children) as HTMLElement[];
    const mid = (node: HTMLElement) => {
      const r = node.getBoundingClientRect();
      return r.left + r.width / 2;
    };
    const step = prev.offsetParent ? mid(centre) - mid(prev) : 60;
    const timing = { duration: 650, easing: "cubic-bezier(0.22, 0.8, 0.2, 1)" };
    const from = (
      node: HTMLElement,
      x: number,
      scale: number,
      opacity: number,
    ) =>
      node.animate(
        [
          { transform: `translateX(${x}px) scale(${scale})`, opacity },
          { transform: "none", opacity: 1 },
        ],
        timing,
      );

    from(centre, dir * step, 0.88, 0.35);
    if (!prev.offsetParent) return;
    if (dir > 0) {
      from(prev, step, 1.1, 0.3);
      from(next, step / 2, 1, 0);
    } else {
      from(prev, -step / 2, 1, 0);
      from(next, -step, 1.1, 0.3);
    }
  }, [moves, dir]);

  const program = items[active];
  const art = courseArt[program.slug];

  return (
    <section
      id="courses"
      aria-roledescription="carousel"
      aria-label="Courses"
      className="relative isolate overflow-hidden bg-navy py-20 text-white max-laptop:py-20 max-phablet:py-16"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
    >
      {items.map((item, i) => (
        <Image
          key={item.slug}
          src={courseArt[item.slug]?.scene ?? item.image}
          alt=""
          fill
          sizes="100vw"
          className={cn(
            "-z-20 scale-105 object-cover transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,12,36,0.88)_0%,rgba(8,12,36,0.72)_40%,rgba(8,12,36,0.82)_100%)]"
      />
      <div aria-hidden="true" className="seam-t -z-10 [--seam-size:clamp(48px,7vh,84px)]" />

      {children}

      <div
        ref={row}
        className="mt-14 flex items-center justify-center gap-8 max-wide:gap-5 max-laptop:mt-10"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <button
          type="button"
          className={sideCard}
          onClick={() => go(-1)}
          aria-label={`Show ${items[at(-1)].shortTitle}`}
        >
          <SideLabel program={items[at(-1)]} />
        </button>

        <article
          aria-live="polite"
          className="flex w-105 flex-none flex-col bg-white text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] max-laptop:w-[min(460px,92vw)]"
        >
          {/* <p className="px-7 pt-7 pb-6 text-center font-mono text-[11.5px] tracking-[0.28em] text-ink uppercase">
            Gate {program.gate} · {program.duration}
          </p> */}
          <div className="relative aspect-16/11 bg-cloud">
            <Image
              src={art?.card ?? program.cardImage}
              alt=""
              fill
              sizes="(max-width: 960px) 92vw, 420px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="flex flex-1 flex-col items-center px-8 pt-7 pb-8 text-center max-phablet:px-6">
            <h3 className="text-[22px] leading-[1.2] font-semibold tracking-[-0.02em] max-tablet:flex max-tablet:min-h-[2lh] max-tablet:items-center">
              {program.shortTitle}
            </h3>
            <p className="mt-3.5 line-clamp-3 min-h-[calc(3lh)] text-[14.5px] leading-relaxed text-slate">
              {program.description}
            </p>
            <Link
              href={`/programs/${program.slug}`}
              className={cn(frameBtn({ tone: "dark" }), "mt-7")}
            >
              View course
            </Link>
          </div>
        </article>

        <button
          type="button"
          className={sideCard}
          onClick={() => go(1)}
          aria-label={`Show ${items[at(1)].shortTitle}`}
        >
          <SideLabel program={items[at(1)]} />
        </button>
      </div>

      <div className="mt-10 flex items-center justify-center gap-1 font-mono text-[13px] tracking-[0.2em]">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous course"
          className="grid size-11 cursor-pointer place-items-center text-white/80 transition-colors hover:text-white"
        >
          <ChevronLeftIcon className="size-5" />
        </button>
        <span aria-hidden="true">
          {active + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next course"
          className="grid size-11 cursor-pointer place-items-center text-white/80 transition-colors hover:text-white"
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </section>
  );
}

function SideLabel({ program }: { program: Program }) {
  return (
    <>
      <span className="mt-3 font-sans text-center text-[14px] leading-snug font-semibold tracking-[0.18em] uppercase">
        {program.shortTitle}
      </span>
    </>
  );
}
