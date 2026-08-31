// next-sitemap.config.js
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
    '/free-trial',
    '/select-plan',
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },

  additionalPaths: async (config) => {
    const allProducts = [];
    let page = 1;
    const limit = 1000;
    const MAX_PAGES = 50;

    while (page <= MAX_PAGES) {
      let json;
      try {
        const res = await fetch(
          `https://api.drizycraft.com/crafter/product?page=${page}&limit=${limit}&sortType=Latest&category=Crafters&extraCategory=`
        );

        if (!res.ok) {
          console.error(`Sitemap fetch failed at page ${page}: ${res.status}`);
          break;
        }

        json = await res.json();
      } catch (error) {
        console.error(`Sitemap fetch error at page ${page}:`, error);
        break;
      }

      if (!json?.data?.length) break;

      allProducts.push(...json.data);
      page++;
    }

    const validProducts = allProducts.filter(
      (product) => product?.meta?.[0]?.title && product.meta[0].title.trim() !== ''
    );

    const seenSlugs = new Set();
    const uniqueProducts = validProducts.filter((product) => {
      const slug = product.meta[0].title;
      if (seenSlugs.has(slug)) return false;
      seenSlugs.add(slug);
      return true;
    });

    console.log(
      `Sitemap: ${allProducts.length} total produk, ${uniqueProducts.length} valid & unik digunakan`
    );

    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      ...uniqueProducts.map((product) => ({
        loc: `/product/${encodeURIComponent(product.meta[0].title)}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: product.updatedAt
          ? new Date(product.updatedAt).toISOString()
          : new Date().toISOString(),
      })),
    ];
  },
};