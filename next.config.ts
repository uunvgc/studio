import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverActions: {
    // By default, the size of the request body sent to a Server Action is limited to 1MB.
    // You can configure this limit using the serverActions.bodySizeLimit option.
    // It can be a number in bytes, or a string with a unit (e.g. "2mb").
    bodySizeLimit: '2mb',
  },
};

export default nextConfig;
