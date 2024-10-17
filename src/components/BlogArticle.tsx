import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ArticleI } from '@/interfaces/article.interfaces';

import { avatarExample, bannerArticle } from '~/images';

const BlogArticle = ({ data }: { data: ArticleI }) => {
  const router = useRouter();
  const handleToArticle = () => {
    router.push(`/article/${data.meta[0].title}`);
  };
  return (
    <div className='flex flex-col rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-[#EBECF5] max-md:bg-[#EBECF5] hover:shadow-lg'>
      <div
        className='box-border max-h-[205px] w-full cursor-pointer overflow-hidden rounded-[12px] shadow-lg hover:shadow-transparent'
        onClick={handleToArticle}
      >
        <Image
          src={data.banner ?? bannerArticle.src}
          width={100}
          height={100}
          sizes='100vw'
          className='h-auto w-full'
          alt={data.title}
          layout='responsive'
        />
      </div>
      <div className='mt-8 flex h-28 flex-col justify-between px-0.5'>
        <h1
          className='font-katide-bold line-clamp-3 flex-grow cursor-pointer text-2xl text-[#1A214C]'
          onClick={handleToArticle}
        >
          {data.title}
        </h1>
        <div className='flex items-center'>
          <Image
            width={32}
            height={32}
            src={data.author?.avatar ?? avatarExample.src}
            className='aspect-square h-8 w-8 rounded-full object-cover'
            alt='Avatar'
          />
          <p className='ml-2 flex items-center text-[14px] text-[#777777]'>
            {data.author?.name ?? 'Drizy Admin'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
