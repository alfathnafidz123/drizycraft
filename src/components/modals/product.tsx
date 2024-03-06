/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

import {
  crafterItem1,
  projectStars,
  hoverPinterest,
  hoverWA,
} from '~/images';


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
        <div className='flex gap-8 pt-5 pl-5 h-[423px] w-[889px]'>
          <div className='flex flex-col justify-center'>
          <img loading="lazy" src={crafterItem1.src} className='h-[310px] w-[450px]'/>
            <div className='flex flex-row mt-8 pb-6'>
              <img
                loading='lazy'
                src={hoverPinterest.src}
                className='flex h-[40px] w-[40px] cursor-pointer hover:scale-110 transition-all duration-300'
              />
              <img
                src={hoverWA.src}
                className='flex h-[40px] w-[40px] cursor-pointer ml-3 hover:scale-110 transition-all duration-300'
              />
            </div>
          </div>
          <div className='flex flex-col w-[40%]'>
            <div className='flex flex-col'>
              <p className='font-katide-bold text-[24px] text-[#1A204C] leading-[36px]'>
              Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut
              </p>
            </div>
            <div className='flex mt-[12%] gap-[24%]'>
              <div className='flex flex-col'>
                  <p className=' text-[14px] font-katide-semibold text-[#A1A1A1]'>
                    Price
                  </p>
                  <p className='text-[24px] font-katide-semibold text-[#A1A1A1] mt-1'>
                    $5
                  </p>
              </div>
              <div className='flex flex-col'>
                  <p className='text-[14px] font-katide-semibold text-[#A1A1A1]'>
                    Reviews
                  </p>
                  <div className="flex">
                    <img loading="lazy" src={projectStars.src} className="my-auto"/>
                    <img loading="lazy" src={projectStars.src} className="my-auto"/>
                    <img loading="lazy" src={projectStars.src} className="my-auto"/>
                    <img loading="lazy" src={projectStars.src} className="my-auto"/>
                    <img loading="lazy" src={projectStars.src} className="my-auto"/>
                  </div>
              </div>
            </div>

            <div className='flex flex-col mt-5 gap-4'>
              <p className='text-[14px] font-katide-semibold text-[#A1A1A1]'>
                Select License
              </p>
              <div className='flex gap-5'>
              <button className="w-24 h-9 bg-[#E4F6FB] rounded-[60px] border border-[#C7C7C7] hover:bg-[#61A9FA]">
                <div className="text-center text-[#A1A1A1] text-sm font-katide-semibold hover:text-[#1A214C]">Personal</div>
              </button>
              <button className="w-24 h-9 bg-[#E4F6FB] rounded-[60px] border border-[#C7C7C7] hover:bg-[#61A9FA]">
                <div className="text-center text-[#A1A1A1] text-sm font-katide-semibold hover:text-[#1A214C]">Commercial</div>
              </button>
              <button className="w-24 h-9 bg-[#E4F6FB] rounded-[60px] border border-[#C7C7C7] hover:bg-[#61A9FA]">
                <div className="text-center text-[#A1A1A1] text-sm font-katide-semibold hover:text-[#1A214C]">Business</div>
              </button>
              </div>
            </div>

            <div className='flex flex-row mt-[13%] justify-between'>
              <button className="w-44 h-9 bg-[#2A3B80] rounded-lg justify-center items-center inline-flex hover:bg-[#132159]">
                <div className="text-right text-white text-sm font-katide-bold tracking-[1%]">Add to cart  </div>
              </button>
              <button className='flex'>
                <p className='font-katide-semibold text-[14px] text-[#1A214C] mt-2 mr-3 hover:underline'>View full details</p>
                <FaAngleRight className='text-[#1A214C] mt-[7%]' /> 
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
