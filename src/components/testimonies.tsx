/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';

import SectionContainer from '@/components/container/sectionContainer';

import {
  andy,
  AO,
  bonnie,
  canva,
  creativeFabrica,
  designBundles,
  elegco,
  endlessCrafting,
  expandingCrafting,
  freepik,
  goDaddy,
  jiffy,
  leslie,
  michelle,
  nad,
  optimizedSVG,
  pam,
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
      parentClassName='max-md bg-white lg:bg-[#E1E3F4]'
      className='flex flex-col items-center pb-6'
    >
      <div className='mt-3 w-full bg-[#E1E3F4] max-md:pb-10 max-md:px-5'>
        <div className='font-katide-bold flex justify-center text-[24px] leading-6 text-indigo-950 mt-12'>
          Let’s Crafting!
        </div>
        <div className='mt-24 flex flex-col-reverse gap-5 lg:flex-row lg:px-1 xl:p-0'>
          <div className='flex w-full flex-col lg:w-5/12 xl:w-4/12'>
            <Slider {...settings}>
              <div className='slide pb-4 lg:pr-4'>
                <div className='!important flex h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg lg:w-[375px]'>
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
                  <div className='flex w-full items-center justify-start gap-4 bg-[#EBECF5] p-3 lg:p-6'>
                    <img
                      src={andy.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Andy Coft
                      </p>
                      <p className='text-[#4065D1]'>(Co-Founder of Design Bundles)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide pb-4 lg:pr-4'>
                <div className='!important flex h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg lg:w-[375px]'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love the designs. I was impressed how easily my Joy was
                      able to cut such intricate designs.
                    </p>
                  </div>
                  <div className='flex w-full items-center justify-start gap-4 bg-[#EBECF5] p-3 lg:p-6'>
                    <img
                      src={leslie.src}
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
              <div className='slide pb-4 lg:pr-4'>
                <div className='!important flex h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg lg:w-[375px]'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      I do love your products and already have your website
                      bookmarked and have downloaded quite a few designs from
                      there.
                    </p>
                  </div>
                  <div className='flex w-full items-center justify-start gap-4 bg-[#EBECF5] p-3 lg:p-6'>
                    <img
                      src={nad.src}
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
              <div className='slide pb-4 lg:pr-4'>
                <div className='!important flex h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg lg:w-[375px]'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love this group! Helpful with answers. Lots of free
                      goodies. Small membership price if you want. Lots of
                      crafting ideas. I love the shadow box designs. Thank you
                      Drizy Studio ❤ ❤
                    </p>
                  </div>
                  <div className='flex w-full items-center justify-start gap-4 bg-[#EBECF5] p-3 lg:p-6'>
                    <img
                      src={pam.src}
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
              <div className='slide pb-4 lg:pr-4'>
                <div className='!important flex h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg lg:w-[375px]'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      Love Drizy Studio!! Fantastic selection of SVG's that cut beautifully! I recommend to anyone looking for easily accessible designs that download easily. I have learned so much from being in the group. Also lots of informative and creative people willing to help out.
                    </p>
                  </div>
                  <div className='flex w-full items-center justify-start gap-4 bg-[#EBECF5] p-3 lg:p-6'>
                    <img
                      src={bonnie.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Bonnie Cross
                      </p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide pb-4 lg:pr-4'>
                <div className='!important flex h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg lg:w-[375px]'>
                  <div className='flex h-full flex-col items-start p-8 text-[14px]'>
                    <img src={testimony.src} alt='Quote' className='mb-8' />
                    <p>
                      I fell in love Drizy Studio’s designs and have used them to create some amazing gifts for family, friends, and teachers. Being able to see other artist's work showcased makes me happy. Drizy Studio goes the extra mile to help bring attention to other artists they themselves admire.
                    </p>
                  </div>
                  <div className='flex w-full items-center justify-start gap-4 bg-[#EBECF5] p-3 lg:p-6'>
                    <img
                      src={michelle.src}
                      className='rounded-full border-[3px] border-white'
                      alt='avatar'
                    />
                    <div className='flex flex-col'>
                      <p className='text-grey-200 font-katide-bold text-[16px]'>
                        Michelle Lucero
                      </p>
                      <p className='text-[#4065D1]'>Crafter</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>

          <div className='ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col gap-[55px] text-sm max-md:max-w-full'>
              <div className='flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src={endlessCrafting.src}
                  className='aspect-square w-20'
                  alt='endless'
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
              <div className='flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src={expandingCrafting.src}
                  className='my-auto aspect-square w-20'
                  alt='expanding'
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
              <div className='flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap'>
                <img
                  loading='lazy'
                  src={optimizedSVG.src}
                  className='my-auto aspect-square w-20'
                  alt='optimized'
                />
                <div className='flex flex-1 flex-col max-md:max-w-full'>
                  <div className='font-bold leading-[200%] text-indigo-950 max-md:max-w-full'>
                    <span className='text-blue-600'>OPTIMIZED SVG</span> for All
                    Machines
                  </div>
                  <div className='mt-5 leading-5 text-black max-md:max-w-full'>
                    Do you own a Cricut, Silhouette Cameo, Siser Juliet,
                    StarCraft SOLO, Brother ScanNCut, Glowforge, or any other
                    cutting machine? Rest assured, our SVG files can be easily
                    used on any cutting machine, allowing you to enjoy a precise
                    and effortless crafting.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-28 whitespace-nowrap text-2xl font-bold leading-7 text-indigo-950 max-md:mt-14'>
        Have Collaborated with :
      </div>
      <div className='mt-10 flex flex-wrap justify-center gap-4 py-1.5 md:gap-5 xl:flex-nowrap xl:justify-between max-w-full max-md:px-5'>
        <img
          loading='lazy'
          src={elegco.src}
          className='w-1/3 md:w-auto'
          alt='elegco'
        />
        <img
          loading='lazy'
          src={wordBank.src}
          className='w-1/3 md:w-auto'
          alt='wordBank'
        />
        <img
          loading='lazy'
          src={samsung.src}
          className='w-1/3 md:w-auto'
          alt='samsung'
        />
        <img
          loading='lazy'
          src={designBundles.src}
          className='md:w-au to w-1/3'
          alt='designBundles'
        />
        <img
          loading='lazy'
          src={canva.src}
          className='w-1/3 md:w-auto'
          alt='canva'
        />
        <img
          loading='lazy'
          src={creativeFabrica.src}
          className='md:w-au to w-1/3'
          alt='creativeFabrica'
        />
        <img
          loading='lazy'
          src={freepik.src}
          className='w-1/3 md:w-auto'
          alt='freepik'
        />
        <img
          loading='lazy'
          src={goDaddy.src}
          className='w-1/3 md:w-auto'
          alt='goDaddy'
        />
        <img loading='lazy' src={AO.src} className='w-1/3 md:w-auto' alt='AO' />
        <img
          loading='lazy'
          src={jiffy.src}
          className='w-1/3 md:w-auto'
          alt='jiffy'
        />
      </div>
    </SectionContainer>
  );
};

export default Testimonies;
