/* eslint-disable @next/next/no-img-element */
'use client';
import { AxiosError } from 'axios';
import { ChevronLeft, ChevronRight, Loader2Icon } from 'lucide-react';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleRight } from '@react-icons/all-files/fa6/FaAngleRight';
import Slider, { CustomArrowProps } from 'react-slick';
import { toast } from 'react-toastify';

import AffiliateBanner from '@/components/AffiliateBanner';
import BlogArticle from '@/components/BlogArticle';

import { allArticle } from '@/app/api/article/allArticle';
import { allStories } from '@/app/api/article/allStories';
import {
  ArticleI,
  Meta,
  PagingArticleI,
  ResArticlesI,
  ResStories,
  StoryI,
} from '@/interfaces/article.interfaces';

const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });

export default function Blog() {
  const [params, setParams] = useState<PagingArticleI>({ page: 1, limit: 0 });
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [loading, setLoading] = useState(false);
  const [storyParent, setStoryParent] = useState<StoryI[]>([]);
  const router = useRouter();

  const getAllArticle = useCallback(async () => {
    try {
      setLoading(true);
      const res: ResArticlesI = await allArticle(params);
      setArticles((prev) => [...prev, ...res.data]);
      setMeta(res.meta);
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error((errorData.message as string) ?? 'Cannot get articles');
    } finally {
      setLoading(false);
    }
  }, [params]);

  const getStories = useCallback(async () => {
    try {
      const res: ResStories = await allStories({ page: 1, limit: 50 });
      setStoryParent(res.data);
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error((errorData.message as string) ?? 'Cannot get articles');
    }
  }, []);

  useEffect(() => {
    getAllArticle();
    getStories();
  }, [getAllArticle, getStories]);

  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='scale-100 cursor-pointer hover:scale-105'
      style={{
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        top: '43%',
        left: -20,
      }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center rounded-full bg-white'>
        <ChevronLeft className='h-10 w-10 text-black' />
      </div>
    </div>
  );
  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='scale-100 cursor-pointer hover:scale-105'
      style={{
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        top: '43%',
        right: -20,
      }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center rounded-full bg-white'>
        <ChevronRight className='h-10 w-10 text-black' />
      </div>
    </div>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main>
      <section>
        <p className='font-katide-bold mt-[65px] text-center text-[36px] text-[#1A214C] lg:tracking-[9px]'>
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
        <p
          className={`font-hastle mb-10 text-[24px] text-[#1A214C] ${myFont.className}`}
        >
          Latest stories from us
        </p>

        <div className='font-katide-bold mr-24 flex justify-end text-[16px] text-[#2A3B80] '>
          <div className='cursor-pointer'>View all stories</div>
          <FaAngleRight className='mt-[3px] pl-2' />
        </div>
        <div className=' flex justify-center'>
          <Slider {...settings} className='w-full lg:w-[1164px]'>
            {storyParent.map((item) => (
              <div className='slide' key={item.id}>
                <div className='!important flex h-full items-center justify-center'>
                  <div
                    className='group relative w-full lg:h-[240px]'
                    onClick={() => router.push(`story/${item.canonical}`)}
                  >
                    <img
                      src={item.storyItem[0].url}
                      className='w-full rounded-[12px] shadow-sm transition-all duration-300 ease-in-out group-hover:scale-110'
                      alt={item.title}
                    />
                    <div className='absolute inset-0 z-10'>
                      <div className='absolute inset-0 scale-110 rounded-[12px] bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-50 max-md:opacity-50 lg:opacity-0'></div>
                      <div className='font-katide-bold absolute bottom-0 ml-2 line-clamp-2 items-center text-center text-[16px] text-white transition-all duration-300 ease-out group-hover:scale-100 max-md:mb-4 max-md:w-full max-md:justify-center max-md:opacity-100 lg:inset-0 lg:top-0 lg:ml-10 lg:mt-[194px] lg:w-[90px] lg:scale-0'>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className='mx-auto mb-[234px] mt-[66px] flex w-full max-w-[1164px] flex-col'>
        <p className='font-katide-bold mb-10 text-center text-[24px] text-[#1A214C]'>
          Latest article for you
        </p>

        <div className='mx-auto grid max-w-[1168px] grid-cols-1 gap-4 max-md:w-full lg:grid-cols-3 max-md:px-2'>
          {articles.map((item) => (
            <BlogArticle data={item} key={item.id} />
          ))}
          {loading && <Loader2Icon />}
        </div>

        {meta?.total !== articles.length && (
          <div className='mt-[100px] flex justify-center'>
            <button
              onClick={() => {
                setParams((prev) => ({ ...prev, page: prev.page + 1 }));
              }}
              className='font-katide-bold h-[32px] w-[138px] cursor-pointer rounded-[49px] bg-[#2A3B80] pt-1 text-center text-[12px] text-white'
            >
              Loading more...
            </button>
          </div>
        )}
      </section>

      <AffiliateBanner />
    </main>
  );
}
