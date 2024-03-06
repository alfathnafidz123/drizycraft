/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalUploadSuccess: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const closeModal = () => {
    onClose && onClose();
  };

  return (
    <div>
      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={closeModal}
          className='fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {isOpen && (
        <div className='fixed left-1/2 top-1/2 z-30 h-[221px] w-[490px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-3xl bg-white shadow-lg'>
          <div>
            <div className='flex flex-row-reverse items-center justify-between bg-[#E5F6FB] px-4 py-2'>
              <IoCloseCircleOutline
                className='text-[#4065D1]'
                size={30}
                onClick={closeModal}
              />
              <p className='font-katide-bold pl-10 text-[#1A214C]'>
                Upload Successful!
              </p>
              <div />
            </div>
            <p className='mx-auto p-8 text-center text-[14px]'>
              <b>Thank you for sharing your project with Drizy!</b>
              <br />
              <br />
              We will need a maximum of 3 days to review it before it is
              published. In the meantime, you can check the history and upload
              status of your projects by
              <span className='cursor-pointer text-[#4065D1]'>
                clicking here .
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalUploadSuccess;
