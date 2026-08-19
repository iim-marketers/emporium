import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Space_Grotesk, Space_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";

import "./globals.css";

// Space Grotesk and Instrument Sans are variable fonts — no `weight` list.
// Space Mono ships as static cuts, so its weights are named explicitly.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Aviation & Hospitality Training · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "education",
  keywords: [
    "aviation training institute",
    "cabin crew training India",
    "air hostess course",
    "airport ground staff training",
    "hospitality management course",
    "travel and tourism course",
    "Emporium institute",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} — Aviation & Hospitality Training`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Aviation & Hospitality Training`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: "#0d1642",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSans.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col text-[17px] max-phone:text-[16px]">
        <SiteHeader />
        <main id="top" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
