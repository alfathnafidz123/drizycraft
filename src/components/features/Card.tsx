import Link from 'next/link';
import React from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';

import { featuresContent } from '@/constant/data';
import { sectionProps } from '@/interfaces/user.interface';

const Card = ({ sectionStyle }: sectionProps) => {
  return (
    <section className={`${sectionStyle}`}>
      <div className='flex flex-wrap items-center justify-center'>
        <div className='grid w-8/12 grid-cols-1 gap-10 lg:w-10/12 lg:grid-cols-2 xl:grid-cols-3'>
          {featuresContent.map((item) => (
            <Link
              key={item.number}
              href='#card'
              className='group relative cursor-pointer overflow-hidden rounded-lg bg-white pb-20 pl-10 pr-10 pt-32 shadow-sm transition-all duration-300 ease-in-out hover:bg-[#217DF7]'
            >
              <span className='absolute left-3 top-2 inline-block text-[200px] opacity-5 transition duration-700 ease-in-out group-hover:translate-y-4'>
                {item.number}
              </span>

              <div className='absolute right-10 top-10'>
                <item.icon className='text-3xl text-[#0151c6] group-hover:text-white' />
              </div>

              <div className='flex items-center gap-4 group-hover:text-white'>
                <span className='text-[24px] font-semibold transition duration-300 ease-in-out group-hover:translate-x-4'>
                  {item.number}
                </span>
                <h3 className='transition duration-300 ease-in-out group-hover:translate-x-4'>
                  {item.title}
                </h3>
              </div>

              <div className='absolute right-[40px] text-[30px] text-white transition duration-500 ease-in-out group-hover:translate-y-4'>
                <BiSolidDownArrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
