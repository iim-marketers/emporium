import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { CentreCarousel } from "@/components/centre-carousel";
import { CentreRail } from "@/components/centre-rail";
import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import {
  CoverHero,
  Sheet,
  SheetNote,
  sheetSurface,
  Stage,
} from "@/components/page/immersive";
import { Accent, PageHead, pageLabel } from "@/components/page/kit";
import { admissionOffices, centres } from "@/lib/centres";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Emporium's corporate office in Kolkata plus training centres in Imphal, Senapati, Maram, Siliguri, Guwahati, Gangtok, Shillong and Itanagar — with phone numbers for each.",
  path: "/contact",
  keywords: [
    "Emporium contact",
    "training centres",
    "Kolkata aviation institute",
  ],
});

const img = pageImages.contact;

export default function ContactPage() {
  return (
    <>
      <HashScroll id="enquire" />

      <Stage image={img.stage} focus={img.stageFocus}>
        <CoverHero
          label="Contact Us"
          title={
            <>
              Have a question? <Accent onDark>Let us help.</Accent>
            </>
          }
          lede="Call the admissions desk, drop us an email, or send the form below and we will get a call back to you."
          image={img.hero}
          focus={img.heroFocus}
          dim
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
              src="/home/photos/recruiters-visit-3.webp"
              alt=""
              fill
              sizes="(max-width: 960px) 92vw, 42vw"
              className="-z-20 object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,22,66,0.15)_0%,rgba(13,22,66,0.55)_45%,rgba(13,22,66,0.95)_100%)]"
            />
            <p className={cn(pageLabel, "flex items-center gap-3 text-haze")}>
              <span aria-hidden="true" className="size-1.5 bg-crimson" />
              Emporium Training and Consultancy
            </p>
            <h2 className="mt-4 font-hero text-[clamp(32px,3.4vw,48px)] leading-[1.04] font-normal tracking-[-0.015em]">
              Get a <em className="text-haze not-italic">call back.</em>
            </h2>
            <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-white/75">
              Free video counselling is available too — talk to our counsellors
              from home.
            </p>
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
      </Stage>

      <CentreCarousel items={centres}>
        <div className={wrap}>
          <PageHead
            eyebrow="Our centres"
            title={
              <>
                Where you <Accent onDark>can train.</Accent>
              </>
            }
            onDark
            center
            className="mb-0"
          />
        </div>
      </CentreCarousel>
    </>
  );
}
