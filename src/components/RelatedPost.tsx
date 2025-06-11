'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ArticleI } from '@/interfaces/article.interfaces';

import { bannerArticle } from '~/images';

const RelatedPost = ({ data }: { data: ArticleI }) => {
  const router = useRouter();

  const handleToArticle = () => {
    router.push(`/article/${data.meta?.[0]?.title ?? ''}`);
  };

  return (
    <div
      className='flex justify-between rounded-[12px] transition-all duration-300 hover:bg-[#EBECF5] hover:shadow-lg'
      onClick={handleToArticle}
    >
      <Image
        src={data.banner ?? bannerArticle.src}
        alt='Related Post'
        className='m-2 w-2/5 xl:h-[141px] xl:w-[251px]'
      />
      <div className='m-2 flex flex-col'>
        <p className='font-katide-bold text-sm text-[#1A214C] xl:text-base'>
          {data.title}
        </p>
        <p className='mt-[12px] text-xs text-[#AAAAAA] xl:text-sm'>
          {data.author?.name ?? 'Drizy Admin'}
        </p>
      </div>
    </div>
  );
};

export default RelatedPost;
