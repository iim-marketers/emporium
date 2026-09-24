import Image from "next/image";
import Link from "next/link";

import { CountFlip } from "@/components/count-flip";
import { ScrollLink } from "@/components/hash-scroll";
import { AutoVideo } from "@/components/home/auto-video";
import { frameBtn } from "@/components/home/frame-btn";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Reveal } from "@/components/reveal";
import { headlineClaim } from "@/lib/content";
import { ctaFilm, editorialPhoto, faces, moments } from "@/lib/home-media";
import { site } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const displayTitle =
  "font-sans font-semibold tracking-[-0.025em] leading-[1.1]";

export const homePad = "py-14 max-laptop:py-14 max-phablet:py-12";
/** A section that continues the same background as the one above it. */
export const homePadFollow = "pt-0 pb-14 max-laptop:pb-14 max-phablet:pb-12";

const kicker =
  "font-mono text-[12px] font-bold tracking-[0.32em] uppercase max-phablet:text-[11px]";

export function HomeHead({
  eyebrow,
  title,
  children,
  onDark = false,
  center = false,
  className,
  eyebrowClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
  className?: string;
  eyebrowClassName?: string;
}) {
  return (
    <Reveal
      className={cn("max-w-190", center && "mx-auto text-center", className)}
    >
      <span
        className={cn(
          kicker,
          "flex items-center gap-3",
          center && "justify-center",
          onDark ? "text-haze" : "text-crimson",
          eyebrowClassName,
        )}
      >
        {/* <span className="h-px w-7 bg-current" aria-hidden="true" /> */}
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-5",
          displayTitle,
          "text-[clamp(28px,3.4vw,46px)]",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={cn(
            "mt-5 max-w-[58ch] text-[16px] leading-relaxed max-phablet:text-[15px]",
            center && "mx-auto",
            onDark ? "text-white/70" : "text-slate",
          )}
        >
          {children}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Dark: the photo stays sharp under a navy veil. Light: blurred under a
 *  paper wash. Dark photos go greyscale so the navy tint reads the same
 *  whatever the photo's own colours. The parent section must be `relative isolate`. */
export function PhotoBackdrop({
  src,
  tone = "dark",
}: {
  src: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className={cn("-z-20 object-cover", dark ? "grayscale" : "blur-md")}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          dark
            ? "bg-[linear-gradient(180deg,rgba(13,22,66,0.70)_0%,rgba(13,22,66,0.40)_45%,rgba(13,22,66,0.60)_100%)]"
            : "bg-paper/82",
        )}
      />
      {dark ? null : (
        <span
          aria-hidden="true"
          className="seam-y -z-10 [--seam:var(--paper)]"
        />
      )}
    </>
  );
}

const faceVisibility = (i: number) =>
  cn(
    i >= 8 && "hidden 2xl:block",
    i >= 6 && "max-laptop:hidden",
    i >= 4 && "max-phone:hidden",
  );

export function FacesStrip() {
  return (
    <section aria-label="Emporium students" className="bg-navy">
      <ul className="grid grid-cols-8 2xl:grid-cols-10 max-laptop:grid-cols-6 max-phone:grid-cols-4">
        {faces.map((face, i) => (
          <li
            key={face.src}
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
              className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-ink/90 to-transparent px-3 pt-8 pb-3 font-mono text-[10px] tracking-[0.22em] text-white uppercase transition-transform duration-500 group-hover:translate-y-0"
            >
              {face.track}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Copy set on the photograph itself, inside a hairline frame. Phones get
 *  the photo above the copy, since the text would otherwise cover the batch. */
export function EditorialBand() {
  return (
    <section
      id="intro"
      className="relative isolate flex min-h-[max(640px,88vh)] items-start overflow-hidden bg-navy pt-[clamp(72px,12vh,140px)] pb-24 text-white max-laptop:min-h-0 max-laptop:flex-col max-laptop:items-stretch max-laptop:pt-0 max-laptop:pb-12"
    >
      <div className="absolute inset-0 -z-20 max-laptop:relative max-laptop:inset-auto max-laptop:z-0 max-laptop:aspect-4/3 max-laptop:-mb-px">
        <Image
          src={editorialPhoto}
          alt="A full Emporium batch seated in a hotel ballroom"
          fill
          sizes="100vw"
          className="object-cover object-[60%_50%] max-laptop:object-[50%_70%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(180deg,var(--navy),transparent_22%,transparent_60%,var(--navy))] max-laptop:block"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,12,36,0.55)_0%,transparent_45%),linear-gradient(90deg,rgba(8,12,36,0.92)_0%,rgba(8,12,36,0.75)_38%,rgba(8,12,36,0.15)_75%)] max-laptop:hidden"
      />
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 border border-white/25 max-tablet:inset-3"
      /> */}

      <Reveal className={cn(wrap, "relative max-laptop:pt-2")}>
        <div className="max-w-150 max-laptop:max-w-none">
          <span className={cn(kicker, "text-haze")}>Placements</span>
          <h2 className={cn(displayTitle, "text-[clamp(30px,3.6vw,50px)]")}>
            <CountFlip text={headlineClaim.count} className="text-white" />{" "}
            {headlineClaim.line1} {headlineClaim.line2}{" "}
            <em className="text-haze not-italic">{headlineClaim.line3}.</em>
          </h2>
          {/* <p className="mt-7 max-w-[54ch] text-[15.5px] leading-relaxed text-white/80 max-phablet:text-[14.5px]">
            {headlineClaim.body}
          </p> */}
        </div>
      </Reveal>
    </section>
  );
}

const wideAreas = new Set(["b", "f"]);

/** Seven photos locked into one frame sized to the viewport, so the whole
 *  mosaic is seen at once with no ragged last row. */
export function MomentsMosaic() {
  return (
    <div
      className={cn(
        "grid h-[clamp(480px,calc(100svh-150px),800px)] gap-3 max-phone:gap-2",
        "grid-cols-4 grid-rows-3 [grid-template-areas:'a_b_b_c'_'a_d_e_c'_'f_f_e_g']",
        "max-laptop:grid-cols-2 max-laptop:grid-rows-[2.5fr_1fr_1fr_1fr_1fr_2.45fr] max-laptop:[grid-template-areas:'b_b'_'a_c'_'a_c'_'d_e'_'g_e'_'f_f']",
      )}
    >
      {moments.map((moment) => (
        <Reveal
          key={moment.src}
          className="group relative overflow-hidden rounded-[4px] bg-cloud"
          style={{ gridArea: moment.area }}
        >
          <ImageWithSkeleton
            src={moment.src}
            alt={moment.alt}
            fill
            sizes={
              wideAreas.has(moment.area)
                ? "(max-width: 960px) 92vw, 46vw"
                : "(max-width: 960px) 46vw, 23vw"
            }
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-ink/85 via-ink/30 to-transparent px-5 pt-14 pb-4 text-[14px] leading-snug font-medium text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-phone:hidden"
          >
            {moment.alt}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-44 text-white max-laptop:py-32 max-phablet:py-24">
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <AutoVideo clip={ctaFilm} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(8,12,36,0.62),rgba(8,12,36,0.88))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 border border-white/25 max-tablet:inset-3"
      />

      <Reveal className={cn(wrap, "text-center")}>
        <span className={cn(kicker, "text-haze")}>Your boarding pass</span>
        <h2
          className={cn(
            "mx-auto mt-6 max-w-[14ch] uppercase",
            displayTitle,
            "text-[clamp(34px,5vw,68px)] leading-[1.02]",
          )}
        >
          Your career takes off here.
        </h2>
        <p className="mx-auto mt-7 max-w-[48ch] text-[16px] text-white/80 max-phablet:text-[15px]">
          {site.heroLine}. Talk to our admissions team about the course that
          fits where you want to land.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 max-phablet:flex-col">
          <ScrollLink
            href="/enquire"
            to="enquire"
            className={frameBtn({ tone: "light" })}
          >
            Enquire now
          </ScrollLink>
          <a href={site.phoneHref} className={frameBtn({ tone: "outline" })}>
            Call {site.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
