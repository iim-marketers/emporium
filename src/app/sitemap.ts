import type { MetadataRoute } from "next";

import { programs } from "@/lib/programs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/programs", priority: 0.9 },
    { path: "/admissions", priority: 0.9 },
    { path: "/enquire", priority: 0.8 },
    { path: "/why-emporium", priority: 0.7 },
    { path: "/training", priority: 0.7 },
    { path: "/placements", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...programs.map((program) => ({
      url: `${site.url}/programs/${program.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
