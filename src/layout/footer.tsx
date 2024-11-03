import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaXTwitter,
} from 'react-icons/fa6';

import { GuaranteeBadge } from '~/images';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center bg-[#1A214C] pb-7 pt-12 text-white'>
      <div className='mt-8 w-full max-md:px-8 lg:mt-16 max-w-[1164px]'>
        <div className='grid grid-cols-2 text-left max-md:gap-10 lg:grid-cols-5 lg:flex-row'>
          <nav>
            <div className='font-katide-bold text-[18px]'>Find</div>
            <div className='font-katide-regular mt-2 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4'>
              <Link href='/blog'>Blogs</Link>
              <Link href="/catalog-crafter">Newest</Link>
              <Link href="/catalog-crafter">Popular</Link>
            </div>
          </nav>
          <nav>
            <div className='font-katide-bold text-[18px]'>Categories</div>
            <div className='font-katide-regular mt-2 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4'>
              <Link href="/category/Shadow box">Shadow box</Link>
              <Link href="/category/Paper Cut Template">Paper Cut Template</Link>
              <Link href="/category/Sublimation">Sublimation</Link>
              <Link href="/category/Vector">Vector</Link>
            </div>
          </nav>
          <nav>
            <div className='font-katide-bold text-[18px] '>Legal</div>
            <div className='font-katide-regular mt-2 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4'>
              <Link href='/license'>License</Link>
              <Link href='/terms' className='whitespace-nowrap'>
                Terms & Conditions
              </Link>
              <Link href='/privacy' className='cursor-pointer'>
                Privacy Policy
              </Link>
            </div>
          </nav>
          <nav>
            <div className='font-katide-bold text-[18px]'>Help</div>

            <div className='font-katide-regular mt-2 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4'>
              <Link href='/help-center'>Help Center</Link>
              <Link href='/faq' className='cursor-pointer'>
                FAQ
              </Link>
              <Link href='/contact-us'>Contact Us</Link>
              <Link href='/about' className='cursor-pointer'>
                About Us
              </Link>
            </div>
          </nav>
          <nav className='flex flex-col self-stretch max-md:col-span-2'>
            <div className='flex flex-col lg:px-2'>
              <div className='font-katide-regular text-[18px] max-md:text-center '>
                Follow us
              </div>
              <div className='mt-5 flex justify-evenly lg:justify-between gap-5 whitespace-nowrap text-xl'>
                <Link href="https://www.facebook.com/DrizyStudio" target='__blank'>
                  <FaFacebookF />
                </Link>

                <Link href="" target='__blank'>
                  <FaXTwitter />
                </Link>

                <Link href="https://id.pinterest.com/Drizy_Studio/" target='__blank'>
                  <FaPinterest />
                </Link>

                <Link href="https://www.instagram.com/drizy_craft/ " target='__blank'>
                  <FaInstagram />
                </Link>

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
        <div className='mt-11 h-0.5 shrink-0 bg-white bg-opacity-30' />
        <div className='font-katide-regular mt-6 self-center text-center text-[14px] leading-6'>
          ©2024 Drizy Studio - All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
