import { cva, type VariantProps } from "class-variance-authority";

/**
 * The site's pill button, as Tailwind utilities.
 *
 * Applied to <Link>, <a> and <button> alike, so this hands back a class string
 * rather than wrapping a component. Mark the arrow inside with `arrow` — the
 * button is a `group`, so it slides on hover.
 *
 * Sizing is deliberately explicit at each breakpoint: buttons grow to a 44px
 * minimum tap target from 768px down, and the compact `sm` size shrinks again
 * on the narrowest phones.
 */
export const btn = cva(
  [
    "group inline-flex cursor-pointer items-center gap-[0.55em] rounded-[999px] border-0",
    "font-heading font-semibold",
    "transition-[transform,box-shadow,background,color] duration-200",
    "disabled:cursor-not-allowed disabled:opacity-[0.65] disabled:transform-none",
    // phones get centred, wrapped labels and a full tap target
    "max-tablet:min-h-11 max-tablet:text-center max-tablet:leading-[1.25]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-crimson-deep text-white shadow-[0_14px_30px_-12px_rgba(196,18,31,0.7)]",
          "hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(196,18,31,0.8)]",
        ],
        ghost: [
          "border-[1.5px] border-white/35 bg-transparent text-white",
          "hover:border-white hover:bg-white/[0.08]",
        ],
        dark: "bg-royal text-white hover:-translate-y-0.5 hover:bg-navy-2",
        outline: [
          "border-[1.5px] border-hairline bg-transparent text-royal",
          "hover:border-royal hover:bg-cloud",
        ],
      },
      size: {
        base: "px-[26px] py-[15px] text-[16px] max-tablet:px-[22px] max-tablet:py-[14px] max-tablet:text-[15.5px]",
        sm: [
          "px-[20px] py-[11px] text-[14.5px]",
          "max-tablet:px-[22px] max-tablet:py-[14px] max-tablet:text-[15.5px]",
          "max-mini:px-[15px] max-mini:py-[10px] max-mini:text-[13.5px]",
        ],
      },
      /** Spans its container below the given width. */
      block: {
        phone: "max-phablet:w-full max-phablet:justify-center",
        tablet: "max-tablet:w-full max-tablet:justify-center",
        always: "w-full justify-center",
      },
    },
    defaultVariants: { variant: "primary", size: "base" },
  },
);

export type BtnProps = VariantProps<typeof btn>;

/** The `→` inside a button; slides right on hover. */
export const arrow = "transition-transform duration-200 group-hover:translate-x-[3px]";
