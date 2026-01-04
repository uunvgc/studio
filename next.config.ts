import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions.ignored = [
        ...config.watchOptions.ignored,
        '**/next.config.ts',
    ];
    return config;
  },
};

export default nextConfig;
