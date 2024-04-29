/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import PopoverShare from '@/components/modals/popover';

import { CrafterI } from '@/interfaces/product.interface';

import { avatarExample, projectLike, projectStars } from '~/images';
interface ModalProps {
  onClick: () => void;
  onLike: (id: string) => void;
  item: CrafterI;
}
const Project: React.FC<ModalProps> = ({ onClick, item, onLike }) => {
  const onItemClick = () => {
    onClick && onClick();
  };
  return (
    <div className='flex h-[456px] w-[369px] cursor-pointer flex-col rounded-xl bg-white px-8 py-4 shadow-lg'>
      <div className='flex items-center text-[14px] text-[#1A204C]'>
        <img
          loading='lazy'
          src={avatarExample.src}
          className=' mr-3 w-[39px]'
        />
        <div className='mr-1'>By</div>
        <div className='font-katide-bold'>{item?.user?.displayName}</div>
      </div>
      <div onClick={onItemClick} className='w-306 h-206 relative mt-4'>
        <img
          loading='lazy'
          src={item.imageUrl as unknown as string}
          className=' h-auto w-full rounded-lg'
          alt='gambar'
        />
        <div className='font-katide-bold absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-white opacity-0 hover:opacity-100'>
          Click for detail
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='mt-5 flex'>
          {Array.from({ length: item.price }, (_, index) => (
            <img
              loading='lazy'
              key={index}
              src={projectStars.src}
              className='my-auto'
            />
          ))}
        </div>
        <div className='mt-5 flex justify-between gap-5 text-center '>
          <div
            className='flex w-[39px] flex-col'
            onClick={() => onLike(item.id)}
          >
            <div className=' flex h-[40px] flex-col items-center rounded-full bg-[#A5272B] pt-1 hover:bg-[#872A2D]'>
              <div className='basis-2/3'>
                <img
                  loading='lazy'
                  src={projectLike.src}
                  className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
                />
              </div>

              <a className='inline-block align-top text-[10px] text-white'>
                {item.likeCount > 0 && item.likeCount}
              </a>
            </div>
            <div className=' font-katide-bold text-xs text-indigo-950'>
              Like
            </div>
          </div>
          <PopoverShare />
        </div>
      </div>
      <div className='font-katide-regular mt-5 line-clamp-3 text-indigo-950'>
        {item?.description}
      </div>
    </div>
  );
};

export default Project;
