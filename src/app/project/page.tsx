/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import Project from '@/components/Project';

import {
  projectImage,
  projectShare,
  projectSign,
  projectSubscribe,
  projectUpload,
} from '~/images';


// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setToken({ token: 'testing token' }));
  }, []);

  return (
    <main>
      <section className='flex flex-row justify-between'>
        <div className='flex-col p-[6%] pl-[10%]'>
          <p className='text-[24px] font-katide-bold'>Collect coins and earn more Drizy designs</p>
          <p className='text-[16px] font-katide-regular mt-6'>
          Become a member of Drizy and earn coins by simply sharing <br/>photos of your projects.
          </p>
            <div className='flex flex-row mt-6'>
              <img src={projectSign.src}/>
              <p className='self-center pl-5'><b>Sign up:</b> <span className='text-[#4065D1] cursor-pointer'>Create an account</span></p>
            </div>
            <div className='flex flex-row mt-6'>
              <img src={projectSubscribe.src}/>
              <p className='self-center pl-5'><b>Subscribe:</b> Select one of our membership plans. <br/>Don't worry, we offer a <b>free trial</b> for you.<span className='text-[#4065D1] cursor-pointer'> Just click here!</span></p>
            </div>
            <div className='flex flex-row mt-6'>
              <img src={projectShare.src}/>
              <p className='self-center pl-5'><b>Share:</b> Upload pictures of your projects to earn <b>Drizy Coins.</b></p>
            </div>
        </div>
        <img src={projectImage.src} className='p-[6%]'/>
      </section>

      <section className='flex gap-5 bg-[#EBECF5] p-[6%] pl-[10%]'>
        <div className="px-8 py-8 text-center rounded-xl bg-white bg-opacity-30 shadow-lg w-[369px] h-[456px] text-indigo-950 text-opacity-20 cursor-pointer hover:bg-white">
        <div className="flex flex-col py-12 rounded-xl border-2 border-dashed border-black border-opacity-10">
          <img loading="lazy" src={projectUpload.src} className="self-center mt-24"
          />
          <div className="mt-4 mb-16"> Upload your project results<br />and get Drizy Coins!</div>
        </div>
        </div>

        <Project />
      </section>
    </main>
  );
}
