'use client';
import { useRouter } from 'next/navigation';

import { GuaranteeBadge } from '~/images';

import {
  FaFacebookF,
  FaXTwitter,
  FaPinterest,
  FaInstagram,
} from 'react-icons/fa6';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className='flex flex-col items-center bg-[#1A214C] px-16 pb-7 pt-12 text-white'>
      <div className='mt-16 flex w-full max-w-[1173px] flex-col'>
        <div className='flex'>
          <nav className='flex flex-1 flex-col '>
            <div className='font-katide-bold text-[18px]'>Find</div>
            <div className='font-katide-regular text-[14px]'>
              <div className='mt-11'>Blogs</div>
              <div className='mt-6'>Newest</div>
              <div className='mt-6'>Popular</div>
            </div>
          </nav>
          <nav className='flex flex-1 flex-col'>
            <div className='font-katide-bold text-[18px]'>Categories</div>
            <div className='font-katide-regular text-[14px]'>
              <div className='mt-11'>Shadow box</div>
              <div className='mt-6'>Paper Cut Template</div>
              <div className='mt-6'>Sublimation</div>
              <div className='mt-6'>Vector</div>
            </div>
          </nav>
          <nav className='flex flex-1 flex-col '>
            <div className='font-katide-bold text-[18px] '>Legal</div>
            <div className='font-katide-regular text-[14px]'>
              <div
                className='mt-11 cursor-pointer'
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
            </div>
          </nav>
          <nav className='flex flex-1 flex-col whitespace-nowrap'>
            <div className='font-katide-bold text-[18px]'>Help</div>

            <div className='font-katide-regular text-[14px]'>
              <div className='mt-11'>Help Center</div>
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
            </div>
          </nav>
          <nav className='flex flex-col self-stretch'>
            <div className='flex flex-col px-2 py-1'>
              <div className='font-katide-regular text-[18px] '>Follow us</div>
              <div className='mt-5 flex justify-between gap-5 whitespace-nowrap text-xl'>
                <FaFacebookF />
                <FaXTwitter />
                <FaPinterest />
                <FaInstagram />
              </div>
            </div>
            <img
              loading='lazy'
              src={GuaranteeBadge.src}
              className='mt-20'
              alt='Guarantee Badge'
            />
          </nav>
        </div>
        <div className='mt-11 h-px shrink-0 bg-white bg-opacity-30' />
        <div className='font-katide-regular mt-6 self-center text-center text-[14px] leading-6'>
          ©2024 Drizy Studio - All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
