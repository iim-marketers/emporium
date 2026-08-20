import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { enquireHeading, eyebrowOnDark, sectionPad, wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const benefits = [
  "No cost, no obligation — just a friendly call",
  "Personalised program & career guidance",
  "Details on scholarships & instalment options",
];

export function EnquirySection({
  eyebrow = "Book your seat",
  title = (
    <>
      Your future is boarding.
      <br />
      Reserve a seat.
    </>
  ),
  lede = "Tell us a little about yourself and our admissions team will reach out with program details, fees and the next intake dates.",
  defaultProgram,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
  defaultProgram?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(160deg,var(--navy)_0%,var(--royal)_130%)] text-white",
        // warm glow rising from the lower left
        "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
        "before:bg-[radial-gradient(700px_380px_at_12%_110%,rgba(217,31,42,0.18),transparent_60%)]",
        sectionPad,
      )}
      id="enquire"
    >
      <div
        className={cn(
          wrap,
          "relative grid grid-cols-[1fr_1.05fr] items-center gap-14",
          "max-laptop:grid-cols-1 max-laptop:gap-11",
        )}
      >
        <Reveal>
          <span className={eyebrowOnDark}>{eyebrow}</span>
          <h2 className={cn("mt-4", enquireHeading)}>{title}</h2>
          <p className="mt-4.5 max-w-[38ch] text-[18px] text-[#c8d2f4] max-laptop:max-w-[52ch]">
            {lede}
          </p>
          <ul className="mt-7 grid gap-3 p-0">
            {benefits.map((item) => (
              <li
                key={item}
                className="flex list-none items-center gap-3 text-[15.5px] text-[#dbe2f7]"
              >
                <span className="flex-none text-green">✓</span> {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <EnquiryForm defaultProgram={defaultProgram} />
        </Reveal>
      </div>
    </section>
  );
}
