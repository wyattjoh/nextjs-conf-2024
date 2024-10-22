/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
