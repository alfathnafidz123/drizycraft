/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import React from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaPlusSquare } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';


import {
  projectStars,
  projectLike,
  projectPinterest,
  avatarExample,
} from '~/images';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalProjectDetail: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
      <div className='fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-3xl bg-white shadow-lg'>
      <div className='flex flex-col w-[888px] h-[500px]'>
        <div className='flex flex-row-reverse items-center justify-between bg-[#E5F6FB] px-4 py-2'>
          <IoCloseCircleOutline
            className='text-[#4065D1]'
            size={30}
          />
          <p className='font-semibold text-[#1A214C] pl-[7%]'>Project Details</p>
          <div />
        </div>
        <div className='flex gap-8 p-8'>
          <div className='flex w-full flex-col items-end justify-center gap-4'>
            <div className='flex h-[310px] w-[432px] items-center justify-center rounded-xl bg-gray-100 p-4'>
              <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 border-opacity-25 px-8'>
                <FaPlusSquare className='text-gray-300' size={70} />
                <p className='text-sm text-gray-300'>
                  Upload Image Project Result
                </p>
              </div>
            </div>
            <div className='flex w-full justify-between'>
              <div className="flex gap-3 items-center text-[#1A204C] text-[14px]">
                    <img loading="lazy" src={avatarExample.src} className=" w-[39px]"/>
                    <div className="">By</div>
                    <div className="font-katide-bold">Michelle</div>
              </div>
              <div className="flex gap-5 justify-between mt-5 text-center ">
                <div className="flex flex-col w-[39px]">
                  <div className=" bg-[#A5272B] rounded-full h-[39px] flex items-center hover:bg-[#872A2D]">
                  <img  loading="lazy" src={projectLike.src} className="mx-auto h-[20px] hover:scale-110 transition-all duration-300"/>
                  </div>
                  <div className=" text-indigo-950 text-xs font-katide-bold">Like</div>
                </div>
                <div className="flex flex-col w-[39px]">
                  <div className=" bg-[#A5272B] rounded-full h-[39px] flex items-center hover:bg-[#872A2D]">
                    <img  loading="lazy" src={projectPinterest.src} className="mx-auto h-[20px] hover:scale-110 transition-all duration-300"/>
                  </div>
                  <div className=" text-indigo-950 text-xs font-katide-bold">Share</div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
          <div className="flex">
                <img loading="lazy" src={projectStars.src} className="my-auto"/>
                <img loading="lazy" src={projectStars.src} className="my-auto"/>
                <img loading="lazy" src={projectStars.src} className="my-auto"/>
                <img loading="lazy" src={projectStars.src} className="my-auto"/>
                <img loading="lazy" src={projectStars.src} className="my-auto"/>
          </div>
          <p className='font-katide-regular text-[14px]'>Just downloaded some amazing files from Drizy Studio. The designs are intricate and well-crafted. Love it!</p>
          <div className='font-katide-semibold text-[14px] mt-10'>
            <button className='flex gap-5 items-center border-t w-[55%]'>
              <p className='mt-3 hover:underline'>Download product 1</p>
              <FaArrowUpRightFromSquare className='text-[#61A9FA] mt-2'/>
            </button>
            <button className='flex gap-5 items-center border-t w-[55%] mt-3'>
              <p className='mt-3 hover:underline'>Download product 2</p>
              <FaArrowUpRightFromSquare className='text-[#61A9FA] mt-2'/>
            </button>
            <button className='flex gap-5 items-center border-t border-b w-[55%] mt-3'>
              <p className='mt-3 hover:underline'>Download product 3</p>
              <FaArrowUpRightFromSquare className='text-[#61A9FA] mt-2'/>
            </button>
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
