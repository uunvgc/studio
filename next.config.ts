import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    allowedDevOrigins: [
      "9000-firebase-profitpro-ai5-1767600422800.cluster-dccle54vc5d26v2fsixd2icgqi.cloudworkstations.dev",
      "6000-firebase-profitpro-ai5-1767600422800.cluster-dccle54vc5d26v2fsixd2icgqi.cloudworkstations.dev",
    ],
  },
};

export default nextConfig;
