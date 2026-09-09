"use client";

import { differenceInCalendarDays } from "date-fns";
import * as React from "react";

import { ApplyDialog } from "@/components/apply-dialog";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { btn } from "@/lib/btn";
import { jobs, parseDriveDate, type Job } from "@/lib/jobs";
import { cn } from "@/lib/utils";

const metaKey =
  "font-mono text-[10.5px] tracking-[0.16em] text-[#9098b4] uppercase";
const metaValue = "mt-1 text-[14.5px] text-ink";

const statuses: Record<string, { label: string; dot: string }> = {
  "OPEN ALL": {
    label: "Open to all",
    dot: "bg-green shadow-[0_0_0_4px_rgba(62,207,142,0.18)]",
  },
  INVITE: {
    label: "By invitation",
    dot: "bg-amber shadow-[0_0_0_4px_rgba(255,176,32,0.2)]",
  },
};

function statusOf(job: Job) {
  return (
    statuses[job.board.status] ?? {
      label: "Now hiring",
      dot: "bg-green shadow-[0_0_0_4px_rgba(62,207,142,0.18)]",
    }
  );
}

const CLOSED = "Drive closed";

function countdownLabel(date: string) {
  const when = parseDriveDate(date);
  if (!when) return "";

  const days = differenceInCalendarDays(when, new Date());
  if (days < 0) return CLOSED;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

function noopSubscribe() {
  return () => {};
}

function Countdown({ date }: { date: string }) {
  const label = React.useSyncExternalStore(
    noopSubscribe,
    () => countdownLabel(date),
    () => "",
  );
  if (!label) return null;

  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[10.5px] tracking-[0.14em] uppercase",
        label === CLOSED
          ? "border-hairline bg-paper text-[#9098b4]"
          : "border-crimson/25 bg-crimson/6 text-crimson-deep",
      )}
    >
      {label}
    </span>
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

  const status = statusOf(job);
  const Shell = animate ? Reveal : "article";

  return (
    <Shell
      {...(animate ? { as: "article" as const } : {})}
      className={cn(
        "overflow-hidden rounded-(--r) border border-hairline bg-white transition-[transform,box-shadow] duration-250",
        animate && "hover:-translate-y-1 hover:shadow-(--shadow)",
        className,
      )}
    >
      <div className="border-b  border-hairline bg-paper px-6.5 py-5 max-phablet:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] text-crimson">
            <i className={cn("size-1.75 rounded-full", status.dot)} />
            NOW HIRING
          </span>
          <Countdown date={job.date} />
        </div>
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

function NoDrives() {
  return (
    <div className="rounded-(--r) border border-dashed border-hairline bg-white px-7 py-9 text-center max-phablet:px-5">
      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#9098b4]">
        NO DRIVES ON THE BOARD
      </span>
      <p className="mx-auto mt-3 max-w-[46ch] text-[15.5px] text-slate">
        Every drive on the board has been and gone. Send us your CV and the
        placement cell will put you on the next one.
      </p>
      <div className="mt-6 flex justify-center">
        <ApplyDialog label="Apply Now" variant="dark" block="phone" />
      </div>
    </div>
  );
}

type Destination = {
  key: string;
  location: string;
  /** Kept apart so phones can show just the city. */
  city: string;
  region: string;
  flight: string;
  drives: Job[];
};

/**
 * Two drives in Imphal are one place to travel to, not two, so they share a tab
 * and the panel lists both. That is also why the tabs carry no date: a tab can
 * stand for several, so the cards below carry them instead.
 */
function byDestination(items: Job[]): Destination[] {
  const found: Destination[] = [];

  for (const job of items) {
    const seen = found.find((d) => d.location === job.location);
    if (seen) {
      seen.drives.push(job);
      continue;
    }

    const [city, ...rest] = job.location.split(",");
    found.push({
      key: job.location.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      location: job.location,
      city: city.trim(),
      region: rest.join(",").trim(),
      flight: job.board.flight,
      drives: [job],
    });
  }

  return found;
}

function DriveTab({
  place,
  selected,
  onSelect,
  onKeyDown,
  tabRef,
}: {
  place: Destination;
  selected: boolean;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  tabRef: (node: HTMLButtonElement | null) => void;
}) {
  // Green wins: if anything here is open to all, the place is.
  const status = statusOf(
    place.drives.find((drive) => drive.board.status === "OPEN ALL") ??
      place.drives[0],
  );

  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      id={`city-${place.key}`}
      aria-controls={`drives-${place.key}`}
      aria-selected={selected}
      // One authoritative label: the visible text is split across spans that
      // come and go with the breakpoint.
      aria-label={`${place.location} — ${status.label}${
        place.drives.length > 1 ? `, ${place.drives.length} drives` : ""
      }`}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 whitespace-nowrap",
        "transition-[background-color,border-color,color] duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky",
        "max-phablet:flex-none max-phablet:snap-start",
        selected
          ? "border-royal bg-royal text-white"
          : "border-hairline bg-white text-ink hover:border-royal/35 hover:bg-cloud",
      )}
    >
      <i className={cn("size-1.75 flex-none rounded-full", status.dot)} />
      <span
        className={cn(
          "font-mono text-[13px] font-bold tracking-[0.06em] max-phablet:hidden",
          selected ? "text-haze" : "text-royal",
        )}
      >
        {place.flight}
      </span>
      <span className="font-heading text-[14.5px] font-semibold">
        {place.city}
        {place.region && (
          <span className="max-phablet:hidden">, {place.region}</span>
        )}
      </span>
      {place.drives.length > 1 && (
        <span
          className={cn(
            "font-mono text-[12px] max-phablet:hidden",
            selected ? "text-haze" : "text-slate",
          )}
        >
          {place.drives.length} drives
        </span>
      )}
    </button>
  );
}

export function JobList({ items = jobs }: { items?: Job[] }) {
  const [selected, setSelected] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const places = React.useMemo(() => byDestination(items), [items]);
  const current = Math.min(selected, places.length - 1);
  const place = places[current];

  const go = (next: number) => {
    const wrapped = (next + places.length) % places.length;
    setSelected(wrapped);
    tabs.current[wrapped]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const move: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: places.length - 1,
    };
    if (!(event.key in move)) return;
    event.preventDefault();
    go(move[event.key]);
  };

  if (!place) return <NoDrives />;

  const strip = places.length > 1;

  return (
    <Reveal>
      {strip && (
        <>
          <p className="mb-3.5 text-[14.5px] text-slate">
            {places.length} cities are hiring — pick the one near you.
          </p>
          <div
            role="tablist"
            aria-label="Hiring drives by city"
            className={cn(
              "flex flex-wrap gap-3",
              "max-phablet:snap-x max-phablet:snap-mandatory max-phablet:flex-nowrap max-phablet:overflow-x-auto",
              "max-phablet:-mx-[4vw] max-phablet:px-[4vw] max-phablet:pb-1",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            {places.map((item, i) => (
              <DriveTab
                key={item.key}
                place={item}
                selected={i === current}
                onSelect={() => setSelected(i)}
                onKeyDown={onKeyDown}
                tabRef={(node) => {
                  tabs.current[i] = node;
                }}
              />
            ))}
          </div>
        </>
      )}

      <div
        key={place.key}
        {...(strip
          ? {
              role: "tabpanel",
              id: `drives-${place.key}`,
              "aria-labelledby": `city-${place.key}`,
              tabIndex: 0,
            }
          : {})}
        className={cn(
          strip && "mt-6",
          "grid gap-6 rounded-(--r) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky",
          "animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none",
        )}
      >
        {place.drives.map((drive) => (
          <JobCard key={drive.id} job={drive} animate={false} />
        ))}
      </div>
    </Reveal>
  );
}
