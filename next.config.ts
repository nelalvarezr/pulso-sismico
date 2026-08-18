import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "sismologia.cl",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
