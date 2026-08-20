import Link from "next/link";

import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  PillarGrid,
  SectionHead,
  StatsBand,
  StoryGrid,
  TrustStrip,
} from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { arrow, btn } from "@/lib/btn";
import {
  cardBody,
  panel,
  panelHeading,
  pillarGrid,
  sectionPad,
  surfacePaper,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Why Emporium",
  description:
    "Industry-current curriculum, a cabin mock-up and grooming studio, recruiter-format interview prep and a dedicated placement cell — the six things that make Emporium training different.",
  path: "/why-emporium",
  keywords: ["best aviation institute", "cabin crew training quality", "skill development India"],
});

const beliefs = [
  {
    title: "Skilling is nation-building",
    body: "Every student we put into a cabin, a terminal or a hotel lobby is a household with a stable income and a family with a different future. That is the whole point of the institute, and it is why the tagline is not decoration.",
  },
  {
    title: "Practice beats theory",
    body: "Nobody clears an airline assessment day by memorising a chapter. Our timetable is weighted towards the mock-up, the studio and the lab, because that is where confidence is actually built.",
  },
  {
    title: "Honesty about outcomes",
    body: "We will tell you if a program is wrong for you, if an airline's criteria rule you out, or if your interview needs more work. No guaranteed-job promises — just support that keeps going until you land.",
  },
];

export default function WhyEmporiumPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Emporium"
        title="A runway from the classroom to the cabin."
        lede="Skilling is nation-building. Every course at Emporium is built to turn ambition into an interview-ready, world-ready professional — not just a certificate."
        crumbs={[{ label: "Why Emporium" }]}
      />

      <StatsBand />

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Six differences"
            title="What you get that a syllabus can't give you."
          >
            These are the parts of the program students tell us made the difference
            when they finally sat in front of a recruiter.
          </SectionHead>
          <PillarGrid />
        </div>
      </section>

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="What we believe" title="How we run the institute.">
            Three commitments that shape every decision we make about curriculum,
            counselling and placements.
          </SectionHead>

          <div className={pillarGrid}>
            {beliefs.map((belief) => (
              <Reveal className={panel} key={belief.title}>
                <h3 className={panelHeading}>{belief.title}</h3>
                <p className={cardBody}>{belief.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="In their words" title="What it looks like from a student's seat.">
            The same three things come up every time: the mocks, the grooming, and
            the placement cell that kept going.
          </SectionHead>
          <StoryGrid />
          <Reveal className="mt-10">
            <Link href="/training" className={btn({ variant: "dark", block: "phone" })}>
              See the training floor <span className={arrow}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <EnquirySection
        eyebrow="Talk to us"
        title={
          <>
            Decide with facts,
            <br />
            not brochures.
          </>
        }
        lede="Book a free counselling session. We will walk you through programs, fees, intake dates and — honestly — where you currently stand."
      />
    </>
  );
}
