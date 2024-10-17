/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';

import { projectShare1 } from '~/images';

const PopoverShare = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className='w-[39px]'>
      <div
        className='flex h-[39px] cursor-pointer items-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'
        onClick={togglePopover}
      >
        <img
          loading='lazy'
          src={projectShare1.src}
          className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
        />
      </div>
      <div className=' font-katide-bold text-xs text-indigo-950'>Share</div>
      <div
        className={`absolute bottom-0 left-[50px] ${isPopoverOpen ? 'block' : 'hidden'}`}
      >
        <div className='h-[215px] w-[45px] rounded-3xl bg-[#A5272B] p-3 pt-5 text-white'>
          <FaInstagram className='aspect-square h-[22px] w-[22px]' />
          <FaWhatsapp className='mt-4 aspect-square h-[22px] w-[22px]' />
          <FaXTwitter className='mt-4 aspect-square h-[22px] w-[22px]' />
          <FaFacebook className='mt-4 aspect-square h-[22px] w-[22px]' />
          <FaPinterest className='mt-4 aspect-square h-[22px] w-[22px]' />
        </div>
      </div>
    </div>
  );
};

export default PopoverShare;
