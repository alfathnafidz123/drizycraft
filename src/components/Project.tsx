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
    <div className='flex h-[456px] w-[369px] cursor-pointer flex-col rounded-xl bg-white px-8 py-4 shadow-lg'>
      <div className='flex items-center text-[14px] text-[#1A204C]'>
        <img
          loading='lazy'
          src={item.user.avatar ?? defaultAvatar.src}
          className='w-10 rounded-full mr-3'
        />
        <div className=''>By</div>
        <div className='font-katide-bold'>{item?.user?.displayName}</div>
      </div>
      <div className='relative mt-4'>
        <img
          loading='lazy'
          src={item.imageUrl as unknown as string}
          className='max-h-[205px] w-full object-cover rounded-lg'
          alt='gambar'
        />
        <div onClick={onItemClick} className='font-katide-bold absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-white opacity-0 hover:opacity-100 z-10'>
          Click for detail
        </div>
        {isPopoverOpen &&
          <div
            className="absolute top-0 right-0 z-20 h-full"
          >
            <div className='h-full w-[45px] rounded-lg bg-black/60 p-3 pt-5 text-white flex flex-col justify-between items-center'>
              <div className='group cursor-pointer' onClick={handleInstagram}>
                <FaInstagram className='group-hover:text-[#FFBB3C] aspect-square h-[22px] w-[22px]' />
              </div>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_URL}/project`} target='_blank'>
                <FaWhatsapp className='aspect-square h-[22px] w-[22px]' />
              </Link>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://twitter.com/intent/tweet?text=${item.description}&url=${process.env.NEXT_PUBLIC_URL}/project?id=${item.id}&hashtags=DrizyCraft`} target='_blank'>
                <FaXTwitter className='aspect-square h-[22px] w-[22px]' />
              </Link>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/project?id=${item.id}&quote=${item.description}`} target='_blank'>
                <FaFacebook className='aspect-square h-[22px] w-[22px]' />
              </Link>
              <Link className='mt-4 hover:text-[#FFBB3C]' href={`https://pinterest.com/pin/create/button/?description=${item.description}&url=${process.env.NEXT_PUBLIC_URL}/project?id=${item.id}&media=${item.imageUrl}`} target='_blank'>
                <FaPinterest className='aspect-square h-[22px] w-[22px]' />
              </Link>
            </div>
          </div>
        }
      </div>
      <div className='flex justify-between'>
        <div className='mt-5 flex'>
          {Array.from({ length: 5 }, (_, index) => (
            <img
              loading='lazy'
              key={index}
              src={projectStars.src}
              className='my-auto'
            />
          ))}
        </div>
        <div className='mt-5 flex justify-between gap-5 text-center '>
          <div
            className='flex w-[39px] flex-col'
            onClick={() => onLike(item.id)}
          >
            <div className='flex h-[40px] flex-col items-center justify-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'>
              <img
                loading='lazy'
                src={projectLike.src}
                className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
              />

            </div>
            <div className='font-katide-bold text-xs text-indigo-950'>
              {item.likeCount > 0 ? `${item.likeCount} Likes` : 'Like'}
            </div>
          </div>
          <div>
            <div
              className='flex h-[39px] w-[39px] cursor-pointer items-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'
              onClick={togglePopover}
            >
              <img
                loading='lazy'
                src={projectShare1.src}
                className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
              />
            </div>
            <div className='font-katide-bold text-xs text-indigo-950'>Share</div>
          </div>
        </div>
      </div>
      <div className='font-katide-regular mt-5 line-clamp-2 text-indigo-950' dangerouslySetInnerHTML={{ __html: item?.description.replaceAll("\n", "<br />") }} />
    </div>
  );
};

export default Project;
