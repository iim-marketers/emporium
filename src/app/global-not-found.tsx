import type { Metadata } from "next";

import { NotFoundPanel } from "@/components/not-found-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./(frontend)/globals.css";

export const metadata: Metadata = {
  title: `Page not found · ${site.name}`,
  description: "This route is not on the Emporium departure board.",
};

/** Unmatched URLs never pick a route group, so they cannot use the root layout
 *  in `(frontend)` and have to carry the document themselves. */
export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-screen flex-col text-[17px] max-phone:text-[16px]">
        <SiteHeader />
        <main className="flex-1">
          <NotFoundPanel />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
