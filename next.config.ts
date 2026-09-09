import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.ytimg.com/vi/**"),
      new URL("https://*.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default withPayload(nextConfig);
