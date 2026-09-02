import { ApplyDialog } from "@/components/apply-dialog";
import { EnquirySection } from "@/components/enquiry-section";
import { JobList } from "@/components/job-board";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import { jobsIntro } from "@/lib/jobs";
import { pageMetadata } from "@/lib/seo";
import { heroCta, sectionPad, surfacePaper, wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Jobs",
  description:
    "Live campus recruitment drives at Emporium centres — cabin crew and airport ground staff interviews with dates, venues and how to register.",
  path: "/jobs",
  keywords: ["cabin crew hiring", "ground staff jobs", "campus interview"],
});

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Newest jobs"
        title="Campus interviews, happening now."
        lede={jobsIntro}
        crumbs={[{ label: "Jobs" }]}
      >
        <div className={heroCta}>
          <ApplyDialog label="Apply Now" variant="primary" block="phone" />
        </div>
      </PageHero>

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Open drives"
            title="Register before you turn up."
          >
            Message the WhatsApp number on a drive with the details it asks for.
            Drives marked <b>only by invitation</b> are for shortlisted
            candidates.
          </SectionHead>

          <JobList />

          <Reveal className="mt-11 flex flex-wrap items-center justify-between gap-4 rounded-(--r) border border-hairline bg-white px-7 py-6 max-tablet:flex-col max-tablet:items-stretch max-tablet:gap-5">
            <p className="text-[15.5px] text-slate">
              <b className="text-royal">Not on a drive yet?</b> Send us your CV
              and the placement cell will match you to the next one.
            </p>
            <ApplyDialog label="Apply Now" variant="dark" block="tablet" />
          </Reveal>
        </div>
      </section>

      {/* <EnquirySection /> */}
    </>
  );
}
