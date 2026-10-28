import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Adds 384 and 480 to Next's defaults, so the About photo (380px wide on
    // desktop) isn't served at 640px.
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
