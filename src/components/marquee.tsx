import { cn } from "@/lib/utils";

/**
 * `MarqueeRow` renders a second, aria-hidden copy of its items because the
 * keyframe translates the track by -50%, which only lines up seamlessly with
 * exactly two copies.
 *
 * The pause classes spell out `[animation-play-state:paused]`: Tailwind has no
 * `paused` utility, so a bare `group-hover:paused` silently does nothing.
 */
export function Marquee({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${label}. Scrolls automatically — hover or focus to pause.`}
      className={cn(
        "group grid gap-3.5 overflow-hidden",
        "mask-[linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]",
        "motion-reduce:mask-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MarqueeRow({
  duration,
  reverse = false,
  gap = "gap-3.5",
  children,
}: {
  /** Set from the row's content width, so every row travels at a similar speed. */
  duration: string;
  reverse?: boolean;
  gap?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ animationDuration: duration }}
      className={cn(
        "flex w-max animate-marquee",
        gap,
        "group-hover:[animation-play-state:paused]",
        "group-focus:[animation-play-state:paused]",
        "group-focus-within:[animation-play-state:paused]",
        reverse && "[animation-direction:reverse]",
        "motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center",
      )}
    >
      {children}
      {/* The loop's second half — decorative, and dropped when motion is off.
          `contents` keeps these as flex items of the row rather than one box.
          `inert` matters once a row holds controls: the copy is hidden from
          assistive tech, so it must not be reachable by tab or click either. */}
      <div aria-hidden="true" inert className="contents motion-reduce:hidden">
        {children}
      </div>
    </div>
  );
}
