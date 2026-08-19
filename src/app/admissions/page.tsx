import { EnquirySection } from "@/components/enquiry-section";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { AdmissionSteps, SectionHead } from "@/components/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  checklistItem,
  checklist,
  checklistTick,
  chipOnDark,
  chips,
  faq,
  faqBody,
  faqItem,
  faqTrigger,
  panel,
  panelHeading,
  sectionPad,
  specKey,
  specRow,
  specValue,
  split,
  surfacePaper,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Admissions",
  description:
    "Four guided steps from enquiry to placement, eligibility for 10+2 and graduate candidates, the documents you need, and honest answers on fees, criteria and job outcomes.",
  path: "/admissions",
  keywords: ["aviation course admission", "eligibility after 12th", "admission process India"],
});

const documents = [
  "10th and 12th marksheets (or hall ticket, if you are appearing)",
  "Degree marksheet or provisional certificate, if you are a graduate",
  "Government photo ID — Aadhaar, passport or driving licence",
  "Four passport-size photographs, plain background",
  "Passport, if you already hold one (required later for international roles)",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function AdmissionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Admissions"
        title="Four steps to boarding."
        lede="A simple, guided path from your first enquiry to your first day on the job — with counselling before you commit to anything."
        crumbs={[{ label: "Admissions" }]}
      >
        <div className={chips} style={{ marginTop: 28 }}>
          <span className={chipOnDark}>Rolling intakes</span>
          <span className={chipOnDark}>10+2 &amp; graduates</span>
          <span className={chipOnDark}>Free counselling</span>
          <span className={chipOnDark}>Instalments available</span>
        </div>
      </PageHero>

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="The process" title="How admission works.">
            Nothing is committed until counselling is done and you have the fee
            structure in writing.
          </SectionHead>
          <AdmissionSteps />
        </div>
      </section>

      <section className={cn(surfacePaper, sectionPad)}>
        <div className={cn(wrap, split)}>
          <Reveal className={panel}>
            <h3 className={panelHeading}>Documents to keep ready</h3>
            <ul className={checklist} style={{ marginTop: 16 }}>
              {documents.map((doc) => (
                <li key={doc} className={checklistItem}>
                  <span className={checklistTick}>✓</span>
                  {doc}
                </li>
              ))}
            </ul>
            <p style={{ color: "var(--slate)", fontSize: 14.5, marginTop: 20 }}>
              Airside roles additionally require background verification and a
              medical, which we guide you through after your offer.
            </p>
          </Reveal>

          <Reveal className={panel}>
            <h3 className={panelHeading}>Fees, scholarships &amp; instalments</h3>
            <p style={{ color: "var(--slate)", fontSize: 15.5 }}>
              Fees depend on the program&apos;s length and level. Rather than publish a
              number that changes with the intake, we give you the exact fee
              structure during counselling, along with the instalment schedule and
              any merit scholarship you qualify for.
            </p>
            <div className="grid gap-0" style={{ marginTop: 22 }}>
              <div className={specRow}>
                <span className={specKey}>Counselling</span>
                <span className={specValue}>Free</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Instalments</span>
                <span className={specValue}>Available</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Merit scholarships</span>
                <span className={specValue}>Case by case</span>
              </div>
              <div className={specRow}>
                <span className={specKey}>Admissions desk</span>
                <span className={cn(specValue, "font-mono")}>{site.phone}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={wrap}>
          <SectionHead eyebrow="Questions" title="Asked before every intake.">
            Straight answers, including the ones other institutes prefer to avoid.
          </SectionHead>

          <Reveal>
            <Accordion className={faq}>
              {faqs.map((faq) => (
                <AccordionItem className={faqItem} key={faq.q}>
                  <AccordionTrigger className={faqTrigger}>{faq.q}</AccordionTrigger>
                  <AccordionContent className={faqBody}>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <EnquirySection
        eyebrow="Step 01"
        title={
          <>
            Start with an
            <br />
            enquiry.
          </>
        }
        lede="It takes a minute. Our admissions team will call you with program details, fees and the next intake dates — no cost, no obligation."
      />
    </>
  );
}
