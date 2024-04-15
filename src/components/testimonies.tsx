/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';

import SectionContainer from '@/components/container/sectionContainer';

import {
  AO,
  avatarExample,
  canva,
  creativeFabrica,
  designBundles,
  elegco,
  endlessCrafting,
  expandingCrafting,
  freepik,
  goDaddy,
  jiffy,
  optimizedSVG,
  samsung,
  testimony,
  wordBank,
} from '~/images';

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
    <SectionContainer
      bgColor='#E1E3F4'
      className='flex flex-col items-center pb-6 pt-12 max-md:px-5'
    >
      <div className='mt-3 w-full'>
        <div className='font-katide-bold flex justify-center text-[24px] leading-6 text-indigo-950'>
          Let’s Crafting!
        </div>
        <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
          <div className='flex w-4/12 flex-col pt-14'>
            <Slider {...settings}>
              <div className='slide pb-4 pr-4'>
                <div className='!important flex h-[430px] w-[375px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
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
                  <div className='flex h-[104px] w-full justify-start gap-4 bg-[#EBECF5] p-6'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Andy Coft
                      </p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide pb-4 pr-4'>
                <div className='!important flex h-[430px] w-[375px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love the designs. I was impressed how easily my Joy was
                      able to cut such intricate designs.
                    </p>
                  </div>
                  <div className='flex h-[104px] w-full justify-start gap-4 bg-[#EBECF5] p-6'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Leslie Roberts O'Brien
                      </p>
                      <p className='text-[#4065D1]'>Custom Crafty Seller</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide pb-4 pr-4'>
                <div className='!important flex h-[430px] w-[375px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      I do love your products and already have your website
                      bookmarked and have downloaded quite a few designs from
                      there.
                    </p>
                  </div>
                  <div className='flex h-[104px] w-full justify-start gap-4 bg-[#EBECF5] p-6'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Nad Haw
                      </p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide pb-4 pr-4'>
                <div className='!important flex h-[430px] w-[375px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love this group! Helpful with answers. Lots of free
                      goodies. Small membership price if you want. Lots of
                      crafting ideas. I love the shadow box designs. Thank you
                      Drizy Studio ❤ ❤
                    </p>
                  </div>
                  <div className='flex h-[104px] w-full justify-start gap-4 bg-[#EBECF5] p-6'>
                    <img
                      src={avatarExample.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Pam Hudson
                      </p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>

          <div className='ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col text-sm max-md:mt-10 max-md:max-w-full'>
              <div className='mt-24 flex justify-between gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src={endlessCrafting.src}
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
                  src={expandingCrafting.src}
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
                  src={optimizedSVG.src}
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
      <div className='mt-10 flex justify-between gap-5 py-1.5'>
        <img loading='lazy' src={elegco.src} className='' />
        <img loading='lazy' src={wordBank.src} className='' />
        <img loading='lazy' src={samsung.src} className='' />
        <img loading='lazy' src={designBundles.src} className='' />
        <img loading='lazy' src={canva.src} className='' />
        <img loading='lazy' src={creativeFabrica.src} className='' />
        <img loading='lazy' src={freepik.src} className='' />
        <img loading='lazy' src={goDaddy.src} className='' />
        <img loading='lazy' src={AO.src} className='' />
        <img loading='lazy' src={jiffy.src} className='' />
      </div>
    </SectionContainer>
  );
};

export default Testimonies;
