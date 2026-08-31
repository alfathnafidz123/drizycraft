const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole: true,
  // },
  compress: true,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      's3-alpha-sig.figma.com',
      'i0.wp.com',
      'images.unsplash.com',
      'drizycraft.com',
      'media.drizycraft.com',
      'drizy-media.quadrakaryasantosa.com',
      'lh3.googleusercontent.com',
    ],
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.drizycraft.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drizycraft.com",
        pathname: "/**",
      },
    ],

    deviceSizes: [320, 420, 640, 768, 1024, 1280],
    imageSizes: [64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['react-icons/*'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
