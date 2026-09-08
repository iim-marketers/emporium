import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Testimonial stills are served straight from YouTube's thumbnail CDN, so
       adding a film to the gallery needs no asset in `public/`. */
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
