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
    <div className='relative flex flex-col rounded-xl p-2 transition-all duration-300 pb-10 ease-in-out hover:bg-[#EBECF5] max-md:bg-[#EBECF5] hover:shadow-lg'>
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
      <div className='mt-4 flex flex-col justify-between px-0.5'>
        <h1
          className='font-katide-bold cursor-pointer text-2xl text-[#1A214C] mb-2'
          onClick={handleToArticle}
        >
          {data.title}
        </h1>
      </div>
      <div className='absolute bottom-0 flex items-center py-2'>
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
  );
};

export default BlogArticle;
