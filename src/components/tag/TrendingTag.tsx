/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { searchBlue } from '~/images';

interface TrendingTagProps {
  name: string;
}

const TrendingTag = ({ name }: TrendingTagProps) => {
  return (
    <div className='group flex items-center rounded-full border border-[#8BC0E7] font-katide-bold text-[10px] text-[#4065D1]'>
      <img
        src={searchBlue.src}
        className='mr-2 w-0 scale-0 transition-all duration-300 group-hover:w-[16px] group-hover:scale-100'
        alt='search'
      />
      <p className='mr-2'>{name}</p>
    </div>
  );
};

export default TrendingTag;
