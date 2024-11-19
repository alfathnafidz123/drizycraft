/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import axios, { AxiosError } from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCoin, fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.discountPeriod) {
      setIsDiscount(moment(new Date(data.discountPeriod)).isAfter(new Date()));
    }
  }, [data]);

  const containerClassNames = () => {
    if (!isSlider) {
      return 'group relative h-[335px] lg:w-[294px] w-full';
    }
    if (data.author) {
      return 'group relative my-4 h-[395px] w-[294px]';
    }
    return 'group relative my-4 h-[335px] w-[294px]';
  };

  const cardClassNames = () => {
    if (!isSlider) {
      return 'absolute left-0 top-0 flex h-[335px] w-full lg:w-[281px] flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-[12px] shadow-xl transition-none hover:border-[2px]';
    }
    if (data.author) {
      return 'absolute left-0 top-0 flex h-[395px] w-[281px] flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-[12px] shadow-xl transition-none hover:border-[2px]';
    }
    return 'absolute left-0 top-0 flex h-[335px] w-[281px] flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-[12px] shadow-xl transition-none hover:border-[2px]';
  };

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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orders: OrderI[] = res.data.data;
      await handleDownloadClick(orders[0].id);
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

      let fileName = 'downloaded-file.zip';
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
      (activeSubcription && data.coinPrice[0] === 0) ||
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
    if (activeSubcription && data.coinPrice[0] === 0) {
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

  return (
    <>
      <div className={containerClassNames()}>
        {generateSale()}
        <div className={cardClassNames()}>
          <img
            src={data.imageUrl[0]}
            alt={data.name}
            className='h-[172px] w-full rounded-[6px] object-cover lg:w-[257px]'
          />
          <span className='relative z-[2] flex h-[54px] w-[257px] shrink-0 items-start justify-start self-stretch overflow-hidden text-left text-[16px] font-semibold leading-[17.6px] text-[#1a204c]'>
            {data.name}
          </span>
          <div className='flex w-full justify-between gap-2'>
            <button
              id={`show-detail-${data.id}`}
              type='button'
              onClick={handleCTA}
              className='pointer z-[3] flex h-[37px] flex-grow flex-nowrap items-center justify-center gap-[8px] rounded-[8px] bg-[#2a3b80] pb-[12px] pl-[24px] pr-[24px] pt-[12px] group-hover:bg-[#4065D1]'
            >
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
            </button>
            <button
              id={`add-${data.id}-cart`}
              type='button'
              onClick={handleCart}
              className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white pb-[12px] pl-[24px] pr-[24px] pt-[12px]'
            >
              <img src={cartProduct.src} alt='cart'></img>
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

          <Link href={`https://id.pinterest.com/pin/create/button/?description=${data?.name}&url=${process.env.NEXT_PUBLIC_URL}/product/${data?.meta?.[0].title}&media=${data?.imageUrl[0]}`} target='_blank' className='absolute left-[7px] top-[5px] z-[7] cursor-pointer bg-no-repeat opacity-0 transition-all duration-500 group-hover:opacity-100'>
            <img
              src={hoverPinterest.src}
              className='h-[40px] w-[40px]'
              alt={`share-pinterest-${data.name}`}
            />
          </Link>
          <Link href={`https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_URL}/product/${data?.meta?.[0].title}`} target='_blank' className='absolute left-[55px] top-[5px] z-[7] cursor-pointer bg-no-repeat opacity-0 transition-all duration-500 group-hover:opacity-100'>
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
