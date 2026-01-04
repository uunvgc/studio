import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // keeps your app safe and catches issues early
  swcMinify: true,       // faster builds and smaller bundle
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
  env: {
    // Firebase App Hosting secrets are accessed at runtime
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
};

export default nextConfig;
