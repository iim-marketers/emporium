import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import type { Program } from "@/lib/programs";

/**
 * A course rendered as a tear-off boarding pass, under the institute's own
 * course artwork.
 *
 * The stub is a full-width strip along the bottom rather than a side column:
 * three of these sit in a row, and a side stub leaves too little room for the
 * title and spec row at that width. The punched notches are `::before`/`::after`
 * circles in the page background colour, sitting at the ends of the perforation.
 */
export function BoardingPass({ program }: { program: Program }) {
  const href = `/programs/${program.slug}`;

  const specs: [string, string][] = [
    ["Duration", program.duration],
    ["Level", program.level],
    ["Mode", program.mode],
  ];

  return (
    <Reveal
      className="flex flex-col overflow-hidden rounded-[16px] bg-ticket shadow-(--shadow) transition-transform duration-[250ms] hover:-translate-y-[5px]"
      as="article"
    >
      <div className="relative aspect-2/1 bg-cloud">
        <Image
          src={program.cardImage}
          alt=""
          fill
          sizes="(max-width: 960px) 92vw, 32vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-6.5 pt-6 pb-5.5 max-phablet:px-5">
        <span className="font-mono text-[11.5px] tracking-[0.16em] text-crimson">
          {program.tag}
        </span>
        <h3 className="mt-3 text-[19px] leading-[1.25] text-ink">
          <Link href={href} aria-label={`${program.title} — course details`}>
            {program.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-[14.5px] text-slate">{program.description}</p>

        <dl className="mt-auto grid grid-cols-3 gap-x-4 gap-y-3 border-t border-hairline pt-4.5 max-mini:grid-cols-2">
          {specs.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="font-mono text-[9.5px] tracking-[0.16em] text-[#9098b4] uppercase">
                {label}
              </dt>
              <dd className="mt-0.75 font-heading text-[14.5px] leading-[1.25] font-semibold text-royal">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The stub: perforated off the body, with the card's main action on it. */}
      <div
        className={[
          "relative flex items-center gap-4 bg-royal px-6 py-4 text-white",
          "border-t-2 border-dashed border-ticket",
          "before:absolute before:size-4 before:rounded-full before:bg-paper before:content-['']",
          "after:absolute after:size-4 after:rounded-full after:bg-paper after:content-['']",
          "before:-left-2 before:-top-2 after:-right-2 after:-top-2",
          "max-phablet:px-5",
        ].join(" ")}
      >
        <div className="flex-none">
          <div className="font-mono text-[9.5px] tracking-[0.14em] text-haze">
            GATE
          </div>
          <div className="mt-0.5 font-heading text-[18px] font-bold">
            {program.gate}
          </div>
        </div>

        <div
          className="h-7 flex-1 rounded-xs bg-[repeating-linear-gradient(90deg,#fff_0_2px,transparent_2px_4px,#fff_4px_5px,transparent_5px_9px)] opacity-85 max-narrow:hidden"
          aria-hidden="true"
        />

        {/* full tap target: this is the card's main action, not just a text link */}
        <Link
          className="ml-auto flex min-h-11 flex-none items-center gap-1.5 font-heading text-[13.5px] font-semibold whitespace-nowrap"
          href={href}
        >
          Read more →
        </Link>
      </div>
    </Reveal>
  );
}

export function BoardingPassGrid({ items }: { items: Program[] }) {
  return (
    <div className="grid grid-cols-3 gap-6.5 max-laptop:grid-cols-2 max-phone:grid-cols-1">
      {items.map((program) => (
        <BoardingPass key={program.slug} program={program} />
      ))}
    </div>
  );
}
