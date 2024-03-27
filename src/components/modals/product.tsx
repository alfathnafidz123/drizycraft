/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

import { crafterItem1, hoverPinterest, hoverWA, projectStars } from '~/images';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalProduct: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const closeModal = () => {
    onClose && onClose();
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
        <div className='fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl bg-white shadow-lg'>
          <div className='flex h-[423px] w-[889px] gap-8 pl-5 pt-5'>
            <div className='flex flex-col justify-center'>
              <img
                loading='lazy'
                src={crafterItem1.src}
                className='h-[310px] w-[450px]'
              />
              <div className='mt-8 flex flex-row pb-6'>
                <img
                  loading='lazy'
                  src={hoverPinterest.src}
                  className='flex h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-110'
                />
                <img
                  src={hoverWA.src}
                  className='ml-3 flex h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-110'
                />
              </div>
            </div>
            <div className='flex w-[40%] flex-col'>
              <div className='flex flex-col'>
                <p className='font-katide-bold text-[24px] leading-[36px] text-[#1A204C]'>
                  Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper
                  Cut
                </p>
              </div>
              <div className='mt-[12%] flex gap-[24%]'>
                <div className='flex flex-col'>
                  <p className=' font-katide-semibold text-[14px] text-[#A1A1A1]'>
                    Price
                  </p>
                  <p className='font-katide-semibold mt-1 text-[24px] text-[#A1A1A1]'>
                    $5
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='font-katide-semibold text-[14px] text-[#A1A1A1]'>
                    Reviews
                  </p>
                  <div className='flex'>
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                    />
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-4'>
                <p className='font-katide-semibold text-[14px] text-[#A1A1A1]'>
                  Select License
                </p>
                <div className='flex gap-5'>
                  <button className='h-9 w-24 rounded-[60px] border border-[#C7C7C7] bg-[#E4F6FB] hover:bg-[#61A9FA]'>
                    <div className='font-katide-semibold text-center text-sm text-[#A1A1A1] hover:text-[#1A214C]'>
                      Personal
                    </div>
                  </button>
                  <button className='h-9 w-24 rounded-[60px] border border-[#C7C7C7] bg-[#E4F6FB] hover:bg-[#61A9FA]'>
                    <div className='font-katide-semibold text-center text-sm text-[#A1A1A1] hover:text-[#1A214C]'>
                      Commercial
                    </div>
                  </button>
                  <button className='h-9 w-24 rounded-[60px] border border-[#C7C7C7] bg-[#E4F6FB] hover:bg-[#61A9FA]'>
                    <div className='font-katide-semibold text-center text-sm text-[#A1A1A1] hover:text-[#1A214C]'>
                      Business
                    </div>
                  </button>
                </div>
              </div>

              <div className='mt-[13%] flex flex-row justify-between'>
                <button className='inline-flex h-9 w-44 items-center justify-center rounded-lg bg-[#2A3B80] hover:bg-[#132159]'>
                  <div className='font-katide-bold text-right text-sm tracking-[1%] text-white'>
                    Add to cart{' '}
                  </div>
                </button>
                <button className='flex'>
                  <p className='font-katide-semibold mr-3 mt-2 text-[14px] text-[#1A214C] hover:underline'>
                    View full details
                  </p>
                  <FaAngleRight className='mt-[7%] text-[#1A214C]' />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalProduct;
