import Link from "next/link";

import {
  Accent,
  CtaBand,
  IndexList,
  PageHead,
  pageProse,
  Photo,
} from "@/components/page/kit";
import {
  CoverHero,
  Sheet,
  SheetNote,
  Stage,
} from "@/components/page/immersive";
import { Reveal } from "@/components/reveal";
import { AccreditationStrip } from "@/components/sections";
import { arrow, btn } from "@/lib/btn";
import { aboutBody, aboutIntro, empanelments } from "@/lib/content";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Emporium is a leading Vocational Training Provider under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India — running certificate courses in aviation, hospitality and cruise line.",
  path: "/about",
  keywords: ["about Emporium", "vocational training provider", "VTP India"],
});

const img = pageImages.about;

export default function AboutPage() {
  return (
    <>
      <Stage image={img.hero} priority>
        <CoverHero
          label="About Us"
          title={
            <>
              Certificate courses in{" "}
              <Accent onDark>Aviation, Hospitality &amp; Cruise line.</Accent>
            </>
          }
          lede={aboutIntro}
        >
          <Link href="/programs" className={btn({ block: "phone" })}>
            Explore courses <span className={arrow}>→</span>
          </Link>
        </CoverHero>

        <Sheet
          first
          className="grid grid-cols-[1fr_1fr] items-center gap-16 max-laptop:grid-cols-1 max-laptop:gap-12"
        >
          <div>
            <PageHead
              eyebrow="Who we are"
              title={
                <>
                  We provide our best courses of{" "}
                  <Accent>Aviation, Hospitality &amp; Cruise Line.</Accent>
                </>
              }
              className="mb-6"
            />
            <Reveal className="grid gap-4">
              {aboutBody.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={pageProse}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal className="relative pb-14 pl-14 max-phablet:pb-10 max-phablet:pl-8">
            <Photo
              src="/misc/courses-v2.png"
              alt="Emporium students in training"
              sizes="(max-width: 960px) 92vw, 45vw"
              className="aspect-4/3"
            />
            <Photo
              src="/home/photos/saree-namaste.webp"
              alt="Students greeting with a namaste"
              sizes="(max-width: 960px) 40vw, 18vw"
              className="absolute bottom-0 left-0 aspect-3/4 w-[36%] border-[5px] border-white shadow-(--shadow)"
            />
          </Reveal>
        </Sheet>

        <SheetNote lead="Trained for" line="the real world." />

        <Sheet
          side="right"
          last
          className="grid grid-cols-[0.9fr_1.1fr] items-start gap-16 max-laptop:grid-cols-1 max-laptop:gap-14"
        >
          <div>
            <PageHead
              eyebrow="We are empaneled with"
              title={
                <>
                  State skill missions <Accent>across India.</Accent>
                </>
              }
              className="mb-6"
            >
              {empanelments.intro}
            </PageHead>
            <Reveal>
              <IndexList
                items={empanelments.items}
                className="grid grid-cols-2 gap-x-8 max-phone:grid-cols-1 [&>li:nth-child(2)]:border-t-0 max-phone:[&>li:nth-child(2)]:border-t"
              />
            </Reveal>
          </div>

          <div>
            <PageHead
              eyebrow="Approved and accredited by"
              title={
                <>
                  National <Accent>skilling bodies.</Accent>
                </>
              }
              className="mb-7"
            />
            <AccreditationStrip />
          </div>
        </Sheet>
      </Stage>

      <CtaBand
        image="/home/photos/garden-batch.webp"
        eyebrow="Start your journey"
        title="Find the course that fits where you want to land."
        actions={
          <>
            <Link href="/programs" className={btn({ block: "phone" })}>
              Explore courses <span className={arrow}>→</span>
            </Link>
            <Link
              href="/enquire"
              className={btn({ variant: "ghost", block: "phone" })}
            >
              Enquire now
            </Link>
          </>
        }
      />
    </>
  );
}
