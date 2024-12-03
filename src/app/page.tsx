import Image from 'next/image';
import Link from 'next/link';

import JumbotronSection from '@/components/home/jumbotron.section';

const AffiliateBanner = dynamic(() => import('@/components/AffiliateBanner'));
const SectionContainer = dynamic(() => import('@/components/container/sectionContainer'));
const BestSellerSection = dynamic(() => import('@/components/home/best-seller.section'));
const BundlesSection = dynamic(() => import('@/components/home/bundle.section'));
const CrafterSection = dynamic(() => import('@/components/home/crafter.section'));
const ExculsiveSection = dynamic(() => import('@/components/home/exclusive.section'));
const SubscribeFreebiesSection = dynamic(() => import('@/components/home/subscribe.section'));
const VectorSection = dynamic(() => import('@/components/home/vector.section'));
const ProductCategories = dynamic(() => import('@/components/ProductCategories'));
const Testimonies = dynamic(() => import('@/components/testimonies'));
const SeasonCategories = dynamic(() => import('@/components/SeasonCategories'));

import {
  CategoryI,
  HomepageDataI,
} from '@/interfaces/product.interface';

import {
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
  cat10,
  coffeeFloating,
} from '~/images';
import dynamic from 'next/dynamic';

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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/child/Seasonal`,
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

  // const getSeasonalHome = async () => {
  //   try {
  //     const response = await getSeason();
  //     setSeasonalData(response.data);
  //   } catch (error) {
  //     toast('Error when trying to get category');
  //   }
  // };

  // const getHomepageData = async () => {
  //   try {
  //     const response = await getHomepage();
  //     setHomeProduct(response.data);
  //   } catch (error) {
  //     toast('Error when trying to get all products');
  //   }
  // };

  // useEffect(() => {
  //   getSeasonalHome();
  //   getHomepageData();
  // }, []);

  const categoryStatic = [
    { name: 'Free SVGs', link: 'Free SVGs', image: cat1.src },
    { name: 'Shadow Box SVG', link: '3D Shadow Box SVGs', image: cat2.src },
    { name: 'Circut SVG', link: 'Cricut SVG', image: cat3.src },
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
      <JumbotronSection homeProduct={homeProduct} />

      <SectionContainer
        bgColor='white'
        className='flex items-center justify-center bg-white py-9 text-base font-bold leading-4 text-white max-md:px-5'
      >
        <div className='flex w-full flex-col max-md:max-w-full'>
          <div className='font-katide-bold self-center whitespace-nowrap text-2xl text-indigo-950'>
            Browse Product Categories
          </div>
          <div className='mt-6 grid grid-cols-2 justify-between gap-3 md:grid-cols-3 lg:mt-12 lg:grid-cols-5'>
            {categoryStatic.map((data, index) => (
              <ProductCategories
                key={index.toString()}
                name={data.name}
                image={data.image}
                link={data.link}
              />
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer
        bgColor='#E1E3F4'
        className='flex items-center justify-center py-9 text-base font-bold leading-4 text-white'
      >
        <div className='flex w-full flex-col max-md:max-w-full'>
          <div className='font-katide-bold mb-16 self-center whitespace-nowrap text-2xl text-indigo-950'>
            Browse Season Categories
          </div>
          <div className='grid grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-[42px] px-2 lg:p-0'>
            {seasonalData?.slice(0, 6).map((data, index) => (
              <SeasonCategories
                name={data.name}
                key={index}
                image={data.backgroundImage}
              />
            ))}
          </div>
        </div>
      </SectionContainer>

      <CrafterSection product={homeProduct.crafterData} />

      <BestSellerSection product={homeProduct.bestSellerData} />

      <BundlesSection product={homeProduct.bundleData} />

      {homeProduct.exclusiveData.length > 0 &&
        <ExculsiveSection product={homeProduct.exclusiveData} />
      }

      {homeProduct.vectorData.length > 0 &&
        <VectorSection product={homeProduct.vectorData} />
      }

      <Testimonies />

      <SubscribeFreebiesSection />
      <AffiliateBanner />
      <div className='fixed bottom-4 z-20 hidden w-full items-end justify-center lg:flex'>
        <Link href="https://buymeacoffee.com/drizystudio" target="_blank" className='flex justify-end'>
          <Image src={coffeeFloating.src} alt='Help' width={75} height={75} />
        </Link>
        <div className='flex items-center gap-16 rounded-lg border-2 border-[#FFDE9F] bg-[#EE4C73] px-8 py-4 font-semibold shadow-xl'>
          <p className='text-white'>
            Upgrade your membership{' '}
            <span className='text-[#FFBB3C]'>for unlimited downloads</span>
          </p>
          <Link href="/membership" className='flex rounded-lg border-2 border-[#FFDE9F] bg-[#FFBB3C] px-4 py-2 shadow-lg'>
            DRIZY VIP<span className='font-base'>+</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
