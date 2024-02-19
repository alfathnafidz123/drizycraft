/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';

import { avatarExample, testimony } from '~/images';

const Testimonies = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <></>,
    nextArrow: <></>,
    autoplay: true,
    fade: true,
  };
  return (
    <div className='flex flex-col items-center bg-slate-200 px-12 pb-6 pt-12 max-md:px-5'>
      <div className='mt-3 w-full max-w-[1132px] max-md:max-w-full'>
        <div className='max-md: flex gap-5 max-md:flex-col max-md:gap-0'>
          <div className='flex w-[37%] flex-col max-md:ml-0 max-md:w-full'>
            <Slider {...settings}>
              <div className='slide p-12'>
                <div className='!important flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex flex-col items-start p-8'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      I've worked with Faqih at Drizy Studio for a couple of
                      years. I've always found the team to be very professional
                      and hard working. Their speed of work is impressive and
                      the way Faqih project manages his team is super organised.
                      I love their 'Can do' attitude and ability to go above and
                      beyond.
                    </p>
                  </div>
                  <div className='flex w-full justify-start gap-4 bg-[#EBECF5] p-8'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-semibold'>Andy Coft</p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide p-12'>
                <div className='!important flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex flex-col items-start p-8'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love the designs. I was impressed how easily my Joy was
                      able to cut such intricate designs.
                    </p>
                  </div>
                  <div className='flex w-full justify-start gap-4 bg-[#EBECF5] p-8'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-semibold'>
                        Leslie Roberts O'Brien
                      </p>
                      <p className='text-[#4065D1]'>Custom Crafty Seller</p>
                    </div>
                  </div>
                </div>
              </div>{' '}
              <div className='slide p-12'>
                <div className='!important flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex flex-col items-start p-8'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      I do love your products and already have your website
                      bookmarked and have downloaded quite a few designs from
                      there.
                    </p>
                  </div>
                  <div className='flex w-full justify-start gap-4 bg-[#EBECF5] p-8'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-semibold'>Nad Haw</p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>{' '}
              <div className='slide p-12'>
                <div className='!important flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex flex-col items-start p-8'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love this group! Helpful with answers. Lots of free
                      goodies. Small membership price if you want. Lots of
                      crafting ideas. I love the shadow box designs. Thank you
                      Drizy Studio ❤ ❤
                    </p>
                  </div>
                  <div className='flex w-full justify-start gap-4 bg-[#EBECF5] p-8'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-semibold'>Pam Hudson</p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>{' '}
            </Slider>
          </div>

          <div className='ml-5 flex w-[63%] flex-col max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col text-sm max-md:mt-10 max-md:max-w-full'>
              <div className='ml-5 self-start whitespace-nowrap text-2xl font-bold leading-6 text-indigo-950 max-md:ml-2.5'>
                Let’s Crafting!
              </div>
              <div className='mt-24 flex justify-between gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/72c0d69b1a1ea58d2bfb3f5584a82fb267aee74e6b3e432903f0cf15c36113e4?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
                  className='aspect-square w-20'
                />
                <div className='my-auto flex flex-1 flex-col max-md:max-w-full'>
                  <div className='font-bold leading-[200%] text-indigo-950 max-md:max-w-full'>
                    <span className='text-blue-600'>ENDLESS</span> Options
                    Available on DrizyCraft.com
                  </div>
                  <div className='mt-5 leading-5 text-black max-md:max-w-full'>
                    Everything you can imagine! Instantly access our vast
                    collection of top-quality designs.
                  </div>
                </div>
              </div>
              <div className='mt-16 flex justify-between gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/7449bb1f01d7c251b758fa5463c6897d7ca1fc4f90812b6484b3448673ff6298?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
                  className='my-auto aspect-square w-20'
                />
                <div className='flex flex-1 flex-col max-md:max-w-full'>
                  <div className='font-bold leading-[200%] text-indigo-950 max-md:max-w-full'>
                    <span className='text-blue-600'>EXPANDING</span> Gallery of
                    Designs
                  </div>
                  <div className='mt-5 leading-5 text-black max-md:max-w-full'>
                    Every month, we introduce more than 1,000 fresh and
                    exclusive designs to our collection. Trust our expert
                    graphic designers to enhance your craft projects!
                  </div>
                </div>
              </div>
              <div className='ml-24 mt-20 self-start font-bold leading-[200%] text-indigo-950 max-md:ml-2.5 max-md:mt-10'>
                <span className='text-blue-600'>OPTIMIZED SVG</span> for All
                Machines
              </div>
              <div className='mt-1.5 flex items-start justify-between gap-5 leading-5 text-black max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/d0a2ba3a4c14ea7b9f7fd661c3199cd2924d4e031a637a79e9f45770ff4a3d6c?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
                  className='-ml-0.5 aspect-square w-[242px]'
                />
                <div className='-ml-0.5 mt-4 flex-auto max-md:max-w-full'>
                  Do you own a Cricut, Silhouette Cameo, Siser Juliet, StarCraft
                  SOLO, Brother ScanNCut, Glowforge, or any other cutting
                  machine? Rest assured, our SVG files can be easily used on any
                  cutting machine, allowing you to enjoy a precise and
                  effortless crafting.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-28 whitespace-nowrap text-2xl font-bold leading-7 text-indigo-950 max-md:mt-10'>
        Have Collaborated with :
      </div>
      <div className='mt-12 flex justify-between gap-5 self-stretch py-1.5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap'>
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/1dce949942e557f623fd45acdb6082e624797c969e62233ef120978ed4b0ac68?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='my-auto aspect-[3.85] w-[121px] max-w-full'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/62ec307ff7cf3abcd5102b75826fd1cfbf4a572ec1128e8c6fa89b1c428fe334?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='my-auto aspect-[5.56] w-[185px] max-w-full'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/6a032e8588424040bb11a0a30b987adce0c1b8a54f57a9d33b9d8e551273f279?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='aspect-[3.13] w-[136px] max-w-full'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/9b7d73218459d2572bc2ba335713a97b3a4d7b6e3b2013aaf2a03af9f661441b?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='mt-3 aspect-[5.56] w-[170px] max-w-full self-start'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/61aed1ca74ecf26835398d917e4c2574df9d08a73309e76278bb3beb803206b0?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='aspect-[2] w-[86px]'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/3d39e41479ce3beebc90ec2b609ae5dccc384c91e76b6577c833e0842913787c?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='aspect-[2.38] w-[102px] max-w-full'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/25f5db79e1911c9c39ef1deba804b2534362328c0dd567ee33aa68fd6d20d32f?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='mt-2.5 aspect-[5.26] w-[165px] max-w-full self-start'
        />
        <img
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/4a6541f609206487beb83c123bd080d83bb816a37b845580800a699326173c91?apiKey=d2d02d5b3a9b4363ada1dddd3bf990fa&'
          className='aspect-[3.13] w-[133px] max-w-full'
        />
      </div>
    </div>
  );
};

export default Testimonies;
