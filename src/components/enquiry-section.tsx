import Image from "next/image";

import { EnquiryForm } from "@/components/enquiry-form";
import { IndexList, pageLabel } from "@/components/page/kit";
import { Reveal } from "@/components/reveal";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const benefits = [
  "No cost, no obligation — just a friendly call",
  "Personalised course & career guidance",
  "100% Placement Assistance through our Placement Cell",
];

export function EnquirySection({
  eyebrow = "Book your seat",
  title = (
    <>
      Your future is boarding.{" "}
      <em className="text-haze not-italic">Reserve a seat.</em>
    </>
  ),
  lede = "Tell us a little about yourself and our admissions team will reach out with course details, fees and the next intake dates.",
  subject,
  image = "/home/photos/auditorium-greeting.webp",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
  subject?: string;
  image?: string;
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-navy py-20 text-white max-laptop:py-16 max-phablet:py-12"
      id="enquire"
    >
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 object-cover grayscale"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,22,66,0.96)_0%,rgba(13,22,66,0.88)_45%,rgba(13,22,66,0.7)_100%)] max-laptop:bg-navy/90"
      />
      <div aria-hidden="true" className="seam-y -z-10" />

      <div
        className={cn(
          wrap,
          "relative grid grid-cols-[1fr_1.05fr] items-center gap-16",
          "max-laptop:grid-cols-1 max-laptop:gap-11",
        )}
      >
        <Reveal>
          <p className={cn(pageLabel, "flex items-center gap-3 text-haze")}>
            <span aria-hidden="true" className="size-1.5 bg-crimson" />
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-[16ch] font-hero text-[clamp(34px,4vw,54px)] leading-[1.04] font-normal tracking-[-0.015em]">
            {title}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-white/72 max-laptop:max-w-[56ch]">
            {lede}
          </p>
          <IndexList items={benefits} onDark className="mt-8 max-w-110" />
        </Reveal>

        <Reveal>
          <EnquiryForm subject={subject} />
        </Reveal>
      </div>
    </section>
  );
}
