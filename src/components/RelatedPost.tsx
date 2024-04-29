import { blogArticle1 } from "~/images";

const RelatedPost = () => {
  return (
    <div className='flex h-[159px] w-[444px] justify-between rounded-[12px] transition-all duration-300 hover:bg-[#EBECF5] hover:shadow-lg'>
    <img
      src={blogArticle1.src}
      alt='Related Post'
      className='m-2 h-[141px] w-[251px]'
    />

    <div className='m-2 flex flex-col'>
      <p className='font-katide-bold text-[16px] text-[#1A214C]'>
        Cricut Tips: How to Keep Your Cricut Stuff Going Strong!
      </p>
      <p className='mt-[12px] text-[14px] text-[#AAAAAA]'>
        February 7, 2023
      </p>
    </div>
  </div>
  );
};

export default RelatedPost;
