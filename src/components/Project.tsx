import PopoverShare from '@/components/modals/popover';

import { avatarExample, project1, projectLike, projectStars } from '~/images';
interface ModalProps {
  onClick: () => void;
}
const Project: React.FC<ModalProps> = ({ onClick }) => {
  const onItemClick = () => {
    onClick && onClick();
  };
  return (
    <div
      onClick={onItemClick}
      className='flex h-[456px] w-[369px] cursor-pointer flex-col rounded-xl bg-white px-8 py-4 shadow-lg'
    >
      <div className='flex items-center gap-3 text-[14px] text-[#1A204C]'>
        <img loading='lazy' src={avatarExample.src} className=' w-[39px]' />
        <div className=''>By</div>
        <div className='font-katide-bold'>Michelle</div>
      </div>
      <div className='w-306 h-206 relative mt-4'>
        <img
          loading='lazy'
          src={project1.src}
          className=' h-auto w-full rounded-lg'
        />
        <div className='font-katide-bold absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-white opacity-0 hover:opacity-100'>
          Click for detail
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='mt-5 flex'>
          <img loading='lazy' src={projectStars.src} className='my-auto' />
          <img loading='lazy' src={projectStars.src} className='my-auto' />
          <img loading='lazy' src={projectStars.src} className='my-auto' />
          <img loading='lazy' src={projectStars.src} className='my-auto' />
          <img loading='lazy' src={projectStars.src} className='my-auto' />
        </div>
        <div className='mt-5 flex justify-between gap-5 text-center '>
          <div className='flex w-[39px] flex-col'>
            <div className=' flex h-[39px] items-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'>
              <img
                loading='lazy'
                src={projectLike.src}
                className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
              />
            </div>
            <div className=' font-katide-bold text-xs text-indigo-950'>
              Like
            </div>
          </div>
          <PopoverShare />
        </div>
      </div>
      <div className='font-katide-regular mt-5 line-clamp-3 text-indigo-950'>
        Loved being able to purchase a bundle of SVG’s and not having to spend
        hours creating it myself. Thank you!
      </div>
    </div>
  );
};

export default Project;
