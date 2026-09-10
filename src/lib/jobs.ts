import { differenceInCalendarDays } from "date-fns";

import type { Job as JobDoc } from "@/payload-types";

export type Job = {
  id: string;
  title: string;
  location: string;
  position: string;
  employer?: string;
  /** The drive date as printed on the card: "16 September 2026". */
  date: string;
  /** The same day as stored, for the countdown and the closing cut-off. */
  driveOn: string;
  time: string;
  venue: string;
  registerWith: string;
  whatsapp: { display: string; href: string };
  board: { flight: string; destination: string; when: string; status: string };
};

/** wa.me wants a bare international number with no spaces or symbols. */
function whatsapp(display: string) {
  const digits = display.replace(/\D/g, "");
  const intl = digits.length === 10 ? `91${digits}` : digits;
  return { display, href: `https://wa.me/${intl}` };
}

/** Dates are stored as UTC midnight, so both are printed in UTC. Reading them
 *  in the server's timezone shows the previous day west of Greenwich. */
const printedDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});
const boardDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
});

/** The stored day as a local date, so the timezone cannot move it. */
export function driveDate(driveOn: string): Date | null {
  const stored = new Date(driveOn);
  if (Number.isNaN(stored.getTime())) return null;
  return new Date(
    stored.getUTCFullYear(),
    stored.getUTCMonth(),
    stored.getUTCDate(),
  );
}

export function toJob(doc: JobDoc): Job {
  const stored = new Date(doc.driveOn);

  return {
    id: String(doc.id),
    title: doc.title,
    location: doc.location,
    position: doc.position,
    employer: doc.employer ?? undefined,
    date: printedDate.format(stored),
    driveOn: doc.driveOn,
    time: doc.time,
    venue: doc.venue,
    registerWith: doc.registerWith,
    whatsapp: whatsapp(doc.whatsapp),
    board: {
      flight: doc.board.flight,
      destination: doc.board.destination,
      when: boardDate.format(stored),
      status: doc.board.status,
    },
  };
}

export const jobsIntro =
  "Since we are working very closely with the industry for the last 9 years in India and we follow all the guidelines given by the airlines, hotels and tourism companies, we do not take open admissions to maintain the quality policy and to ensure that every student gets suitable jobs according to the profile.";

/** Today counts as still open, and an unreadable date is treated as open too:
 *  a stale card beats a drive that silently vanishes. */
export function isDriveClosed(job: Job, today: Date = new Date()): boolean {
  const when = driveDate(job.driveOn);
  return !!when && differenceInCalendarDays(when, today) < 0;
}

export function openDrives(list: Job[]): Job[] {
  const today = new Date();
  return list
    .filter((job) => !isDriveClosed(job, today))
    .sort((a, b) => Number(new Date(a.driveOn)) - Number(new Date(b.driveOn)));
}
