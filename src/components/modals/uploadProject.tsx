/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { SingleValue } from 'react-select';
import Select from 'react-select/async';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { SortType } from '@/app/api/product/getProduct';

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
  const { token } = useAppSelector(state => state.user);
  const [image, setImage] = useState<FileList>();
  const [products, setProducts] = useState<SingleValue<{
    label: string;
    value: string;
  }>[]>([]);
  const [description, setDescription] = useState('');
  const closeModal = () => {
    onClose && onClose();
  };
  const successUpload = () => {
    onSuccess && onSuccess();
  };

  const getProducts = async (search: string) => {
    try {
      // if (search.includes('#')) {

      // } else {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product`, {
        params: {
          page: 1,
          limit: 10,
          search,
          sortType: SortType.Latest
        }
      });
      return res.data.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      // }
    } catch (error) {
      return [];
    }
  }

  const loadOptions = (inputValue: string) =>
    new Promise<{ label: string, value: string }[]>((resolve) => {
      resolve(getProducts(inputValue));
    });

  const handleSubmit = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("file", image![0]);
      bodyFormData.append("type", "OTHER_URL");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDIA_URL}/image`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          body: bodyFormData,
        },
      );
      const imgResponse = await response.json();
      const imageUrl = imgResponse.data.filename;

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter`,
        {
          "description": description,
          "imageUrl": imageUrl,
          "productIds": products.map(item => item?.value)
        },
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      onClose();
      successUpload();
    } catch (error) {
      toast.error('Upload Project Failed')
    }
  }
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
        <div className='fixed left-0 top-0 z-30 transform overflow-hidden rounded-3xl bg-white shadow-lg max-md:h-screen max-md:w-full max-md:overflow-y-scroll lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <div className='flex flex-col'>
            <div className='flex flex-row-reverse items-center justify-between bg-[#E5F6FB] px-4 py-2 max-md:w-full'>
              <IoCloseCircleOutline
                onClick={closeModal}
                className='text-[#4065D1]'
                size={30}
              />
              <p className='font-semibold text-[#1A214C]'>Upload Project</p>
              <div />
            </div>
            <div className='flex flex-col gap-8 p-2 lg:flex-row lg:p-8'>
              <div className='flex w-full flex-col items-end justify-center gap-4'>
                {image ?
                  <label htmlFor='chooseImage' className='flex h-[200px] w-full items-center justify-center rounded-xl bg-gray-100 p-4 lg:h-[400px] lg:w-[600px]'>
                    <img alt='project image' src={URL.createObjectURL(image[0])} className='w-full h-full object-cover' />
                  </label>
                  :
                  <label htmlFor='chooseImage' className='flex h-[200px] w-full items-center justify-center rounded-xl bg-gray-100 p-4 lg:h-[400px] lg:w-[600px]'>
                    <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 border-opacity-25 px-8'>
                      <FaPlusSquare className='text-gray-300' size={70} />
                      <p className='text-sm text-gray-300'>
                        Upload Image Project Result
                      </p>
                    </div>
                  </label>
                }
                <input type='file' className='hidden' id='chooseImage' accept='image/*' onChange={(e) => { if (e.target.files) setImage(e.target.files) }} />
                <button
                  onClick={handleSubmit}
                  className='flex max-w-[100px] items-center gap-2 rounded-full bg-[#61A9FA] px-6 py-3 font-semibold text-white max-md:hidden'
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
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className='my-2 h-[150px] w-full rounded-lg border border-gray-300 bg-gray-100 p-4 placeholder:text-gray-300 lg:w-[350px]'
                    placeholder='Add description here'
                    required
                  ></textarea>
                </div>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Search product 1
                  </label>
                  <Select cacheOptions loadOptions={loadOptions} defaultOptions onChange={(e) => setProducts(prev => [...prev, e])} />
                </div>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Search product 2
                  </label>
                  <Select cacheOptions loadOptions={loadOptions} defaultOptions onChange={(e) => setProducts(prev => [...prev, e])} />
                </div>
                <div className='flex flex-col'>
                  <label className='pl-4 font-semibold text-[#1A214C]'>
                    Search product 3
                  </label>
                  <Select cacheOptions loadOptions={loadOptions} defaultOptions onChange={(e) => setProducts(prev => [...prev, e])} />
                </div>
                <p className='font-katide-light text-[#61A9FA]'>
                  *max 3 Product
                </p>
              </div>
            </div>
            <div className='mb-5 flex w-full px-2 lg:hidden'>
              <button
                onClick={handleSubmit}
                className='flex w-full items-center justify-center gap-2 rounded-full bg-[#61A9FA] px-6 py-3 font-semibold text-white'
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalUploadProject;
