import React, { useState } from 'react';

import
{
  projectShare1,
  projectPinterest,
}
from '~/images';

import {
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa6";

const PopoverShare = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className="absolute w-[39px] relative">
      <div
        className="bg-[#A5272B] rounded-full h-[39px] flex items-center cursor-pointer hover:bg-[#872A2D]"
        onClick={togglePopover}
      >
        <img
          loading="lazy"
          src={projectShare1.src}
          className="mx-auto h-[20px] hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className=" text-indigo-950 text-xs font-katide-bold">Share</div>
      <div
        className={`absolute bottom-0 left-[50px] ${
          isPopoverOpen ? 'block' : 'hidden'
        }`}
      >
      <div className="w-[45px] h-[215px] bg-[#A5272B] rounded-3xl text-white p-3 pt-5">
          <FaInstagram className='aspect-square h-[22px] w-[22px]'/>
          <FaWhatsapp className='aspect-square h-[22px] w-[22px] mt-4'/>
          <FaXTwitter className='aspect-square h-[22px] w-[22px] mt-4'/>
          <FaFacebook className='aspect-square h-[22px] w-[22px] mt-4'/>
          <FaPinterest className='aspect-square h-[22px] w-[22px] mt-4'/>
      </div>
      </div>
    </div>
  );
};

export default PopoverShare;
