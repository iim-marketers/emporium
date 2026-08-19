import { EnquiryForm } from "@/components/enquiry-form";
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
  specKey,
  specRow,
  specValue,
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
  title: "Enquire & Contact",
  description:
    "Reserve a seat in the next Emporium intake. Share your details and our admissions team will call you with program options, fees and intake dates — no cost, no obligation.",
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
    body: "A one-on-one session — in person or on a call — to match you with the right program.",
  },
  {
    n: "AFTER THAT",
    title: "Fees & intake dates",
    body: "You get the fee structure, instalment options and the next intake date in writing.",
  },
];

export default function EnquirePage() {
  return (
    <>
      <PageHero
        eyebrow="Book your seat"
        title="Your future is boarding."
        lede="Tell us a little about yourself and our admissions team will reach out with program details, fees and the next intake dates."
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
              Lines are open through the week. If you would rather visit, we will set
              up a campus walk-through of the cabin mock-up and training floor.
            </p>

            <div className="grid gap-0" style={{ marginTop: 32 }}>
              <div className={specRow} style={{ borderColor: "var(--line-d)" }}>
                <span className={specKey} style={{ color: "#aebbe6" }}>
                  Admissions
                </span>
                <a href={site.phoneHref} className={cn(specValue, "font-mono")} style={{ color: "#fff" }}>
                  {site.phone}
                </a>
              </div>
              <div className={specRow} style={{ borderColor: "var(--line-d)" }}>
                <span className={specKey} style={{ color: "#aebbe6" }}>
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className={specValue}
                  style={{ color: "#fff" }}
                >
                  {site.email}
                </a>
              </div>
              <div className={specRow} style={{ borderColor: "var(--line-d)" }}>
                <span className={specKey} style={{ color: "#aebbe6" }}>
                  Campus
                </span>
                <span className={specValue} style={{ color: "#fff" }}>
                  {site.address.city}, {site.address.state}
                </span>
              </div>
            </div>

            <ul className={enqList}>
              <li className={enqListItem}>
                <span className={checklistTick}>✓</span> No cost, no obligation — just a
                friendly call
              </li>
              <li className={enqListItem}>
                <span className={checklistTick}>✓</span> Personalised program &amp; career
                guidance
              </li>
              <li className={enqListItem}>
                <span className={checklistTick}>✓</span> Details on scholarships &amp;
                instalment options
              </li>
            </ul>
          </Reveal>

          <Reveal>
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
        </div>
      </section>
    </>
  );
}
