/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FaPencilAlt } from '@react-icons/all-files/fa/FaPencilAlt';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';
import { IoChevronForward } from '@react-icons/all-files/io5/IoChevronForward';
import axios, { AxiosError } from 'axios';
import { Copy, Loader } from 'lucide-react';
import moment from 'moment';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCoin, fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import LoadingComponent from '@/components/Loading';
import ModalAddReview from '@/components/modals/addReview';
import ModalProduct from '@/components/modals/product';
import NextImage from '@/components/NextImage';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';
import ProductCard from '@/components/ProductCard';
import ReviewBox from '@/components/ReviewBox';

import { getRelevantProduct, SortType } from '@/app/api/product/getProduct';
import { getProductById } from '@/app/api/product/getProductById';
import { getProductOwnedById } from '@/app/api/product/getProductOwnedById';
import { getReviews } from '@/app/api/product/getReview';
import { SubscriptionI } from '@/app/profile/subscription/page';
import {
  MetaProductI,
  OrderI,
  productI,
  ReviewI,
} from '@/interfaces/product.interface';
import { AmexLogo, cartProduct, Comp1, Comp2, Comp3, Comp4, Comp5, Comp6, MasterCardLogo, VisaLogo } from '~/images';
import { fetchCart } from '@/lib/slices/cart';

export interface StarSummary {
  average: number
  one: number
  two: number
  three: number
  four: number
  five: number
}


export default function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, dataUser, activeSubcription } = useAppSelector((state) => ({
    ...state.user,
    ...state.subs,
  }));
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const activeSubcription2 = useMemo(() => {
    return activeSubcriptionState;
  }, [activeSubcriptionState]);
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
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [ownerStatus, setOwnerStatus] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });
  const [star, setStar] = useState<StarSummary>();
  const { trackEvent } = PixelEventsHooks();
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [selectedShortByOption, setSelectedShortByOption] = useState<SortType>(
      SortType.Latest
    );

  const getProduct = async () => {
    try {
      const response = await getProductById({ title: params.id as string });
      const product = response.data;

      setProductData(product);
      console.log('respon', response);

      // Ambil data recentProducts dari localStorage
      const stored = localStorage.getItem("recentProducts");
      let recent: productI[] = stored ? JSON.parse(stored) : [];

      // Hapus produk jika sudah ada berdasarkan id
      recent = recent.filter(item => item.id !== product.id);

      // Tambahkan produk ke urutan teratas
      recent.unshift(product);

      // Simpan hanya 10 produk terakhir
      if (recent.length > 10) recent = recent.slice(0, 10);

      // Simpan kembali ke localStorage
      localStorage.setItem("recentProducts", JSON.stringify(recent));

      // Map childSubCategory
      const childSubCategory = product.product.chilSubCategories;

      console.log("🟢 Handpicked Subcategories:", childSubCategory);

      localStorage.setItem("childSubCategory", JSON.stringify(childSubCategory));

      const lastSubCategory = childSubCategory[childSubCategory.length - 1] || null;

      console.log("🟢 Last Handpicked Subcategory:", lastSubCategory);

      localStorage.setItem("lastSubCategory", JSON.stringify(lastSubCategory));

      // ✅ Jalankan getProductSlider setelah lastSubCategory disimpan
      await getProductSlider();

    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  const getOwnerStatus = async () => {
    try {
      if (token) {
        const response = await getProductOwnedById({ title: params.id as string, token });
        setOwnerStatus(response.owned);
      }
    } catch (error) {
      toast('Error when trying to get all products');
    }
  }

  const getSubscriptionData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/current-sub`,
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
      const allChildSubCategory = JSON.parse(localStorage.getItem("childSubCategory") || '[]') as string[];

      // console.log('🔎 Fetching products with:', {
      //   childSubCategory: allChildSubCategory,
      //   sortType: selectedShortByOption,
      // });

      // 1️⃣ Fetch utama
      const mainResponse = await getRelevantProduct({
        page: 1,
        limit: 5,
        sortType: selectedShortByOption,
        category: allChildSubCategory,
      });

      let products = mainResponse.data || [];

      // console.log('📦 Main products fetched:', products);

      // 2️⃣ Jika kurang dari 5, fetch lagi pakai 3 kategori terakhir
      if (products.length < 5) {
        const lastThreeCats = allChildSubCategory.slice(-2);

        const fallbackResponse = await getRelevantProduct({
          page: 1,
          limit: 5,
          sortType: selectedShortByOption,
          category: lastThreeCats,
        });

        const fallbackProducts = fallbackResponse.data || [];

        // Gabungkan & hilangkan duplikat berdasarkan ID
        const combined = [...products, ...fallbackProducts].reduce((acc, current) => {
          if (!acc.find((item: { id: any; }) => item.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, [] as typeof products);

        products = combined.slice(0, 4); // Ambil maksimal 5 item
      }

      const response = await getProductById({ title: params.id as string });
      const product = response.data;
      // console.log('Product to filter:', product);

      const filtered = products.filter((item: { id: any; }) => item.id !== product.product?.id);

      setSliderProductData(filtered);
      // console.log('✅ Final products:', products);

      if (products.length === 0) {
        console.warn('⚠️ No products returned!');
      }
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
      if (activeSubcription2.subcription !== undefined)
        handleBuyPoint();
      else
        // handleCart();
        toast.error("You don't have enough coin to download this product, please top up your coin first!");
    } else {
      dispatch(setOpenModal(true));
    }
  };

  const handleBuyPoint = async () => {
    try {
      setLoadingDownload(true);
      const payload: { [key: string]: string | number } = {
        productId: productData!.productId,
        licenseType: type,
      };
      if (refCode) {
        payload.refCode = refCode;
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/buy-with-coin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchProfile(token!));
      dispatch(fetchCoin(token!));
      await trackEvent(EventsEnum.Purchase, { productId: productData?.productId, productName: productData?.realTitle, productPrice: productData?.product.coinPrice[type], paymentType: 'coin' });
      await getTransactionData();
      toast.success(`Successfully buy ${productData?.product?.name}!`);
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    } finally {
      setLoadingDownload(false);
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
      await downloadFile(orders[0].id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleClickDownload = async () => {
    try {
      setLoadingDownload(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=500`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orders: OrderI[] = res.data.data;
      const found = orders.find(item => item.productId === productData?.productId);
      if (found) {
        await downloadFile(found.id);
        await trackEvent(EventsEnum.Download, { productId: productData?.productId, productName: productData?.realTitle });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setLoadingDownload(false);
    }
  };

  const downloadFile = async (id: number) => {
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

      let fileName = `${productData?.product.name}.zip`;
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

  const handleCart = async () => {
    try {
      const payload: { [key: string]: string | number } = {
        productId: productData!.productId,
        licenseType: type,
      };
      if (refCode) {
        payload.refCode = refCode;
      }
      if (token) {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/cart`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await trackEvent(EventsEnum.AddToCart, { productId: productData?.productId, productName: productData?.realTitle });
        // router.push('/cart');
        toast('Item added to cart!');
        dispatch(fetchCart(token!));
      } else {
        dispatch(setOpenModal(true));
      }
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    }
  };

  const getSummaryReview = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/review-summary/${productData?.productId}`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setStar(res.data);
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Cannot generate affiliate link'
      );
    } finally {
      setLoadingAffiliate(false);
    }
  }

  const handleGetAffiliateLink = async () => {
    try {
      setLoadingAffiliate(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SHORTLINK_URL}`,
        {
          originalUrl: `${window.location.href}?ref=${dataUser?.affiliate.refferalCode}`,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setShortUrl(`${process.env.NEXT_PUBLIC_SHORTLINK_URL}/${res.data.shortUrl}`);
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
    getOwnerStatus();
    getProduct();
    // getProductSlider();
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
    if (productData?.id) getSummaryReview();
  }, [productData]);

  const generatePrice = (): string => {
    let price = '0';
    // if (activeSubcription && dataUser?.coin && dataUser?.coin !== 0) {
    //
    // } else {
    //   if (isDiscount) {
    //     price = `$${productData?.product.discount[type] ?? 0}`;
    //   } else {
    //     price = `$${productData?.product.price[type] ?? 0}`;
    //   }
    // }
    price = `${productData?.product.coinPrice[type] ?? 0} Coin`;
    return price;
  };

  useEffect(() => {
    const viewed = localStorage.getItem("recentProducts");
    let recent: productI[] = viewed ? JSON.parse(viewed) : [];

    // Cek jika produk sudah ada, hapus dulu biar tidak duplikat
    recent = recent.filter((item) => item.id !== params.id);
    

    // Tambahkan produk ke awal
    if (productData?.product) {
      recent.unshift(productData.product);
    }

    // Maksimal 10 produk
    if (recent.length > 10) recent = recent.slice(0, 10);

    localStorage.setItem("recentProducts", JSON.stringify(recent));

    
  }, [params]);


  return productData ? (
    <>
      <main>
        <ModalAddReview
          isOpen={isShowModal}
          onClose={() => setIsShowModal(false)}
          refreshReview={getReview}
          productId={productData.product.id}
        />
        <section className='mx-auto flex w-full max-w-[1164px] flex-col gap-12 max-md:p-2 lg:pt-16 lg:pb-8'>
          <p className='text-xs text-[#B8B8B8]'>
            Drizy Studio » Crafters » Craft Design SVGs » Paper Cut Templates »{' '}
            {productData.product.name}
          </p>
          <div className='grid gap-4 lg:grid-cols-8'>
            <div className='flex flex-col gap-4 lg:col-span-5'>
              <div className='grid grid-cols-1 lg:grid-cols-8'>
                <div className='max-w-full max-md:overflow-scroll lg:order-first order-last'>
                  <div className='flex flex-row  w-full lg:flex-col'>
                    {productData?.product.imageUrl?.map((url, index) => (
                      <NextImage
                        key={index}
                        src={url}
                        alt='Product'
                        width={50}
                        height={50}
                        className={`h-[50px] w-[50px] rounded-md object-contain ${index === selectedImage ? 'opacity-100' : 'opacity-50'
                          }`}
                        classNames={{
                          image: `h-[50px] w-[50px] rounded-md object-contain ${index === selectedImage ? 'opacity-100' : 'opacity-50'}`
                        }}
                        onClick={() => {
                          setSelectedImage(index);
                        }}
                        quality={60}
                        useSkeleton
                      />
                    ))}
                  </div>
                </div>
                {productData && (
                  <div className='w-full relative order-first lg:col-span-7'>
                    <NextImage
                      src={productData?.product.imageUrl[selectedImage]}
                      alt='Product'
                      width={724}
                      height={300}
                      quality={70}
                      className='order-first w-full rounded-xl object-cover lg:order-last'
                      classNames={{
                        image: 'w-full rounded-xl object-cover'
                      }}
                      useSkeleton
                      priority={true}
                      loading='eager'
                    />
                    <button onClick={() => {
                      if (selectedImage !== productData.product.imageUrl.length - 1) {
                        setSelectedImage(prev => prev + 1);
                      }
                    }} className='absolute right-5 top-1/3 z-10 bg-black/40 p-2 rounded-full'>
                      <IoChevronForward className='text-white w-6 h-6' />
                    </button>
                    <button onClick={() => {
                      if (selectedImage !== 0) {
                        setSelectedImage(prev => prev - 1);
                      }
                    }} className='absolute left-5 top-1/3 z-10 bg-black/40 p-2 rounded-full'>
                      <IoChevronBack className="text-white w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              <div className='mt-4 grid grid-cols-2 grid-rows-2 gap-4 text-[14px]'>
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
                      ? moment(productData.product.publishAt).format(
                        'MMMM DD, YYYY'
                      )
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start gap-10 lg:col-span-3 lg:pl-6'>
              <p className='text-2xl font-semibold text-[#1A214C]'>
                {productData.product.name}
              </p>
              <div className='flex flex-row items-end gap-1'>
                {isDiscount &&
                  !(activeSubcription && dataUser?.coin && dataUser?.coin !== 0) ? (
                  <p className='font-katide-regular text-lg text-gray-500 line-through'>
                    ${productData.product.price[type]}
                  </p>
                ) : null}
                <p className='font-katide-bold text-[40px] text-[#1A214C]'>
                  {generatePrice()}
                </p>
              </div>
              <div className='flex flex-col gap-4 p-2 lg:w-5/6 lg:p-0'>
                {/* {(!dataUser || dataUser?.coin === 0) ?
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
                } */}
                <div className='flex w-full justify-between gap-2'>
                  {ownerStatus ?
                    <button
                      onClick={handleClickDownload}
                      disabled={loadingDownload}
                      className='w-full rounded-[8px] bg-[#1A214C] px-10 py-2 font-semibold text-[#e4f6fb] disabled:bg-[#1A214C]/80'
                    >
                      {loadingDownload
                        ? <div className='flex w-full items-center justify-center'><Loader className='animate-spin' /></div>
                        :
                        "Download"
                      }
                    </button>
                    :
                    <button
                      onClick={() => {
                        handleBuy();
                      }}
                      disabled={loadingDownload}
                      className='w-full rounded-[8px] bg-[#1A214C] px-10 py-2 font-semibold text-[#e4f6fb] disabled:bg-[#1A214C]/80'
                    >
                      {token
                        ? loadingDownload
                          ? <div className='flex w-full items-center justify-center'><Loader className='animate-spin' /></div>
                          : 'Buy with coin'
                        : 'Buy with coin'}
                    </button>
                  }
                  <button
                    // id={`add-${data.id}-cart`}
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
                {dataUser?.affiliate && shortUrl === undefined && (
                  <button
                    onClick={() => {
                      handleGetAffiliateLink();
                    }}
                    className='flex w-full items-center justify-center rounded-[8px] border border-[#1A214C] bg-white px-10 py-2 font-semibold text-[#1A214C]'
                  >
                    {loadingAffiliate ? <Loader /> : 'Get Affiliate Link'}
                  </button>
                )}
                {shortUrl && (
                  <button
                    onClick={handleCopyUrl}
                    className='flex w-full flex-row justify-between rounded-[8px] border border-[#1A214C] bg-white p-2 px-4 font-semibold text-[#1A214C]'
                  >
                    <div>{shortUrl}</div>
                    <Copy />
                  </button>
                )}

                <div className='mt-4 w-full border-t-2 border-[#1A214C]/15' />
                {activeSubcription ? (
                  <div className="bg-[#E4F6FB] w-full rounded-xl relative overflow-hidden px-6">
                    <div className="items-center my-6">
                      <p className="font-katide-extrabold text-lg text-center text-[#61657D] mb-4" style={{ letterSpacing: '0.2em' }}>
                        COMPATIBILITY
                      </p>
                      <div className="flex w-full gap-2 mt-5 h-20 items-center justify-center">
                        <div className="h-[66px]">
                          <img
                            alt="stripe"
                            src={Comp1.src}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="h-[70px]">
                          <img
                            alt="stripe"
                            src={Comp2.src}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1  flex">
                          <img
                            alt="stripe"
                            src={Comp3.src}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="h-[66px]">
                          <img
                            alt="stripe"
                            src={Comp4.src}
                            className="max-w-20 h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex w-full mt-5 gap-3 items-center justify-center">
                        <div className="flex-1 justify-center items-center">
                          <NextImage alt="stripe" src={Comp5} width={100} height={25} className="w-full h-auto items-center justify-center flex" classNames={{ image: `w-full` }} />
                        </div>
                        <div className="flex-1">
                          <NextImage alt="stripe" src={Comp6} width={100} height={25} className="w-full h-auto items-center justify-center flex" classNames={{ image: `w-full` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#E4F6FB] w-full rounded-xl relative overflow-hidden px-6">
                    <div className="items-center my-6">
                      <p className="font-katide-extrabold text-lg text-center text-[#1A214C] mb-4">
                        Pay ONCE, Create FOREVER!
                      </p>
                      <p className="text-[#61657D] text-sm leading-relaxed text-center mb-6 px-4">
                        Get <span className="font-semibold">unlimited designs</span> for a year!
                        <br />
                        Upgrade to <span className="font-semibold">VIP+</span> and unlock ALL assets,
                        <br />
                        request custom designs, and sell your creations <span className="font-semibold">license-free!</span>
                      </p>
                      <a href="/membership">
                        <button className="bg-[#ffb31f] hover:bg-[#f5a900] text-[#1A214C] font-semibold text-sm px-6 py-3 rounded-lg w-full">
                          Subscribe & Download
                        </button>
                      </a>
                    </div>
                  </div>
                )}


                {/* <p className='text-lg font-semibold text-[#777777]'>
                  License Terms
                </p> */}
                {/* {type === 0 &&
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
                }
                {type === 1 &&
                  <ul className='list-disc text-[12px] text-[#777777]'>
                    <li>It can be for commercial purposes, by selling physical works made from our designs</li>
                    <li>
                      Can be used to trade physical products, craft fairs, gift services, craft services and other end product commercial purposes
                    </li>
                    <li>
                      End Products Not For Resell, sub-license, share or (re)distribute any of the digital files
                    </li>
                    <li>
                      Do not modify it to make a new work that is recognized as your work
                    </li>
                    <li>
                      Digital files may not be shared or sold again, either offline or online on marketplace sites and the like
                    </li>
                    <li>
                      Physical & Digital End Products (Read more)
                    </li>
                  </ul>
                }
                {type === 2 &&
                  <ul className='list-disc text-[12px] text-[#777777]'>
                    <li>Unlimited POD License</li>
                    <li>It can be for commercial purposes, by selling physical works made from our designs</li>
                    <li>
                      Can be used to trade physical products, craft fairs, gift services, craft services and other end product commercial purposes
                    </li>
                    <li>
                      End Products Not For Resell, sub-license, share or (re)distribute any of the digital files
                    </li>
                    <li>
                      Do not modify it to make a new work that is recognized as your work
                    </li>
                    <li>
                      Digital files may not be shared or sold again, either offline or online on marketplace sites and the like
                    </li>
                    <li>
                      Physical & Digital End Products (Read more)
                    </li>
                  </ul>
                } */}
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
                  className='responsive-content without-tailwind !max-md:max-w-full box-border overflow-hidden'
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
            {star &&
              <div className='mt-16 w-full rounded-3xl bg-white p-8 shadow-xl lg:basis-1/3'>
                <p className='text-lg font-semibold text-[#1A214C]'>
                  Customer Review
                </p>
                <div className='mt-2 flex gap-4'>
                  <p className='text-2xl font-semibold text-[#1A214C]'>{star?.average ?? 0}</p>
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
                    <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA] relative'>
                      <div
                        className="absolute top-0 left-0 h-4 bg-[#ED9B37] rounded-full"
                        style={{ width: `${(star?.five / (star?.five + star?.four + star?.three + star?.two + star?.one)) * 100}%` }}
                      />
                    </div>
                    <p className='text-lg font-semibold text-[#AAAAAA]'>{star?.five ?? 0}</p>
                  </div>
                </div>
                <div className='mt-2 flex gap-4'>
                  <p className='text-lg font-semibold text-[#1A214C]'>4.0</p>
                  <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                    <FaStar />
                    <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA] relative'>
                      <div
                        className="absolute top-0 left-0 h-4 bg-[#ED9B37] rounded-full"
                        style={{ width: `${(star?.four / (star?.five + star?.four + star?.three + star?.two + star?.one)) * 100}%` }}
                      />
                    </div>
                    <p className='text-lg font-semibold text-[#AAAAAA]'>{star?.four ?? 0}</p>
                  </div>
                </div>
                <div className='mt-2 flex gap-4'>
                  <p className='text-lg font-semibold text-[#1A214C]'>3.0</p>
                  <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                    <FaStar />
                    <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA] relative'>
                      <div
                        className="absolute top-0 left-0 h-4 bg-[#ED9B37] rounded-full"
                        style={{ width: `${(star?.three / (star?.five + star?.four + star?.three + star?.two + star?.one)) * 100}%` }}
                      />
                    </div>
                    <p className='text-lg font-semibold text-[#AAAAAA]'>{star?.three ?? 0}</p>
                  </div>
                </div>
                <div className='mt-2 flex gap-4'>
                  <p className='text-lg font-semibold text-[#1A214C]'>2.0</p>
                  <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                    <FaStar />
                    <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA] relative'>
                      <div
                        className="absolute top-0 left-0 h-4 bg-[#ED9B37] rounded-full"
                        style={{ width: `${(star?.two / (star?.five + star?.four + star?.three + star?.two + star?.one)) * 100}%` }}
                      />
                    </div>
                    <p className='text-lg font-semibold text-[#AAAAAA]'>{star?.two ?? 0}</p>
                  </div>
                </div>
                <div className='mt-2 flex gap-4'>
                  <p className='text-lg font-semibold text-[#1A214C]'>1.0</p>
                  <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                    <FaStar />
                    <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA] relative'>
                      <div
                        className="absolute top-0 left-0 h-4 bg-[#ED9B37] rounded-full"
                        style={{ width: `${(star?.one / (star?.five + star?.four + star?.three + star?.two + star?.one)) * 100}%` }}
                      />
                    </div>
                    <p className='text-lg font-semibold text-[#AAAAAA]'>{star?.one ?? 0}</p>
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
            }
          </div>
        </section>
        <section className='mx-6 flex max-w-[1164px] flex-col items-center gap-8 py-16 lg:mx-auto'>
          <p className='text-2xl font-semibold text-[#1A214C]'>
            Product Recommendation
          </p>
          <div className="w-full flex flex-col gap-4">
            <div
              className={`
                grid
                gap-2
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
              `}
            >
              {productSliderData.slice(0, 4).map((item) => (
                <ProductCard
                  key={item.id}
                  data={item}
                  isSlider={false}
                  handleShowDetail={(product) =>
                    setShowProductDetail({ show: true, product })
                  }
                />
              ))}
            </div>
          </div>
          {/* <Link href="/category" className='w-full text-center lg:text-right text-sm font-semibold text-[#1A214C] lg:text-lg'>
            See More &gt;
          </Link> */}
        </section>
        <AffiliateBanner />
      </main>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </>
  ) : <LoadingComponent />;
}
