/* eslint-disable @next/next/no-img-element */
'use client';

import { FaChevronDown } from 'react-icons/fa6';

import { cart, drizzyCoin, logodrizy, newMember, search } from '~/images';

const Navbar = () => {
  return (
    <nav className='fixed top-0 z-10 flex w-full items-center bg-white py-6 shadow-xl md:px-[40px]'>
      <div className='container mx-auto flex items-center justify-evenly px-4'>
        <img src={logodrizy.src} alt='Logo' className='object-contain' />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row items-center justify-between pl-2'>
            <div className='mr-4 flex items-center gap-2 font-semibold'>
              All product <FaChevronDown />
            </div>
            <div className='flex items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 p-2 pl-4 text-left text-sm font-normal leading-4 tracking-tighter text-[#6F6F6F]'>
              <p>Search for unique craft designs, categories, occasions...</p>
              <img
                src={search.src}
                className='w-[32px] rounded-full bg-[#008ECC]'
                alt='search'
              />
            </div>
            <button className='rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold text-[#008ECC]'>
              LOGIN
            </button>
            <button className='rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold text-[#008ECC]'>
              <img src={cart.src} alt='cart' />
            </button>
            <button className='flex items-center gap-2 rounded-full border border-solid border-gray-300 px-6 py-3 font-semibold text-gray-300'>
              <img src={drizzyCoin.src} alt='cart' />
              <span className='text-[#008ECC]'>11</span>
              COIN
            </button>
          </div>
          <div className='flex flex-row justify-between gap-4'>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Crafters <FaChevronDown />
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Vector <FaChevronDown />
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Deals
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Free SVGs
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Blog
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#008ECC] px-6 py-3 font-semibold text-white'>
              Project
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#EE4C73] px-6 py-3 font-semibold text-white'>
              <img src={newMember.src} alt='Membership' />
              Membership
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
