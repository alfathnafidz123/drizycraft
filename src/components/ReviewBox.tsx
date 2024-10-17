import React from 'react';
import { FaStar } from 'react-icons/fa';

import { ReviewI } from '@/interfaces/product.interface';

interface ReviewProps {
  data: ReviewI;
}
const ReviewBox: React.FC<ReviewProps> = ({ data }) => {
  return (
    <div className='mt-2 flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-[#1A214C]'></div>
        <div className='flex flex-col'>
          <p className='text-lg font-semibold text-[#1A214C]'>
            {data.user.displayName}
          </p>
          <p className='text-lg font-thin text-[#1A214C]'>{data.createdAt}</p>
        </div>
      </div>
      <div className='flex items-center gap-2 text-[#ED9B37]'>
        {Array.from({ length: data.star }, (_, index) => (
          <FaStar key={index} />
        ))}
      </div>
      <p className='font-base text-[#AAAAAA]'>{data.comment}</p>
    </div>
  );
};

export default ReviewBox;
