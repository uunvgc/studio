import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  watchOptions: {
    // This is a workaround for a known issue where the Next.js dev server
    // can get into a restart loop in some containerized environments.
    // By ignoring the config file, we prevent the server from restarting
    // when the file's metadata changes unexpectedly.
    ignored: ['**/next.config.ts'],
  },
};

export default nextConfig;
