import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ allow Cloudinary images
        port: "", // optional, leave empty
        pathname: "/**", // allow all paths under this hostname
      },
    ],
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
