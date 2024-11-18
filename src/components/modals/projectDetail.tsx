/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import Link from 'next/link';
import React from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { CustomArrowProps } from 'react-slick';

import { CrafterI } from '@/interfaces/crafter.interfaces';

import {
  avatarExample,
  projectLike,
  projectPinterest,
  projectStars,
} from '~/images';

interface ModalProps {
  isOpen: boolean;
  data?: CrafterI;
  onClose: () => void;
  onLike: (id: string) => void;
}

const ModalProjectDetail: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onLike,
  data,
}) => {
  const closeModal = () => {
    onClose && onClose();
  };
  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-prev'
      style={{ left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &lt;
    </div>
  );

  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-next'
      style={{ right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <div>
      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={closeModal}
          className='fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {isOpen && (
        <div className='fixed left-0 top-0 z-30 transform overflow-hidden rounded-3xl bg-white shadow-lg max-md:w-full lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <div className='flex h-screen w-full flex-col max-md:overflow-y-scroll lg:h-[500px] lg:w-[888px]'>
            <div className='flex flex-row-reverse items-center justify-between bg-[#E5F6FB] px-4 py-2'>
              <IoCloseCircleOutline
                onClick={closeModal}
                className='text-[#4065D1]'
                size={30}
              />
              <p className='pl-[7%] font-semibold text-[#1A214C]'>
                Project Details
              </p>
              <div />
            </div>
            <div className='flex flex-col gap-4 p-4 lg:flex-row lg:gap-8 lg:p-8'>
              <div className='flex flex-col items-center justify-center gap-4 lg:w-1/2'>
                <div className='max-h-screen w-full items-center justify-center rounded-xl lg:h-[310px] lg:w-[432px]'>
                  <div className='!important flex h-full w-full items-center justify-center'>
                    <img
                      src={data?.imageUrl}
                      alt='slider'
                      className='w-full px-2'
                    />
                  </div>
                </div>
                <div className='flex w-full justify-between'>
                  <div className='flex items-center text-[14px] text-[#1A204C]'>
                    <img
                      loading='lazy'
                      src={avatarExample.src}
                      className=' mr-3 w-[39px]'
                    />
                    <div className='mr-1'>By</div>
                    <div className='font-katide-bold'>
                      {data?.user.displayName}
                    </div>
                  </div>
                  <div className='mt-5 flex justify-between gap-5 text-center '>
                    <div
                      className='flex w-[39px] flex-col'
                      onClick={() => onLike(data!.id)}
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
                          {data && data.likeCount > 0 ? data.likeCount : ''}
                        </a>
                      </div>
                      <div className=' font-katide-bold text-xs text-indigo-950'>
                        Like
                      </div>
                    </div>
                    <div className='flex w-[39px] flex-col'>
                      <Link href={`https://pinterest.com/pin/create/button/?description=${data?.description}&url=${process.env.NEXT_PUBLIC_URL}/project?id=${data?.id}&media=${data?.imageUrl}`} target='_blank' className=' flex h-[39px] items-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'>
                        <img
                          loading='lazy'
                          src={projectPinterest.src}
                          className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
                        />
                      </Link>
                      <div className=' font-katide-bold text-xs text-indigo-950'>
                        Share
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 lg:gap-4'>
                <div className='flex'>
                  {Array.from({ length: data!.price }, (_, index) => (
                    <img
                      loading='lazy'
                      key={index}
                      src={projectStars.src}
                      className='my-auto'
                    />
                  ))}
                </div>
                <p className='font-katide-regular text-[14px]'>
                  {data?.description}
                </p>
                <div className='font-katide-semibold mt-5 text-[14px] lg:mt-10'>
                  {data?.product.map(item =>
                    <Link key={item.id} href={`/product/${item.meta[0].title}`} className='flex w-full items-center gap-5 border-t max-md:justify-between'>
                      <p className='mt-3 hover:underline'>Download {item.name}</p>
                      <FaArrowUpRightFromSquare className='mt-2 text-[#61A9FA]' />
                    </Link>
                  )}
                  {data?.breezy.map(item =>
                    <Link key={item.id} href={`https://breezy.drizycraft.com/${item.id}`} target='__blank' className='flex w-full items-center gap-5 border-t max-md:justify-between'>
                      <p className='mt-3 hover:underline'>Download {item.name}</p>
                      <FaArrowUpRightFromSquare className='mt-2 text-[#61A9FA]' />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalProjectDetail;
