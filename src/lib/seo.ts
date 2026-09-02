import type { Metadata } from "next";

import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaInput): Metadata {
  const url = path === "/" ? "/" : path;

  return {
    title,
    description,
    keywords: [
      "aviation training",
      "cabin crew course",
      "air hostess training",
      "airport ground staff course",
      "hospitality management course",
      "travel and tourism course",
      "Emporium",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url,
      title: path === "/" ? title : `${title} · ${site.name}`,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" ? title : `${title} · ${site.name}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
