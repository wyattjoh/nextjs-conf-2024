/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ppr: true,
    // pprFallbacks: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
