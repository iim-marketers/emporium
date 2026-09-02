import { ApplyDialog } from "@/components/apply-dialog";
import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  checklistTick,
  enqGrid,
  enqList,
  enqListItem,
  enquireHeading,
  enquireSurface,
  eyebrowOnDark,
  lede,
  sectionPad,
  specKeyOnDark,
  specRow,
  specRowOnDark,
  specValue,
  specValueOnDark,
  step as step_,
  stepBody,
  stepGrid,
  stepHeading,
  stepNo,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Enquire",
  description:
    "Enquire about Emporium's certificate courses in aviation, hospitality and cruise line. Share your details and our admissions team will call you with course options, fees and intake dates.",
  path: "/enquire",
  keywords: ["aviation course enquiry", "admission enquiry", "contact Emporium"],
});

const nextSteps = [
  {
    n: "WITHIN 24 HRS",
    title: "We call you back",
    body: "An admissions counsellor calls on the number you share, at a time that suits you.",
  },
  {
    n: "SAME WEEK",
    title: "Counselling session",
    body: "A one-on-one session — in person, at a centre near you, or over free video counselling from home.",
  },
  {
    n: "AFTER THAT",
    title: "Fees & intake dates",
    body: "You get the fee structure, the documents to bring and the next intake date in writing.",
  },
];

const benefits = [
  "No cost, no obligation — just a friendly call",
  "Personalised course & career guidance",
  "Free video counselling — talk to a counsellor from home",
  "100% Placement Assistance through our Placement Cell",
];

export default function EnquirePage() {
  const { address } = site;

  return (
    <>
      <HashScroll id="enquire" />

      <PageHero
        eyebrow="Book your seat"
        title="Your future is boarding."
        lede="Tell us a little about yourself and our admissions team will reach out with course details, fees and the next intake dates."
        crumbs={[{ label: "Enquire" }]}
      />

      <section className={cn(enquireSurface, sectionPad, "pt-20")}>
        <div className={cn(wrap, enqGrid)}>
          <Reveal>
            <span className={eyebrowOnDark}>Reach us directly</span>
            <h2 className={cn(enquireHeading, "mt-4")}>
              Prefer to talk?
              <br />
              Call the admissions desk.
            </h2>
            <p className={lede}>
              Lines are open every day. If you would rather visit, we will set up a
              walk-through of the training floor at the centre nearest you.
            </p>

            <div className="mt-8 grid gap-0">
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Admissions</span>
                <a
                  href={site.phoneHref}
                  className={cn(specValue, specValueOnDark, "font-mono")}
                >
                  {site.phone}
                </a>
              </div>
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Email</span>
                <a
                  href={`mailto:${site.email}`}
                  className={cn(specValue, specValueOnDark)}
                >
                  {site.email}
                </a>
              </div>
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Corporate office</span>
                <a
                  href={address.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(specValue, specValueOnDark)}
                >
                  {address.line2}, {address.city}
                </a>
              </div>
              <div className={cn(specRow, specRowOnDark)}>
                <span className={specKeyOnDark}>Hours</span>
                <span className={cn(specValue, specValueOnDark)}>
                  {site.hours}
                </span>
              </div>
            </div>

            <ul className={enqList}>
              {benefits.map((item) => (
                <li key={item} className={enqListItem}>
                  <span className={checklistTick}>✓</span> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Anchor target for the header's Enquire CTA; the offset clears
              the sticky header the glide would otherwise stop underneath. */}
          <Reveal id="enquire" className="scroll-mt-24">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="What happens next" title="After you hit submit.">
            No queues, no chasing. Here is the sequence from your side.
          </SectionHead>

          <div className={stepGrid}>
            {nextSteps.map((step) => (
              <Reveal className={step_} key={step.n}>
                <div className={stepNo}>{step.n}</div>
                <h3 className={stepHeading}>{step.title}</h3>
                <p className={stepBody}>{step.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-11 flex flex-wrap items-center justify-between gap-4 rounded-(--r) border border-hairline bg-paper px-7 py-6 max-tablet:flex-col max-tablet:items-stretch max-tablet:gap-5">
            <p className="text-[15.5px] text-slate">
              <b className="text-royal">Already qualified?</b> Send your CV straight
              to the placement cell for upcoming jobs.
            </p>
            <ApplyDialog label="Apply Now" variant="dark" block="tablet" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
