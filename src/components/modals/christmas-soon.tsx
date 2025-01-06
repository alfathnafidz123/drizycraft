'use client'
import Link from 'next/link';
import React, { FC, useEffect, useRef, useState } from 'react';

import useCampaign from '@/lib/hooks/useSubmitCampaign';

import NextImage from '@/components/NextImage';

import { behance, christmasBanner, comingSoonNotify, comingSoonNotifyHover, facebook, instagram, pinterest } from '~/images';

const calculateTimeLeft = () => {
  const year = new Date().getFullYear();
  const difference = +new Date(`${year}-12-25`) - +new Date();

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


const ChristmasSoonModal: FC<{ onClose: () => void, open: boolean }> = ({ onClose, open }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { isSuccess, isLoading, handleCreate, register } = useCampaign('christmas');

  useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess])

  return (
    <div className='w-full h-screen flex items-center justify-center fixed z-[99999] bg-black/50'>
      <div
        style={{ backgroundImage: `url(${christmasBanner.src})` }}
        ref={ref}
        className='z-50 max-w-full lg:w-4/5 transform overflow-hidden rounded-[48px] bg-[#E5F6FB] shadow-lg lg:overflow-scroll bg-center bg-cover bg-no-repeat border-2 border-white max-lg:h-fit xl:aspect-[1300/750]'
      >
        <div className='w-full h-full relative'>
          <div className='w-full md:max-w-[620px] h-full flex flex-col justify-end gap-5 lg:justify-between ml-0 lg:ml-20'>
            <h1 className='text-[#1A214C] text-3xl lg:text-5xl font-bold font-inter-bold mt-20'>🎄We’re Coming Soon...!🎄</h1>
            <h2 className='text-[#4065D1] text-base lg:text-xl font-bold font-inter-bold '>A Magical Snowfall is Drifting Over Drizy Craft!</h2>
            <p className='text-[#1A214C] text-sm font-inter-regular font-light'>
              Something wondrous is happening behind the scenes, and it's coming closer with every twinkle... While we can't share all the details just yet, the whispers of a joyful new way to create are filling the air. This Christmas, get ready for a delightful upgrade to your creativity! Stay tuned, and keep this festive surprise under wraps... just a little longer.
            </p>
            <form onSubmit={handleCreate} className='relative'>
              <div
                className='w-full h-16 lg:h-20 border-gradient blur-lg absolute inset-0 -z-10'
              />
              <div
                className='w-full h-16 lg:h-20 bg-black/5 rounded-full blur-sm absolute inset-0 -z-20'
              />
              <div className='flex flex-row items-center justify-start w-full h-16 lg:h-20 pl-2 lg:pl-5'>
                <input disabled={isLoading} {...register('email')} type='email' className='placeholder:text-white placeholder:font-katide-regular bg-transparent border-none ring-0 focus:ring-0 text-white w-full' placeholder='Email Address' />
              </div>
              <button className='absolute -top-[34px] -right-[28px] lg:-right-[48px] lg:-top-[62px] group/notify cursor-pointer w-[200px] lg:w-fit lg:h-fit'>
                <NextImage width={306} height={212} alt='notify hover' src={comingSoonNotify.src} className='w-[200px] lg:w-fit lg:h-fit' classNames={{ image: 'group-hover/notify:hidden block w-[306px] lg212-fit lg:h-fit' }} />
                <NextImage width={306} height={212} alt='notify un-hover' src={comingSoonNotifyHover.src} className='w-[200px] lg:w-fit lg:h-fit' classNames={{ image: 'group-hover/notify:block hidden w-[200px] lg:w-fit lg:h-fit' }} />
              </button>
            </form>
            <div className='relative h-[90px] md:h-28 xl:h-36'>
              <div
                className='w-full h-[90px] md:h-28 xl:h-36 border-gradient-double blur-lg absolute inset-0 -z-10'
              />
              <div
                className='w-full h-[90px] md:h-28 xl:h-36 rounded-full bg-black/10 blur-sm absolute inset-0 -z-20'
              />
              <div className="w-full h-full grid grid-cols-4 gap-6 md:gap-20 lg:gap-6 p-2">
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
                <NextImage width={40} height={40} alt='facebook' src={facebook.src} />
              </Link>
              <Link href="https://www.instagram.com/drizy_craft/">
                <NextImage width={40} height={40} alt='instagram' src={instagram.src} />
              </Link>
              <Link href="https://id.pinterest.com/Drizy_Studio/">
                <NextImage width={40} height={40} alt='pinterest' src={pinterest.src} />
              </Link>
              <Link href="https://www.tiktok.com/@drizystudio">
                <NextImage width={40} height={40} alt='behance' src={behance.src} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChristmasSoonModal;
