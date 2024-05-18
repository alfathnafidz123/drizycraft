import { blogArticle1 } from '~/images';

const RelatedPost = () => {
  return (
    <div className='flex justify-between rounded-[12px] transition-all duration-300 hover:bg-[#EBECF5] hover:shadow-lg'>
      <img
        src={blogArticle1.src}
        alt='Related Post'
        className='m-2 w-2/5 xl:h-[141px] xl:w-[251px]'
      />

      <div className='m-2 flex flex-col'>
        <p className='font-katide-bold text-sm text-[#1A214C] xl:text-base'>
          Cricut Tips: How to Keep Your Cricut Stuff Going Strong!
        </p>
        <p className='mt-[12px] text-xs text-[#AAAAAA] xl:text-sm'>
          February 7, 2023
        </p>
      </div>
    </div>
  );
};

export default RelatedPost;
