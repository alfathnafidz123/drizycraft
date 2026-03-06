/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://drizycraft.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/faq',
    '/contact-us',
    '/terms',
    '/buy-success',
    '/coin-success',
    '/sub-success',
    '/cancellation-policy',
    '/create-password',
    '/help-center',
    '/forget-password',
    '/privacy',
    '/register',
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },

  additionalPaths: async (config) => {
    const allProducts = [];
    let page = 1;
    const limit = 1000;

    while (true) {
      const res = await fetch(
        `https://api.drizycraft.com/crafter/product?page=${page}&limit=${limit}&sortType=Latest&category=Crafters&extraCategory=`
      );
      const json = await res.json();

      if (!json?.data?.length) break;

      allProducts.push(...json.data);
      page++;
    }

    return [
      // ✅ HOMEPAGE
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },

      // ✅ PRODUCT PAGES
      ...allProducts.map((product) => ({
        loc: `/product/${product.meta[0].title}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })),
    ];
  },
};
