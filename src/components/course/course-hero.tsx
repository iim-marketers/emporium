import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const label = "font-mono text-[10px] font-bold tracking-[0.24em] uppercase";

export function CourseHero({
  eyebrow,
  title,
  image,
  focus = "center",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  image: string;
  focus?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[clamp(560px,86vh,820px)] items-end overflow-hidden bg-navy text-white max-tablet:min-h-[620px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 animate-kenburns object-cover motion-reduce:animate-none"
        style={{ objectPosition: focus }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,22,66,0.92)_0%,rgba(13,22,66,0.6)_38%,rgba(13,22,66,0.08)_72%),linear-gradient(180deg,rgba(13,22,66,0.45)_0%,transparent_30%,transparent_55%,var(--navy)_100%)] max-tablet:bg-[linear-gradient(180deg,rgba(13,22,66,0.35)_0%,rgba(13,22,66,0.25)_35%,rgba(13,22,66,0.92)_75%,var(--navy)_100%)]"
      />

      <div
        className={cn(
          wrap,
          "pt-24 pb-[clamp(150px,19vh,200px)] laptop:pb-[clamp(170px,24vh,260px)] max-tablet:pb-36",
        )}
      >
        <Reveal className="max-w-190">
          {/* <p className={cn(label, "flex items-center gap-3 text-[11px] text-haze")}>
            <span aria-hidden="true" className="size-1.5 bg-crimson" />
            {eyebrow}
          </p> */}
          <h1 className="mt-5 max-w-[17ch] font-hero text-[clamp(38px,4vw,58px)] leading-[1.02] font-normal tracking-[-0.02em] text-balance max-phablet:text-[clamp(34px,10vw,46px)]">
            {title}
          </h1>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/** Key course facts on a floating card that overlaps the hero's foot. */
export function CourseFacts({
  fields,
}: {
  fields: { label: string; value: string; icon: LucideIcon }[];
}) {
  return (
    <div className="relative z-10">
      <div className={cn(wrap, "-mt-[clamp(52px,7vh,72px)]")}>
        <Reveal
          as="div"
          className="grid grid-cols-4 overflow-hidden rounded-[12px] bg-white shadow-[0_30px_70px_-34px_rgba(13,22,66,0.5)] ring-1 ring-hairline max-laptop:grid-cols-2"
        >
          {fields.map(({ label: name, value, icon: Icon }, i) => (
            <div
              key={name}
              className={cn(
                "group flex items-center gap-4 px-7 py-6 max-phablet:items-start max-phablet:gap-3 max-phablet:px-5 max-phablet:py-5",
                i > 0 && "laptop:border-l laptop:border-hairline",
                "max-laptop:[&:nth-child(even)]:border-l max-laptop:[&:nth-child(n+3)]:border-t max-laptop:border-hairline",
              )}
            >
              <span className="grid size-12 flex-none place-items-center rounded-full bg-navy text-white max-phablet:size-10">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className={cn(label, "text-slate/60")}>{name}</p>
                <p className="mt-1 text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink max-phablet:text-[15.5px]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
