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
    const allProducts = [];
    let page = 1;
    const limit = 1000; // sesuaikan sesuai jumlah total produk

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await fetch(
        `https://api.drizycraft.com/crafter/product?page=${page}&limit=${limit}&sortType=Latest&category=Crafters&extraCategory=`
      );
      const json = await res.json();

      if (!json.data || json.data.length === 0) break;

      allProducts.push(...json.data);
      page++;
    }

    // map ke URL sitemap
    return allProducts.map((product) => ({
      loc: `/product/${product.meta[0].title}`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));
  },
};
