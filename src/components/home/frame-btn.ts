import { cva } from "class-variance-authority";

export const frameBtn = cva(
  [
    "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 px-7",
    "font-sans text-[12px] font-semibold tracking-[0.22em] uppercase",
    "transition-[background-color,color,border-color] duration-300",
    "max-phablet:w-full",
  ],
  {
    variants: {
      tone: {
        light: "bg-white text-ink hover:bg-crimson-deep hover:text-white",
        outline:
          "border border-white/60 text-white backdrop-blur-[2px] hover:border-white hover:bg-white hover:text-ink",
        dark: "bg-ink text-white hover:bg-crimson-deep",
      },
    },
    defaultVariants: { tone: "light" },
  },
);
