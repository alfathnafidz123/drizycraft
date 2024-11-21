'use client';
import localFont from "next/font/local";
import { toast } from "react-toastify";
const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });

const SubscribeFreebiesSection = () => {
  return (
    <section>
      <div className='header flex items-center justify-center bg-blue-400 px-16 py-12 max-md:px-5'>
        <div className='mt-6 flex w-[708px] max-w-full flex-col'>
          <p className='line-[20px] self-center text-center text-base text-indigo-950 max-md:max-w-[270px]'>
            <span className=''>Get </span>
            <span className={`font-bold text-indigo-950 ${myFont.className}`}>
              10% off
            </span>
            <span className=''> your order and abundle of </span>
            <span className={`font-bold text-indigo-950 ${myFont.className}`}>
              INSTANT FREEBIES!
            </span>
          </p>
          <div className='mt-7 flex w-full justify-between gap-0 whitespace-nowrap text-sm'>
            <input
              name='email'
              type='email'
              placeholder='Subscribe by email'
              className='grow items-start justify-center rounded-[60px_0px_0px_60px] bg-violet-100 px-16 py-2 leading-[186%] tracking-normal text-black max-md:px-5 lg:px-16 lg:py-7 placeholder:text-[#BDBDBD]'
            ></input>
            <button
              className='button font-katide-bold justify-center rounded-[0px_60px_60px_0px] bg-indigo-950 px-16 py-[22px] lg:py-7 text-center font-[14px] text-[#EBECF5] hover:bg-[#2A3B80] max-md:px-5'
              role='button'
              id='subscribe'
              aria-label='Subscribe'
              onClick={() => toast("Email subscribed")}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscribeFreebiesSection;