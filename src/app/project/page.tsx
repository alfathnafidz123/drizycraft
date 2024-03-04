/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import ModalUploadProject from '@/components/modals/uploadProject';
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
  const [isLoginShow, setLoginShow] = React.useState(false);
  return (
    <main>
      <ModalUploadProject
        isOpen={isLoginShow}
        onClose={() => setLoginShow(false)}
      />
      <section className='flex flex-row justify-between'>
        <div className='flex-col p-[6%] pl-[10%]'>
          <p className='font-katide-bold text-[24px]'>
            Collect coins and earn more Drizy designs
          </p>
          <p className='font-katide-regular mt-6 text-[16px]'>
            Become a member of Drizy and earn coins by simply sharing <br />
            photos of your projects.
          </p>
          <div className='mt-6 flex flex-row'>
            <img src={projectSign.src} />
            <p className='self-center pl-5'>
              <b>Sign up:</b>
              <span className='cursor-pointer text-[#4065D1]'> Create an account</span>
            </p>
          </div>
          <div className='mt-6 flex flex-row'>
            <img src={projectSubscribe.src} />
            <p className='self-center pl-5'>
              <b>Subscribe:</b> Select one of our membership plans. <br />
              Don't worry, we offer a <b>free trial</b> for you.
              <span className='cursor-pointer text-[#4065D1]'> Just click here!</span>
            </p>
          </div>
          <div className='mt-6 flex flex-row'>
            <img src={projectShare.src} />
            <p className='self-center pl-5'>
              <b>Share:</b> Upload pictures of your projects to earn
              <b> Drizy Coins.</b>
            </p>
          </div>
        </div>
        <img src={projectImage.src} className='p-[6%]' />
      </section>

      <section className='flex gap-5 bg-[#EBECF5] p-[6%] pl-[10%]'>
        <div
          onClick={() => setLoginShow(true)}
          className='h-[456px] w-[369px] cursor-pointer rounded-xl bg-white bg-opacity-30 px-8 py-8 text-center text-indigo-950 text-opacity-20 shadow-lg hover:bg-white'
        >
          <div className='flex flex-col rounded-xl border-2 border-dashed border-black border-opacity-10 py-12'>
            <img
              loading='lazy'
              src={projectUpload.src}
              className='mt-24 self-center'
            />
            <div className='mb-16 mt-4'>
              Upload your project results
              <br />
              and get Drizy Coins!
            </div>
          </div>
        </div>

        <Project />
      </section>

    </main>
  );
}
