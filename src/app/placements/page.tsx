import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  SectionHead,
  StatsBand,
  StoryGrid,
  TrustStrip,
} from "@/components/sections";
import { placementSupport, recruiters } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  elig,
  logoCell,
  logoGrid,
  pillarCard,
  pillarGrid,
  pillarHeading,
  sectionPad,
  surfacePaper,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Placements",
  description:
    "On-campus recruiter drives, resume clinics, recorded mock interviews, alumni referrals and post-placement support — how the Emporium placement cell works, stated honestly.",
  path: "/placements",
  keywords: ["aviation placement support", "cabin crew jobs India", "airline recruiter drives"],
});

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Placements & alumni"
        title="The window seat, earned."
        lede="Our placement cell runs drives, referrals and interview prep year-round. Here is exactly what that support looks like — and what it does not promise."
        crumbs={[{ label: "Placements" }]}
      />

      <StatsBand />

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="What the cell does" title="Six kinds of support, all year.">
            Placement work at Emporium is a continuous process that starts in your
            first month, not a scramble in your last.
          </SectionHead>

          <div className={pillarGrid}>
            {placementSupport.map((item) => (
              <Reveal className={pillarCard} key={item.title}>
                <h3 className={pillarHeading}>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Recruiters"
            title="Where our students are trained to go."
          >
            Students train to the service standards of these airlines and hospitality
            groups, and our placement cell works to put candidates in front of them.
          </SectionHead>

          <div className={logoGrid}>
            {recruiters.map((name) => (
              <Reveal className={logoCell} key={name}>
                {name}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Alumni stories" title="Journeys we were built to support.">
            Three graduates, three programs, three very different starting points.
          </SectionHead>
          <StoryGrid />

          <Reveal className={elig}>
            <p>
              <b>Our honest position:</b> {site.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      <EnquirySection
        eyebrow="Start the journey"
        title={
          <>
            Placement support
            <br />
            starts at admission.
          </>
        }
        lede="Enquire now and our team will explain how drives, referrals and interview prep work for the program you are considering."
      />
    </>
  );
}
