import type { MetadataRoute } from "next";

import { programs } from "@/lib/programs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/programs", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/placements", priority: 0.8 },
    { path: "/jobs", priority: 0.8 },
    { path: "/enquire", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    { path: "/franchise", priority: 0.6 },
    { path: "/achievements", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/cookie-policy", priority: 0.3 },
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
