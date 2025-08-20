/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://drizycraft.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  additionalPaths: async (config) => {
    // Panggil API produk dengan params kosong agar semua produk dikembalikan
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product`,
      {
        method: 'GET',
      }
    );
    const data = await res.json();

    // Map semua produk ke URL sitemap
    return data.data.map((product) => ({
      loc: `/product/${product.meta[0].title}`, // URL bersih
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));
  },
};
