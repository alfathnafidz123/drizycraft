/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import Slider, { CustomArrowProps } from 'react-slick';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import SectionContainer from '@/components/container/sectionContainer';
import ModalProduct from '@/components/modals/product';
import ProductCategories from '@/components/ProductCategories';
import SeasonCategories from '@/components/SeasonCategories';
import ProductSlider from '@/components/slider/ProductSlider';
import TrendingTag from '@/components/tag/TrendingTag';
import Testimonies from '@/components/testimonies';

import { getCategory } from '@/app/api/product/getCategory';
import { getHomepage } from '@/app/api/product/getHomepage';
import {
  CategoryI,
  HomepageDataI,
  productI,
} from '@/interfaces/product.interface';

import {
  arrowRight,
  avatarExample,
  cartProduct,
  coffeeFloating,
  crafterItem1,
  gridCrafter,
  gridSlide,
  sale,
  search,
  seasonCategory,
  starBadge,
} from '~/images';

const myFont = localFont({ src: '../../public/fonts/Hastle.woff2' });
const defaultHomepageData: HomepageDataI = {
  crafterData: [],
  bundleData: [],
  vectorData: [],
  bestSellerData: [],
  exclusiveData: [],
};
const CustomerSupportLottie = dynamic(
  () => import('../components/lottie/customer-support'),
  { ssr: false }
);

export default function HomePage() {
  const { token } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  const [categoryData, setCategoryData] = useState<CategoryI[] | []>([]);
  const [homeProduct, setHomeProduct] =
    useState<HomepageDataI>(defaultHomepageData);
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-prev'
      style={{ left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &lt;
    </div>
  );

  const getCategoryHome = async () => {
    try {
      const response = await getCategory();
      setCategoryData(response.data);
    } catch (error) {
      toast('Error when trying to get category');
    }
  };

  const getHomepageData = async () => {
    try {
      const response = await getHomepage();
      setHomeProduct(response.data);
    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  useEffect(() => {
    getCategoryHome();
    getHomepageData();
  }, []);

  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-next'
      style={{ right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
  };

  const seasonCategoryData = [
    { name: 'Fall', image: seasonCategory },
    { name: 'Halloween', image: seasonCategory },
    { name: 'Winter', image: seasonCategory },
    { name: 'Christmas', image: seasonCategory },
    { name: 'Spring', image: seasonCategory },
    { name: 'Summer', image: seasonCategory },
  ];
  const crafterSlider = [
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: 5,
      description: '',
    },
  ];

  const exclusivePartnerSlider = [
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      imageUrl: crafterItem1.src,
      price: [2, 3, 4],
      description: '',
      partnerName: 'Tiptop Graphics',
    },
  ];

  return (
    <main>
      <SectionContainer
        bgColor='#C2E5FF'
        className='flex flex-col items-center justify-center pb-10 pt-[30px] text-center lg:pt-[67px]'
      >
        <div className='font-katide-heavy mb-16 text-[30px] leading-[120%] text-indigo-950 lg:text-[64px]'>
          <p>Combating Loneliness</p>
          <p>with Creative Projects</p>
        </div>
        <div className='group mb-4 hidden h-[60px] w-[480px] items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 bg-[#F1F2FB] p-4 pl-6 text-left text-sm font-normal leading-4 text-[#6F6F6F] focus-within:bg-white lg:flex'>
          <input
            placeholder='Search for unique craft designs, categories, occasions...'
            className='!focus:border-none !focus:outline-none flex-grow truncate border-none bg-transparent text-sm tracking-wide !outline-none placeholder:tracking-wide placeholder:text-[#6F6F6F] focus:ring-0'
          ></input>
          <div className='flex rounded-full bg-[#008ECC]'>
            <img
              src={search.src}
              className='w-[32px] flex-grow transition-all duration-300 group-hover:w-0 group-hover:opacity-0'
              alt='search'
            />
            <div className='w-0 overflow-hidden transition-all duration-300 group-hover:w-[80px]'>
              <p className='px-4 py-2 text-center text-white'>Search</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2.5 lg:flex-row'>
          <p className='font-katide-bold text-[10px] text-[#008ECC]'>
            Trending:
          </p>
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <TrendingTag name='Shadow Box Svg' />
            <TrendingTag name='Laser cut' />
            <TrendingTag name='Sublimation' />
            <TrendingTag name='Free Svg' />
            <TrendingTag name='Papercut' />
          </div>
        </div>
        <div className='h-76 mt-20 w-screen px-4 lg:w-full'>
          <div className='flex w-full flex-col gap-4 lg:h-[300px] lg:flex-row'>
            <div className='group relative z-[10] h-[224px] w-full rounded-2xl border-[20px] border-[#61A9FA] transition-all duration-300 hover:border-[#2A3B80] lg:h-full lg:w-5/12'>
              <div className='absolute h-full w-full bg-[#61A9FA] transition-all duration-300 group-hover:bg-[#2A3B80]' />
              <img
                src={gridCrafter.src}
                className='absolute h-full w-full rounded-xl bg-cover object-cover'
                alt='Crafter'
              />
              <div className='absolute flex h-full w-full flex-col justify-between rounded-2xl  bg-opacity-15 p-4 text-left hover:bg-[#2A3B80]/50 hover:bg-opacity-35'>
                <p className='font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100'>
                  <span className='block font-semibold'>
                    Have you tried Drizy's designs in your projects?
                  </span>
                  Share your creations in our gallery and and earn a valuable
                  Drizy Coin for more shopping!
                </p>
                <div className='relative w-full overflow-hidden'>
                  <Link
                    href='/project'
                    className='absolute bottom-0 flex h-full w-full translate-y-full cursor-pointer items-center justify-between rounded-full bg-[#1A214C] pl-4 transition-all duration-300 ease-in-out group-hover:-translate-y-0'
                  >
                    <p className='text-2xl text-white'>Upload Your Project</p>
                    <div className='flex h-full w-16 items-center justify-center rounded-full bg-[#2A3B80]'>
                      <FiUpload className='h-8 w-8 stroke-[3px] text-white' />
                    </div>
                  </Link>
                  <div className='flex w-full items-center justify-between transition-all duration-300 ease-in-out group-hover:-translate-y-full'>
                    <p className='w-1/2 text-lg font-semibold lg:text-2xl'>
                      Projects from crafters
                    </p>
                    <div className='flex'>
                      <img
                        src={avatarExample.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex h-[310px] w-full flex-col gap-[20px] lg:mt-0 lg:h-full lg:w-4/12'>
              <div className='group relative h-1/2 overflow-hidden rounded-[24px] bg-[#61A9FA] transition-all duration-300 hover:bg-[#4065D1]'>
                {/* <div className='absolute flex h-full w-[140px]'>
                  <div className='z-10 h-full w-full translate-y-full rounded-3xl bg-[#2A3B80] transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:transform'></div>
                </div> */}
                <div className='absolute flex h-full w-full items-center justify-between'>
                  <div className='flex h-full w-[140px] flex-col items-center justify-center'>
                    <div className='h-full w-full rounded-3xl bg-[#4065D1] p-2 relative'>
                      <div className='relative z-20 flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#FFBB3C]'>
                        <img
                          src={starBadge.src}
                          alt='star badge'
                          className='transition-all duration-300 group-hover:scale-110'
                        />
                      </div>
                      <div className='transition-all absolute opacity-0 bottom-0 left-0 w-[140px] h-full scale-y-0 origin-[bottom_center] rounded-3xl bg-[#2A3B80] group-hover:transform group-hover:scale-y-100 group-hover:opacity-100' />
                    </div>
                  </div>
                  <div className='flex h-[120px] w-auto flex-col items-center justify-start overflow-hidden text-white'>
                    <div className='flex w-full  items-center justify-center pt-4 text-8xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                      14
                    </div>
                    <div className='flex w-full translate-y-1/2 items-center justify-center pt-4 text-8xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                      14
                    </div>
                  </div>
                  <div className='flex w-auto flex-col items-start justify-start pr-2 text-left text-white'>
                    <div className='flex h-[25px] w-full flex-col items-center justify-start overflow-hidden text-white'>
                      <div className='p flex w-full items-center justify-start text-2xl font-bold tracking-wide transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Exclusive
                      </div>
                      <div className='p flex w-full translate-y-1/2 items-center justify-start text-2xl font-bold tracking-wide text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Exclusive
                      </div>
                    </div>
                    <div className='flex h-[25px] w-full flex-col items-center justify-start overflow-hidden text-white'>
                      <div className='p flex w-full items-center justify-start text-2xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Partners
                      </div>
                      <div className='p flex w-full translate-y-1/2 items-center justify-start text-2xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Partners
                      </div>
                    </div>
                    <div className='relative mt-3 overflow-hidden py-0 transition-all group-hover:rounded-full group-hover:px-1'>
                      <div className='absolute inset-0 z-10 translate-y-full scale-0 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:-translate-y-1/4 group-hover:scale-150'></div>
                      <p className='relative z-20 text-[10pt] font-light group-hover:text-[#4065D1]'>
                        Find out more!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='group relative col-span-3 col-start-4 row-span-1 row-start-2 h-1/4 rounded-3xl bg-[#6f82a6] lg:h-1/2'>
                <div className='absolute flex h-full w-full flex-row items-center justify-center gap-2 p-3 text-white transition-all duration-300 lg:flex-col lg:items-start lg:gap-5 lg:px-5 lg:py-5 lg:group-hover:opacity-0'>
                  <div className='flex-grow text-start'>
                    <p className='text-base font-semibold lg:text-xl'>
                      The Craft Community
                    </p>
                    <p className='text-xs lg:text-sm'>
                      21,000+ friendly home crafters
                    </p>
                  </div>
                  <div className='lg:flex lg:w-full lg:items-center'>
                    <div className='hidden lg:flex'>
                      <img
                        src={avatarExample.src}
                        className='h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='-ml-4 h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='-ml-4 h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='-ml-4 h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                    </div>
                    <button
                      id='join-community'
                      aria-label='Request join community'
                      className='flex justify-center rounded-full bg-[#55668c] p-3 text-[10px] lg:ml-7 lg:px-3.5 lg:py-3 lg:text-xs'
                    >
                      Click here to request to join!
                    </button>
                  </div>
                </div>
                <div className='absolute hidden h-full w-full flex-col items-start justify-center gap-2 px-5 py-5 text-white opacity-0 transition-all duration-300 hover:opacity-100 group-hover:opacity-100 lg:flex'>
                  <p className='font-katide-light text-left text-xs font-light italic tracking-wide'>
                    Before anything, why not join the{' '}
                    <span className='font-katide-semibold'>
                      Drizy Studio community on Facebook
                    </span>
                    , a group of 21,000+ friendly home crafters who are all
                    there to help each other succeed & get free product updates
                  </p>
                  <button
                    id='join-community-2'
                    aria-label='Request Join Community'
                    className='flex justify-center self-center rounded-full bg-[#61A9FA] p-2 text-indigo-950 transition-all duration-500 hover:bg-indigo-950 hover:text-white'
                  >
                    Click here to request to join!
                  </button>
                </div>
              </div>
            </div>
            <div className='relative mt-8 h-full w-full rounded-2xl border-4 border-[#61A9FA] bg-white p-2 lg:mt-0 lg:w-3/12'>
              <Slider {...settings}>
                <div className='slide'>
                  <div className='!important flex h-full items-center justify-center'>
                    <img src={gridSlide.src} alt='slider' />
                  </div>
                </div>
                <div className='slide'>
                  <div className='!important flex h-full items-center justify-center'>
                    <img src={gridSlide.src} alt='slider' />
                  </div>
                </div>
                <div className='slide'>
                  <div className='!important flex h-full items-center justify-center'>
                    <img src={gridSlide.src} alt='slider' />
                  </div>
                </div>
              </Slider>
              <span className='relative z-[2] flex h-[54px] w-[257px] shrink-0 items-start justify-start self-stretch overflow-hidden text-left text-[16px] font-semibold leading-[17.6px] text-[#1a204c]'>
                Girl and Fox by The Forest
                <br />
                3D Shadow Box - Winter
                <br />
                SVG Paper Cut
              </span>
              <div className='mt-2 flex gap-2'>
                <button
                  id='buy'
                  aria-label='Buy product'
                  className='flex h-[37px] flex-grow items-center justify-center rounded-[8px] bg-[#2a3b80] px-16 py-4'
                >
                  <span className='font-katide-bold z-[5] text-[20px] leading-[16px] text-white'>
                    $1
                  </span>
                </button>
                <button
                  id='add-to-cart'
                  className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white pb-[12px] pl-[24px] pr-[24px] pt-[12px]'
                >
                  <img src={cartProduct.src} alt='cart'></img>
                </button>
              </div>
              <div className='absolute left-1 top-[-50px]'>
                <img src={sale.src} alt='sale' />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer
        bgColor='white'
        className='flex items-center justify-center bg-white py-9 text-base font-bold leading-4 text-white max-md:px-5'
      >
        <div className='flex w-full flex-col max-md:max-w-full'>
          <div className='font-katide-bold self-center whitespace-nowrap text-2xl text-indigo-950'>
            Browse Product Categories
          </div>
          <div className='mt-6 grid grid-cols-2 justify-between gap-3 md:grid-cols-3 lg:mt-12 lg:grid-cols-5'>
            {categoryData.map((data, index) => (
              <ProductCategories
                key={index.toString()}
                name={data.name}
                image={data.backgroundImage}
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
          <div className='flex flex-wrap justify-center gap-[42px]'>
            {seasonCategoryData?.map((data, index) => (
              <SeasonCategories
                name={data.name}
                key={index}
                image={data.image}
              />
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#AAD3FF' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Crafters
            </div>
            <Link
              href='/catalog-crafter'
              className='hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] lg:flex'
            >
              <div>Explore Crafters</div>
              <FaAngleRight />
            </Link>
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              more='/catalog-crafter'
              items={homeProduct.crafterData}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <div className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#E1E3F4' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Best Seller
            </div>
            {/* <div className='lg:flex hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1]'>
              <div>Explore Crafters</div>
              <FaAngleRight />
            </div> */}
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              items={homeProduct.bestSellerData}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <div className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#AAD3FF' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Bundles
            </div>
            <Link
              href='/catalog-bundles'
              className='hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] lg:flex'
            >
              <div>Explore Bundles SVG</div>
              <FaAngleRight />
            </Link>
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              more='/catalog-bundles'
              items={homeProduct.bundleData}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <div className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#FFBB3C' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Exclusive Partner
            </div>
            <div className='hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] lg:flex'>
              <div>Explore Crative Contributors SVG</div>
              <FaAngleRight />
            </div>
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              items={homeProduct.exclusiveData}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <div className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='white' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Vector
            </div>
            <Link
              href='/catalog-vector'
              className='hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] lg:flex'
            >
              <div>Explore Vector</div>
              <FaAngleRight />
            </Link>
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              more='/catalog-vector'
              items={homeProduct.vectorData}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <div className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </div>
        </div>
      </SectionContainer>

      <Testimonies />

      <section>
        <div className='header flex items-center justify-center bg-blue-400 px-16 py-12 max-md:px-5'>
          <div className='mt-6 flex w-[708px] max-w-full flex-col'>
            <p className='line-[20px] self-center text-center text-base text-indigo-950 max-md:max-w-[270px]'>
              <span className=''>Get </span>
              <span className={`font-bold text-indigo-950 ${myFont.className}`}>
                10% off
              </span>
              <span className=''> your order and abundle of </span>
              <span className={`font-bold text-indigo-950 ${myFont.className}`}>
                INSTANT FREEBIES!
              </span>
            </p>
            <div className='mt-7 flex w-full justify-between gap-0 whitespace-nowrap text-sm'>
              <input
                name='email'
                type='email'
                placeholder='Subscribe by email'
                className='grow items-start justify-center rounded-[60px_0px_0px_60px] bg-violet-100 px-16 py-2 leading-[186%] tracking-normal text-black max-md:px-5 lg:px-16 lg:py-7 placeholder:text-[#BDBDBD]'
              ></input>
              <button
                className='button font-katide-bold justify-center rounded-[0px_60px_60px_0px] bg-indigo-950 px-16 py-[22px] lg:py-7 text-center font-[14px] text-[#EBECF5] hover:bg-[#2A3B80] max-md:px-5'
                role='button'
                id='subscribe'
                aria-label='Subscribe'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <AffiliateBanner />
      <div className='fixed bottom-4 z-20 hidden w-full items-end justify-center lg:flex'>
        <div className='flex justify-end'>
          <Image src={coffeeFloating.src} alt='Help' width={75} height={75} />
        </div>
        <div className='flex items-center gap-16 rounded-lg border-2 border-[#FFDE9F] bg-[#EE4C73] px-8 py-4 font-semibold shadow-xl'>
          <p className='text-white'>
            Upgrade your membership{' '}
            <span className='text-[#FFBB3C]'>for unlimited downloads</span>
          </p>
          <div className='flex rounded-lg border-2 border-[#FFDE9F] bg-[#FFBB3C] px-4 py-2 shadow-lg'>
            DRIZY VIP<span className='font-base'>+</span>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0">
        <div className='-mb-8 max-w-[200px]'>
          <CustomerSupportLottie />
        </div>
      </div>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </main>
  );
}
