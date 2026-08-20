import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  CabinWindows,
  FacilityGrid,
  FacilityIconSvg,
  SectionHead,
} from "@/components/sections";
import { facilities } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import {
  cardBody,
  moduleBody,
  moduleItemWide,
  moduleTitle,
  moduleList,
  moduleNo,
  panel,
  pillarGrid,
  pillarIcon,
  sectionPad,
  surfacePaper,
  surfaceWhite,
  trainSurface,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Training & Facilities",
  description:
    "Inside the Emporium training floor — a cabin mock-up, mirrored grooming studio, recorded interview studio and GDS computer lab where students rehearse the job before the job.",
  path: "/training",
  keywords: [
    "cabin mock-up training",
    "grooming studio",
    "GDS lab",
    "aviation practical training",
  ],
});

const week = [
  {
    day: "Mon – Tue",
    title: "Classroom & industry modules",
    body: "Operations, service standards and product knowledge — the theory that the rest of the week gets tested against.",
  },
  {
    day: "Wed",
    title: "Cabin mock-up & service drills",
    body: "Full service sequences, announcements and safety demonstrations, run and re-run until the choreography is automatic.",
  },
  {
    day: "Thu",
    title: "Grooming & deportment check",
    body: "Uniform, presentation and posture assessed against airline appearance standards, with written feedback.",
  },
  {
    day: "Fri",
    title: "Mock interviews & GD",
    body: "Recorded panel rounds and group discussions in recruiter format, played back the same day.",
  },
  {
    day: "Sat",
    title: "Lab, resume clinic & drives",
    body: "Reservation-system practice, profile work, and recruiter drives whenever they are scheduled on campus.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="The training floor"
        title="Where practice feels like the real thing."
        lede="Confidence comes from repetition in the right environment. Emporium campuses are built to rehearse the job before the job — not to describe it."
        crumbs={[{ label: "Training" }]}
      />

      <section className={cn(trainSurface, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Four spaces"
            title="Built to be practised in, not looked at."
            onDark
          >
            Every program spends more hours in these four rooms than in a
            lecture hall. That ratio is deliberate.
          </SectionHead>
          <FacilityGrid />
          {/* <CabinWindows /> */}
        </div>
      </section>

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="Inside each space"
            title="What actually happens in there."
          >
            A closer look at how each room is used through a program.
          </SectionHead>

          <div className={pillarGrid}>
            {facilities.map((facility) => (
              <Reveal className={panel} key={facility.title}>
                <div className={pillarIcon}>
                  <FacilityIconSvg icon={facility.icon} />
                </div>
                <h3 className="mb-2 text-[18px]">{facility.title}</h3>
                <p className={cardBody}>{facility.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={wrap}>
          <SectionHead
            eyebrow="A typical week"
            title="How the timetable is weighted."
          >
            Programs differ in length and focus, but the rhythm of a training
            week looks broadly like this.
          </SectionHead>

          <ul className={moduleList}>
            {week.map((entry) => (
              <Reveal as="li" key={entry.day} className={moduleItemWide}>
                <span className={moduleNo}>{entry.day}</span>
                <div>
                  <b className={moduleTitle}>{entry.title}</b>
                  <p className={moduleBody}>{entry.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection
        eyebrow="Visit the campus"
        title={
          <>
            See the mock-up
            <br />
            for yourself.
          </>
        }
        lede="Book a campus visit and walk the training floor before you decide. Our admissions team will set up a time that works for you."
      />
    </>
  );
}
