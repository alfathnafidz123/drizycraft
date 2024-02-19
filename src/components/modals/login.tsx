/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import Link from 'next/link';
import React from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import { loginImage } from '~/images';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogin: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
        <div className='fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-[#E5F6FB] p-8 shadow-lg'>
          <div className='flex gap-16'>
            <div className='flex flex-col justify-between gap-8'>
              <img src={loginImage.src} alt='login' />
              <p className='text-grey-900'>
                New User?
                <Link href='/register'>
                  <span className='text=[#1A214C] ml-5 text-lg font-semibold'>
                    Register
                  </span>
                </Link>
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text=[#1A214C] mb-4 ml-5 text-lg font-semibold'>
                Login
              </p>
              <input
                type='text'
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Username or email address'
              ></input>
              <input
                type='text'
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Password'
              ></input>
              <div className='flex items-center gap-2 p-4'>
                <input
                  type='checkbox'
                  className='border-grey-700 h-4 w-4 appearance-none rounded-full border-2 checked:border-transparent checked:bg-gray-700 focus:border-gray-700 focus:outline-none'
                />
                <p className='text-grey-700'>Remember me</p>
              </div>
              <div className='mb-8 flex items-center gap-8'>
                <button className='rounded-full bg-[#1A214C] px-6 py-2 font-semibold text-white'>
                  LOGIN
                </button>
                <p className='text-grey-700'>Lost your password?</p>
              </div>
              <button className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1]'>
                <FaFacebookF style={{ color: '#4065D1' }} />
                <p>Login with Facebook</p>
              </button>
              <button className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#1A214C] px-6 py-2 font-semibold text-[#1A214C]'>
                <FcGoogle />
                <p>Login with Facebook</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalLogin;
