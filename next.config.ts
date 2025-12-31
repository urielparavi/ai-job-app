// Import the NextConfig type from Next.js for TypeScript type checking
import type { NextConfig } from 'next';

// Define the Next.js configuration object
const nextConfig: NextConfig = {
  // You can add other config options here, like reactStrictMode, basePath, etc.

  // Experimental features in Next.js
  experimental: {
    // Enable the new caching mechanism in Next.js (currently experimental)
    // This replaces the older caching system and allows functions like `revalidateTag`
    useCache: true,
  },
};

// Export the config so Next.js can read it when building/running the app
export default nextConfig;
