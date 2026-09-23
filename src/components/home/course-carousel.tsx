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
  const [active, setActive] = React.useState(0);
  const touchX = React.useRef<number | null>(null);

  const at = (offset: number) =>
    (active + offset + items.length) % items.length;
  const go = (offset: number) => setActive(at(offset));
  const program = items[active];
  const art = courseArt[program.slug];

  return (
    <section
      id="courses"
      aria-roledescription="carousel"
      aria-label="Courses"
      className="relative isolate overflow-hidden bg-navy py-28 text-white max-laptop:py-20 max-phablet:py-16"
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

      {children}

      <div
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
          key={program.slug}
          aria-live="polite"
          className="flex w-105 flex-none animate-in flex-col bg-white text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] duration-500 fade-in max-laptop:w-[min(460px,92vw)]"
        >
          <p className="px-7 pt-7 pb-6 text-center font-mono text-[11.5px] tracking-[0.28em] text-ink uppercase">
            Gate {program.gate} · {program.duration}
          </p>
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
            <h3 className="text-[22px] leading-[1.2] font-semibold tracking-[-0.02em]">
              {program.shortTitle}
            </h3>
            <p className="mt-3.5 text-[14.5px] leading-relaxed text-slate">
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

      <div className="mt-10 flex items-center justify-center gap-6 font-mono text-[13px] tracking-[0.2em]">
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
      <span className="font-mono text-[10.5px] tracking-[0.24em] text-haze">
        GATE {program.gate}
      </span>
      <span className="mt-3 font-sans text-[14px] leading-snug font-semibold tracking-[0.18em] uppercase">
        {program.shortTitle}
      </span>
      <span className="mt-auto flex items-center gap-2 font-mono text-[10.5px] tracking-[0.2em] text-white/60 uppercase">
        {program.duration} <ChevronRightIcon className="size-3.5" />
      </span>
    </>
  );
}
