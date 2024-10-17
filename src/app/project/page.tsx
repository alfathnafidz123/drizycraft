/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import ModalProjectDetail from '@/components/modals/projectDetail';
import ModalUploadProject from '@/components/modals/uploadProject';
import ModalUploadSuccess from '@/components/modals/uploadSuccess';
import Project from '@/components/Project';

import { getAllCrafter } from '@/app/api/product/getCrafter';
import { likeCrafter } from '@/app/api/product/likeCrafter';

import {
  projectImage,
  projectShare,
  projectSign,
  projectSubscribe,
  projectUpload,
} from '~/images';

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [crafterData, setCrafterData] = useState([]);
  const [isPopUpShow, setIsPopUpShow] = useState(false);
  const [isUploadSuccessShow, setIsUploadSuccessShow] = useState(false);
  const [isProjectDetailShow, setIsProjectDetailShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getCrafter = async () => {
    try {
      const response = await getAllCrafter({ page: 1, limit: 10 });
      setCrafterData(response.data);
    } catch (error) {
      toast('Error when trying to get crafter');
    }
  };

  const likeCrafterPost = async (id: string) => {
    await likeCrafter({
      token,
      crafterId: id,
    });
  };

  useEffect(() => {
    getCrafter();
  }, []);

  return (
    <main>
      <ModalUploadProject
        isOpen={isPopUpShow}
        onClose={() => setIsPopUpShow(false)}
        onSuccess={() => setIsUploadSuccessShow(true)}
      />
      {crafterData && (
        <ModalProjectDetail
          isOpen={isProjectDetailShow}
          onClose={() => setIsProjectDetailShow(false)}
          data={crafterData[selectedIndex]}
          onLike={likeCrafterPost}
        />
      )}
      <ModalUploadSuccess
        isOpen={isUploadSuccessShow}
        onClose={() => setIsUploadSuccessShow(false)}
      />
      <section className='flex flex-col justify-between lg:flex-row max-w-[1164px] mx-auto py-10'>
        <div className='flex-col'>
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
              <span className='cursor-pointer text-[#4065D1]'>
                Create an account
              </span>
            </p>
          </div>
          <div className='mt-6 flex flex-row'>
            <img src={projectSubscribe.src} />
            <p className='self-center pl-5'>
              <b>Subscribe:</b> Select one of our membership plans. <br />
              Don't worry, we offer a <b>free trial</b> for you.
              <span className='cursor-pointer text-[#4065D1]'>
                Just click here!
              </span>
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
        <img src={projectImage.src} className='' />
      </section>
      <section className='flex flex-wrap justify-center gap-5 bg-[#EBECF5] p-2 xl:p-20'>
        <div
          onClick={() => setIsPopUpShow(true)}
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

        {crafterData?.map((data, index) => {
          return (
            <Project
              key={index}
              item={data}
              onLike={likeCrafterPost}
              onClick={() => {
                setSelectedIndex(index);
                setIsProjectDetailShow(true);
              }}
            />
          );
        })}
      </section>
    </main>
  );
}
