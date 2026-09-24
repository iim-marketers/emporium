import { ApplyDialog } from "@/components/apply-dialog";
import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import {
  Accent,
  ContactGrid,
  IndexList,
  PageHead,
  pageBand,
  pageLabel,
} from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Enquire",
  description:
    "Enquire about Emporium's certificate courses in aviation, hospitality and cruise line. Share your details and our admissions team will call you with course options, fees and intake dates.",
  path: "/enquire",
  keywords: [
    "aviation course enquiry",
    "admission enquiry",
    "contact Emporium",
  ],
});

const nextSteps = [
  {
    n: "Within 24 hrs",
    title: "We call you back",
    body: "An admissions counsellor calls on the number you share, at a time that suits you.",
  },
  {
    n: "Same week",
    title: "Counselling session",
    body: "A one-on-one session — in person, at a centre near you, or over free video counselling from home.",
  },
  {
    n: "After that",
    title: "Fees & intake dates",
    body: "You get the fee structure, the documents to bring and the next intake date in writing.",
  },
];

const benefits = [
  "No cost, no obligation — just a friendly call",
  "Personalised course & career guidance",
];

export default function EnquirePage() {
  const { address } = site;

  return (
    <>
      <HashScroll id="enquire" />

      <PageHero
        eyebrow="Book your seat"
        title={
          <>
            Your future <Accent onDark>is boarding.</Accent>
          </>
        }
        lede="Tell us a little about yourself and our admissions team will reach out with course details, fees and the next intake dates."
        image="/home/photos/saree-line.webp"
      />

      <section className={cn(pageBand, "bg-navy text-white")}>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(760px_460px_at_10%_100%,rgba(217,31,42,0.16),transparent_65%),radial-gradient(900px_520px_at_90%_0%,rgba(63,91,214,0.35),transparent_65%)]"
        />
        <div
          className={cn(
            wrap,
            "grid grid-cols-[1fr_1.05fr] items-start gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <div>
            <PageHead
              eyebrow="Reach us directly"
              title={
                <>
                  Prefer to talk?{" "}
                  <Accent onDark>Call the admissions desk.</Accent>
                </>
              }
              onDark
              className="mb-8"
            >
              Lines are open every day. If you would rather visit, we will set
              up a walk-through of the training floor at the centre nearest you.
            </PageHead>
            <Reveal>
              <ContactGrid
                items={[
                  {
                    label: "Admissions",
                    value: site.phone,
                    href: site.phoneHref,
                  },
                  { label: "Hours", value: site.hours },
                  {
                    label: "Email",
                    value: site.email,
                    href: `mailto:${site.email}`,
                    wide: true,
                  },
                  {
                    label: "Corporate office",
                    value: `${address.line2}, ${address.city}`,
                    href: address.mapHref,
                    external: true,
                    wide: true,
                  },
                ]}
              />
            </Reveal>
            <Reveal className="mt-4">
              <IndexList items={benefits} onDark />
            </Reveal>
          </div>

          <div id="enquire">
            <Reveal>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={cn(pageBand, "bg-white")}>
        <div className={wrap}>
          <PageHead
            eyebrow="What happens next"
            title={
              <>
                After you <Accent>hit submit.</Accent>
              </>
            }
            className="mb-8"
          />

          <ol className="relative m-0 grid grid-cols-3 gap-10 p-0 max-laptop:grid-cols-1 max-laptop:gap-0">
            <span
              aria-hidden="true"
              className="absolute top-[7px] right-0 left-0 max-laptop:top-0 max-laptop:bottom-0 max-laptop:left-[7px] "
            />
            {nextSteps.map((step) => (
              <Reveal
                as="li"
                key={step.n}
                className="relative list-none max-laptop:pb-6 max-laptop:pl-10 max-laptop:last:pb-0"
              >
                <p className={cn(pageLabel, " text-crimson max-laptop:pt-0")}>
                  {step.n}
                </p>
                <h3 className="mt-3 font-sans text-[20px] leading-snug font-semibold tracking-[-0.015em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-slate">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-[6px] bg-navy px-8 py-7 text-white max-tablet:flex-col max-tablet:items-stretch max-phablet:px-5">
            <div>
              <p className={cn(pageLabel, "text-[10px] text-haze")}>
                Already qualified?
              </p>
              <p className="mt-1.5 text-[16px] text-white/85">
                Send your CV straight to the placement cell for upcoming jobs.
              </p>
            </div>
            <ApplyDialog label="Apply Now" variant="primary" block="tablet" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
