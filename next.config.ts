import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'firebase', '@google/generative-ai'],
  },
};

export default nextConfig;
