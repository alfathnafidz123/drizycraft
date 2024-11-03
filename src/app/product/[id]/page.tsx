/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { Copy, Loader } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import ModalAddReview from '@/components/modals/addReview';
import ProductCard from '@/components/ProductCard';
import ReviewBox from '@/components/ReviewBox';

import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { getProductById } from '@/app/api/product/getProductById';
import { getReviews } from '@/app/api/product/getReview';
import { SubscriptionI } from '@/app/profile/subscription/page';
import {
  MetaProductI,
  productI,
  ReviewI,
} from '@/interfaces/product.interface';

export default function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, dataUser, activeSubcription } = useAppSelector((state) => ({
    ...state.user,
    ...state.subs,
  }));
  const params = useParams();
  const [type, setType] = useState(0);
  const [productData, setProductData] = useState<MetaProductI>();
  const [reviewData, setReviewData] = useState<ReviewI[]>([]);
  const [productSliderData, setSliderProductData] = useState<productI[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [shortUrl, setShortUrl] = useState<string>();
  const [loadingAffiliate, setLoadingAffiliate] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const searchParams = useSearchParams();
  const [limit, setLimit] = useState(5);
  const [subsData, setSubsData] = useState<SubscriptionI>();
  const refCode = searchParams.get('ref');

  const getProduct = async () => {
    try {
      const response = await getProductById({ title: params.id as string });
      setProductData(response.data);
    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  const getSubscriptionData = async () => {
    try {
      const res = await axios.get(
        'https://drizy-api.quadrakaryasantosa.com/billing/current-sub',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubsData(res.data.data);
    } catch (error) {
      // const err = error as AxiosError;
      // toast.error(err.message);
    }
  };

  useEffect(() => {
    getSubscriptionData();
  }, []);
  const getProductSlider = async () => {
    try {
      const response = await getAllProduct({
        page: 1,
        limit: 4,
        sortType: SortType.Popularity,
      });
      setSliderProductData(response.data);
    } catch (error) {
      // toast('Error when trying to get all products');
    }
  };

  const getReview = async () => {
    try {
      const response = await getReviews({
        page: 1,
        limit: limit,
        id: params.id as string,
      });
      setReviewData(response.data);
    } catch (error) {
      toast('Error when trying to get reviews');
    }
  };

  const handleBuy = async () => {
    if (token) {
      if (activeSubcription && dataUser?.coin && dataUser?.coin > 0)
        handleBuyPoint();
      else handleCart();
    } else {
      dispatch(setOpenModal(true));
    }
  };

  const handleBuyPoint = async () => {
    try {
      const payload: { [key: string]: string | number } = {
        productId: productData!.productId,
        licenseType: type,
      };
      if (refCode) {
        payload.refCode = refCode;
      }
      await axios.post(
        `https://drizy-api.quadrakaryasantosa.com/billing/buy-with-coin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchProfile(token!));
      toast.success(`Successfully buy ${productData?.product?.name}!`);
      router.push('/profile/download');
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    }
  };
  const handleCart = async () => {
    try {
      const payload: { [key: string]: string | number } = {
        productId: productData!.productId,
        licenseType: type,
      };
      if (refCode) {
        payload.refCode = refCode;
      }
      await axios.post(`https://drizy-api.quadrakaryasantosa.com/crafter/cart`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/cart');
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    }
  };

  const handleGetAffiliateLink = async () => {
    try {
      setLoadingAffiliate(true);
      const res = await axios.post(
        `https://s.quadrakaryasantosa.com`,
        {
          originalUrl: `${window.location.href}?ref=${dataUser?.affiliate.refferalCode}`,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setShortUrl(`https://s.quadrakaryasantosa.com/${res.data.shortUrl}`);
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Cannot generate affiliate link'
      );
    } finally {
      setLoadingAffiliate(false);
    }
  };

  const handleCopyUrl = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast('Affiliate link coppied!');
    }
  };

  useEffect(() => {
    getProduct();
    getProductSlider();
    getReview();
  }, []);

  useEffect(() => {
    if (productData?.product.discountPeriod) {
      setIsDiscount(
        moment(new Date(productData?.product.discountPeriod)).isAfter(
          new Date()
        )
      );
    }
  }, [productData]);

  const generatePrice = (): string => {
    let price = '$0';
    if (activeSubcription && dataUser?.coin && dataUser?.coin > 0) {
      price = `${productData?.product.coinPrice[type] ?? 0} Coin`;
    } else {
      if (isDiscount) {
        price = `$${productData?.product.discount[type] ?? 0}`;
      } else {
        price = `$${productData?.product.price[type] ?? 0}`;
      }
    }
    return price;
  };

  return productData ? (
    <main>
      <ModalAddReview
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        refreshReview={getReview}
      />
      <section className='mx-auto flex w-full max-w-[1164px] flex-col gap-12 max-md:p-2 lg:py-16'>
        <p className='text-xs text-[#B8B8B8]'>
          Drizy Studio » Crafters » Craft Design SVGs » Paper Cut Templates »{' '}
          {productData.product.name}
        </p>
        <div className='grid gap-8 lg:grid-cols-5'>
          <div className='flex flex-col gap-4 lg:col-span-3'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-5'>
              <div className='order-last flex flex-row gap-4 lg:order-first lg:flex-col'>
                {productData?.product.imageUrl?.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt='Product'
                    width={50}
                    height={50}
                    className={`h-[50px] w-[50px] rounded-md object-cover ${index === selectedImage ? 'opacity-100' : 'opacity-50'
                      }`}
                    onClick={() => {
                      setSelectedImage(index);
                    }}
                    priority={true}
                    loading='eager'
                  />
                ))}
              </div>
              {productData && (
                <Image
                  src={productData?.product.imageUrl[selectedImage]}
                  alt='Product'
                  width={724}
                  height={300}
                  className='order-first col-span-4 w-full rounded-xl object-cover lg:order-last'
                  priority={true}
                  loading='eager'
                />
              )}
            </div>

            <div className='mt-8 grid grid-cols-2 grid-rows-2 gap-4 text-[14px]'>
              <div>
                <p className='text-xs font-semibold text-[#777777] lg:text-sm'>
                  File Type
                </p>
                <p className='text-xs text-[#777777] lg:text-sm'>
                  {productData
                    ? productData.product.fileType.split(',').join('|')
                    : '-'}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold text-[#777777] lg:text-sm'>
                  File Size
                </p>
                <p className='text-xs text-[#777777] lg:text-sm'>{`${productData?.product.fileSize} mb`}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-[#777777] lg:text-sm'>
                  {productData.product.author
                    ? `By ${productData.product.author.name}`
                    : 'By Drizy Studio'}
                </p>
              </div>
              <div>
                <p className='text-xs text-[#777777] lg:text-sm'>
                  {productData
                    ? moment(productData.product.createdAt).format(
                      'MMMM DD, YYYY'
                    )
                    : '-'}
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start gap-16 lg:col-span-2 lg:pl-6'>
            <p className='text-2xl font-semibold text-[#1A214C]'>
              {productData.product.name}
            </p>
            <div className='flex flex-row items-end gap-1'>
              {isDiscount &&
                !(activeSubcription && dataUser?.coin && dataUser?.coin > 0) ? (
                <p className='font-katide-regular text-lg text-gray-500 line-through'>
                  ${productData.product.price[type]}
                </p>
              ) : null}
              <p className='font-katide-bold text-[40px] text-[#1A214C]'>
                {generatePrice()}
              </p>
            </div>
            <div className='flex flex-col gap-4 p-2 lg:w-5/6 lg:p-0'>
              {dataUser?.coin === 0 ?
                <>
                  <p className='font-katide-bold text-xs text-[#1A214C]'>
                    License Option
                  </p>
                  <div className='flex justify-between gap-2'>
                    <button
                      onClick={() => {
                        setType(0);
                      }}
                      className={
                        type === 0
                          ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb] max-md:w-full'
                          : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1] max-md:w-full'
                      }
                    >
                      Personal
                    </button>
                    <button
                      onClick={() => {
                        setType(1);
                      }}
                      className={
                        type === 1
                          ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb] max-md:w-full'
                          : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1] max-md:w-full'
                      }
                    >
                      Commercial
                    </button>
                    <button
                      onClick={() => {
                        setType(2);
                      }}
                      className={
                        type === 2
                          ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb] max-md:w-full'
                          : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1] max-md:w-full'
                      }
                    >
                      Business
                    </button>
                  </div>
                </>
                :
                <div />
              }
              {dataUser?.affiliate && shortUrl === undefined && (
                <button
                  onClick={() => {
                    handleGetAffiliateLink();
                  }}
                  className='flex w-full items-center justify-center rounded-full border border-[#1A214C] bg-white px-10 py-2 font-semibold text-[#1A214C]'
                >
                  {loadingAffiliate ? <Loader /> : 'Get Affiliate Link'}
                </button>
              )}
              {shortUrl && (
                <button
                  onClick={handleCopyUrl}
                  className='flex w-full flex-row justify-between rounded-full border border-[#1A214C] bg-white p-2 px-4 font-semibold text-[#1A214C]'
                >
                  <div>{shortUrl}</div>
                  <Copy />
                </button>
              )}
              <button
                onClick={() => {
                  handleBuy();
                }}
                className='w-full rounded-full bg-[#1A214C] px-10 py-2 font-semibold text-[#e4f6fb]'
              >
                {activeSubcription && dataUser?.coin && dataUser?.coin > 0
                  ? 'Buy with coin'
                  : 'Add to cart'}
              </button>
              <div className='my-4 w-full border-t-2 border-[#1A214C]/15' />
              <p className='text-lg font-semibold text-[#777777]'>
                License Terms
              </p>
              <ul className='list-disc text-[12px] text-[#777777]'>
                <li>Personal Use Only</li>
                <li>
                  End Products Not For Resell, sub-license, share or
                  (re)distribute any of the digital files
                </li>
                <li>
                  You can give physical works as gifts, but not for commercial
                  purposes such as trade, services or others
                </li>
                <li>
                  Do not modify it to make a new work that is recognized as your
                  work
                </li>
                <li>
                  Digital files may not be shared or sold again, either offline
                  or online on marketplace sites and the like
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-8 bg-[#EBECF5] max-md:p-2 lg:py-16'>
        <div className='mx-auto w-full max-w-[1164px] flex-col gap-4 lg:grid lg:grid-cols-3'>
          <div className='col-span-2 flex flex-col gap-8'>
            <p className='font-katide-bold mt-4 text-base text-[#1A214C] lg:mt-0 lg:text-[24px]'>
              Product Detail
            </p>
            <p className='text-[16px] font-semibold text-[#707070]'>
              {productData?.product.name}
            </p>
            <div className='box-border text-[16px] font-light text-[#707070]'>
              <div
                // style={{ whiteSpace: 'pre-line' }}
                className='without-tailwind !max-md:max-w-full box-border overflow-hidden'
                dangerouslySetInnerHTML={{
                  __html: productData?.product.description,
                }}
              />
            </div>
            <div className='mt-6 flex w-full flex-wrap justify-start gap-3 lg:mx-auto lg:max-w-[1164px]'>
              <p className='font-katide-bold text-[16px] text-[#707070]'>
                Tags:
              </p>
              {productData.product.tags.map((item, i) => (
                <div
                  key={i.toString()}
                  className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className='mt-16 w-full rounded-3xl bg-white p-8 shadow-xl lg:basis-1/3'>
            <p className='text-lg font-semibold text-[#1A214C]'>
              Customer Review
            </p>
            <div className='mt-2 flex gap-4'>
              <p className='text-2xl font-semibold text-[#1A214C]'>5.0</p>
              <div className='flex items-center text-[#ED9B37]'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>5.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#ED9B37]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>134</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>4.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>3.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>2.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>1.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='my-12 w-full border-t-2 border-[#1A214C]/15' />
            <div className='relative w-full'>
              <button
                onClick={() => {
                  setIsShowModal(true);
                }}
                className='mb-12 flex w-[176px] items-center rounded-full border border-[#CCCCCC] bg-[#EBECF5] p-1 pr-4'
              >
                <div className='shrink rounded-full bg-[#FFBB3C] p-2'>
                  <FaPencilAlt />
                </div>
                <p className='grow text-center text-[14px] font-black'>
                  Write a review
                </p>
              </button>
              <div className='h-[300px] overflow-y-scroll'>
                {reviewData?.map((item, index) => {
                  return <ReviewBox key={index} data={item} />;
                })}
              </div>
              <div className='absolute bottom-0 h-[100px] w-full bg-gradient-to-t from-white'></div>
              <div
                onClick={() => {
                  setLimit(limit + 5);
                  getReview();
                }}
                className='absolute bottom-0 left-0 cursor-pointer rounded-full border-2 border-[#1A214C] bg-white px-6 text-[11px] text-[#1A214C]'
              >
                Load more
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='mx-6 flex max-w-[1164px] flex-col items-center gap-8 py-16 lg:mx-auto'>
        <p className='text-2xl font-semibold text-[#1A214C]'>
          Product Recommendation
        </p>
        <div className='flex w-full flex-col justify-between gap-4 lg:flex-row'>
          {productSliderData.map((item) => (
            <ProductCard
              key={item.id}
              data={item}
              isSlider={false}
              handleShowDetail={(product) =>
                router.push(`/product/${product.meta?.[0].title}`)
              }
            />
          ))}
        </div>
        <p className='w-full text-right text-xs font-semibold text-[#1A214C] lg:text-lg'>
          See More &gt;
        </p>
      </section>
      <AffiliateBanner />
    </main>
  ) : null;
}
