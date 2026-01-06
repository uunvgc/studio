import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The 'env' configuration is deprecated in favor of runtime environment variables.
  // Next.js automatically makes environment variables prefixed with NEXT_PUBLIC_
  // available to the browser. The issue was likely due to how the build
  // process was handling the variables. This empty config is sufficient
  // as long as the variable is set in the environment.
  devIndicators: {
    allowedDevOrigins: [
      "9000-firebase-profitpro-ai5-1767600422800.cluster-dccle54vc5d26v2fsixd2icgqi.cloudworkstations.dev",
    ],
  },
};

export default nextConfig;
