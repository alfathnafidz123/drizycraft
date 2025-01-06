const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  // output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      's3-alpha-sig.figma.com',
      'i0.wp.com',
      'images.unsplash.com',
      'media.drizycraft.com',
      'drizy-media.quadrakaryasantosa.com',
    ],
  },
  experimental: {
    optimizePackageImports: ['react-icons/*'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
