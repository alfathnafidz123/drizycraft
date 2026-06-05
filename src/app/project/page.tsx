/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { IoChevronDown } from '@react-icons/all-files/io5/IoChevronDown';
import { Loader } from 'lucide-react';
import Link from 'next/link';
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
import { CrafterI } from '@/interfaces/crafter.interfaces';

import {
  projectImage,
  projectShare,
  projectSign,
  projectSubscribe,
  projectUpload,
} from '~/images';

interface ModalProps {
  onClick: () => void;
  onLike: (id: string) => void;
  item: CrafterI;
}

export default function Register() {
  const { token, dataUser } = useAppSelector((state) => state.user);
  const [crafterData, setCrafterData] = useState<CrafterI[]>([]);
  const [isPopUpShow, setIsPopUpShow] = useState(false);
  const [isUploadSuccessShow, setIsUploadSuccessShow] = useState(false);
  const [isProjectDetailShow, setIsProjectDetailShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { activeSubcription } = useAppSelector(state => state.subs);
  const [params, setParams] = useState({ page: 1, limit: 12 });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const getCrafter = async () => {
    try {
      setLoading(true);
      const response = await getAllCrafter(params);
      setCrafterData(prev => ([...prev, ...response.data]));
      setHasMore(response.meta.hasNextPage);
    } catch (error) {
      toast('Error when trying to get crafter');
    } finally {
      setLoading(false)
    }
  };

  const likeCrafterPost = async (id: string) => {
    try {
      await likeCrafter({
        token,
        crafterId: id,
      });

      setCrafterData((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;

          const alreadyLiked = item.likes?.some(
            (l) => l.user?.id === dataUser?.id
          );

          return {
            ...item,
            likeCount: alreadyLiked
              ? item.likeCount - 1
              : item.likeCount + 1,
            likes: alreadyLiked
              ? item.likes.filter((l) => l.user?.id !== dataUser?.id)
              : [
                ...item.likes,
                {
                  user: dataUser, // ✅ FIX STRUCTURE
                },
              ],
          };
        })
      );
    } catch (error) {
      toast("Failed to like project");
    }
  };

  useEffect(() => {
    getCrafter();
  }, [params.page]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("upload") === "success") {
      setIsUploadSuccessShow(true);
    }
  }, []);

  return (
    <main>
      <ModalUploadProject
        isOpen={isPopUpShow}
        onClose={() => setIsPopUpShow(false)}
        onSuccess={() => setIsUploadSuccessShow(true)}
      />
      {(crafterData && isProjectDetailShow) && (
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
      {!activeSubcription &&
        <section className='flex flex-col justify-between max-md:gap-14 lg:flex-row max-w-[1164px] mx-auto py-10 px-2 lg:px-0'>
          <div className='flex-col'>
            <p className='font-katide-bold text-[24px] leading-normal'>
              Collect coins and earn more Drizy designs
            </p>
            <p className='font-katide-regular mt-6 text-[16px]'>
              Become a member of Drizy and earn coins by simply sharing <br />
              photos of your projects.
            </p>
            <div className='mt-6 flex flex-row'>
              <img src={projectSign.src} loading='lazy' />
              <Link href="/register" className='self-center pl-5'>
                <b>Sign up: </b>
                <span className='cursor-pointer text-[#4065D1]'>
                  Create an account
                </span>
              </Link>
            </div>
            <div className='mt-6 flex flex-row'>
              <img src={projectSubscribe.src} loading='lazy' />
              <p className='self-center pl-5'>
                <b>Subscribe:</b> Select one of our membership plans. <br />
                Don't worry, we offer a <b>free trial</b> for you.{" "}
                <Link type='span' href="/membership" className='cursor-pointer text-[#4065D1]'>
                  Just click here!
                </Link>
              </p>
            </div>
            <div className='mt-6 flex flex-row'>
              <img src={projectShare.src} loading='lazy'/>
              <p className='self-center pl-5'>
                <b>Share:</b> Upload pictures of your projects to earn
                <b> Drizy Coins.</b>
              </p>
            </div>
          </div>
          <img src={projectImage.src} className='' loading='lazy' />
        </section>
      }
      <div className='bg-[#EBECF5] w-full'>
        <section className='flex flex-wrap justify-center gap-5 p-2 xl:pt-20 max-w-[1164px] mx-auto'>
          {activeSubcription &&
            <div
              // onClick={() => setIsPopUpShow(true)}
              onClick={() => window.location.href = `/project/create/`}
              className='h-[456px] w-[369px] cursor-pointer rounded-xl bg-white bg-opacity-30 px-8 py-8 text-center text-indigo-950 text-opacity-20 shadow-lg hover:bg-white'
            >
              <div className='flex flex-col rounded-xl border-2 border-dashed border-black border-opacity-10 py-12'>
                <img
                  loading='lazy'
                  src={projectUpload.src}
                  className='mt-24 self-center'
                  alt='upload project'
                />
                <div className='mb-16 mt-4'>
                  Upload your project results
                  <br />
                  and get Drizy Coins!
                </div>
              </div>
            </div>
          }

          {crafterData.map((data, index) => {
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
        {hasMore &&
          <div onClick={() => { !loading ? setParams(prev => ({ ...prev, page: prev.page + 1 })) : null }} className='flex items-center justify-center cursor-pointer text-center py-10'>
            {loading
              ? <Loader className='animate-spin' />
              :
              <div className='flex flex-row gap-1 items-center justify-center transition-all hover:text-white bg-white hover:bg-[#61A9FA] rounded-full px-3 py-1 border-black border'>
                <p>Load More</p>
                <IoChevronDown />
              </div>}
          </div>
        }
      </div>
    </main>
  );
}
