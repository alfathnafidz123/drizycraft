/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCoin, fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import NextImage from '@/components/NextImage';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

import { itemPayment } from '@/app/api/billing/itemPayment';
import { OrderI, productI } from '@/interfaces/product.interface';

import {
  cartProduct,
  defaultAvatar,
  hoverPinterest,
  hoverWA,
  saleSvg,
} from '~/images';

interface ProductCardProps {
  data: productI;
  isSlider?: boolean;
  handleShowDetail?: (product: productI) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  isSlider = true,
  handleShowDetail,
}) => {
  const router = useRouter();
  // const { token: tokenState, dataUser: dataUserState, activeSubcription: activeSubcriptionState } = useAppSelector((state) => ({
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
  const [isDiscount, setIsDiscount] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { trackEvent } = PixelEventsHooks();

  useEffect(() => {
    if (data && data.discountPeriod) {
      setIsDiscount(moment(new Date(data.discountPeriod)).isAfter(new Date()));
    }
  }, [data]);

  const handleCart = async () => {
    handleShowDetail?.(data);
    // try {
    //   const payload: { [key: string]: string | number } = {
    //     productId: data.id,
    //     licenseType: 0,
    //   };
    //   if (token) {
    //     await axios.post(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/cart`,
    //       payload,
    //       { headers: { Authorization: `Bearer ${token}` } }
    //     );
    //     dispatch(fetchCart(token!));
    //     toast('Item added to cart!');
    //   } else {
    //     dispatch(setOpenModal(true));
    //   }
    // } catch (error: any) {
    //   toast.error('Add to cart failed, please reach out to the administrator');
    // }
  };

  const handleDownload = async () => {
    try {
      if (token) {
        if (activeSubcription.activeSubcription) {
          const payload: { [key: string]: string | number } = {
            productId: data.id,
            licenseType: 0,
          };
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/buy-with-coin`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          dispatch(fetchProfile(token!));
          dispatch(fetchCoin(token!));
          toast.success(`Successfully buy ${data?.name}!`);
          await getTransactionData();
        } else {
          const payment = await itemPayment({
            productId: [data.id],
            licenseType: [0],
            affiliateId: [''],
            token: token,
          });
          window.location.replace(payment.data);
        }
      } else {
        dispatch(setOpenModal(true));
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Error when generate payment!'
      );
    }
  };

  const getTransactionData = async () => {
    try {
      setDownloadLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=500`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orders: OrderI[] = res.data.data;
      const found = orders.find(item => item.productId === data?.id);
      if (found) {
        await handleDownloadClick(found.id);
        await trackEvent(EventsEnum.Download, { productId: data.id, productName: data.name });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setDownloadLoading(false);
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

      let fileName = `${data.name}.zip`;
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
  };

  const handleCTA = async () => {
    if (
      (activeSubcription.activeSubcription && data.coinPrice[0] === 0) ||
      (isDiscount && data.discount[0] === 0) ||
      data.price[0] === 0
    ) {
      if (token) {
        handleDownload();
      } else {
        dispatch(setOpenModal(true));
      }
    } else {
      router.push(`/product/${data?.meta?.[0].title}`);
    }
  };

  const generatePrice = (): string => {
    let price = `$0`;
    if (activeSubcription && dataUser?.coin && dataUser?.coin !== 0) {
      price = `${data?.coinPrice[0] ?? 0} Coin`;
    } else {
      if (isDiscount) {
        price = `$${data?.discount[0] ?? 0}`;
      } else {
        price = `$${data?.price[0] ?? 0}`;
      }
    }
    return price;
  };

  const generateCTA = (): string => {
    let wording = 'BUY NOW';
    if (activeSubcription.activeSubcription && data.coinPrice[0] === 0) {
      wording = 'DOWNLOAD NOW';
    } else {
      if ((isDiscount && data.discount[0] === 0) || data.price[0] === 0) {
        wording = 'DOWNLOAD NOW';
      }
    }
    return wording;
  };

  const generateSale = () => {
    if (activeSubcription && dataUser?.coin && dataUser?.coin !== 0) {
      return null;
    } else {
      if (isDiscount) {
        return (
          <img src={saleSvg.src} className='absolute right-6 top-0 z-50' />
        );
      } else {
        return null;
      }
    }
  };

  const containerClassNames = () => {
    const base = 'group relative w-full max-w-[100%] mx-auto lg:w-[294px]';

    if (data.author) {
      return `${base}`;
    }

    if (isSlider) {
      return `${base}`;
    }

    return base;
  };



  const cardClassNames = () => {
    if (!isSlider) {
      return ' flex h-auto w-full max-w-full mx-auto flex-col flex-nowrap items-start gap-[16px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-2 shadow-xl transition-none hover:border-[2px]';
    }
    if (data.author) {
      return ' flex h-auto w-full max-w-full mx-auto flex-col flex-nowrap items-start gap-[16px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-2 shadow-xl transition-none hover:border-[2px]';
    }
    return ' flex h-auto w-full max-w-full mx-auto flex-col flex-nowrap items-start gap-[16px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-2 shadow-xl transition-none hover:border-[2px]';
  };


  return (
    <>
      <div className={containerClassNames()}>
        {generateSale()}
        <div className={cardClassNames()}>
          <NextImage
            onClick={() => data?.meta?.[0]?.title && router.push(`/product/${data.meta[0].title}`)}
            src={data.imageUrl[0]}
            alt={data.name}
            height={180}
            width={260}
            quality={60}
            className='h-auto w-full rounded-[6px] object-cover '
            classNames={{ image: 'h-auto w-full rounded-[6px] object-cover' }}
            useSkeleton={true}
          />
          <Link href={data?.meta?.[0]?.title ? `/product/${data.meta[0].title}` : '#'} className='relative z-[2] flex h-[54px] shrink-0 items-start justify-start self-stretch overflow-hidden text-left lg:text-[16px] text-[14px] font-semibold leading-[17.6px] text-[#1a204c]'>
            {data.name}
          </Link>
          <div className='flex w-full justify-between gap-2'>
            <button
              id={`show-detail-${data.id}`}
              type='button'
              onClick={handleCTA}
              className='pointer z-[3] flex h-[37px] flex-grow flex-nowrap items-center justify-center gap-[8px] rounded-[8px] bg-[#2a3b80] pb-[12px] pl-[24px] pr-[24px] pt-[12px] group-hover:bg-[#4065D1]'
            >
              {downloadLoading ?
                <Loader className='animate-spin' />
                :
                <>
                  <span className='font-katide-bold z-[5] flex flex-row items-center gap-1 text-[20px] leading-[16px] text-[#fff] transition-all group-hover:scale-0'>
                    {isDiscount &&
                      !(activeSubcription && dataUser?.coin && dataUser?.coin !== 0) ? (
                      <p className='font-katide-regular text-sm text-white line-through'>
                        ${data?.price[0]}
                      </p>
                    ) : null}
                    {generatePrice()}
                  </span>
                  <span className='font-katide-bold absolute hidden items-center justify-center rounded-[8px] bg-[#4065D1] text-[16px] leading-[16px] group-hover:flex'>
                    <span className='scale-0 text-[#fff] group-hover:scale-100'>
                      {generateCTA()}
                    </span>
                  </span>
                </>
              }
            </button>
            <button
              id={`add-${data.id}-cart`}
              type='button'
              onClick={handleCart}
              className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white p-[12px] sm:pl-[24px] sm:pr-[24px]'
            >
              <img
                src={cartProduct.src}
                alt='cart'
                className='h-4 w-4 sm:h-5 sm:w-5' // kecil di mobile, normal di layar besar
              />
            </button>
          </div>
          {data.author?.name && (
            <div className='flex flex-row items-center gap-1.5'>
              <img
                src={
                  data.author.avatar && data.author.avatar !== ''
                    ? data.author.avatar
                    : defaultAvatar.src
                }
                alt={`Partner ${data.author.name}`}
                className='h-8 w-8 rounded-full'
              />
              <p className='font-thin text-[#777777]'>
                By <span className='text-[#61A9FA]'>{data.author?.name}</span>
              </p>
            </div>
          )}

          <Link href={
              data?.meta?.[0]?.title
                ? `https://id.pinterest.com/pin/create/button/?description=${data?.name}&url=${process.env.NEXT_PUBLIC_URL}/product/${data.meta[0].title}&media=${data?.imageUrl[0]}`
                : '#'
            } target='_blank' className='absolute left-[7px] top-[5px] z-[7] cursor-pointer bg-no-repeat opacity-0 transition-all duration-500 group-hover:opacity-100'>
            <img
              src={hoverPinterest.src}
              className='h-[40px] w-[40px]'
              alt={`share-pinterest-${data.name}`}
            />
          </Link>
          <Link href={
            data?.meta?.[0]?.title
            ? `https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_URL}/product/${data?.meta?.[0].title}`
            : '#'
            } target='_blank' className='absolute left-[55px] top-[5px] z-[7] cursor-pointer bg-no-repeat opacity-0 transition-all duration-500 group-hover:opacity-100'>
            <img
              src={hoverWA.src}
              className='h-[40px] w-[40px]'
              alt={`share-whatsapp-${data.name}`}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
