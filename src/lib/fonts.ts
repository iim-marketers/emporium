import { Poppins, Space_Mono } from "next/font/google";

/** Poppins has no variable axis on Google Fonts, so every weight the UI uses
 *  has to be listed here or the browser fakes it. */
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

export const fontVariables = [poppins.variable, code.variable].join(" ");
