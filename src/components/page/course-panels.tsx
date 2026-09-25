import Link from "next/link";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Reveal } from "@/components/reveal";
import { courseArt } from "@/lib/home-media";
import { type Program } from "@/lib/programs";

const panelArt: Record<string, string> = {
  hospitality: "/home/photos/bar-service-2.webp",
};

export function CoursePanels({ items }: { items: Program[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-laptop:grid-cols-1 max-laptop:gap-5">
      {items.map((program, i) => (
        <Reveal
          as="li"
          key={program.slug}
          style={{ transitionDelay: `${i * 90}ms` }}
          className="group relative isolate flex aspect-[3/4.3] flex-col justify-end overflow-hidden bg-navy p-8 text-white max-laptop:aspect-4/3 max-phablet:aspect-4/5 max-phablet:p-6"
        >
          <ImageWithSkeleton
            src={
              panelArt[program.slug] ??
              courseArt[program.slug]?.card ??
              program.cardImage
            }
            alt=""
            fill
            sizes="(max-width: 960px) 92vw, 32vw"
            className="-z-20 object-cover object-[50%_25%] transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,12,36,0.55)_0%,rgba(8,12,36,0.05)_30%,rgba(8,12,36,0.45)_55%,rgba(8,12,36,0.94)_100%)]"
          />

          <div>
            <h3 className="font-sans text-[clamp(22px,2vw,27px)] leading-[1.15] font-semibold tracking-[-0.02em]">
              <Link
                href={`/programs/${program.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {program.shortTitle}
              </Link>
            </h3>
            <p className="mt-3 line-clamp-2 text-[14.5px] leading-relaxed text-white/75">
              {program.description}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
