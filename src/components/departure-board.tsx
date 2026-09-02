"use client";

import * as React from "react";

import { jobs } from "@/lib/jobs";
import { cn } from "@/lib/utils";

const gridCols =
  "grid items-center gap-2.5 grid-cols-[var(--col-flight)_minmax(0,1fr)_var(--col-gate)_var(--col-status)] max-phone:grid-cols-[var(--col-flight)_minmax(0,1fr)_var(--col-status)]";
const headRow =
  "overflow-hidden px-1.5 pt-3 pb-2 font-mono text-[clamp(8px,calc(var(--cell-fs)*0.82),10.5px)] tracking-[0.22em] text-[#5c6aa0] max-phone:px-1 max-phone:pt-3 max-phone:pb-2";
const headCell = "overflow-hidden text-clip whitespace-nowrap";
const cells = "flex flex-nowrap gap-[var(--cell-gap)] overflow-hidden";
/** One split-flap tile. `flip` is toggled from JS as each glyph lands. */
const cell = [
  "relative inline-flex flex-none items-center justify-center rounded-[3px] origin-center",
  "h-[var(--cell-h)] w-[var(--cell-w)]",
  "bg-[linear-gradient(180deg,#1a2247,#0e1533)] text-[#eef2ff]",
  "shadow-[inset_0_-1px_0_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]",
  "font-mono text-[length:var(--cell-fs)] leading-none font-bold",
  "after:absolute after:top-1/2 after:right-px after:left-px after:h-px after:bg-black/55 after:content-['']",
  "[&.flip]:animate-flap",
].join(" ");
const statusCell = "bg-[linear-gradient(180deg,#3a2a08,#241a05)] text-amber";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 &-/.".split("");
const DEST_LEN = 17;
const STAT_LEN = 9;
/* Ambient flicker pool. Every entry must fit STAT_LEN or it is clipped. */
const STATUSES = ["OPEN ALL", "INVITE", "HIRING", "REGISTER", "APPLY NOW"];

/* The board runs Emporium's live campus recruitment drives — the same list the
   /jobs page renders, so a drive can never appear in one place and not the other. */
const rowsData = jobs.map((job) => ({
  id: job.id,
  flight: job.board.flight,
  destination: job.board.destination,
  gate: job.board.when,
  status: job.board.status,
}));

/** Next intake label — the first of next month, e.g. "NEXT INTAKE · SEP 01". */
function nextIntakeLabel() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const month = next.toLocaleString("en-IN", { month: "short" }).toUpperCase();
  return `NEXT INTAKE · ${month} 01`;
}

/* The clock and the intake date are external (wall-clock) state, so they are read
   through useSyncExternalStore — that keeps the server render deterministic and
   avoids a hydration mismatch on the first paint. */

function subscribeToSecond(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

function noopSubscribe() {
  return () => {};
}

export function DepartureBoard() {
  const boardRef = React.useRef<HTMLDivElement>(null);
  const destRefs = React.useRef<(HTMLSpanElement | null)[][]>([]);
  const statRefs = React.useRef<(HTMLSpanElement | null)[][]>([]);

  const clock = React.useSyncExternalStore(
    subscribeToSecond,
    () => new Date().toTimeString().slice(0, 8),
    () => "--:--:--",
  );

  const intake = React.useSyncExternalStore(
    noopSubscribe,
    nextIntakeLabel,
    () => "NEXT INTAKE · SOON",
  );

  React.useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let revealed = false;

    const flap = (cell: HTMLSpanElement, target: string, delay: number) => {
      if (reduce) {
        cell.textContent = target;
        return;
      }
      const steps = 5 + Math.floor(Math.random() * 7);
      let i = 0;
      const run = () => {
        if (i >= steps) {
          cell.textContent = target;
          cell.classList.remove("flip");
          void cell.offsetWidth;
          cell.classList.add("flip");
          return;
        }
        cell.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        cell.classList.remove("flip");
        void cell.offsetWidth;
        cell.classList.add("flip");
        i += 1;
        timers.push(window.setTimeout(run, 52));
      };
      timers.push(window.setTimeout(run, delay));
    };

    const setText = (
      cells: (HTMLSpanElement | null)[],
      text: string,
      base = 0,
    ) => {
      let t = (text || "").toUpperCase().slice(0, cells.length);
      while (t.length < cells.length) t += " ";
      cells.forEach((cell, idx) => {
        if (cell) flap(cell, t[idx], base + idx * 38);
      });
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      rowsData.forEach((row, i) => {
        setText(destRefs.current[i] ?? [], row.destination, 150 + i * 140);
        setText(statRefs.current[i] ?? [], row.status, 150 + i * 140 + 300);
      });

      if (!reduce) {
        const shuffle = window.setInterval(() => {
          const i = Math.floor(Math.random() * rowsData.length);
          setText(
            statRefs.current[i] ?? [],
            STATUSES[Math.floor(Math.random() * STATUSES.length)],
          );
        }, 2600);
        timers.push(shuffle);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal();
        });
      },
      { threshold: 0.25 },
    );
    io.observe(board);

    // Ensure the board flips even if it is already in view on load.
    const failsafe = window.setTimeout(() => {
      if (board.getBoundingClientRect().top < window.innerHeight) reveal();
    }, 200);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      timers.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
    };
  }, []);

  return (
    /* Flap cells size themselves from the board's own width rather than a fixed
       15px, so destinations stay legible as the hero column narrows.
       `--board-fixed` is a row's non-cell width and `--board-div` the total
       cell-widths per row. */
    <div className="@container max-laptop:order-2">
      <div
        className={[
          "relative rounded-[20px] border border-[var(--line-d)] bg-[#070c28] px-4.5 pt-4.5 pb-5",
          "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[20px] before:content-['']",
          "before:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%)]",
          "[--board-fixed:82px] [--board-div:37.1]",
          "[--cell-w:clamp(7px,calc((100cqi_-_var(--board-fixed))_/_var(--board-div)),15px)]",
          "[--cell-gap:calc(var(--cell-w)_*_0.17)]",
          "[--cell-h:calc(var(--cell-w)_*_1.47)]",
          "[--cell-fs:calc(var(--cell-w)_*_0.87)]",
          "[--col-flight:calc(var(--cell-w)_*_4.3)]",
          "[--col-gate:calc(var(--cell-w)_*_2.7)]",
          "[--col-status:calc(var(--cell-w)_*_9_+_var(--cell-gap)_*_8)]",
          "max-phone:px-3.5 max-phone:pt-3.5 max-phone:pb-4",
          "max-phone:[--board-div:34.4] max-phone:[--board-fixed:60px]",
        ].join(" ")}
        ref={boardRef}
        role="img"
        aria-label="Departure board of Emporium's live campus recruitment drives."
      >
        <div className="flex items-center justify-between border-b border-[var(--line-d)] px-1.5 pt-1 pb-3.5">
          <span className="font-mono text-[13px] font-bold tracking-[0.3em] text-amber">
            ✈ DEPARTURES
          </span>
          <span className="font-mono text-[14px] tracking-[0.12em] text-[#7f8dc4]">
            {clock}
          </span>
        </div>

        <div className={cn(gridCols, headRow)}>
          <span className={headCell}>DRIVE</span>
          <span className={headCell}>DESTINATION</span>
          <span className={cn(headCell, "max-phone:hidden")}>DATE</span>
          <span className={cn(headCell, "text-right")}>STATUS</span>
        </div>

        <div>
          {rowsData.map((row, rowIndex) => (
            <div
              className={cn(gridCols, "border-t border-[rgba(157,176,238,0.08)] px-1.5 py-[7px] first:border-t-0 max-phone:px-1")}
              key={row.id}
            >
              <span className="font-mono text-[length:var(--cell-fs)] font-bold whitespace-nowrap text-haze">
                {row.flight}
              </span>

              <span className={cells}>
                {Array.from({ length: DEST_LEN }).map((_, cellIndex) => (
                  <span
                    className={cell}
                    key={cellIndex}
                    ref={(node) => {
                      destRefs.current[rowIndex] ??= [];
                      destRefs.current[rowIndex][cellIndex] = node;
                    }}
                  >
                    {" "}
                  </span>
                ))}
              </span>

              <span className="text-center font-mono text-[length:var(--cell-fs)] text-[#eef2ff] max-phone:hidden">
                {row.gate}
              </span>

              <span className="flex justify-end">
                <span className={cn(cells, "flex-none")}>
                  {Array.from({ length: STAT_LEN }).map((_, cellIndex) => (
                    <span
                      className={cn(cell, statusCell)}
                      key={cellIndex}
                      ref={(node) => {
                        statRefs.current[rowIndex] ??= [];
                        statRefs.current[rowIndex][cellIndex] = node;
                      }}
                    >
                      {" "}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line-d)] pt-3 font-mono text-[clamp(9px,2.2cqi,11px)] tracking-[0.16em] text-[#5c6aa0]">
          <span>EMPORIUM · CAMPUS DRIVES</span>
          <span>{intake}</span>
        </div>
      </div>
    </div>
  );
}
