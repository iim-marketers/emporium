import { Accent, PageHead, pageLabel } from "@/components/page/kit";
import { Reveal } from "@/components/reveal";
import { courseDurations, type Program } from "@/lib/programs";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const fullYear = 12;

export function CourseDurations({ program }: { program: Program }) {
  return (
    <section id="durations" className="relative pt-16 pb-6 max-phablet:pt-10">
      <div
        className={cn(
          wrap,
          "rounded-[16px] bg-white px-10 py-12 shadow-[0_40px_90px_-40px_rgba(8,12,36,0.6)] max-laptop:px-7 max-phablet:rounded-[12px] max-phablet:px-5 max-phablet:py-9",
        )}
      >
        <PageHead
          eyebrow="Course duration"
          title={
            <>
              Pick the pace <Accent>that fits you.</Accent>
            </>
          }
        >
          {program.shortTitle} comes in four lengths, from a two-month sprint to
          the complete twelve-month programme.
        </PageHead>

        <ol className="m-0 grid list-none grid-cols-4 gap-4 p-0 max-laptop:grid-cols-2 max-phablet:grid-cols-1 max-phablet:gap-3">
          {courseDurations.map((d, i) => {
            const full = d.months === fullYear;
            return (
              <Reveal
                as="li"
                key={d.months}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={cn(
                  "relative flex flex-col rounded-[12px] border p-6 text-ink max-phablet:p-5",
                  full
                    ? "border-crimson/25 bg-linear-to-b from-[#fdecec] to-[#fff8f8]"
                    : "border-hairline bg-paper",
                )}
              >
                {full ? (
                  <span
                    className={cn(
                      pageLabel,
                      "absolute top-2 right-2 rounded-full bg-crimson/10 px-2.5 py-1 text-[9.5px] tracking-[0.2em] text-crimson-deep max-phablet:top-5 max-phablet:right-5",
                    )}
                  >
                    Full course
                  </span>
                ) : null}

                <p className="flex items-baseline gap-2">
                  <span className="font-hero text-[64px] leading-none tracking-[-0.03em] max-phablet:text-[52px]">
                    {d.months}
                  </span>
                  <span className={cn(pageLabel, "text-[10.5px] text-crimson")}>
                    Months
                  </span>
                </p>

                <span
                  aria-hidden="true"
                  className="mt-5 grid grid-cols-12 gap-0.75"
                >
                  {Array.from({ length: fullYear }, (_, m) => (
                    <span
                      key={m}
                      className={cn(
                        "h-1.5 rounded-full",
                        m < d.months ? "bg-crimson" : "bg-navy/10",
                      )}
                    />
                  ))}
                </span>

                <h3 className="mt-6 font-sans text-[18px] leading-snug font-semibold tracking-[-0.015em]">
                  {d.name}
                </h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-slate">
                  {d.summary}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
