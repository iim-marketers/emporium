"use client";

import Image from "next/image";
import * as React from "react";

import { pillars } from "@/lib/content";
import { pillarPhotos } from "@/lib/home-media";
import { cn } from "@/lib/utils";

/** Wide screens: panels share a row and the chosen one opens out.
 *  Below 961px every panel is open, stacked as cards. */
export function PillarPanels() {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="flex h-[min(620px,78vh)] min-h-130 gap-3 max-laptop:grid max-laptop:h-auto max-laptop:min-h-0 max-laptop:grid-cols-2 max-laptop:gap-4 max-phone:grid-cols-1">
      {pillars.map((pillar, i) => {
        const isOpen = open === i;
        return (
          <article
            key={pillar.no}
            tabIndex={0}
            onPointerEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={() => setOpen(i)}
            data-open={isOpen}
            className={cn(
              "group relative min-w-0 cursor-pointer overflow-hidden rounded-[4px] bg-navy text-white outline-offset-4",
              "transition-[flex-grow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
              isOpen ? "grow-[3.2]" : "grow",
              "basis-0 max-laptop:aspect-4/5 max-laptop:cursor-default max-phone:aspect-4/5",
            )}
          >
            <Image
              src={pillarPhotos[i].src}
              alt={pillarPhotos[i].alt}
              fill
              sizes="(max-width: 560px) 92vw, (max-width: 960px) 46vw, 50vw"
              className={cn(
                "object-cover transition-[transform,filter] duration-1000",
                isOpen ? "scale-100" : "scale-110 brightness-75",
                "max-laptop:scale-100 max-laptop:brightness-100",
              )}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,36,0.35)_0%,transparent_30%,rgba(8,12,36,0.55)_60%,rgba(8,12,36,0.95)_100%)]"
            />

            <span className="absolute top-6 left-6 font-mono text-[12px] tracking-[0.22em] text-white/85">
              {pillar.no}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-7 max-phablet:p-5">
              <h3
                className={cn(
                  "font-sans leading-[1.15] font-semibold tracking-[-0.02em] transition-[font-size] duration-500",
                  isOpen ? "text-[26px]" : "text-[17px]",
                  "max-laptop:text-[21px]",
                )}
              >
                {pillar.title}
              </h3>
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-700",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                  "max-laptop:grid-rows-[1fr] max-laptop:opacity-100",
                )}
              >
                <p className="max-w-[52ch] overflow-hidden text-[14.5px] leading-relaxed text-white/80">
                  <span className="block pt-3.5">{pillar.body}</span>
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
