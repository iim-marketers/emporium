"use client";

import Image from "next/image";
import * as React from "react";

import { faces } from "@/lib/home-media";
import { cn } from "@/lib/utils";

const faceVisibility = (i: number) =>
  cn(
    i >= 8 && "hidden 2xl:block",
    i >= 6 && "max-laptop:hidden",
    i >= 4 && "max-phone:hidden",
  );

export function FacesStrip() {
  const list = React.useRef<HTMLUListElement>(null);
  const [touch, setTouch] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [spot, setSpot] = React.useState(-1);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const hover = window.matchMedia("(hover: hover)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setTouch(!hover.matches && !motion.matches);
    sync();
    hover.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      hover.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  React.useEffect(() => {
    const el = list.current;
    if (!el || !touch) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [touch]);

  React.useEffect(() => {
    const el = list.current;
    if (!el || !touch || !inView) return;
    const shown = () =>
      Array.from(el.children).flatMap((li, i) =>
        (li as HTMLElement).offsetParent ? [i] : [],
      );
    const id = window.setInterval(() => {
      const ids = shown();
      setSpot((s) => ids[(ids.indexOf(s) + 1) % ids.length] ?? -1);
    }, 1800);
    return () => window.clearInterval(id);
  }, [touch, inView, tick]);

  return (
    <section aria-label="Emporium students" className="bg-navy">
      <ul
        ref={list}
        className="grid grid-cols-8 2xl:grid-cols-10 max-laptop:grid-cols-6 max-phone:grid-cols-4"
      >
        {faces.map((face, i) => (
          <li
            key={face.src}
            data-on={touch && spot === i ? "" : undefined}
            onClick={() => {
              if (!touch) return;
              setSpot(i);
              setTick((t) => t + 1);
            }}
            className={cn(
              "group relative aspect-3/4 overflow-hidden",
              faceVisibility(i),
            )}
          >
            <Image
              src={face.src}
              alt={`An Emporium ${face.track.toLowerCase()} student in uniform`}
              fill
              sizes="(max-width: 560px) 25vw, (max-width: 960px) 17vw, 12.5vw"
              className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 group-data-on:scale-[1.04] group-data-on:grayscale-0"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-ink/90 to-transparent px-3 pt-8 pb-3 font-mono text-[10px] tracking-[0.22em] text-white uppercase transition-transform duration-500 group-hover:translate-y-0 group-data-on:translate-y-0"
            >
              {face.track}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
