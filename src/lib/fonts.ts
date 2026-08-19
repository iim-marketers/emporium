import { Instrument_Sans, Space_Grotesk, Space_Mono } from "next/font/google";

/**
 * The site's three type roles. `globals.css` maps them to `--font-heading`,
 * `--font-sans` and `--font-mono`, so changing a typeface means editing the
 * import and the call below — nothing else in the app names a family.
 *
 * Families that suit the brand, all available from `next/font/google`:
 *   heading — Outfit, Manrope, Plus_Jakarta_Sans, Sora, Bricolage_Grotesque
 *   sans    — Inter, Figtree, Plus_Jakarta_Sans, Libre_Franklin
 *   mono    — IBM_Plex_Mono, JetBrains_Mono, Roboto_Mono
 *
 * Variable fonts take no `weight`; static cuts (Space Mono is one) must list
 * theirs explicitly.
 */
const heading = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Goes on `<html>`; exposes every family as a CSS custom property. */
export const fontVariables = [heading.variable, sans.variable, mono.variable].join(" ");
