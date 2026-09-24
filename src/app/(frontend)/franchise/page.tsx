import Link from "next/link";

import {
  Accent,
  CtaBand,
  FactStrip,
  IndexList,
  PageHead,
  pageBand,
  pageCard,
  pageLabel,
  pageProse,
  Photo,
} from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { arrow, btn } from "@/lib/btn";
import { franchise } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Franchise",
  description:
    "Own an Emporium franchise. High returns in 12 to 18 months, 2000–2500 sq ft, ₹50–80 Lac investment — backed by marketing, staff recruitment and centralized course delivery.",
  path: "/franchise",
  keywords: ["training institute franchise", "aviation franchise India"],
});

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow={franchise.eyebrow}
        title={
          <>
            Join hands with the{" "}
            <Accent onDark>fastest growing industry.</Accent>
          </>
        }
        lede={franchise.returns}
        image="/home/photos/pavilion.webp"
      />

      <section className={cn(pageBand, "bg-white")}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[1.05fr_0.95fr] items-center gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-12",
          )}
        >
          <div>
            <PageHead
              eyebrow={franchise.invest}
              title={
                <>
                  Own your franchise <Accent>today.</Accent>
                </>
              }
              className="mb-6"
            />
            <Reveal className="grid gap-4">
              {franchise.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={pageProse}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal className="mt-9">
              <FactStrip items={franchise.specs} />
            </Reveal>
          </div>

          <Reveal>
            <Photo
              src={franchise.image}
              alt="Partnering with Emporium as a franchise owner"
              sizes="(max-width: 960px) 92vw, 45vw"
              className="aspect-4/3"
            />
          </Reveal>
        </div>
      </section>

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Why partner with us"
            title={
              <>
                Benefits <Accent>and backing.</Accent>
              </>
            }
          />
          <div className="grid grid-cols-[1.2fr_0.8fr] items-start gap-6 max-laptop:grid-cols-1">
            <Reveal className={cn(pageCard, "px-7 py-6 max-phablet:px-5")}>
              <p className={cn(pageLabel, "pb-2 text-crimson")}>
                Exclusive business benefits
              </p>
              <IndexList items={franchise.benefits} />
            </Reveal>

            <Reveal className="rounded-[6px] bg-navy px-7 py-6 text-white max-phablet:px-5">
              <p className={cn(pageLabel, "pb-2 text-haze")}>
                Emporium&apos;s strong support
              </p>
              <IndexList items={franchise.support} onDark />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        image="/home/photos/shillong-centre-batch.webp"
        eyebrow="Join hands"
        title={franchise.returns}
        actions={
          <>
            <Link href="/contact" className={btn({ block: "phone" })}>
              Talk to our team <span className={arrow}>→</span>
            </Link>
            <a
              href={site.phoneHref}
              className={btn({ variant: "ghost", block: "phone" })}
            >
              Call {site.phone}
            </a>
          </>
        }
      >
        Emporium has run skills development for over 15 years, placing 30,000+
        candidates worldwide through more than 10 centres across India.
      </CtaBand>
    </>
  );
}
