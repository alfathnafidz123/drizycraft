import { blogArticle1, avatarExample } from "~/images";

const BlogArticle = () => {
  return (
    <div className=' h-[384px] w-[390px] rounded-[12px] p-[16px] transition-all duration-300 ease-in-out hover:bg-[#EBECF5] hover:shadow-lg'>
    <img
      src={blogArticle1.src}
      className='rounded-[12px] shadow-lg hover:shadow-transparent'
      alt='Article'
    />
    <p className='font-katide-bold pt-[33px] text-[24px] text-[#1A214C]'>
      Cool Travel Destination 3D Shadow Box Designs
    </p>
    <div className='flex pt-[36px]'>
      <img
        src={avatarExample.src}
        className='aspect-square h-[32px]'
        alt='Avatar'
      />
      <p className='flex items-center pl-[11px] text-[14px] text-[#777777]'>
        Putri Hendradi
      </p>
    </div>
  </div>
  );
};

export default BlogArticle;
