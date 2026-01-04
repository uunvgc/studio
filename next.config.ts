import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Use spread or new object, DO NOT mutate read-only props
    config.module.rules = [...config.module.rules];
    return config;
  },
};

export default nextConfig;
