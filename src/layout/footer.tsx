'use client';
import { useRouter } from 'next/navigation';

import { GuaranteeBadge } from '~/images';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className='flex flex-col items-center bg-[#1A214C] px-16 pb-7 pt-12 text-white max-md:px-5'>
      <form className='mt-16 flex w-full max-w-[1173px] flex-col max-md:mt-10 max-md:max-w-full'>
        <div className='flex items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap'>
          <nav className='flex flex-1 flex-col whitespace-nowrap text-sm leading-6'>
            <h2 className='text-lg font-bold leading-5'>Find</h2>
            <div className='mt-11 max-md:mt-10'>Blogs</div>
            <div className='mt-6'>Newest</div>
            <div className='mt-6'>Popular</div>
          </nav>
          <nav className='flex flex-1 flex-col whitespace-nowrap text-sm leading-6'>
            <h2 className='text-lg font-bold leading-5'>Categories</h2>
            <div className='mt-10'>Shadow box</div>
            <div className='mt-6'>Paper Cut Template</div>
            <div className='mt-5'>Sublimation</div>
            <div className='mt-6'>Vector</div>
          </nav>
          <nav className='flex flex-1 flex-col text-sm leading-6'>
            <h2 className='text-lg font-bold leading-5'>Legal</h2>
            <div
              className='mt-10 cursor-pointer max-md:mt-10'
              onClick={() => {
                router.push('/license');
              }}
            >
              License
            </div>
            <div
              className='mt-6 cursor-pointer whitespace-nowrap'
              onClick={() => {
                router.push('/terms');
              }}
            >
              Terms & Conditions
            </div>
            <div
              className='mt-6 cursor-pointer'
              onClick={() => {
                router.push('/privacy');
              }}
            >
              Privacy Policy
            </div>
          </nav>
          <nav className='flex flex-1 flex-col whitespace-nowrap text-sm leading-6'>
            <h2 className='text-lg font-bold leading-5'>Help</h2>
            <div className='mt-10'>Help Center</div>
            <div
              className='mt-6 cursor-pointer'
              onClick={() => {
                router.push('/faq');
              }}
            >
              FAQ
            </div>
            <div className='mt-6'>Contact Us</div>
            <div
              className='mt-6 cursor-pointer'
              onClick={() => {
                router.push('/about');
              }}
            >
              About Us
            </div>
          </nav>
          <nav className='flex flex-1 flex-col self-stretch'>
            <div className='flex flex-col px-2.5'>
              <h2 className='text-lg leading-5'>Follow us</h2>
              <div className='mt-5 flex justify-between gap-5 whitespace-nowrap text-xl'>
                <a href='#' aria-label='Facebook'></a>
                <a href='#' aria-label='Twitter'>
                  
                </a>
                <a href='#' aria-label='Youtube'>
                  
                </a>
                <a href='#' aria-label='Instagram'>
                  
                </a>
              </div>
            </div>
            <img
              loading='lazy'
              src={GuaranteeBadge.src}
              className=''
              alt='Guarantee Badge'
            />
          </nav>
        </div>
        <div className='mt-11 h-px shrink-0 bg-white bg-opacity-30 max-md:mt-10 max-md:max-w-full' />
        <div className='mt-6 self-center text-center text-sm leading-6'>
          ©2024 Drizy Studio - All rights reserved.
        </div>
      </form>
    </footer>
  );
};

export default Footer;
