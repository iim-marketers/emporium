import { EnquirySection } from "@/components/enquiry-section";
import { Accent, pageBand, pageLabel, Photo } from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { achievements, achievementsLede } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";
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
        title={
          <>
            Stories from <Accent onDark>our alumni.</Accent>
          </>
        }
        lede={achievementsLede}
        image="/home/photos/palace-steps-her.webp"
        focus="50% 88%"
      />

      <section className={cn(pageBand, "bg-white")}>
        <div className={cn(wrap, "grid gap-20 max-laptop:gap-14")}>
          {achievements.map((item, i) => {
            const flip = i % 2 === 1;
            const no = String(i + 1).padStart(2, "0");

            return (
              <Reveal
                key={item.title}
                as="article"
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
              </Reveal>
            );
          })}
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
