import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-domain.com"],
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
