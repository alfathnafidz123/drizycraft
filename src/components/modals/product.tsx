/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx
'use client';
import { FaAngleRight } from '@react-icons/all-files/fa6/FaAngleRight';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCart } from '@/lib/slices/cart';
import { fetchSubs } from '@/lib/slices/subcription';
import { fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import NextImage from '@/components/NextImage';

import { OrderI, productI } from '@/interfaces/product.interface';

import { hoverPinterest, hoverWA, projectStars } from '~/images';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: productI;
}

const ModalProduct: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const { token, dataUser, activeSubcription } = useAppSelector((state) => ({
  //   ...state.user,
  //   ...state.subs,
  // }));
  const dataUserState = useAppSelector(state => state.user);
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const token = useMemo(() => {
    return dataUserState.token;
  }, [dataUserState.token]);
  const dataUser = useMemo(() => {
    return dataUserState.dataUser;
  }, [dataUserState.dataUser]);
  const activeSubcription = useMemo(() => {
    return activeSubcriptionState;
  }, [activeSubcriptionState]);
  const [type, setType] = useState(0);
  const [isDiscount, setIsDiscount] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trackEvent } = PixelEventsHooks();

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
    if (activeSubcription && dataUser?.coin && dataUser?.coin !== 0) {
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
    if (token) {
      if (activeSubcription.activeSubcription) {
        handleBuyPoint();
      } else handleCart();
    } else {
      dispatch(setOpenModal(true));
      closeModal();
    }
  };

  const getTransactionData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=500`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orders: OrderI[] = res.data.data;
      const found = orders.find(item => item.productId === product?.id);
      if (found) {
        await handleDownloadClick(found.id);
        await trackEvent(EventsEnum.Download, { productId: product?.id, productName: product?.name });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleDownloadClick = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-file-download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to download file: ${res.statusText}`);
      }
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      let fileName = `${product?.name}.zip`;
      const contentDisposition = res.headers.get('content-disposition');
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches && matches.length === 2) {
          fileName = matches[1];
        }
      }
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  }

  const handleBuyPoint = async () => {
    try {
      setLoading(true);
      const payload: { [key: string]: string | number } = {
        productId: product!.id,
        licenseType: type,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/buy-with-coin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchProfile(token!));
      dispatch(fetchSubs(token!));
      await trackEvent(EventsEnum.Purchase, { productId: product?.id, productName: product?.name, productPrice: product?.coinPrice[type], paymentType: 'coin' });
      await getTransactionData();
      toast.success(`Successfully buy ${product?.name}!`);
    } catch (error: any) {
      if (error.response?.data) {
        const responseData = error.response.data as any;
        toast(responseData.message);
        if (responseData.statusCode === 409) {
          router.push('/profile/download');
        }
      } else {
        toast(
          'Server error, please reach out to the administrator'
        );
      }
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
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/cart`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await trackEvent(EventsEnum.AddToCart, { productId: product?.id, productName: product?.name });
      closeModal();
      dispatch(fetchCart(token!));
    } catch (error: any) {
      const err = error as AxiosError;
      if (err.response?.data) {
        const responseData = err.response.data as any;
        toast(responseData.message);
        if (responseData.statusCode === 409) {
          router.push('/profile/download');
        }
      } else {
        toast(
          'Server error, please reach out to the administrator'
        );
      }
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
          className='!fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {isOpen && (
        <div className='!fixed max-md:left-0 top-0 z-50 transform overflow-hidden rounded-xl bg-white shadow-lg max-md:flex max-md:h-screen max-md:w-full max-md:items-center max-md:justify-center max-md:overflow-y-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <div className='flex w-full flex-col gap-4 pt-5 max-md:mx-2 lg:h-[450px] lg:w-[889px] lg:flex-row lg:gap-8 lg:pl-5'>
            <div
              className='flex cursor-pointer flex-row justify-end lg:hidden'
              onClick={closeModal}
            >
              <MdClose className='h-8 w-8' />
            </div>
            <div className='flex flex-col justify-center'>
              {product?.imageUrl[0] &&
                <NextImage
                  alt={product?.name ?? ''}
                  loading='lazy'
                  src={product?.imageUrl[0]}
                  width={310}
                  height={450}
                  className='h-[310px] w-[450px] object-cover'
                  classNames={{
                    image: 'h-[310px] w-[450px] object-contain'
                  }}
                  useSkeleton
                />
              }
              <div className='mt-3 flex flex-row max-md:justify-end lg:mt-8 lg:pb-6 max-md:px-2'>
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
            <div className='flex w-full flex-col lg:w-[40%] max-md:px-2'>
              <div className='flex flex-col'>
                <p className='font-katide-bold text-[24px] leading-[36px] text-[#1A204C] text-start'>
                  {product?.name}
                </p>
              </div>
              <div className='mt-4 flex max-md:justify-between lg:mt-[12%] lg:gap-[24%]'>
                <div className='flex flex-col text-start'>
                  <p className=' font-katide-semibold text-[14px] text-[#A1A1A1]'>
                    Price
                  </p>
                  <div className='flex flex-row gap-1'>
                    {isDiscount &&
                      !(
                        activeSubcription &&
                        dataUser?.coin &&
                        dataUser?.coin !== 0
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
                <div className='flex flex-col text-start'>
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

              {dataUser?.coin === 0 ?
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
                : <div className='h-20' />
              }

              <div className='mt-[13%] flex flex-row justify-between'>
                <button
                  onClick={handleBuy}
                  className='inline-flex h-9 w-44 items-center justify-center rounded-lg bg-[#2A3B80] hover:bg-[#132159]'
                  disabled={loading}
                  id='handle-buy'
                  aria-label={`Buy ${product?.name}`}
                >
                  {loading ? (
                    <Loader color='#fff' className='animate-spin' />
                  ) : (
                    <div className='font-katide-bold text-right text-sm tracking-[1%] text-white'>
                      {activeSubcription.activeSubcription
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

export default memo(ModalProduct);
