/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import * as React from 'react';
import { FiUpload } from 'react-icons/fi';
import Slider, { CustomArrowProps } from 'react-slick';

import { useAppDispatch, useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import SectionContainer from '@/components/container/sectionContainer';
import ProductCategories from '@/components/ProductCategories';
import SeasonCategories from '@/components/SeasonCategories';
import ProductSlider from '@/components/slider/ProductSlider';
import TrendingTag from '@/components/tag/TrendingTag';
import Testimonies from '@/components/testimonies';

import {
  avatarExample,
  cartProduct,
  categories1,
  categories2,
  categories3,
  categories4,
  categories5,
  categories6,
  categories7,
  categories8,
  categories9,
  categories10,
  coffeeFloating,
  crafterItem1,
  gridCrafter,
  gridSlide,
  helpFloating,
  sale,
  search,
  seasonCategory,
  starBadge,
} from '~/images';

export default function HomePage() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-prev'
      style={{ left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &lt;
    </div>
  );

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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
  };
  const categoryData = [
    { name: 'Free SVGs 1', image: categories1 },
    { name: 'Shadow Box SVG', image: categories2 },
    { name: 'Cricut SVG', image: categories3 },
    { name: 'SVG Cut File', image: categories4 },
    { name: 'Monogram Designs', image: categories5 },
    { name: 'Sticker SVG', image: categories6 },
    { name: 'Printable Craft', image: categories7 },
    { name: 'Card Making', image: categories8 },
    { name: 'Tshirt Design', image: categories9 },
    { name: 'Papercut Template', image: categories10 },
  ];

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
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
  ];

  return (
    <main>
      <SectionContainer
        bgColor='#C2E5FF'
        className='flex flex-col items-center justify-center pb-10 pt-[67px] text-center'
      >
        <div className='font-katide-heavy mb-16 text-[64px] leading-[120%] text-indigo-950'>
          <p>Combating Loneliness</p>
          <p>with Creative Projects</p>
        </div>
        <div className='group mb-4 flex h-[60px] w-[480px] items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 bg-[#F1F2FB] p-4 pl-6 text-left text-sm font-normal leading-4 tracking-tighter text-[#6F6F6F]'>
          <input
            placeholder='Search for unique craft designs, categories, occasions...'
            className='flex-grow truncate border-none bg-[#F1F2FB] text-sm outline-none focus:outline-none'
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
        <div className='flex items-center gap-2'>
          <p className='font-katide-bold text-[10px] text-[#008ECC]'>
            Trending:
          </p>
          <TrendingTag name='Shadow Box Svg' />
          <TrendingTag name='Cricut SVG' />
          <TrendingTag name='Sublimation' />
          <TrendingTag name='Free Svg' />
          <TrendingTag name='Papercut' />
        </div>
        <div className='h-76 mt-20 w-full'>
          <div className='flex h-[300px] w-full gap-4'>
            <div className='relative z-[10] h-full w-5/12 rounded-2xl border-[20px] border-[#61A9FA] transition-all duration-300 hover:border-[#2A3B80]'>
              <img
                src={gridCrafter.src}
                className='absolute h-full w-full bg-cover'
                alt='Crafter'
              />
              <div className='bg-opacity-15 hover:bg-opacity-35 group absolute flex h-full w-full flex-col justify-between bg-blue-500/25 p-4 text-left hover:bg-[#2A3B80]/50 '>
                <p className='font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100'>
                  <span className='block font-semibold'>
                    Have you tried Drizy's designs in your projects?
                  </span>
                  Share your creations in our gallery and and earn a valuable
                  Drizy Coin for more shopping!
                </p>
                <div className='relative w-full overflow-hidden'>
                  <div className='absolute bottom-0 flex h-full w-full translate-y-full items-center justify-between rounded-full bg-[#1A214C] pl-4 transition-all duration-300 ease-in-out group-hover:-translate-y-0'>
                    <p className='text-2xl text-white'>Upload Your Project</p>
                    <div className='flex h-full w-16 items-center justify-center rounded-full bg-[#2A3B80]'>
                      <FiUpload className='h-8 w-8 stroke-[3px] text-white' />
                    </div>
                  </div>
                  <div className='flex w-full items-center justify-between transition-all duration-300 ease-in-out group-hover:-translate-y-full'>
                    <p className='w-1/2 text-2xl font-semibold'>
                      Project from crafters
                    </p>
                    <div className='flex'>
                      <img
                        src={avatarExample.src}
                        className='-ml-6 rounded-full border-[3px] border-white'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='-ml-6 rounded-full border-[3px] border-white'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='-ml-6 rounded-full border-[3px] border-white'
                        alt='avatar'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-4/12 flex-col gap-4'>
              <div className='group relative h-1/2 overflow-hidden rounded-2xl bg-[#61A9FA] transition-all duration-300 hover:bg-[#4065D1]'>
                <div className='absolute flex h-full w-full'>
                  <div className='z-10 h-full w-1/3 translate-y-full rounded-2xl bg-[#2A3B80] transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:transform'></div>
                </div>
                <div className='absolute flex h-full w-full items-center'>
                  <div className='flex h-full w-1/3 flex-col items-center justify-center'>
                    <div className='h-full w-full rounded-2xl bg-[#4065D1] p-2'>
                      <div className='relative z-20 flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#FFBB3C]'>
                        <img
                          src={starBadge.src}
                          alt='star badge'
                          className='transition-all duration-300 group-hover:scale-110'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex h-[110px] w-1/3 flex-col items-center justify-start overflow-hidden text-white'>
                    <div className='flex w-full  items-center justify-center pt-4 text-8xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                      15
                    </div>
                    <div className='flex w-full translate-y-1/2 items-center justify-center pt-4 text-8xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                      15
                    </div>
                  </div>
                  <div className='flex w-1/3 flex-col items-start justify-start text-left text-white'>
                    <div className='flex h-[25px] w-full flex-col items-center justify-start overflow-hidden text-white'>
                      <div className='p flex w-full items-center justify-start text-xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Exclusive
                      </div>
                      <div className='p flex w-full translate-y-1/2 items-center justify-start text-xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Exclusive
                      </div>
                    </div>
                    <div className='flex h-[25px] w-full flex-col items-center justify-start overflow-hidden text-white'>
                      <div className='p flex w-full items-center justify-start text-xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Partners
                      </div>
                      <div className='p flex w-full translate-y-1/2 items-center justify-start text-xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Partners
                      </div>
                    </div>
                    <div className='relative mt-4 overflow-hidden rounded-full p-1'>
                      <div className='absolute inset-0 z-10 translate-y-full scale-0 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:-translate-y-1/4 group-hover:scale-150'></div>
                      <p className='relative z-20 text-sm font-light group-hover:text-[#4065D1]'>
                        Find out more!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='group relative col-span-3 col-start-4 row-span-1 row-start-2  h-1/2 rounded-2xl bg-[#6f82a6]'>
                <div className='absolute flex h-full w-full flex-col items-start justify-center gap-2 px-8 py-4 text-white transition-all duration-300 group-hover:opacity-0'>
                  <p className='text-xl font-semibold'>The Craft Community</p>
                  <p className='text-sm'>21,000+ friendly home crafters</p>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex'>
                      <img
                        src={avatarExample.src}
                        className='ml-[-8px] h-[36px] rounded-full border-[3px] border-white'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='ml-[-8px] h-[36px] rounded-full border-[3px] border-white'
                        alt='avatar'
                      />
                      <img
                        src={avatarExample.src}
                        className='ml-[-8px] h-[36px] rounded-full border-[3px] border-white'
                        alt='avatar'
                      />
                    </div>
                    <div>
                      <button className='flex justify-center rounded-full bg-[#55668c] p-2'>
                        Click here to request to join!
                      </button>
                    </div>
                  </div>
                </div>
                <div className='absolute flex h-full w-full flex-col items-start justify-center gap-2 px-8 py-4 text-white opacity-0 transition-all duration-300 group-hover:opacity-100'>
                  <p className='text-left text-xs'>
                    Before anything, why not join the{' '}
                    <span className='font-semibold'>
                      Drizy Studio community on Facebook
                    </span>
                    , a group of 21,000+ friendly home crafters who are all
                    there to help each other succeed & get free product updates
                  </p>
                  <button className='flex justify-center self-center rounded-full bg-[#55668c] p-2 transition-all duration-500 group-hover:bg-[#61A9FA]'>
                    Click here to request to join!
                  </button>
                </div>
              </div>
            </div>
            <div className='relative col-span-2 col-start-7 row-span-2 row-start-1 h-full w-3/12 rounded-2xl border-4 border-[#61A9FA] bg-white p-2'>
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
                <button className='flex h-[37px] flex-grow items-center justify-center rounded-[8px] bg-[#2a3b80] px-16 py-4'>
                  <span className='font-katide-bold z-[5] text-[20px] leading-[16px] text-white'>
                    $1
                  </span>
                </button>
                <button className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white pb-[12px] pl-[24px] pr-[24px] pt-[12px]'>
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
          <div className='mt-12 flex flex-wrap justify-between'>
            {categoryData.map((data, index) => (
              <div key={index} className='flex p-2 sm:w-1/2 md:w-1/3 lg:w-1/5'>
                <ProductCategories name={data.name} image={data.image} />
              </div>
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
          <div className='flex justify-center'>
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
          <div className='flex justify-between max-md:max-w-full max-md:flex-wrap'>
            <div className='font-katide-bold mb-8 mt-16 text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Crafters
            </div>
            <div className='flex items-center justify-end pl-5'>
              <div className='mt-12 text-right text-base font-bold leading-none text-indigo-950'>
                Explore Crafters
              </div>
            </div>
          </div>
          <div className='h-[400px]'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#E1E3F4' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between max-md:max-w-full max-md:flex-wrap'>
            <div className='font-katide-bold mb-8 mt-16 text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Best Seller
            </div>
          </div>
          <div className='h-[400px]'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#AAD3FF' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between max-md:max-w-full max-md:flex-wrap'>
            <div className='font-katide-bold mb-8 mt-16 text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Bundles
            </div>
            {/* <div className="pl-5 justify-end items-center flex">
              <div className="text-right text-indigo-950 text-base font-bold mx-16 mt-12 leading-none">
                Explore Bundles
              </div>
              <img
                loading='lazy'
                src=''
                className='aspect-[0.43] w-1.5 self-start fill-blue-600'
              />
            </div> */}
          </div>
          <div className='h-[400px]'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='#FFBB3C' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between pr-[138px] max-md:max-w-full max-md:flex-wrap'>
            <div className='font-katide-bold mb-8 mt-16 text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Exclusive Partners
            </div>
            {/* <div className="pl-5 justify-end items-center flex">
              <div className="text-right text-indigo-950 text-base font-bold mx-16 mt-12 leading-none">
                Explore
              </div>
              <img
                loading='lazy'
                src=''
                className='aspect-[0.43] w-1.5 self-start fill-blue-600'
              />
            </div> */}
          </div>
          <div className='h-[400px]'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer bgColor='white' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between pr-[138px] max-md:max-w-full max-md:flex-wrap'>
            <div className='font-katide-bold mb-8 mt-16 text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Vector
            </div>
            {/* <div className="pl-5 justify-end items-center flex">
              <div className="text-right text-indigo-950 text-base font-bold mx-16 mt-12 leading-none">
                Explore
              </div>
              <img
                loading='lazy'
                src=''
                className='aspect-[0.43] w-1.5 self-start fill-blue-600'
              />
            </div> */}
          </div>
          <div className='h-[400px]'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </SectionContainer>

      <Testimonies />

      <section>
        <div className='header flex items-center justify-center bg-blue-400 px-16 py-12 max-md:px-5'>
          <div className='mt-6 flex w-[708px] max-w-full flex-col'>
            <p className='line-[20px] self-center text-center text-base text-indigo-950 max-md:max-w-full'>
              <span className=''>Get </span>
              <span className='font-bold text-indigo-950'>10% off</span>
              <span className=''> your order and abundle of </span>
              <span className='font-bold'>INSTANT FREEBIES! </span>
            </p>
            <div className='mt-7 flex justify-between gap-0 whitespace-nowrap text-sm max-md:max-w-full max-md:flex-wrap'>
              <input
                type='email'
                placeholder='Subscribe by email'
                className='max-md:max-w- grow items-start justify-center rounded-[60px_0px_0px_60px] bg-violet-100 px-16 py-7 leading-[186%] tracking-normal text-black max-md:px-5'
              ></input>
              <button
                className='button font-katide-bold justify-center rounded-[0px_60px_60px_0px] bg-indigo-950 px-16 py-7 text-center font-[14px] text-white hover:bg-[#2A3B80] max-md:px-5'
                role='button'
                aria-label='Subscribe'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <AffiliateBanner />
      <div className='fixed bottom-4 z-20 flex h-[155px] w-full items-end justify-between'>
        <div className='flex w-1/4 justify-end'>
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
        <div className='flex w-1/4 justify-end'>
          <Image src={helpFloating.src} alt='Help' width={150} height={155} />
        </div>
      </div>
    </main>
  );
}
