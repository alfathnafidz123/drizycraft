/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';

import { setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { addReview } from '@/app/api/product/addReview';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshReview: () => Promise<void>;
  productId?: string;
}

const ModalAddReview: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  refreshReview,
  productId,
}) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const params = useParams();
  const closeModal = () => {
    onClose && onClose();
  };
  const [star, setStar] = useState(0);
  const [text, setText] = useState('');

  const addProductReview = async () => {
    if (!token) {
      dispatch(setOpenModal(true));
    } else {
      await addReview({
        token: token as string,
        comment: text,
        star: star,
        productId: productId!,
      });
      refreshReview();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
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
              <p className='font-semibold text-[#1A214C]'>Rating Product</p>
              <div />
            </div>
            <p className='mt-12 w-full text-center text-[48px] font-bold'>
              Thank you
            </p>
            <p className='mt-6 w-full text-center text-[14px] font-bold'>
              for your rating
            </p>
            <div className='flex gap-8 p-8'>
              {/* <div className='flex w-full flex-col items-end justify-center gap-4'>
                <div className='flex h-[300px] w-[400px] items-center justify-center rounded-xl bg-gray-100 p-4'>
                  <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 border-opacity-25 px-8'>
                    <FaPlusSquare className='text-gray-300' size={70} />
                    <p className='text-sm text-gray-300'>
                      Upload Image Project Result
                    </p>
                  </div>
                </div>
              </div> */}
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <label className='text-[12px] font-semibold text-[#1A214C]'>
                    Please give your rating
                  </label>
                  <div className='mb-8 flex gap-4'>
                    <div className='flex items-center text-[#ED9B37]'>
                      {Array.from({ length: star }, (_, index) => (
                        <FaStar
                          key={index}
                          color='gold'
                          onClick={() => setStar(index + 1)}
                        />
                      ))}
                      {Array.from({ length: 5 - star }, (_, index) => (
                        <FaStar
                          key={star + index}
                          color='grey'
                          onClick={() => setStar(star + index + 1)}
                        />
                      ))}
                    </div>
                  </div>
                  <label className='text-[12px] font-semibold text-[#1A214C]'>
                    Please leave a review and post a rating
                  </label>
                  <textarea
                    value={text}
                    onChange={handleChange}
                    className='my-2 h-[150px] w-[350px] rounded-lg border border-gray-300 bg-gray-100 p-4 placeholder:text-gray-300'
                    placeholder='Add description here'
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                addProductReview();
                onClose();
              }}
              className='mb-4 flex items-center gap-2 self-center rounded-full bg-[#61A9FA] px-6 py-3 font-semibold text-white'
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAddReview;
