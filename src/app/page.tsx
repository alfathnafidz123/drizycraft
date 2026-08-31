import ClientSections from '@/app/client-page';


const AffiliateBanner = dynamic(() => import('@/components/AffiliateBanner'));
const SectionContainer = dynamic(() => import('@/components/container/sectionContainer'));
const BestSellerSection = dynamic(() => import('@/components/home/best-seller.section'));
const BundlesSection = dynamic(() => import('@/components/home/bundle.section'));
const CrafterSection = dynamic(() => import('@/components/home/crafter.section'));
const ExculsiveSection = dynamic(() => import('@/components/home/exclusive.section'));
const BreezyBanner = dynamic(() => import('@/components/home/breezy.section'));
const SubscribeFreebiesSection = dynamic(() => import('@/components/home/subscribe.section'));
const VectorSection = dynamic(() => import('@/components/home/vector.section'));
const ProductCategories = dynamic(() => import('@/components/ProductCategories'));
const Testimonies = dynamic(() => import('@/components/testimonies'));
const SeasonCategories = dynamic(() => import('@/components/SeasonCategories'));
const CookieConsentBanner = dynamic(() => import('@/components/home/cookie.banner'));
const HandPickedSection = dynamic(() => import('@/components/home/handpicked.section'))
const JumbotronSection = dynamic(() => import('@/components/home/jumbotron.section'));
const ProjectSection = dynamic(() => import('@/components/home/project.section'));
const RecentSection = dynamic(() => import('@/components/home/recent.section'));
const SeasonSection = dynamic(() => import('@/components/home/season.section'));
const TrendingSection = dynamic(() => import('@/components/home/trending.section'));


import dynamic from 'next/dynamic';

// import HandPickedSection from '@/components/home/handpicked.section';
  // import JumbotronSection from '@/components/home/jumbotron.section';
  // import ProjectSection from '@/components/home/project.section';
  // import RecentSection from '@/components/home/recent.section';
  // import SeasonSection from '@/components/home/season.section';
  // import TrendingSection from '@/components/home/trending.section';

import {
  CategoryI,
  HomepageDataI,
} from '@/interfaces/product.interface';

import {
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
  cat10,
  cat12, cat13
} from '~/images';
import ErrorBoundary from '@/components/ErrorBoundary';

export const revalidate = 600
export const dynamicParams = false

async function getHomePageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/homepage`
  );
  const resJSON = await res.json();
  const homePageData: HomepageDataI = resJSON.data;

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return homePageData;
}

async function getSeasonData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product?page=1&limit=12&sortType=Latest&category=Winter%2520SVG&extraCategory=`,
    { cache: 'no-store' }
  );
  const resJSON = await res.json();
  const seasonData: CategoryI[] = resJSON.data;

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return seasonData;
}

export default async function HomePage() {
  // const [seasonalData, setSeasonalData] = useState<CategoryI[] | []>([]);
  // const [homeProduct, setHomeProduct] =
  //   useState<HomepageDataI>(defaultHomepageData);
  const homeProduct = await getHomePageData();
  const seasonalData = await getSeasonData();
  // const { data: productData } = await getProducts();

  const categoryStatic = [
    { name: 'All Product ', link: 'catalog-crafter', image: cat12.src },
    { name: 'Shadow Box SVG', link: '3D Shadow Box SVGs', image: cat2.src },
    { name: 'Cake Topper', link: 'cake topper', image: cat13.src },
    { name: 'SVG Cut File', link: 'SVG Cut Files', image: cat4.src },
    { name: 'Monogram Designs', link: 'Monogram Designs', image: cat5.src },
    { name: 'Sticker SVG', link: 'Stickers SVG', image: cat6.src },
    { name: 'Printable Craft', link: 'Printable Crafts', image: cat7.src },
    { name: 'Card Making', link: 'Card Making', image: cat8.src },
    { name: 'T-Shirt Designs', link: 'T-Shirt Designs', image: cat9.src },
    { name: 'Papercut Template', link: 'Paper Cut Templates', image: cat10.src },
  ]

  return (
    <main>
      {/* <BreezyBanner /> */}
      {/* H1 – Topik utama halaman */}
      <h1 className="sr-only">
        Premium Craft SVG Cut Files for Cricut and Silhouette
      </h1>
      <h2 className="sr-only">
        SVG Files for Cricut, Silhouette, Laser Cut, and CNC Machines
      </h2>

      <h2 className="sr-only">
        Premium 3D SVG Cut Files for Craft Projects and Digital Products
      </h2>


      {/*<JumbotronSection homeProduct={homeProduct} />*/}
      <ErrorBoundary>
        <ClientSections
          homeProduct={homeProduct}
          seasonalData={seasonalData}
        />
      </ErrorBoundary>
      {/*/!* <ProjectSection homeProduct={homeProduct} /> *!/*/}
      {/*<RecentSection product={homeProduct}/>*/}
      {/*<HandPickedSection product={homeProduct}/>*/}
      {/*<ProjectSection homeProduct={homeProduct}/>*/}
      {/*<SeasonSection homeProduct={homeProduct} />*/}
      {/*<SectionContainer bgColor='white' className='flex items-center justify-center bg-white py-6 text-base font-bold leading-4 text-white max-md:px-5'>*/}
      {/*  <div className='flex w-full flex-col max-md:max-w-full  md:px-4 lg:px-0'>*/}
      {/*    <div className='font-katide-bold whitespace-nowrap text-2xl text-indigo-950'>*/}
      {/*      Browse Product Categories*/}
      {/*    </div>*/}
      {/*    <div className='mt-6 grid grid-cols-2 justify-between gap-3 md:grid-cols-3 lg:mt-6 lg:grid-cols-5'>*/}
      {/*      {categoryStatic.map((data, index) => (*/}
      {/*        <ProductCategories*/}
      {/*          key={index.toString()}*/}
      {/*          name={data.name}*/}
      {/*          image={data.image}*/}
      {/*          link={data.link}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</SectionContainer>*/}

      {/*/!* <SectionContainer*/}
      {/*  bgColor='#E1E3F4'*/}
      {/*  className='flex items-center justify-center py-9 text-base font-bold leading-4 text-white'*/}
      {/*>*/}
      {/*  <div className='flex w-full flex-col max-md:max-w-full md:px-4 lg:px-0'>*/}
      {/*    <div className='font-katide-bold mb-16 self-center whitespace-nowrap text-2xl text-indigo-950'>*/}
      {/*      Browse Season Categories*/}
      {/*    </div>*/}
      {/*    <div className='grid grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-[42px] px-2 lg:p-0'>*/}
      {/*      {seasonalData?.slice(0, 6).map((data, index) => (*/}
      {/*        <SeasonCategories*/}
      {/*          name={data.name}*/}
      {/*          key={index}*/}
      {/*          image={data.backgroundImage}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</SectionContainer> *!/*/}
      {/*<h2 className="sr-only">*/}
      {/*  Popular SVG Designs Loved by Crafters*/}
      {/*</h2>*/}
      {/*<TrendingSection homeProduct={homeProduct}/>*/}

      {/*<CrafterSection product={homeProduct.crafterData} />*/}

      {/*<BestSellerSection product={homeProduct.bestSellerData} />*/}

      {/*/!* <BundlesSection product={homeProduct.bundleData} /> *!/*/}

      {/*{homeProduct.exclusiveData.length > 0 &&*/}
      {/*  <ExculsiveSection product={homeProduct.exclusiveData} />*/}
      {/*}*/}

      {/*/!* {homeProduct.vectorData.length > 0 &&*/}
      {/*  <VectorSection product={homeProduct.vectorData} />*/}
      {/*} *!/*/}

      {/*<Testimonies />*/}

      {/*<SubscribeFreebiesSection />*/}
      {/*<AffiliateBanner />*/}


      {/*<CookieConsentBanner />*/}

      {/*/!* <div className='fixed bottom-4 z-20 hidden w-full items-end justify-center lg:flex'>*/}
      {/*  <Link href="https://buymeacoffee.com/drizystudio" target="_blank" className='flex justify-end'>*/}
      {/*    <Image src={coffeeFloating.src} alt='Help' width={75} height={75} />*/}
      {/*  </Link>*/}
      {/*  <div className='flex items-center gap-16 rounded-lg border-2 border-[#FFDE9F] bg-[#EE4C73] px-8 py-4 font-semibold shadow-xl'>*/}
      {/*    <p className='text-white'>*/}
      {/*      Upgrade your membership{' '}*/}
      {/*      <span className='text-[#FFBB3C]'>for unlimited downloads</span>*/}
      {/*    </p>*/}
      {/*    <Link href="/membership" className='flex rounded-lg border-2 border-[#FFDE9F] bg-[#FFBB3C] px-4 py-2 shadow-lg'>*/}
      {/*      DRIZY VIP<span className='font-base'>+</span>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</div> *!/*/}
    </main>
  );
}
