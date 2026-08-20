import Link from "next/link";

import { Reveal } from "@/components/reveal";
import type { Program } from "@/lib/programs";

/**
 * A program rendered as a tear-off boarding pass. The stub's punched notches
 * are `::before`/`::after` circles painted in the page background colour, and
 * they move from the vertical seam to the horizontal one once the card stacks.
 */
export function BoardingPass({ program }: { program: Program }) {
  const href = `/programs/${program.slug}`;

  return (
    <Reveal
      className="relative grid grid-cols-[1fr_128px] overflow-hidden rounded-[16px] bg-ticket shadow-(--shadow) transition-transform duration-[250ms] hover:-translate-y-[5px] max-phone:grid-cols-1"
      as="article"
    >
      <div className="relative border-r-2 border-dashed border-hairline px-6.5 pt-6.5 pb-5.5 max-phone:border-r-0 max-phone:border-b-2 max-phone:px-5 max-phone:pt-5.5 max-phone:pb-4.5">
        <span className="font-mono text-[11.5px] tracking-[0.16em] text-crimson">
          {program.tag}
        </span>
        <h3 className="mt-3 mb-1 max-w-[30ch] text-[19px] text-ink">
          <Link href={href} aria-label={`${program.title} — program details`}>
            {program.title}
          </Link>
        </h3>
        <p className="mt-2 text-[14.5px] text-slate">{program.description}</p>
        <div className="mt-5.5 grid grid-cols-3 gap-3.5 border-t border-hairline pt-4.5 max-narrow:grid-cols-2 max-mini:grid-cols-1 max-mini:gap-2.5">
          {[
            ["Duration", program.duration],
            ["Level", program.level],
            ["Mode", program.mode],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="font-mono text-[9.5px] tracking-[0.16em] text-[#9098b4] uppercase">
                {label}
              </div>
              <div className="mt-0.75 font-heading text-[15px] font-semibold text-royal">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={[
          "relative flex flex-col justify-between bg-royal px-4 py-5.5 text-white",
          // punched notches at the ends of the perforation
          "before:absolute before:size-4 before:rounded-full before:bg-paper before:content-['']",
          "after:absolute after:size-4 after:rounded-full after:bg-paper after:content-['']",
          "before:-left-2.25 before:-top-2 after:-left-2.25 after:-bottom-2",
          // once the card stacks the seam is horizontal, so the notches move to the sides
          "max-phone:flex-row max-phone:items-center max-phone:gap-4.5 max-phone:px-5 max-phone:py-4",
          "max-phone:before:-left-2 max-phone:before:top-auto",
          "max-phone:after:left-auto max-phone:after:-right-2 max-phone:after:bottom-auto",
        ].join(" ")}
      >
        <div>
          <div className="font-mono text-[9.5px] tracking-[0.14em] text-haze">
            GATE
          </div>
          <div className="mt-0.5 font-heading text-[20px] font-bold">
            {program.gate}
          </div>
        </div>
        <div className="mt-3 h-8.5 rounded-xs bg-[repeating-linear-gradient(90deg,#fff_0_2px,transparent_2px_4px,#fff_4px_5px,transparent_5px_9px)] opacity-85 max-phone:mt-0 max-phone:h-7 max-phone:flex-1" />
        {/* full tap target: this is the card's main action, not just a text link */}
        <Link
          className="mt-auto flex min-h-11 items-center gap-1.5 font-heading text-[13.5px] font-semibold max-phone:mt-0 max-phone:ml-auto max-phone:whitespace-nowrap"
          href={href}
        >
          Apply →
        </Link>
      </div>
    </Reveal>
  );
}

export function BoardingPassGrid({ items }: { items: Program[] }) {
  return (
    <div className="grid grid-cols-2 gap-6.5 max-laptop:grid-cols-1">
      {items.map((program) => (
        <BoardingPass key={program.slug} program={program} />
      ))}
    </div>
  );
}
