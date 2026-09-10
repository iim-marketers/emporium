"use client";

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

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className={cn(heroSurface, heroPad, notFound)}>
      <div className={cn(wrap, "relative text-center")}>
        <TailFin className="mx-auto h-16 max-phone:h-13" />
        <span className={cn(eyebrowOnDark, "mt-5.5 block")}>
          Error · Flight disrupted
        </span>
        <h1 className={cn("mt-4.5", heroHeading)}>
          This page didn&apos;t take off.
        </h1>
        <p className={cn(lede, "mx-auto")}>
          Something went wrong at our end, not yours. Try again in a moment, or
          head back to the terminal and pick a destination.
        </p>
        <div className={cn(heroCta, "mx-auto justify-center")}>
          <button type="button" onClick={() => retry()} className={btn({ block: "phone" })}>
            Try again <span className={arrow}>→</span>
          </button>
          <Link href="/" className={btn({ variant: "ghost", block: "phone" })}>
            Back to home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-7 font-mono text-[12.5px] tracking-[0.08em] text-haze/70">
            Reference {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
