import AffiliateBanner from '@/components/AffiliateBanner';
import BlogArticle from '@/components/BlogArticle';
import { blogStories1 } from '~/images';
import { FaAngleRight } from 'react-icons/fa6';

// import localFont from 'next/font/local';
// const myFont = localFont({ src: '../../public/fonts/Hastle.woff2' });

export default function Blog() {
  return (
    <main>
      <section>
        <p className=' font-katide-bold mt-[65px] text-center text-[36px] tracking-[9px] text-[#1A214C]'>
          DRIZY CRAFT BLOGS
        </p>

        <p className='mt-[38px] text-center text-[16px]'>
          Tutorials, Inspiration and Ideas of Craft, Design and Typography.
          <br />
          <b>Create your own amazing masterpiece!</b>
        </p>

        <p className='mb-[51px] mt-[36px] text-center text-[16px]'>
          We are here as friends, accompanying dryers by sharing articles such
          as tips and tricks <br /> for crafter lovers and designers in creating
          works of high selling value.
        </p>
      </section>

      <section className='bg-[#EBECF5] p-[29px] text-center text-[24px]'>
        <p className='font-hastle mb-10 text-[24px] text-[#1A214C]'>
          Latest stories from us
        </p>

        <div className='mr-24 font-katide-bold flex cursor-pointer justify-end text-[16px] text-[#2A3B80]'>
          View all stories
          <FaAngleRight className='mt-[3px] pl-2' />
        </div>

        <div className='group relative h-[240px] w-[160px]'>
          <img
            src={blogStories1.src}
            className=' rounded-[12px] shadow-sm transition-all duration-300 ease-in-out group-hover:scale-110'
            alt='Story'
          />
          <div className='absolute inset-0 z-10'>
            <div className='absolute inset-0 scale-110 rounded-[12px] bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50'></div>
            <div className='font-katide-bold absolute inset-0 top-0 ml-10 mt-[194px] line-clamp-2 w-[90px] scale-0 items-center text-left text-[16px] text-white transition-all duration-300 ease-out group-hover:scale-100'>
              Christmas 2023: Free shadow box
            </div>
          </div>
        </div>

        {/* <img
          src={blogStories1.src}
          className='rounded-12px ml-1 h-[240px] w-[160px] shadow-sm'
          alt='Story'
        /> */}
      </section>

      <section className='mb-[234px] ml-14 p-[66px]'>
        <p className='font-katide-bold mb-10 text-center text-[24px] text-[#1A214C]'>
          Latest article for you
        </p>

        <div className='flex'>
          <BlogArticle />
          <BlogArticle />
          <BlogArticle />
        </div>

        <div className='mt-[100px] flex justify-center'>
          <div className='font-katide-bold h-[32px] w-[138px] cursor-pointer rounded-[49px] bg-[#2A3B80] pt-1 text-center text-[12px] text-white'>
            Loading more...
          </div>
        </div>
      </section>

      <AffiliateBanner />
    </main>
  );
}
