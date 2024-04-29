/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'http://localhost:3000',
      's3-alpha-sig.figma.com',
      'i0.wp.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
