/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx
'use client';
import axios from 'axios';
import { Loader } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { fetchProfile } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { productI } from '@/interfaces/product.interface';

import { hoverPinterest, hoverWA, projectStars } from '~/images';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: productI;
}

const ModalProduct: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token, dataUser, activeSubcription } = useAppSelector((state) => ({
    ...state.user,
    ...state.subs,
  }));
  const [type, setType] = useState(0);
  const [isDiscount, setIsDiscount] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    onClose && onClose();
  };

  useEffect(() => {
    if (product && product.discountPeriod) {
      setIsDiscount(
        moment(new Date(product.discountPeriod)).isAfter(new Date())
      );
    }
  }, [product]);

  const generatePrice = (): string => {
    let price = `$0`;
    if (activeSubcription && dataUser?.coin && dataUser?.coin > 0) {
      price = `${product?.coinPrice[type] ?? 0} Coin`;
    } else {
      if (isDiscount) {
        price = `$${product?.discount[type] ?? 0}`;
      } else {
        price = `$${product?.price[type] ?? 0}`;
      }
    }
    return price;
  };

  const handleBuy = async () => {
    if (activeSubcription && dataUser?.coin && dataUser?.coin > 0)
      handleBuyPoint();
    else handleCart();
  };

  const handleBuyPoint = async () => {
    try {
      setLoading(true);
      const payload: { [key: string]: string | number } = {
        productId: product!.id,
        licenseType: type,
      };
      await axios.post(
        `https://drizy-api.quadrakaryasantosa.com/billing/buy-with-coin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchProfile(token!));
      toast.success(`Successfully buy ${product?.name}!`);
      router.push('/profile/download');
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCart = async () => {
    try {
      setLoading(true);
      const payload: { [key: string]: string | number } = {
        productId: product!.id,
        licenseType: type,
      };
      await axios.post(
        `https://drizy-api.quadrakaryasantosa.com/crafter/cart`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/cart');
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    } finally {
      setLoading(false);
    }
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
        <div className='fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl bg-white shadow-lg'>
          <div className='flex h-[423px] w-[889px] gap-8 pl-5 pt-5'>
            <div className='flex flex-col justify-center'>
              <img
                alt={product?.name}
                loading='lazy'
                src={product?.imageUrl[0]}
                className='h-[310px] w-[450px] object-cover'
              />
              <div className='mt-8 flex flex-row pb-6'>
                <img
                  alt={`share-pinterest-${product?.name}`}
                  loading='lazy'
                  src={hoverPinterest.src}
                  className='flex h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-110'
                />
                <img
                  alt={`share-whatsapp-${product?.name}`}
                  src={hoverWA.src}
                  className='ml-3 flex h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-110'
                />
              </div>
            </div>
            <div className='flex w-[40%] flex-col'>
              <div className='flex flex-col'>
                <p className='font-katide-bold text-[24px] leading-[36px] text-[#1A204C]'>
                  {product?.name}
                </p>
              </div>
              <div className='mt-[12%] flex gap-[24%]'>
                <div className='flex flex-col'>
                  <p className=' font-katide-semibold text-[14px] text-[#A1A1A1]'>
                    Price
                  </p>
                  <div className='flex flex-row gap-1'>
                    {isDiscount &&
                    !(
                      activeSubcription &&
                      dataUser?.coin &&
                      dataUser?.coin > 0
                    ) ? (
                      <p className='font-katide-regular text-sm text-[#A1A1A1] line-through'>
                        ${product?.price[type]}
                      </p>
                    ) : null}
                    <p className='font-katide-semibold text-[24px] text-[#A1A1A1]'>
                      {generatePrice()}
                    </p>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p className='font-katide-semibold text-[14px] text-[#A1A1A1]'>
                    Reviews
                  </p>
                  <div className='flex'>
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                      alt='star-1'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                      alt='star-2'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                      alt='star-3'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                      alt='star-4'
                    />
                    <img
                      loading='lazy'
                      src={projectStars.src}
                      className='my-auto'
                      alt='star-5'
                    />
                  </div>
                </div>
              </div>

              <div className='mt-5 flex flex-col gap-4'>
                <p className='font-katide-semibold text-[14px] text-[#A1A1A1]'>
                  Select License
                </p>
                <div className='flex gap-5'>
                  <button
                    id='select-type-1'
                    aria-label='select personal license'
                    onClick={() => {
                      setType(0);
                    }}
                    className={
                      type === 0
                        ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb]'
                        : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1]'
                    }
                  >
                    Personal
                  </button>
                  <button
                    id='select-type-1'
                    aria-label='select commercial license'
                    onClick={() => {
                      setType(1);
                    }}
                    className={
                      type === 1
                        ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb]'
                        : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1]'
                    }
                  >
                    Commercial
                  </button>
                  <button
                    id='select-type-1'
                    aria-label='select business license'
                    onClick={() => {
                      setType(2);
                    }}
                    className={
                      type === 2
                        ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb]'
                        : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1]'
                    }
                  >
                    Business
                  </button>
                </div>
              </div>

              <div className='mt-[13%] flex flex-row justify-between'>
                <button
                  onClick={handleBuy}
                  className='inline-flex h-9 w-44 items-center justify-center rounded-lg bg-[#2A3B80] hover:bg-[#132159]'
                  disabled={loading}
                  id='handle-buy'
                  aria-label={`Buy ${product?.name}`}
                >
                  {loading ? (
                    <Loader color='#fff' />
                  ) : (
                    <div className='font-katide-bold text-right text-sm tracking-[1%] text-white'>
                      {activeSubcription && dataUser?.coin && dataUser?.coin > 0
                        ? 'Buy with coin'
                        : 'Add to cart'}
                    </div>
                  )}
                </button>
                <button
                  id='show-detail'
                  aria-label={`Show ${product?.name} detail`}
                  className='flex'
                  onClick={() =>
                    router.push(`/product/${product?.meta?.[0].title}`)
                  }
                >
                  <p className='font-katide-semibold mr-3 mt-2 text-[14px] text-[#1A214C] hover:underline'>
                    View full details
                  </p>
                  <FaAngleRight className='mt-[7%] text-[#1A214C]' />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalProduct;
