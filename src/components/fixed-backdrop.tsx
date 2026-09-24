import Image from "next/image";

import { cn } from "@/lib/utils";

/** Put on the section that holds a FixedBackdrop: the clip keeps the fixed
 *  photo inside the section, which is what makes it read as a window. */
export const fixedSection = "relative isolate [clip-path:inset(0)]";

const veils = {
  dark: "bg-[linear-gradient(180deg,rgba(8,12,36,0.74)_0%,rgba(8,12,36,0.56)_50%,rgba(8,12,36,0.78)_100%)]",
  light:
    "bg-[linear-gradient(180deg,rgba(245,246,251,0.9)_0%,rgba(245,246,251,0.82)_50%,rgba(245,246,251,0.92)_100%)]",
  dim: "bg-[linear-gradient(180deg,rgba(8,12,36,0.55)_0%,rgba(8,12,36,0.2)_40%,rgba(8,12,36,0.25)_75%,rgba(8,12,36,0.6)_100%)]",
  soft: "bg-[linear-gradient(180deg,rgba(245,246,251,0.92)_0px,rgba(245,246,251,0.84)_200px,rgba(245,246,251,0.28)_360px,rgba(245,246,251,0.28)_calc(100%-90px),rgba(245,246,251,0.75)_100%)]",
};

/** A photo pinned to the viewport while its section scrolls over it. Uses a
 *  fixed layer rather than `background-attachment: fixed`, which iOS ignores. */
export function FixedBackdrop({
  src,
  tone = "dark",
  focus = "center",
  className,
}: {
  src: string;
  tone?: keyof typeof veils;
  focus?: string;
  className?: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn("pointer-events-none fixed inset-0 -z-20", className)}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          veils[tone],
        )}
      />
    </>
  );
}
