import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Safely extend the existing ignored paths, or initialize if it doesn't exist.
    const ignored = Array.isArray(config.watchOptions.ignored)
      ? config.watchOptions.ignored
      : [];
      
    config.watchOptions.ignored = [
        ...ignored,
        '**/next.config.ts',
    ];
    return config;
  },
};

export default nextConfig;
