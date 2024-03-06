/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ModalUploadProject: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const closeModal = () => {
    onClose && onClose();
  };
  const successUpload = () => {
    onSuccess && onSuccess();
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
        <div className='fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-3xl bg-white shadow-lg'>
          <div className='flex flex-col'>
            <div className='flex flex-row-reverse items-center justify-between bg-[#E5F6FB] px-4 py-2'>
              <IoCloseCircleOutline
                onClick={closeModal}
                className='text-[#4065D1]'
                size={30}
              />
              <p className='font-semibold text-[#1A214C]'>Upload Project</p>
              <div />
            </div>
            <div className='flex gap-8 p-8'>
              <div className='flex w-full flex-col items-end justify-center gap-4'>
                <div className='flex h-[400px] w-[600px] items-center justify-center rounded-xl bg-gray-100 p-4'>
                  <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 border-opacity-25 px-8'>
                    <FaPlusSquare className='text-gray-300' size={70} />
                    <p className='text-sm text-gray-300'>
                      Upload Image Project Result
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    successUpload();
                  }}
                  className='flex max-w-[100px] items-center gap-2 rounded-full bg-[#61A9FA] px-6 py-3 font-semibold text-white'
                >
                  Upload
                </button>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Description
                  </label>
                  <textarea
                    className='my-2 h-[150px] w-[350px] rounded-lg border border-gray-300 bg-gray-100 p-4 placeholder:text-gray-300'
                    placeholder='Add description here'
                    required
                  ></textarea>
                </div>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Search product 1
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      className='pl-18 my-2 w-[300px] rounded-full border border-gray-300 bg-gray-100 pl-16 placeholder:text-gray-300'
                      placeholder='Add description here'
                      required
                    ></input>
                    <div className='absolute left-4 top-0 flex h-full items-center gap-2 text-gray-300'>
                      <IoSearch size={25} />
                      <div className='h-1/3 w-[2px] bg-gray-300'></div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Search product 2
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      className='pl-18 my-2 w-[300px] rounded-full border border-gray-300 bg-gray-100 pl-16 placeholder:text-gray-300'
                      placeholder='Add description here'
                      required
                    ></input>
                    <div className='absolute left-4 top-0 flex h-full items-center gap-2 text-gray-300'>
                      <IoSearch size={25} />
                      <div className='h-1/3 w-[2px] bg-gray-300'></div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Search product 3
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      className='pl-18 my-2 w-[300px] rounded-full border border-gray-300 bg-gray-100 pl-16 placeholder:text-gray-300'
                      placeholder='Add description here'
                      required
                    ></input>
                    <div className='absolute left-4 top-0 flex h-full items-center gap-2 text-gray-300'>
                      <IoSearch size={25} />
                      <div className='h-1/3 w-[2px] bg-gray-300'></div>
                    </div>
                  </div>
                </div>
                <p className='font-katide-light text-[#61A9FA]'>
                  *max 3 Product
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalUploadProject;
