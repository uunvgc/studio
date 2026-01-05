import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // keeps your app safe and catches issues early
  compiler: {
    styledComponents: true, // enables server-side rendering for your styles
  },
  images: {
    unoptimized: true, // Firebase hosting works best without image optimization conflicts
  },
  experimental: {
    // Keep this empty! Do NOT add serverActions anymore; Next.js 15+ enables it automatically
  },
  webpack(config, { isServer }) {
    // Safe Webpack override template
    // Never mutate read-only properties like 'ignored'
    // Use spread operators or create new objects
    config.module.rules = [...config.module.rules];

    // Example: add custom alias for black & gold theme files
    config.resolve.alias = {
      ...config.resolve.alias,
      "@theme": require("path").resolve(__dirname, "src/theme"),
    };

    return config;
  },
};

export default nextConfig;
