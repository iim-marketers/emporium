import { Poppins, Space_Mono } from "next/font/google";

/** Body copy. Headings use the system Helvetica stack — see `--font-heading`
    in globals.css — so nothing is downloaded for them.
    Poppins has no variable axis on Google Fonts, so every weight the UI
    uses has to be listed or the browser fakes it. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const code = Space_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Goes on `<html>`; exposes every family as a CSS custom property. */
export const fontVariables = [poppins.variable, code.variable].join(" ");
