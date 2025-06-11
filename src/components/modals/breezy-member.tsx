'use client';

import Link from "next/link";

import { useAppSelector } from "@/lib/store";

import NextImage from "@/components/NextImage";

import { breezyCloseMember, breezyCoverPopup, breezyLogoBanner } from "~/images";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreezyMemberModal = ({ isOpen, onClose }: ModalProps) => {
  const { token } = useAppSelector(state => state.user);
  return (
    <div>
      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className='!fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {isOpen && (
        <div className='!fixed max-md:left-0 z-50 transform overflow-hidden rounded-xl bg-white shadow-lg max-md:flex max-md:w-full max-md:items-center max-md:justify-center max-md:overflow-y-auto lg:left-1/2 top-1/2 lg:-translate-x-1/2 -translate-y-1/2'>
          <div className='flex w-full flex-col max-md:mx-2 h-[440px] lg:w-[545px] lg:flex-row'>
            <NextImage src={breezyCoverPopup.src} width={172} height={440} alt="Crafter Cover" className="lg:flex-grow min-w-[172px] hidden lg:block" />
            <div className="flex flex-col lg:pl-10 lg:pr-5 pt-5">
              <div className="flex justify-end" onClick={onClose}>
                <NextImage src={breezyCloseMember.src} width={34} height={34} alt="Close Membership" className="cursor-pointer" />
              </div>
              <h1 className="text-[#1A214C] text-4xl font-katide-bold mt-6">Thank you for joining Drizy VIP+</h1>
              <p className="text-[#1A214C] text-sm mt-6 pr-5">You now have access to all our new features and premium products, including Drizy Breezy. Use your coins to snag premium products and enjoy the ease of <span className="font-katide-bold">Drizy Breezy!</span></p>
              <div className="flex flex-row justify-between items-center mt-20">
                <Link href={`https://breezy.drizycraft.com?token=${token}`} target='_blank' className='flex rounded-lg border-2 border-white bg-[#FFBB3C] px-4 py-2 shadow-lg font-katide-bold text-sm'>
                  ACCESS HERE!
                </Link>
                <NextImage width={142} height={30} alt='Breezy Logo' src={breezyLogoBanner.src} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BreezyMemberModal;