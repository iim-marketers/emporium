import { CentreCarousel } from "@/components/centre-carousel";
import { CoverHero, Stage } from "@/components/page/immersive";
import { Accent, PageHead } from "@/components/page/kit";
import { centres } from "@/lib/centres";
import { pageImages } from "@/lib/page-images";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";

export const metadata = pageMetadata({
  title: "Our Centres",
  description:
    "Emporium training centres in Kolkata, Imphal, Senapati, Maram, Siliguri, Guwahati, Gangtok, Shillong and Itanagar — with addresses, directions and phone numbers for each.",
  path: "/centres",
  keywords: [
    "Emporium centres",
    "Emporium training centres",
    "training centres",
    "aviation institute near me",
  ],
});

const img = pageImages.centres;

export default function CentresPage() {
  return (
    <>
      <Stage image={img.hero} focus={img.heroFocus} priority>
        <CoverHero
          label="Our Centres"
          title={
            <>
              Find a centre <Accent onDark>near you.</Accent>
            </>
          }
          lede="Visit any of our training centres across India for counselling, admissions and classes."
          dim
        />
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
