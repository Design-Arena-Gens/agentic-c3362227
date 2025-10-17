import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    const rootDir = path.dirname(fileURLToPath(import.meta.url));
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': rootDir,
    };
    return config;
  },
};
export default nextConfig;
