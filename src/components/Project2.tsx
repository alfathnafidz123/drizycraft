/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaPinterest } from '@react-icons/all-files/fa/FaPinterest';
import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp';
import { FaXTwitter } from '@react-icons/all-files/fa6/FaXTwitter';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import NextImage from '@/components/NextImage';

import { CrafterI } from '@/interfaces/crafter.interfaces';

import { defaultAvatar, projectLike, projectShare1, projectStars } from '~/images';
interface ModalProps {
  onClick: () => void;
  onLike: (id: string) => void;
  item: CrafterI;
}
const Project: React.FC<ModalProps> = ({ onClick, item, onLike }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const onItemClick = () => {
    onClick && onClick();
  };

  const handleInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.user.displayName,
          text: item.description,
          url: item.imageUrl,
        })
      } catch (error) {
        toast.error(`Failed to share`)
      }
    } else {
      toast.error('Your Browser not supported for share')
      // window.open(`https://www.instagram.com`, '_blank')
    }

  }

  return (
    <div className='flex h-auto w-full sm:w-[300px] cursor-pointer flex-col rounded-xl bg-white px-2 py-2 shadow-lg'>
      <div className='relative '>
        <NextImage
          src={item.imageUrl as string}
          width={300}
          height={205}
          alt='gambar'
          className='w-full h-auto rounded-lg object-cover'
          classNames={{ image: 'w-full h-auto rounded-lg object-cover' }}
          priority={false}
        />
        {/* Konten By di kiri atas */}
        <div className='absolute left-2 top-2 z-10 flex items-center rounded-full bg-white/80 px-3 py-1 text-[12px] text-[#1A204C] shadow-sm'>
          <img
            loading='lazy'
            src={item.user.avatar ?? defaultAvatar.src}
            className='w-6 h-6 rounded-full mr-2'
          />
          <span className='mr-1'>By</span>
          <span className='font-katide-bold'>{item?.user?.displayName}</span>
        </div>

        {/* Overlay for "Click for detail" */}
        <div onClick={onItemClick} className='font-katide-bold absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/50 text-white opacity-0 hover:opacity-100'>
          Click for detail
        </div>

        {/* Share buttons */}
        {isPopoverOpen && (
          <div className="absolute top-0 right-0 z-20 h-full">
            <div className='flex h-full w-[45px] flex-col items-center justify-between rounded-lg bg-black/60 p-3 pt-5 text-white'>
              <div className='group cursor-pointer' onClick={handleInstagram}>
                <FaInstagram className='h-[22px] w-[22px] aspect-square group-hover:text-[#FFBB3C]' />
              </div>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_URL}/project`} target='_blank'>
                <FaWhatsapp className='h-[22px] w-[22px] aspect-square' />
              </Link>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://twitter.com/intent/tweet?text=${item.description}&url=${process.env.NEXT_PUBLIC_URL}/project?id=${item.id}&hashtags=DrizyCraft`} target='_blank'>
                <FaXTwitter className='h-[22px] w-[22px] aspect-square' />
              </Link>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/project?id=${item.id}&quote=${item.description}`} target='_blank'>
                <FaFacebook className='h-[22px] w-[22px] aspect-square' />
              </Link>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://pinterest.com/pin/create/button/?description=${item.description}&url=${process.env.NEXT_PUBLIC_URL}/project?id=${item.id}&media=${item.imageUrl}`} target='_blank'>
                <FaPinterest className='h-[22px] w-[22px] aspect-square' />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className='flex justify-between px-2'>
        <div className='mt-3 flex'>
          {Array.from({ length: 5 }, (_, index) => (
            <img
              loading='lazy'
              key={index}
              src={projectStars.src}
              className='my-auto'
            />
          ))}
        </div>
        <div className='mt-4 flex justify-between text-center '>
          <Link
            href='/project'
            className='font-katide-regular flex items-center justify-center h-[40px] px-4 py-1 rounded-full z-10 bg-[#1A204C] text-white text-sm hover:bg-[#2c357a] transition-all'
          >
            Find Out More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Project;
