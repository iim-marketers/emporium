import { ApplyDialog } from "@/components/apply-dialog";
import { JobList } from "@/components/job-board";
import {
  CoverHero,
  Sheet,
  SheetNote,
  Stage,
} from "@/components/page/immersive";
import { Accent, PageHead, pageLabel } from "@/components/page/kit";
import { Reveal } from "@/components/reveal";
import { getJobs } from "@/lib/cms";
import { jobsIntro, openDrives } from "@/lib/jobs";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Jobs",
  description:
    "Live campus recruitment drives at Emporium centres — cabin crew and airport ground staff interviews with dates, venues and how to register.",
  path: "/jobs",
  keywords: ["cabin crew hiring", "ground staff jobs", "campus interview"],
});

export const revalidate = 3600;

const img = pageImages.jobs;

export default async function JobsPage() {
  const drives = openDrives(await getJobs());

  return (
    <Stage image={img.hero} focus={img.heroFocus} priority>
      <CoverHero
        label="Newest jobs"
        title={
          <>
            Campus interviews, <Accent onDark>happening now.</Accent>
          </>
        }
        // lede={jobsIntro}
      >
        <ApplyDialog label="Apply Now" variant="primary" block="phone" />
      </CoverHero>

      <Sheet first>
        <PageHead
          eyebrow="Open drives"
          title={
            <>
              Register <Accent>before you turn up.</Accent>
            </>
          }
        >
          Message the WhatsApp number on a drive with the details it asks for.
          Drives marked <b>only by invitation</b> are for shortlisted
          candidates.
        </PageHead>

        <JobList items={drives} />
      </Sheet>

      <SheetNote lead="Next stop" line="your first job." />

      <Sheet side="right" last>
        <Reveal className="flex flex-wrap items-center justify-between gap-5 max-tablet:flex-col max-tablet:items-stretch">
          <div>
            <p className={cn(pageLabel, "text-[10px] text-crimson")}>
              Not on a drive yet?
            </p>
            <p className="mt-2 max-w-[48ch] text-[18px] leading-snug font-semibold tracking-[-0.01em] text-ink">
              Send us your CV and the placement cell will match you to the next
              one.
            </p>
          </div>
          <ApplyDialog label="Apply Now" variant="primary" block="tablet" />
        </Reveal>
      </Sheet>
    </Stage>
  );
}
