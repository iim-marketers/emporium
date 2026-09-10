import Link from "next/link";

import { TailFin } from "@/components/brand-mark";
import { arrow, btn } from "@/lib/btn";
import {
  eyebrowOnDark,
  heroCta,
  heroHeading,
  heroPad,
  heroSurface,
  lede,
  notFound,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export function NotFoundPanel() {
  return (
    <section className={cn(heroSurface, heroPad, notFound)}>
      <div className={cn(wrap, "relative text-center")}>
        <TailFin className="mx-auto h-16 max-phone:h-13" />
        <span className={cn(eyebrowOnDark, "mt-5.5 block")}>
          Error 404 · Flight not found
        </span>
        <h1 className={cn("mt-4.5", heroHeading)}>
          This gate doesn&apos;t exist.
        </h1>
        <p className={cn(lede, "mx-auto")}>
          The page you were looking for is not on the departure board. Head back
          to the terminal and pick a destination.
        </p>
        <div className={cn(heroCta, "mx-auto justify-center")}>
          <Link href="/" className={btn({ block: "phone" })}>
            Back to home <span className={arrow}>→</span>
          </Link>
          <Link
            href="/programs"
            className={btn({ variant: "ghost", block: "phone" })}
          >
            Explore courses
          </Link>
        </div>
      </div>
    </section>
  );
}
