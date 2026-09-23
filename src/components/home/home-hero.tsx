import Link from "next/link";
import type * as React from "react";

import { ScrollLink } from "@/components/hash-scroll";
import { frameBtn } from "@/components/home/frame-btn";
import { heroStill } from "@/lib/home-media";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Saol sets "Train for the skies." about 3.7em wide, and the first face
 *  starts 28.5% into the photo, so the photo grows just enough to put that
 *  face past the headline. Capped so the fifth woman stays in frame. */
const heroVars = {
  "--hero-font": "clamp(48px, min(7.2vw, 12vh), 96px)",
  "--hero-photo-w":
    "clamp(100%, calc((max(4vw, (100vw - 1230px) / 2) + 3.7 * var(--hero-font) + 80px) / 0.285), 134vw)",
} as React.CSSProperties;

export function HomeHero() {
  return (
    <section
      style={heroVars}
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-navy text-white",
        "-mt-18.25 h-svh min-h-140 max-mini:-mt-16.25",
      )}
    >
      {/* Portrait screens get a cut with sky above, so all five stay in frame.
          From laptop width the photo is drawn wider than the screen and pinned
          left, which nudges the group right, clear of the headline. */}
      <picture className="absolute inset-y-0 left-0 -z-20 w-full laptop:landscape:w-(--hero-photo-w)">
        <source
          media="(max-width: 1024px) and (orientation: portrait)"
          srcSet={heroStill.tall}
        />
        <img
          src={heroStill.wide}
          alt=""
          fetchPriority="high"
          className="size-full object-cover"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,12,36,0.72)_0%,rgba(8,12,36,0.2)_26%,rgba(8,12,36,0.3)_55%,rgba(8,12,36,0.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,12,36,0.72)_0%,rgba(8,12,36,0.25)_45%,transparent_70%)] max-tablet:bg-none"
      />

      <div
        className={cn(
          wrap,
          "flex flex-1 flex-col justify-center pt-[calc(73px+3vh)] pb-[13vh]",
          "max-laptop:justify-start max-laptop:pt-[calc(73px+1vh)] max-laptop:pb-8",
          "portrait:justify-start portrait:pt-[calc(73px+1vh)] portrait:pb-8",
          "max-laptop:items-center max-laptop:text-center portrait:items-center portrait:text-center",
        )}
      >
        <p className="flex items-center gap-4 font-mono text-[11.5px] tracking-[0.34em] text-white/75 uppercase max-phablet:text-[10px] max-phablet:tracking-[0.26em]">
          Aviation · Hospitality · Cruise
        </p>

        <h1
          className={cn(
            "mt-[2.4vh] font-hero font-normal tracking-[-0.02em]",
            "text-(length:--hero-font) leading-[0.92]",
            "max-phablet:text-[clamp(46px,14vw,64px)]",
          )}
        >
          {["Train for", "the skies."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span
                className="block animate-rise motion-reduce:animate-none"
                style={{ animationDelay: `${150 + i * 140}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
          <span
            className={cn(
              "mt-[0.7em] flex items-center gap-3 overflow-hidden p-px font-sans text-[max(15px,0.22em)] leading-tight font-medium tracking-[-0.01em] text-white/90",
              "max-laptop:justify-center max-laptop:text-[max(15px,0.3em)]",
              "portrait:justify-center portrait:text-[max(15px,0.3em)]",
            )}
          >
            <span
              aria-hidden="true"
              className="hidden h-px w-8 origin-right animate-draw bg-white/50 max-laptop:block portrait:block motion-reduce:animate-none"
              style={{ animationDelay: "480ms" }}
            />
            <span
              className="block animate-rise rounded-full border border-white/25 bg-navy/30 px-[1.1em] py-[0.45em] backdrop-blur-sm motion-reduce:animate-none"
              style={{ animationDelay: "480ms" }}
            >
              Build a new nation.
            </span>
            <span
              aria-hidden="true"
              className="hidden h-px w-8 origin-left animate-draw bg-white/50 max-laptop:block portrait:block motion-reduce:animate-none"
              style={{ animationDelay: "480ms" }}
            />
          </span>
        </h1>

        {/* <p className="mt-[3.2vh] max-w-[46ch] text-[clamp(14px,1.9vh,16px)] leading-relaxed text-white/80 max-phablet:mt-5 max-phablet:text-[14.5px]">
          Certificate courses in Aviation, Hospitality Management and Cruise
          Lines, with grooming, communication and 100% placement assistance
          through our dedicated Placement Cell.
        </p>

        <div className="mt-[4vh] flex flex-wrap gap-3 max-phablet:mt-6 max-phablet:flex-col">
          <ScrollLink
            href="/enquire"
            to="enquire"
            className={frameBtn({ tone: "light" })}
          >
            Enquire now
          </ScrollLink>
          <Link href="/programs" className={frameBtn({ tone: "outline" })}>
            Explore courses
          </Link>
        </div> */}
      </div>
    </section>
  );
}
