import { CentreRail } from "@/components/centre-rail";
import { EnquiryForm } from "@/components/enquiry-form";
import { HashScroll } from "@/components/hash-scroll";
import { Accent, ContactGrid, PageHead, pageBand } from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { admissionOffices, centres } from "@/lib/centres";
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

export default function ContactPage() {
  const { address } = site;

  return (
    <>
      <HashScroll id="enquire" />

      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Have a question? <Accent onDark>Let us help.</Accent>
          </>
        }
        lede="Call the admissions desk, drop us an email, or send the form below and we will get a call back to you."
        image="/home/photos/recruiters-visit-3.webp"
      />

      <section className={cn(pageBand, "bg-navy text-white")}>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(760px_460px_at_10%_100%,rgba(217,31,42,0.16),transparent_65%),radial-gradient(900px_520px_at_90%_0%,rgba(63,91,214,0.35),transparent_65%)]"
        />
        <div
          className={cn(
            wrap,
            "grid grid-cols-[1fr_1.05fr] items-start gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-11",
          )}
        >
          <div>
            <PageHead
              eyebrow="Emporium Training and Consultancy"
              title={
                <>
                  Get a <Accent onDark>call back.</Accent>
                </>
              }
              onDark
              className="mb-8"
            >
              Free video counselling is available too — talk to our counsellors
              from home.
            </PageHead>
            <Reveal>
              <ContactGrid
                items={[
                  { label: "Phone", value: site.phone, href: site.phoneHref },
                  { label: "Hours", value: site.hours },
                  {
                    label: "Email",
                    value: site.email,
                    href: `mailto:${site.email}`,
                    wide: true,
                  },
                  {
                    label: "Corporate office",
                    value: (
                      <>
                        {address.line1}, {address.line2}, {address.city},{" "}
                        {address.pin}
                      </>
                    ),
                    href: address.mapHref,
                    external: true,
                    wide: true,
                  },
                ]}
              />
            </Reveal>
          </div>

          <div id="enquire">
            <Reveal>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={cn(pageBand, "bg-white")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Our centres"
            title={
              <>
                Where you <Accent>can train.</Accent>
              </>
            }
          >
            Emporium runs training inside established colleges and youth centres
            across the North East and West Bengal.
          </PageHead>
          <CentreRail items={centres} label="Emporium training centres" />
        </div>
      </section>

      <section className={cn(pageBand, "bg-paper")}>
        <div className={wrap}>
          <PageHead
            eyebrow="Admission offices"
            title={
              <>
                Enquire <Accent>in person.</Accent>
              </>
            }
          />
          <CentreRail
            items={admissionOffices}
            label="Emporium admission offices"
          />
        </div>
      </section>
    </>
  );
}
