import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Testimonial stills are served straight from YouTube's thumbnail CDN, so
       adding a film to the gallery needs no asset in `public/`. */
    remotePatterns: [
      new URL("https://i.ytimg.com/vi/**"),
      /* Blog artwork uploaded through the admin panel lands in Vercel Blob. */
      new URL("https://*.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default withPayload(nextConfig);
