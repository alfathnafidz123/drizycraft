'use client';

import dynamic from "next/dynamic";
import { useState } from "react";

import { useAppSelector } from "@/lib/store";

import NextImage from "@/components/NextImage";

import { breezyBanner, breezyCloseBanner, breezyLogoBanner } from "~/images";
const BreezyMemberModal = dynamic(() => import("@/components/modals/breezy-member"));
const BreezyNonMemberModal = dynamic(() => import("@/components/modals/breezy-non-member"));

const BreezyBanner = () => {
  const { token } = useAppSelector(state => state.user);
  const { activeSubcription } = useAppSelector(state => state.subs);
  const [show, setShow] = useState(true);
  const [showMember, setShowMember] = useState(false);
  const [showNonMember, setShowNonMember] = useState(false);

  const handleShowModal = () => {
    if (token && activeSubcription) {
      setShowMember(true);
    } else {
      setShowNonMember(true);
    }
  }

  return token && show ? (
    <>
      <div className='bg-[#61A9FA] w-full relative flex items-center justify-center py-8'>
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center object-cover xl:object-contain">
          <NextImage priority={true} loading="eager" width={1000} height={200} alt='Breezy Banner' quality={70} src={breezyBanner.src} className='object-cover xl:object-contain h-full' classNames={{ image: 'h-full object-cover xl:object-contain' }} />
        </div>
        <div className='flex flex-row gap-2 lg:gap-[43px] w-full items-center justify-center z-10 max-md:px-4'>
          <div className='flex flex-col lg:flex-row gap-2 lg:gap-[43px] lg:items-center justify-center max-md:flex-1'>
            <p className='font-katide-regular text-[#1A214C] font-normal text-base max-w-[332px] text-start mt-2 lg:order-1 order-2'><span className='font-katide-semibold font-bold'>Unlimited access</span> to thousands of daily refreshed assets with easy drag-and-drop</p>
            <NextImage priority={true} loading="eager" width={200} height={100} alt='Breezy Logo' src={breezyLogoBanner.src} className="lg:order-2 order-1" />
            <div onClick={handleShowModal} className='order-3 cursor-pointer flex rounded-lg border-2 border-[#FFDE9F] bg-[#FFBB3C] px-4 py-2 shadow-lg font-katide-bold w-fit'>
              ACCESS HERE!
            </div>
          </div>
          <NextImage onClick={() => setShow(false)} width={40} height={40} alt='close banner' src={breezyCloseBanner.src} className='cursor-pointer' />
        </div>
      </div>
      <BreezyMemberModal isOpen={showMember} onClose={() => setShowMember(false)} />
      <BreezyNonMemberModal isOpen={showNonMember} onClose={() => setShowNonMember(false)} />
    </>
  ) : null
}

export default BreezyBanner;