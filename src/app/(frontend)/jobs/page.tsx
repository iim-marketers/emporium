import { ApplyDialog } from "@/components/apply-dialog";
import { JobList } from "@/components/job-board";
import { Accent, PageHead, pageBand, pageLabel } from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getJobs } from "@/lib/cms";
import { jobsIntro, openDrives } from "@/lib/jobs";
import { pageMetadata } from "@/lib/seo";
import { heroCta, wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Jobs",
  description:
    "Live campus recruitment drives at Emporium centres — cabin crew and airport ground staff interviews with dates, venues and how to register.",
  path: "/jobs",
  keywords: ["cabin crew hiring", "ground staff jobs", "campus interview"],
});

export const revalidate = 3600;

export default async function JobsPage() {
  const drives = openDrives(await getJobs());

  return (
    <>
      <PageHero
        eyebrow="Newest jobs"
        title={
          <>
            Campus interviews, <Accent onDark>happening now.</Accent>
          </>
        }
        lede={jobsIntro}
        image="/home/photos/jobs-board-saree.webp"
      />

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
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

          <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-[6px] bg-navy px-8 py-7 text-white max-tablet:flex-col max-tablet:items-stretch max-phablet:px-5">
            <div>
              <p className={cn(pageLabel, "text-[10px] text-haze")}>
                Not on a drive yet?
              </p>
              <p className="mt-1.5 text-[16px] text-white/85">
                Send us your CV and the placement cell will match you to the
                next one.
              </p>
            </div>
            <ApplyDialog label="Apply Now" variant="primary" block="tablet" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
