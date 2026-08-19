import Link from "next/link";

import { TailFin } from "@/components/brand-mark";
import { pageMetadata } from "@/lib/seo";
import { arrow, btn } from "@/lib/btn";
import {
  eyebrowOnDark,
  heroCta,
  heroPad,
  heroSurface,
  lede,
  notFound,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "This route is not on the Emporium departure board.",
  path: "/404",
});

export default function NotFound() {
  return (
    <section className={cn(heroSurface, heroPad, notFound)}>
      <div
        className={wrap}
        style={{ position: "relative", textAlign: "center" }}
      >
        <TailFin className="mx-auto h-16 max-phone:h-13" />
        <span
          className={eyebrowOnDark}
          style={{ display: "block", marginTop: 22 }}
        >
          Error 404 · Flight not found
        </span>
        <h1 style={{ fontSize: "clamp(36px,5vw,60px)", marginTop: 18 }}>
          This gate doesn&apos;t exist.
        </h1>
        <p className={cn(lede, "mx-auto")}>
          The page you were looking for is not on the departure board. Head back
          to the terminal and pick a destination.
        </p>
        <div
          className={heroCta}
          style={{ justifyContent: "center", marginInline: "auto" }}
        >
          <Link href="/" className={btn({ block: "phone" })}>
            Back to home <span className={arrow}>→</span>
          </Link>
          <Link href="/programs" className={btn({ variant: "ghost", block: "phone" })}>
            Explore programs
          </Link>
        </div>
      </div>
    </section>
  );
}
