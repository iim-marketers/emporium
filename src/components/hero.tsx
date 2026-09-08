import Link from "next/link";

import { DepartureBoard } from "@/components/departure-board";
import { ScrollLink } from "@/components/hash-scroll";
import { btn } from "@/lib/btn";
import {
  eyebrowOnDark,
  heroCta,
  heroHeading,
  heroPad,
  heroSurface,
  lede,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

/** The route the dotted line traces. The plane rides it, so both read alike. */
const FLIGHT_PATH = "M-50 640 Q 500 120 1300 260";

/** Airliner from above, nose along +x and centred on (0,0) — the motion path
 *  places it by its origin and turns it into the direction of travel. */
const AIRLINER = [
  "M21 0C21-1.6 19.4-2.6 17-2.9L6-3.4L-6-14h-5.5L-6.5-3.4L-13-3.2L-17-8h-3",
  "l1.5 5.6C-19.6-2-20.2-1-20.2 0s.6 2 1.7 2.4L-20 8h3l4-4.8l6.5.2L-11.5 14H-6",
  "l12-10.6l11-.5C19.4 2.6 21 1.6 21 0Z",
].join("");

export function Hero() {
  return (
    <section className={cn(heroSurface, heroPad)}>
      <svg
        className="pointer-events-none absolute inset-0 opacity-50"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d={FLIGHT_PATH}
          fill="none"
          stroke="rgba(157,176,238,.35)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
        />
        <circle cx="1050" cy="255" r="4" fill="#fff" />

        {/* An airliner runs the route the dotted line traces. Reduced motion
            parks it partway along rather than at the offscreen start. */}
        <g
          className="animate-fly motion-reduce:animate-none"
          style={{
            offsetPath: `path("${FLIGHT_PATH}")`,
            offsetRotate: "auto",
            offsetDistance: "44%",
          }}
        >
          <path
            d={AIRLINER}
            fill="#e7edff"
            opacity="0.85"
            transform="scale(1.75)"
          />
        </g>
      </svg>

      <div
        className={cn(
          wrap,
          /* Above the flight path, so the plane passes behind the copy. */
          "relative grid grid-cols-[1.05fr_0.95fr] items-center gap-14",
          "xl:grid-cols-[1fr_1.15fr]",
          "max-laptop:grid-cols-1 max-laptop:gap-11",
        )}
      >
        <div>
          <span className={eyebrowOnDark}>Aviation · Hospitality · Cruise</span>
          <h1 className={cn("mt-5.5", heroHeading)}>
            Train for the skies.
            <br />
            <em className="text-haze not-italic">Build a new nation.</em>
          </h1>
          <p className={lede}>
            Emporium Certification Courses on Aviation, Hospitality Management
            and Cruise Lines — with grooming, communication and 100% placement
            assistance through our dedicated Placement Cell.
          </p>
          <div className={heroCta}>
            <ScrollLink
              href="/enquire"
              to="enquire"
              className={btn({ block: "phone" })}
            >
              Enroll Now
            </ScrollLink>
            <Link
              href="/about"
              className={btn({ variant: "ghost", block: "phone" })}
            >
              Read More
            </Link>
          </div>
          <div className="hidden mt-6.5 md:flex flex-wrap gap-5.5 font-mono text-[13.5px] text-[#93a2d6] max-phablet:gap-x-4.5 max-phablet:gap-y-2.5 max-phablet:text-[12.5px]">
            <span className="flex items-center gap-2">
              <i className="size-1.75 rounded-full bg-green shadow-[0_0_0_4px_rgba(62,207,142,0.18)]" />{" "}
              Admissions open
            </span>
            <span className="flex items-center gap-2">
              Aviation · Hospitality · Cruise
            </span>
          </div>
        </div>

        <DepartureBoard />
      </div>
    </section>
  );
}
