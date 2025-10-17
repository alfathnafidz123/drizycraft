'use client';

import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { FaFacebookF } from '@react-icons/all-files/fa6/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa6/FaInstagram';
import { FaPinterest } from '@react-icons/all-files/fa6/FaPinterest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/lib/store';

import {
  AmexLogo,
  DinersClubLogo,
  DiscoverLogo,
  GuaranteeBadge,
  JcbLogo,
  MasterCardLogo,
  StripeLogo,
  VisaLogo, YCSC, YCSCHover
} from '~/images';
import NextImage from '@/components/NextImage';
import { useState } from 'react';

const Footer = () => {
  const { dataUser } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  return (
    <footer className='flex flex-col items-center bg-[#1A214C] pb-7 pt-7 text-white'>
      <div className='mt-8 w-full max-md:px-8 lg:mt-16 max-w-[1164px]'>
        <div className='grid grid-cols-2 text-left max-md:gap-10 lg:grid-cols-5 lg:flex-row'>
          <div className="grid grid-cols-2 col-span-2 gap-x-4 lg:gap-x-14 gap-y-16">
            <nav>
              <div className="font-katide-bold text-[18px]">Explore</div>
              <div className="font-katide-regular mt-7 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4">
                <Link href='#'>Drizy Atelier</Link>
                <Link href={{ pathname: "/catalog-crafter", query: { sortType: "Latest" } }}>Newest</Link>
                <Link href={{ pathname: "/catalog-crafter", query: { sortType: "Popularity" } }}>Popular</Link>
                <Link href='/blog'>Blogs</Link>
                {dataUser?.affiliate && <Link href="/dashboard-afilliator">Afilliator Dashboard</Link>}
              </div>
            </nav>
            <nav>
              <div className="font-katide-bold text-[18px]">Support</div>
              <div className="font-katide-regular mt-7 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4">
                <Link href='/about' className='cursor-pointer'>About Us</Link>
                <Link href='/help-center'>Help Center</Link>
                <Link href='/faq' className='cursor-pointer'>FAQ</Link>
                <Link href='/contact-us'>Contact Us</Link>
              </div>
            </nav>
            <nav>
              <div className="font-katide-bold text-[18px]">Categories</div>
              <div className="font-katide-regular mt-7 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4">
                <Link href="#" onClick={(e) => { e.preventDefault(); router.push('/category/3D Shadow Box SVGs'); }}>Shadow box</Link>
                <Link href="#" onClick={(e) => { e.preventDefault(); router.push('/category/Paper Cut Templates'); }}>Paper Cut Template</Link>
                <Link href="#" onClick={(e) => { e.preventDefault(); router.push('/category/Printable Crafts'); }}>Sublimation</Link>
                <Link href="#" onClick={(e) => { e.preventDefault(); router.push('/category/Card Making'); }}>Card Making</Link>
              </div>
            </nav>
            <nav>
              <div className="font-katide-bold text-[18px]">Legal</div>
              <div className="font-katide-regular mt-7 flex flex-col gap-2 text-[14px] lg:mt-9 lg:gap-4">
                <Link href='/license'>License</Link>
                <Link href='/terms' className='whitespace-nowrap'>Terms & Conditions</Link>
                <Link href='/privacy' className='cursor-pointer'>Privacy Policy</Link>
                <Link href='/cancellation-policy' className='cursor-pointer'>Cancellation Policy</Link>
              </div>
            </nav>
          </div>
          <nav className="hidden md:block col-span-2 md:col-span-1"></nav>
          {/*dekstop*/}
          <nav className="mt-auto max-md:col-span-2 lg:flex hidden">
            <div className="font-katide-regular flex flex-col gap-1 text-[14px]">
              <div className="font-katide-bold">Contact us at:</div>
              <Link href="mailto:admin@drizystudio.com">admin@drizystudio.com</Link>
              <Link href="https://profile.drizystudio.com" target="_blank">
                profile.drizystudio.com
              </Link>

              <div className="mt-12">
                <div className="font-katide-bold mb-3 text-[18px]">Secure Checkout</div>
                <div className="text-sm">Safe checkout.</div>
                <div className="text-sm">Trusted by millions.</div>
                <div className="text-sm mt-3">
                  <NextImage alt="stripe" src={StripeLogo} width={150} height={10} />
                </div>
                <div className="text-sm flex gap-2 mt-3 ">
                  <NextImage alt="stripe" src={MasterCardLogo} width={44} height={10} />
                  <NextImage alt="stripe" src={VisaLogo} width={44} height={10} />
                  <NextImage alt="stripe" src={AmexLogo} width={44} height={10} />
                </div>
                <div className="text-sm flex gap-2 mt-3 ">
                  <NextImage alt="stripe" src={DiscoverLogo} width={48} height={10} />
                  <NextImage alt="stripe" src={JcbLogo} width={36} height={10} />
                  <NextImage alt="stripe" src={DinersClubLogo} width={48} height={10} />
                </div>
              </div>
            </div>
          </nav>
          <nav className='lg:flex hidden flex-col mt-auto self-stretch max-md:col-span-2'>
            <div className='flex flex-col lg:px-2'>
              <div className="mb-10 flex justify-center">
                <img
                  alt="stripe"
                  src={isHover ? YCSCHover.src : YCSC.src}
                  className="w-full"
                  loading="lazy"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                />
              </div>
              <div className='font-katide-regular text-[18px] max-md:text-center '>
                Follow us
              </div>
              <div className='mt-5 flex justify-evenly lg:justify-between gap-5 whitespace-nowrap text-xl'>
                <Link aria-label='Drizy Studio Facebool' href="https://www.facebook.com/DrizyStudio" target='__blank'>
                  <FaFacebookF />
                </Link>

                <Link aria-label='Drizy Studio Community' href="https://www.facebook.com/groups/drizyfreebies" target='__blank'>
                  <FaUsers />
                </Link>

                <Link aria-label='Drizy Studio Pinterest' href="https://www.pinterest.com/Drizy_Craft/" target='__blank'>
                  <FaPinterest />
                </Link>

                <Link aria-label='Drizy Studio Instagram' href="https://www.instagram.com/drizy_craft/ " target='__blank'>
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
          {/*mobile*/}
          <nav className="mt-auto max-md:col-span-2 lg:hidden grid grid-cols-2 col-span-2 gap-x-4 lg:gap-x-14 gap-y-16">
            <div className="font-katide-regular flex flex-col gap-1 text-[14px]">
              <div className="">
                <div className="font-katide-bold mb-3 text-[18px]">Secure Checkout</div>
                <div className="text-sm">Safe checkout.</div>
                <div className="text-sm">Trusted by millions.</div>

              </div>
            </div>
            <div>
              <div className="text-sm">
                <NextImage alt="stripe" src={StripeLogo} width={200} height={10} className='w-full h-auto'/>
              </div>
              <div className="text-sm flex gap-x-4 mt-3 ">
                <NextImage alt="stripe" src={MasterCardLogo} width={46} height={10} />
                <NextImage alt="stripe" src={VisaLogo} width={46} height={10} />
                <NextImage alt="stripe" src={AmexLogo} width={46} height={10} />
              </div>
              <div className="text-sm flex gap-x-4 mt-3 ">
                <NextImage alt="stripe" src={DiscoverLogo} width={54} height={10} />
                <NextImage alt="stripe" src={JcbLogo} width={32} height={5} />
                <NextImage alt="stripe" src={DinersClubLogo} width={54} height={10} />
              </div>
            </div>
          </nav>
          <nav className='mt-auto max-md:col-span-2 lg:hidden grid grid-cols-2 col-span-2 gap-x-4 lg:gap-x-14 gap-y-16'>
            <div className='flex flex-col lg:px-2'>
              <div className="font-katide-bold">Contact us at:</div>
              <Link href="mailto:admin@drizystudio.com">admin@drizystudio.com</Link>
              <Link href="https://profile.drizystudio.com" target="_blank">
                profile.drizystudio.com
              </Link>
            </div>
            <div className='flex flex-col'>
              <div className="flex">
                <NextImage alt="stripe" src={YCSC} width={200} height={10} />
              </div>
            </div>
          </nav>
          <nav className='mt-auto max-md:col-span-2 lg:hidden grid grid-cols-2 col-span-2 gap-x-4 lg:gap-x-14 gap-y-10'>
            <div className='flex flex-col lg:px-2'>
              <div className='font-katide-regular text-[14px] '>
                Follow us
              </div>
              <div className='mt-4 flex lg:justify-between gap-7 whitespace-nowrap text-xl'>
                <Link aria-label='Drizy Studio Facebool' href="https://www.facebook.com/DrizyStudio" target='__blank'>
                  <FaFacebookF />
                </Link>

                <Link aria-label='Drizy Studio Community' href="https://www.facebook.com/groups/drizyfreebies" target='__blank'>
                  <FaUsers />
                </Link>

                <Link aria-label='Drizy Studio Pinterest' href="https://www.pinterest.com/Drizy_Craft/" target='__blank'>
                  <FaPinterest />
                </Link>

                <Link aria-label='Drizy Studio Instagram' href="https://www.instagram.com/drizy_craft/ " target='__blank'>
                  <FaInstagram />
                </Link>
              </div>
            </div>
            <div className='flex flex-col h-full'>
              <img
                loading='lazy'
                src={GuaranteeBadge.src}
                className='h-full w-full'
                alt='Guarantee Badge'
              />
            </div>
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
