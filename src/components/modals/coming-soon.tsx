'use client'
import Link from 'next/link';
import React from 'react';

import { behance, comingSoonBg, comingSoonLogo, comingSoonNotify, comingSoonNotifyHover, facebook, instagram, pinterest } from '~/images';

const calculateTimeLeft = () => {
  const year = new Date().getFullYear();
  const difference = +new Date(`${year}-10-30`) - +new Date();

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)
    return {
      days: days > 9 ? `${days}` : `0${days}`,
      hours: hours > 9 ? `${hours}` : `0${hours}`,
      minutes: minutes > 9 ? `${minutes}` : `0${minutes}`,
      seconds: seconds > 9 ? `${seconds}` : `0${seconds}`,
    };
  }

  return undefined;
}


const ComingSoonModal: React.FC = () => {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div className='w-full h-screen flex items-center justify-center fixed z-[99999] bg-black bg-opacity-50'>
      <div
        style={{ backgroundImage: `url(${comingSoonBg.src})` }}
        className='z-50 w-11/12 lg:w-4/5 transform overflow-y-hidden rounded-[48px] bg-[#E5F6FB] p-4 lg:p-8 shadow-lg lg:overflow-scroll bg-center bg-cover bg-no-repeat border-2 border-white max-lg:h-fit xl:aspect-[1300/750]'
      >
        <div className='w-full h-full relative'>
          <div className='absolute right-6 top-0'>
            <img src={comingSoonLogo.src} />
          </div>
          <div className='w-full md:max-w-[519px] h-full flex flex-col justify-end gap-5 lg:justify-between ml-0 lg:ml-20'>
            <h1 className='text-[#FFBB3C] text-3xl lg:text-5xl font-bold font-inter-bold mt-20'>We’re coming soon...</h1>
            <h2 className='text-[#CCCCCC] text-base lg:text-xl font-bold font-inter-bold '>Pssst... A Mysterious Breeze is Haunting Drizy Craft!</h2>
            <p className='text-white text-sm font-inter-regular font-light'>
              Something spooky is brewing behind the scenes, and it's creeping closer... While we can't reveal everything just yet, whispers of a <span className='font-inter-bold font-bold'>Breezy</span> new way to create are floating in the air. Beware—this Halloween, your creativity might just get a chilling upgrade! Stay tuned, and keep it between us... for now.
            </p>
            <div className='relative'>
              <div
                className='w-full h-16 lg:h-20 border-gradient blur-lg absolute inset-0 -z-10'
              />
              <div className='flex flex-row items-center justify-start w-full h-16 lg:h-20 pl-2 lg:pl-5'>
                <input type='email' className='placeholder:text-white placeholder:font-katide-regular bg-transparent border-none ring-0 focus:ring-0 text-white w-full' placeholder='Email Address' />
              </div>
              <div className='absolute -top-[34px] -right-[28px] lg:-right-[48px] lg:-top-[62px] group/notify cursor-pointer w-[200px] lg:w-fit lg:h-fit'>
                <img src={comingSoonNotify.src} className='group-hover/notify:hidden block' />
                <img src={comingSoonNotifyHover.src} className='group-hover/notify:block hidden' />
              </div>
            </div>
            <div className='relative h-20 xl:h-36'>
              <div
                className='w-full h-20 xl:h-36 border-gradient-double blur-lg absolute inset-0 -z-10'
              />
              <div className="w-full h-full grid grid-cols-4 gap-6 md:gap-20 lg:gap-6 p-2 lg:p-5">
                <div className='relative w-full aspect-square flex items-center justify-center h-full'>
                  <div
                    className='w-full aspect-square border-gradient-double blur-lg absolute inset-0 -z-10'
                  />
                  <div className='flex flex-col items-center justify-center h-full w-full text-white'>
                    <p className='font-inter-bold font-bold text-2xl xl:text-5xl'>{timeLeft?.days ?? 0}</p>
                    <p className='font-inter-regular text-[10px] xl:text-sm'>Days</p>
                  </div>
                </div>
                <div className='relative w-full aspect-square flex items-center justify-center h-full'>
                  <div
                    className='w-full aspect-square border-gradient-double blur-lg absolute inset-0 -z-10'
                  />
                  <div className='flex flex-col items-center justify-center h-full w-full text-white'>
                    <p className='font-inter-bold font-bold text-2xl xl:text-5xl'>{timeLeft?.hours ?? 0}</p>
                    <p className='font-inter-regular text-[10px] xl:text-sm'>Hours</p>
                  </div>
                </div>
                <div className='relative w-full aspect-square flex items-center justify-center h-full'>
                  <div
                    className='w-full aspect-square border-gradient-double blur-lg absolute inset-0 -z-10'
                  />
                  <div className='flex flex-col items-center justify-center h-full w-full text-white'>
                    <p className='font-inter-bold font-bold text-2xl xl:text-5xl'>{timeLeft?.minutes ?? 0}</p>
                    <p className='font-inter-regular text-[10px] xl:text-sm'>Minutes</p>
                  </div>
                </div>
                <div className='relative w-full aspect-square flex items-center justify-center h-full'>
                  <div
                    className='w-full aspect-square border-gradient-double blur-lg absolute inset-0 -z-10'
                  />
                  <div className='flex flex-col items-center justify-center h-full w-full text-white'>
                    <p className='font-inter-bold font-bold text-2xl xl:text-5xl'>{timeLeft?.seconds ?? 0}</p>
                    <p className='font-inter-regular text-[10px] xl:text-sm'>Seconds</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-10 xl:gap-[74px]">
              <Link href="https://www.facebook.com/DrizyStudio">
                <img src={facebook.src} />
              </Link>
              <Link href="https://www.instagram.com/drizy_craft/">
                <img src={instagram.src} />
              </Link>
              <Link href="https://id.pinterest.com/Drizy_Studio/">
                <img src={pinterest.src} />
              </Link>
              <Link href="https://www.tiktok.com/@drizystudio">
                <img src={behance.src} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
