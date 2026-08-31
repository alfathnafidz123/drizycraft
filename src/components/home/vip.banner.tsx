import Image from 'next/image';
import Link from 'next/link';

import { coffeeFloating } from '~/images';

export default function VIPBanner() {
  return (
    <div className='fixed bottom-4 right-3 z-20 hidden w-full items-end justify-end lg:flex'>
      <Link href="https://buymeacoffee.com/drizycraft" target="_blank" className='flex justify-end'>
        <Image src={coffeeFloating.src} alt='Help' width={75} height={75} />
      </Link>
      {/*<div className='flex items-center gap-16 rounded-lg border-2 border-[#FFDE9F] bg-[#EE4C73] px-8 py-4 font-semibold shadow-xl'>*/}
      {/*  <p className='text-white'>*/}
      {/*    Craft more,*/}
      {/*    <span className='text-[#FFBB3C]'> worry less</span>*/}
      {/*  </p>*/}
      {/*  <Link href="/membership" className='flex rounded-lg border-2 border-[#FFDE9F] bg-[#FFBB3C] px-4 py-2 shadow-lg'>*/}
      {/*    Get Exclusive<span className='font-base'></span>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </div>
  );
}
