/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { memo } from 'react';

import NextImage from '@/components/NextImage';

interface SeasonCategoriesProps {
  name: string;
  image: string;
}
const SeasonCategories: React.FC<SeasonCategoriesProps> = ({ name, image }) => {
  return (
    <Link
      href={`/category/${name}`}
      aria-label={`product-season-${name}`}
      id={`product-season-${name}`}
      className='group mb-4'
    >
      <div className='flex items-center justify-center lg:h-[150px] lg:w-[150px]'>
        <NextImage
          width={150}
          height={150}
          loading='lazy'
          src={image}
          alt={name.split(" ")[0]}
          classNames={{ image: 'aspect-square rounded-full border-[9px] border-stone-300 transition-transform hover:scale-110 hover:border-[4px] hover:border-[#FFBB3C]' }}
        />
      </div>
      <div className='font-katide-bold pt-1 text-center text-black decoration-2 underline-offset-[7px] group-hover:underline text-xs lg:text-base'>
        {name}
      </div>
    </Link>
  );
};

export default memo(SeasonCategories);
