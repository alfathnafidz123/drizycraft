/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    domains: ['http://localhost:3000', 's3-alpha-sig.figma.com'],
  },
};

module.exports = nextConfig;
