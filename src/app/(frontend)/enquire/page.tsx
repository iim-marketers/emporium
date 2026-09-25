import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { ApplyDialog } from "@/components/apply-dialog";
import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import {
  CoverHero,
  Sheet,
  SheetNote,
  sheetSurface,
  Stage,
} from "@/components/page/immersive";
import { Accent, IndexList, PageHead, pageLabel } from "@/components/page/kit";
import { Reveal } from "@/components/reveal";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
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

const img = pageImages.enquire;

export default function EnquirePage() {
  return (
    <>
      <HashScroll id="enquire" />

      <Stage image={img.hero} focus={img.heroFocus} priority>
        <CoverHero
          label="Book your seat"
          title={
            <>
              Your future <Accent onDark>is boarding.</Accent>
            </>
          }
          lede="Tell us a little about yourself and our admissions team will reach out with course details, fees and the next intake dates."
        />

        <Sheet
          first
          bare
          full
          id="enquire"
          className={cn(
            sheetSurface,
            "grid grid-cols-[0.9fr_1.1fr] overflow-hidden max-laptop:grid-cols-1",
          )}
        >
          <div className="relative isolate flex min-h-105 flex-col justify-end overflow-hidden bg-navy p-10 text-white max-laptop:min-h-80 max-phablet:p-6">
            <Image
              src="/home/photos/saree-line.webp"
              alt=""
              fill
              sizes="(max-width: 960px) 92vw, 42vw"
              className="-z-20 object-cover object-[50%_30%]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,22,66,0.15)_0%,rgba(13,22,66,0.55)_45%,rgba(13,22,66,0.95)_100%)]"
            />
            <p className={cn(pageLabel, "flex items-center gap-3 text-haze")}>
              <span aria-hidden="true" className="size-1.5 bg-crimson" />
              Reach us directly
            </p>
            <h2 className="mt-4 font-hero text-[clamp(32px,3.4vw,48px)] leading-[1.04] font-normal tracking-[-0.015em]">
              Prefer to talk?{" "}
              <em className="text-haze not-italic">
                Call the admissions desk.
              </em>
            </h2>
            <IndexList items={benefits} onDark className="mt-5" />
            <ul className="mt-6 grid gap-2.5 border-t border-white/20 pt-5 text-[14.5px]">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 hover:text-haze"
                >
                  <Phone className="size-4 text-haze" strokeWidth={1.8} />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 hover:text-haze"
                >
                  <Mail className="size-4 text-haze" strokeWidth={1.8} />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-haze" strokeWidth={1.8} />
                {site.hours}
              </li>
              <li>
                <a
                  href={site.address.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 hover:text-haze"
                >
                  <MapPin
                    className="mt-1 size-4 flex-none text-haze"
                    strokeWidth={1.8}
                  />
                  {site.address.line1}, {site.address.line2},{" "}
                  {site.address.city}
                </a>
              </li>
            </ul>
          </div>

          <div className="px-10 py-9 max-phablet:px-5 max-phablet:py-7">
            <EnquiryForm surface="bare" />
          </div>
        </Sheet>

        <Sheet side="right" last>
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
        </Sheet>
      </Stage>
    </>
  );
}
