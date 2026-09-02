import Image from "next/image";

import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { achievements, achievementsLede } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { sectionPad, surfaceWhite, wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Achievements",
  description:
    "Emporium alumni flying with Go Air and Qatar Airways, working at The Oberoi Dubai and featured by the Tourism & Hospitality Sector Skill Council.",
  path: "/achievements",
  keywords: ["Emporium alumni", "cabin crew success stories"],
});

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title={achievementsLede}
        crumbs={[{ label: "Achievements" }]}
      />

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, "grid gap-8")}>
          {achievements.map((item) => (
            <Reveal
              key={item.title}
              as="article"
              className={cn(
                "grid items-center gap-9 overflow-hidden rounded-(--r) border border-hairline bg-white p-7",
                item.image
                  ? "grid-cols-[0.8fr_1.2fr] max-laptop:grid-cols-1 max-laptop:gap-6"
                  : "grid-cols-1",
                "max-phablet:p-5",
              )}
            >
              {item.image ? (
                <div className="relative aspect-4/3 overflow-hidden rounded-[14px] bg-cloud">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 960px) 92vw, 36vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div>
                <h2 className="text-[22px] leading-[1.25] text-ink max-phablet:text-[19px]">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-[70ch] text-[16px] text-slate">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
