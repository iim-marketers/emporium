"use client";

import * as React from "react";

import { ApplyDialog } from "@/components/apply-dialog";
import { Reveal } from "@/components/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { btn } from "@/lib/btn";
import { jobs, type Job } from "@/lib/jobs";
import { cn } from "@/lib/utils";

const metaKey =
  "font-mono text-[10.5px] tracking-[0.16em] text-[#9098b4] uppercase";
const metaValue = "mt-1 text-[14.5px] text-ink";

/** How long a drive sits on screen before the board turns to the next one. */
const DWELL_MS = 4000;

function WhatsAppIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="flex-none"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function JobCard({
  job,
  animate = true,
  className,
}: {
  job: Job;
  animate?: boolean;
  className?: string;
}) {
  const meta = [
    ["Position", job.position],
    job.employer ? ["Job Posting", job.employer] : null,
    ["Date", job.date],
    ["Time", job.time],
  ].filter(Boolean) as [string, string][];

  const Shell = animate ? Reveal : "article";

  return (
    <Shell
      {...(animate ? { as: "article" as const } : {})}
      className={cn(
        "overflow-hidden rounded-(--r) border border-hairline bg-white",
        className,
      )}
    >
      <div className="border-b  border-hairline bg-paper px-6.5 py-5 max-phablet:px-5">
        <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] text-crimson">
          <i className="size-1.75 rounded-full bg-green shadow-[0_0_0_4px_rgba(62,207,142,0.18)]" />
          NOW HIRING
        </span>
        <h3 className="mt-3 text-[18px] leading-[1.3] text-ink max-phablet:text-[16px]">
          {job.title}
        </h3>
      </div>

      <div className="px-6.5 py-6 max-phablet:px-5">
        <div className="grid grid-cols-4 gap-4 max-laptop:grid-cols-2 max-mini:grid-cols-1">
          {meta.map(([key, value]) => (
            <div key={key}>
              <div className={metaKey}>{key}</div>
              <div className={metaValue}>{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t -mx-6.5 px-6.5 border-hairline pt-4.5">
          <div className={metaKey}>Venue</div>
          <div className={cn(metaValue, "max-w-[70ch]")}>{job.venue}</div>
        </div>

        <p className="mt-5 text-[15px] text-slate">
          {job.registerWith} —{" "}
          <b className="text-royal">{job.whatsapp.display}</b>
        </p>

        <div className="mt-5.5 flex flex-wrap gap-3.5 max-phablet:flex-col max-phablet:items-stretch">
          <a
            href={job.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            className={btn({ variant: "dark", block: "phone" })}
          >
            <WhatsAppIcon /> WhatsApp {job.whatsapp.display}
          </a>
          <ApplyDialog subject={job.position} block="phone" />
        </div>
      </div>
    </Shell>
  );
}

export function JobList({ items = jobs }: { items?: Job[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);
  const [held, setHeld] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `selected` in the deps is deliberate: each turn re-arms a fresh dwell.
    const id = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [api, held, selected]);

  if (items.length < 2) {
    return (
      <div className="grid gap-6">
        {items.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  }

  return (
    <Reveal
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <Carousel
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
        aria-label="Live hiring drives. Turns automatically — hover or focus to hold."
      >
        <CarouselContent className="-ml-4 py-2">
          {items.map((job) => (
            <CarouselItem key={job.id} className="pl-4">
              <JobCard job={job} animate={false} className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-3 flex items-center justify-center gap-4">
        <BoardButton label="Previous drive" onClick={() => api?.scrollPrev()}>
          ‹
        </BoardButton>

        <div className="flex items-center gap-2">
          {items.map((job, i) => (
            <button
              key={job.id}
              type="button"
              aria-label={`Show drive ${i + 1} of ${items.length}`}
              aria-current={i === selected}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-300",
                i === selected ? "w-6 bg-royal" : "w-1.5 bg-hairline",
              )}
            />
          ))}
        </div>

        <BoardButton label="Next drive" onClick={() => api?.scrollNext()}>
          ›
        </BoardButton>
      </div>
    </Reveal>
  );
}

function BoardButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-hairline bg-white pb-0.5 text-[20px] leading-none text-royal transition-colors duration-200 hover:border-royal hover:bg-cloud"
    >
      {children}
    </button>
  );
}
