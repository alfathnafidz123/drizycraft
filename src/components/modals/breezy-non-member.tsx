import Link from "next/link";

import NextImage from "@/components/NextImage";

import { breezyCloseMember, breezyCloseNonMember, breezyCoverPopup } from "~/images";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreezyNonMemberModal = ({ isOpen, onClose }: ModalProps) => {
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
            <div className="flex flex-col lg:pl-10 lg:pr-5 pt-5 bg-[#FFBB3C]">
              <div className="flex justify-end" onClick={onClose}>
                <NextImage src={breezyCloseNonMember.src} width={34} height={34} alt="Close Membership" className="cursor-pointer" />
              </div>
              <p className="text-[#2A3B80] text-sm mt-6 pr-5 tracking-[4px]">DRIZY VIP+</p>
              <h1 className="text-[#1A214C] text-4xl font-katide-bold mt-6">This is Premium Feature</h1>
              <p className="text-[#2A3B80] text-sm mt-6 pr-5">Want access to Drizy Breezy? Join any Drizy VIP+ plan and unlock all the amazing features. Click the button below to get started—it’s quick and easy!</p>
              <div className="flex flex-row justify-between items-center mt-12">
                <Link href="/membership" className='flex rounded-lg border-2 text-white border-white bg-[#EE4C73] px-4 py-2 shadow-lg font-katide-bold text-sm'>
                  JOIN DRIZY VIP+
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BreezyNonMemberModal;