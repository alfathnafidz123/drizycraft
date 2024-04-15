/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import Slider, { CustomArrowProps } from 'react-slick';

import { useAppDispatch, useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
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
  crafterItem1,
  gridCrafter,
  gridSlide,
  sale,
  search,
  seasonCategory,
  starBadge,
} from '~/images';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

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
    infinite: false,
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
    { name: 'crafterItem1', image: crafterItem1, price: 5 },
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
  ];

  return (
    <main>
      <section className='flex flex-col items-center justify-center bg-sky-200 pb-10 pt-[67px] text-center'>
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
          <TrendingTag name='Laser cut' />
          <TrendingTag name='Sublimation' />
          <TrendingTag name='Free Svg' />
          <TrendingTag name='Papercut' />
        </div>
        <div className='h-76 mt-20 w-full px-40'>
          <div className='flex h-[40vh] w-full gap-4'>
            <div className='bg-div1 relative z-[10] h-full w-6/12 rounded-2xl border-8 border-[#61A9FA] transition-all duration-300 hover:border-white'>
              <img
                src={gridCrafter.src}
                className='absolute h-full w-full rounded-lg bg-cover'
                alt='Crafter'
              />
              <div className='bg-opacity-15 hover:bg-opacity-35 group absolute flex h-full w-full flex-col justify-between bg-blue-500/25 p-4 text-left hover:bg-white/50 '>
                <p className='font-medium opacity-0 transition-all duration-300 group-hover:opacity-100'>
                  <span className='block font-semibold'>
                    Have you tried Drizy's designs in your projects?
                  </span>
                  Share your creations in our gallery and and earn a valuable
                  Drizy Coin for more shopping!
                </p>
                <div className='flex w-9/12 items-center justify-between'>
                  <p className='w-1/3 font-semibold'>Project from crafters</p>
                  <div className='flex'>
                    <img
                      src={avatarExample.src}
                      className='ml-[-8px] rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <img
                      src={avatarExample.src}
                      className='ml-[-8px] rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <img
                      src={avatarExample.src}
                      className='ml-[-8px] rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-3/12 flex-col gap-4'>
              <div className='group relative h-1/2 overflow-hidden rounded-2xl bg-[#61A9FA] transition-all duration-300 hover:bg-[#4065D1]'>
                <div className='absolute flex h-full w-full'>
                  <div className='h-full w-1/2 bg-[#4065D1] transition-transform duration-300 ease-in-out group-hover:translate-x-full group-hover:transform group-hover:bg-[#2A3B80]'></div>
                </div>
                <div className='absolute flex h-full w-full'>
                  <div className='flex w-1/2 flex-col items-center justify-center p-2'>
                    <div className='flex h-full w-full items-center justify-center rounded-2xl border border-[#FFBB3C] group-hover:border-[#FFBB3C]/[0]'>
                      <img
                        src={starBadge.src}
                        alt='star badge'
                        className='transition-all duration-300 group-hover:scale-110'
                      />
                    </div>
                  </div>
                  <div className='flex w-1/2 flex-col items-center justify-center gap-1 text-white'>
                    <p className='text-2xl font-bold'>15</p>
                    <p className='text-md'>Exclusive Partners</p>
                    <p className='text-sm font-light'>Find out more!</p>
                  </div>
                </div>
              </div>
              <div className='group relative col-span-3 col-start-4 row-span-1 row-start-2 ml-[-14vh] h-1/2 rounded-2xl bg-[#6f82a6]'>
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
      </section>

      <section className='flex items-center justify-center bg-white py-9 text-base font-bold leading-4 text-white max-md:px-5'>
        <div className='flex w-full max-w-[1400px] flex-col max-md:max-w-full'>
          <div className='font-katide-bold self-center whitespace-nowrap text-2xl text-indigo-950'>
            Browse Product Categories
          </div>
          <div className='mt-12 flex flex-wrap pl-[8%]'>
            {categoryData.map((data, index) => (
              <div
                key={index}
                className='w-full sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%]'
              >
                <ProductCategories name={data.name} image={data.image} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='flex items-center justify-center bg-[#E1E3F4] py-9 text-base font-bold leading-4 text-white'>
        <div className='flex w-full max-w-[1400px] flex-col max-md:max-w-full'>
          <div className='font-katide-bold self-center whitespace-nowrap text-2xl text-indigo-950'>
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
      </section>

      <section>
        <div className='flex flex-col bg-[#AAD3FF] pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between px-20 max-md:max-w-full max-md:flex-wrap '>
            <div className='font-katide-bold mt-[4%] text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Crafters
            </div>
            <div className='flex items-center justify-end pl-5'>
              <div className='mx-16 mt-12 text-right text-base font-bold leading-none text-indigo-950'>
                Explore Crafters
              </div>
            </div>
          </div>
          <div className='ml-10'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </section>

      <section>
        <div className='flex flex-col bg-[#E1E3F4] pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between px-20 max-md:max-w-full max-md:flex-wrap'>
            <div className='font-katide-bold mt-[4%] text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
              Best Seller
            </div>
          </div>
          <div className='ml-10'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </section>

      <section>
        <div className='flex flex-col bg-[#AAD3FF] pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between px-20 max-md:max-w-full max-md:flex-wrap '>
            <div className='font-katide-bold mt-[4%] text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
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
          <div className='ml-10'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </section>

      <section>
        <div className='flex flex-col bg-[#FFBB3C] pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between px-20 max-md:max-w-full max-md:flex-wrap '>
            <div className='font-katide-bold mt-[4%] text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
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
          <div className='ml-10'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </section>

      <section>
        <div className='flex flex-col bg-[#fff] pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex justify-between px-20 max-md:max-w-full max-md:flex-wrap '>
            <div className='font-katide-bold mt-[4%] text-[24px] leading-10 text-indigo-950 max-md:mt-10'>
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
          <div className='ml-10'>
            <ProductSlider items={crafterSlider} />
          </div>
        </div>
      </section>

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
    </main>
  );
}
