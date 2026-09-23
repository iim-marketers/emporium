import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Old WordPress URLs on emporiumsolutions.com, kept so their search ranking carries over.
const legacyRedirects: [string, string][] = [
  ["/contact-us", "/contact"],
  ["/about-emporiumsolutions", "/about"],
  ["/apply-now", "/enquire"],
  ["/thank-you", "/enquire"],
  ["/advanced-certification-aviation-courses-after-12th", "/programs/aviation"],
  ["/get-advanced-certification-in-hospitality-management", "/programs/hospitality"],
  ["/exclusive-fast-track-certification-in-cruise-careers", "/programs/cruise"],
  ["/fast-track-certificate-course-in-aviation-hospitality-cruise-line", "/programs"],
  ["/wp-job-portal-jobseeker-controlpanel", "/jobs"],
  ["/test", "/"],
  ["/test2", "/"],
  ["/home3", "/"],
  ["/home-5", "/"],
  ["/page/:n", "/"],
  ["/category/:slug", "/blog"],
  ["/author/:slug", "/blog"],
  ["/feed", "/blog"],
  ["/soaring-to-success-unleash-your-wings-with-top-aviation-courses", "/blog/soaring-to-success-unleash-your-wings-with-top-aviation-courses"],
  ["/your-global-career-starts-here-why-thousands-trust-emporium-for-aviation-hospitality-cruise-training", "/blog/your-global-career-starts-here-why-thousands-trust-emporium-for-aviation-hospitality-cruise-training"],
  ["/top-10-skills-you-need-to-succeed-in-aviation-and-hospitality", "/blog/top-10-skills-you-need-to-succeed-in-aviation-and-hospitality"],
  ["/indias-civil-aviation-boom-a-sky-full-of-opportunities-for-aspiring-professionals", "/blog/indias-civil-aviation-boom-a-sky-full-of-opportunities-for-aspiring-professionals"],
  ["/cabin-crew-interview-questions-how-to-answer-them", "/blog/cabin-crew-interview-questions-how-to-answer-them"],
];

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
    // Must fit a CV at CV_MAX_BYTES plus the rest of the form.
    serverActions: { bodySizeLimit: "4.5mb" },
  },
  redirects: async () =>
    legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    })),
  images: {
    remotePatterns: [
      new URL("https://i.ytimg.com/vi/**"),
      new URL("https://*.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default withPayload(nextConfig);
