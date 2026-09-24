import { ApplyDialog } from "@/components/apply-dialog";
import { CountFlip } from "@/components/count-flip";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Accent, CtaBand, PageHead, pageBand } from "@/components/page/kit";
import {
  CoverHero,
  Sheet,
  SheetNote,
  Stage,
} from "@/components/page/immersive";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip, RecruiterWall } from "@/components/sections";

import { placementClaim, placementsIntro } from "@/lib/content";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Placements",
  description:
    "Over 15,100+ Emporium students placed in 14 different countries. How the Placement Assistance Cell screens, prepares and places candidates with airlines, hotels and cruise lines.",
  path: "/placements",
  keywords: ["aviation placements", "cabin crew jobs", "placement assistance"],
});

const recordPhotos = [
  {
    src: "/home/photos/aircraft-door.webp",
    alt: "An Emporium graduate in cabin crew uniform at the aircraft door",
    track: "Aviation",
  },
  {
    src: "/home/photos/restaurant-namaste.webp",
    alt: "An Emporium graduate greeting guests in a hotel restaurant",
    track: "Hospitality",
  },
  {
    src: "/home/photos/bartender-2.webp",
    alt: "An Emporium graduate serving at a hotel bar",
    track: "Food & beverage",
  },
];

const img = pageImages.placements;

export default function PlacementsPage() {
  return (
    <>
      <Stage image={img.stage} focus={img.stageFocus}>
        <CoverHero
          label="Placements"
          title={
            <>
              From the classroom <Accent onDark>to the cabin.</Accent>
            </>
          }
          lede={placementsIntro}
          image={img.hero}
          focus={img.heroFocus}
          dim
        >
          <ApplyDialog label="Send your CV" variant="primary" block="phone" />
        </CoverHero>

        <Sheet first full>
          <PageHead
            eyebrow="Our recruiters"
            title={
              <>
                The brands that <Accent>hire from us.</Accent>
              </>
            }
          >
            The airlines, airports, hotel groups and cruise lines that hire from
            Emporium.
          </PageHead>
          <RecruiterWall />
        </Sheet>

        <SheetNote lead="Trained here," line="hired worldwide." />
      </Stage>

      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="relative grid h-[clamp(380px,58vh,560px)] grid-cols-3 gap-px bg-white/10 max-phablet:h-[340px]">
          {recordPhotos.map((photo) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden bg-navy-2"
            >
              <ImageWithSkeleton
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="34vw"
                className="object-cover "
              />
            </div>
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,66,0.35)_0%,transparent_22%,transparent_72%,var(--navy)_100%)]"
          />
        </div>

        <Reveal className="relative -mt-14 pb-[clamp(28px,4.5vh,44px)] text-center max-phablet:-mt-8">
          <div className={wrap}>
            <p className="font-sans text-[clamp(40px,4.4vw,64px)] leading-[0.95] font-semibold tracking-[-0.035em] whitespace-nowrap">
              <span className="text-white">
                {placementClaim.count.replace(/\s*[\d,+]+$/, "")}
              </span>{" "}
              <CountFlip
                text={placementClaim.count.match(/[\d,+]+$/)?.[0] ?? ""}
                className="text-crimson"
              />
            </p>
            <span
              aria-hidden="true"
              className="mx-auto mt-5 block h-px w-16 bg-white/40"
            />
            <h2 className="mx-auto mt-5 max-w-[30ch] font-sans text-[clamp(18px,1.8vw,24px)] leading-snug font-medium tracking-[-0.015em] text-white/90">
              {placementClaim.line1} {placementClaim.line2}{" "}
              <Accent onDark>{placementClaim.line3}.</Accent>
            </h2>
          </div>
        </Reveal>
      </section>

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Approved and accredited by"
            title={
              <>
                Recognised <Accent>where it counts.</Accent>
              </>
            }
          />
          <AccreditationStrip />
        </div>
      </section>

      <CtaBand
        image="/home/photos/aircraft-apron.webp"
        title="Your name could be on the next offer letter."
        actions={
          <ApplyDialog label="Send your CV" variant="primary" block="phone" />
        }
      />
    </>
  );
}
