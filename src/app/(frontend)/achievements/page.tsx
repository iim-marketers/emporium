import { Fragment } from "react";

import { EnquirySection } from "@/components/enquiry-section";
import { Accent, pageLabel, Photo } from "@/components/page/kit";
import {
  CoverHero,
  Sheet,
  SheetNote,
  Stage,
} from "@/components/page/immersive";
import { achievements, achievementsLede } from "@/lib/content";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Achievements",
  description:
    "Emporium alumni flying with Go Air and Qatar Airways, working at The Oberoi Dubai and featured by the Tourism & Hospitality Sector Skill Council.",
  path: "/achievements",
  keywords: ["Emporium alumni", "cabin crew success stories"],
});

const img = pageImages.achievements;

export default function AchievementsPage() {
  return (
    <>
      <Stage image={img.stage} focus={img.stageFocus}>
        <CoverHero
          label="Achievements"
          title={
            <>
              Stories from <Accent onDark>our alumni.</Accent>
            </>
          }
          lede={achievementsLede}
          image={img.hero}
          focus={img.heroFocus}
        />

        {achievements.map((item, i) => {
          const flip = i % 2 === 1;
          const no = String(i + 1).padStart(2, "0");

          return (
            <Fragment key={item.title}>
              <Sheet
                side={i % 2 ? "right" : "left"}
                first={i === 0}
                last={i === achievements.length - 1}
                className={cn(
                  "grid items-center gap-14",
                  item.image
                    ? "grid-cols-2 max-laptop:grid-cols-1 max-laptop:gap-8"
                    : "grid-cols-1",
                )}
              >
                {item.image ? (
                  <Photo
                    src={item.image}
                    sizes="(max-width: 960px) 92vw, 46vw"
                    className={cn("aspect-4/3", flip && "laptop:order-2")}
                  />
                ) : null}

                <div
                  className={cn(
                    !item.image &&
                      "rounded-[6px] bg-navy px-12 py-14 text-white max-phablet:px-6 max-phablet:py-10",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-hero text-[64px] leading-none",
                        item.image ? "text-crimson/85" : "text-haze",
                      )}
                    >
                      {no}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px flex-1",
                        item.image ? "bg-hairline" : "bg-white/20",
                      )}
                    />
                    <span
                      className={cn(
                        pageLabel,
                        "text-[10px]",
                        item.image ? "text-slate/70" : "text-haze",
                      )}
                    >
                      Alumni story
                    </span>
                  </div>
                  <h2
                    className={cn(
                      "mt-6 font-sans text-[clamp(21px,2.3vw,30px)] leading-tight font-semibold tracking-[-0.02em]",
                      item.image ? "text-ink" : "max-w-[34ch] text-white",
                    )}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-4 max-w-[62ch] text-[16px] leading-relaxed",
                      item.image ? "text-slate" : "text-white/70",
                    )}
                  >
                    {item.body}
                  </p>
                </div>
              </Sheet>

              {i === 0 ? (
                <SheetNote lead="Our alumni" line="fly high." />
              ) : null}
            </Fragment>
          );
        })}
      </Stage>

      <EnquirySection />
    </>
  );
}
