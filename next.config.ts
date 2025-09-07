import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
      },
    ],
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
