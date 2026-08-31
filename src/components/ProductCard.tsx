/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { setSubscriptionModalOpen } from '@/lib/slices/subcription';
import { fetchCoin, fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import NextImage from '@/components/NextImage';
import PixelEventsHooks, { EventsEnum, RedditEventsEnum } from '@/components/pixel-custom-events';

import { OrderI, productI } from '@/interfaces/product.interface';

import {
  cartProduct,
  defaultAvatar, drizzyCoin,
  hoverPinterest,
  hoverWA,
  saleSvg
} from '~/images';
import errorHandler from '@/lib/errorHandler';
import { fetchCart } from '@/lib/slices/cart';
import { SubscriptionI } from '@/app/profile/subscription/page';
import FreeTrialModal from '@/components/modals/free-trial';
import * as React from 'react';
import { fetchDownloadRemaining } from '@/lib/slices/download';
import { getProductOwnedById } from '@/app/api/product/getProductOwnedById';
import TrialDownloadSuccess from '@/components/modals/trial-download-success';
import TrialExpired from '@/components/modals/trial-expired';
import DownloadProgressModal from '@/components/DownloadProgressModal';
import Image from 'next/image';

interface ProductCardProps {
  data: productI;
  isSlider?: boolean;
  isDragging?: boolean;
  handleShowDetail?: (product: productI) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  isSlider = true, isDragging,
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
  const params = useParams();
  const { trackEvent } = PixelEventsHooks();
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [subsData, setSubsData] = useState<SubscriptionI>();
  const [ownerStatus, setOwnerStatus] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [modalProductName, setModalProductName] = useState('');
  const [showTrialSuccessModal, setShowTrialSuccessModal] = useState(false);
  const downloadRemaining = useAppSelector(state => state.download.remaining);
  const [showTrialExpiredModal, setShowTrialExpiredModal] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (data && data.discountPeriod) {
      setIsDiscount(moment(new Date(data.discountPeriod)).isAfter(new Date()));
    }
  }, [data]);

  const getSubscriptionData = async () => {
    if (token) {
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
    }
  };

  const getTransactionData2 = async () => {
    if (token) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=12`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data.data);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      }
    }
  };

  const getOwnerStatus = async () => {
    try {
      if (token) {
        const response = await getProductOwnedById({ title: data.meta?.[0]?.title as string, token });
        setOwnerStatus(response.owned);
      }
    } catch (error) {
      toast('Error when trying to get all products');
    }
  }

  useEffect(() => {
    getTransactionData2();
    getSubscriptionData();
    getOwnerStatus();
  }, []);

  const handleCart = async () => {
    // handleShowDetail?.(data);
    try {
      const payload: { [key: string]: string | number } = {
        productId: data.id,
        licenseType: 0,
      };
      if (token) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/cart`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast('Item added to cart!');
        await trackEvent(EventsEnum.AddToCart, { productId: data.id, productName: data.name });
        await trackEvent(RedditEventsEnum.AddToCart);
        dispatch(fetchCart(token!));
        // router.push('/cart');

      } else {
        dispatch(setOpenModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      errorHandler(error);
      // toast.error('Add to cart failed, please reach out to the administrator');
    }
  };

  const handleDownload = async () => {
    try {
      if (token) {
        if (subsData?.status === "trialing" && downloadRemaining === 0) {
          toast.error("You reached the maximum download limit during the free trial period. Please upgrade your subscription to continue downloading.");
          setShowTrialExpiredModal(true);
        } else {
          if (activeSubcription.subcription !== undefined) {
            // 🔑 cek limit transaksi harian khusus plan "Monthly Access"
            if (subsData?.product === 'Monthly Access') {
              try {
                const todayRes = await axios.get(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transactions-today`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                if (todayRes.data.total >= 25) {
                  toast.error(
                    'You have reached your daily limit of 25 purchases for the Monthly Access plan. try again tomorrow.'
                  );
                  return;
                }
              } catch (error) {
                toast.error('Failed to check your daily transaction limit.');
                return;
              }
            }

            const payload: { [key: string]: string | number } = {
              productId: data.id,
              licenseType: 2,
            };
            await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/buy-with-coin`,
              payload,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            await Promise.all([
              dispatch(fetchProfile(token!)),
              dispatch(fetchCoin(token!)),
              dispatch(fetchDownloadRemaining(token!)),
              getTransactionData(),
              getOwnerStatus()
            ]);

            await trackEvent(EventsEnum.Purchase, { productId: data?.id, productName: data?.name, productPrice: data?.coinPrice, paymentType: 'coin' });

            if (subsData?.status === "trialing") {
              setShowTrialSuccessModal(true);
              toast.success(`Successfully buy ${data?.name}!`);
            } else {
              toast.success(`Successfully buy ${data?.name}!`);
            }
          } else {
            // const payment = await itemPayment({
            //   productId: [data.id],
            //   licenseType: [0],
            //   affiliateId: [''],
            //   token: token,
            // });
            // window.location.replace(payment.data);
            // dispatch(setSubscriptionModalOpen(true));
            toast.error("You don't have enough coin to download this product, please top up your coin first!");
          }
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
      setIsDownloading(true);
      setDownloadProgress(0);

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

      const contentLength = res.headers.get("Content-Length");
      if (!contentLength) {
        throw new Error("Cannot get file size");
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = res.body!.getReader();
      const chunks: Uint8Array[] = [];

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        loaded += value.length;

        const percent = Math.round((loaded / total) * 100);
        setDownloadProgress(percent);
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      let fileName = `${data?.name}.zip`;
      const contentDisposition = res.headers.get("content-disposition");
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches?.[1]) {
          fileName = matches[1];
        }
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast.error(error.message || "Download error");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
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
    let price = `0`;
    // if (activeSubcription && dataUser?.coin && dataUser?.coin !== 0) {
    //   price = `${data?.coinPrice[0] ?? 0} Coin`;
    // } else {
    //   if (isDiscount) {
    //     price = `$${data?.discount[0] ?? 0}`;
    //   } else {
    //     price = `$${data?.price[0] ?? 0}`;
    //   }
    // }
    price = `$${(data?.price?.[0] ?? 0).toFixed(2)} `;

    return price;
  };

  const generateCTA = (): string => {
    let wording = 'DOWNLOAD NOW';
    if (activeSubcription.activeSubcription && data.coinPrice[0] !== 0) {
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
      return ' flex h-auto w-full max-w-full mx-auto flex-col flex-nowrap items-start rounded-2xl border-[#61A9FA] bg-[#fff] p-2 shadow-xl transition-none hover:border-[2px]';
    }
    if (data.author) {
      return ' flex h-auto w-full max-w-full mx-auto flex-col flex-nowrap items-start rounded-2xl border-[#61A9FA] bg-[#fff] p-2 shadow-xl transition-none hover:border-[2px]';
    }
    return ' flex h-auto w-full max-w-full mx-auto flex-col flex-nowrap items-start rounded-2xl border-[#61A9FA] bg-[#fff] p-2 shadow-xl transition-none hover:border-[2px]';
  };

  const isReady =
    data &&
    data.imageUrl &&
    activeSubcriptionState?.subcription !== undefined &&
    subsData?.coin !== undefined;

  return (
    <>
        <div className={containerClassNames()}>
          {generateSale()}
          <div className={cardClassNames()}>
            <Image
              onClick={(e) => {
                if (isDragging) {
                  // e.preventDefault();
                  // e.stopPropagation();
                  // return;
                }

                if (data?.meta?.[0]?.title) {
                  router.push(`/product/${data.meta[0].title}`);
                }
              }}
              src={data.imageUrl[0]}
              alt={data.name}
              height={180}
              width={260}
              quality={60}
              className='h-auto w-full rounded-2xl object-cover '
              // classNames={{ image: 'h-auto w-full rounded-2xl object-cover' }}
              // useSkeleton={true}
            />
            <Link
              href={data?.meta?.[0]?.title ? `/product/${data.meta[0].title}` : '#'}
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className='mt-4 mb-2 px-1 relative z-[2] flex shrink-0 items-start justify-start self-stretch overflow-hidden text-left lg:text-[16px] text-[14px] font-semibold leading-[17.6px] text-[#1a204c]'
            >
              {data.name.length > 54 ? `${data.name.slice(0, 42)}...` : data.name}
            </Link>
            <div className='flex w-full justify-between gap-1'>
              {token && !activeSubcriptionState?.subcription  ? (
                <button
                  id={`show-detail-${data.id}`}
                  type="button"
                  // onClick={() => {
                  //   if (ownerStatus) {
                  //     getTransactionData(); // kalau sudah owned
                  //   } else if (!token) {
                  //     localStorage.setItem("productUrl", `/product/${data?.meta?.[0]?.title}`);
                  //     window.location.href = "/free-trial";
                  //   } else {
                  //     handleDownload();
                  //   }
                  // }}
                  onClick={(e) => {
                    if (data?.meta) {
                      router.push(`/product/${data?.meta[0].title}`);
                    }
                  }}
                  className="pointer flex h-[37px] flex-grow flex-nowrap rounded-xl items-center px-1"
                >
                  {downloadLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <>
                      {ownerStatus ? (
                        // ✅ Kalau sudah punya product
                        <span className="font-katide-regular z-[5] flex flex-row gap-1 text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px] leading-[16px] text-[#777777] transition-all">
                            OWNED
                          </span>
                      ) : (
                                                <span className="font-katide-regular z-[5] flex flex-row gap-1 text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px] leading-[16px] text-[#777777] transition-all">
                            {isDiscount &&
                            !(activeSubcription && dataUser?.coin && dataUser?.coin !== 0) ? (
                              <p className="font-katide-regular text-sm text-white line-through">
                                ${data?.price[0]}
                              </p>
                            ) : null}
                                                  {generatePrice()}
                          </span>
                      )}
                        <span className="font-katide-bold absolute hidden items-center justify-center rounded-[8px] bg-[#4065D1] text-[16px] leading-[16px] group-hover:flex">
                        <span className="scale-0 text-[#fff] group-hover:scale-100">
                          {ownerStatus}
                        </span>
                      </span>
                    </>
                  )}
                </button>
              ) : activeSubcriptionState.subcription ? (
                <button
                  id={`show-detail-${data.id}`}
                  type="button"
                  onClick={() => {
                    if (ownerStatus) {
                      getTransactionData(); // kalau sudah owned
                    } else if (!token) {
                      localStorage.setItem("productUrl", `/product/${data?.meta?.[0]?.title}`);
                      window.location.href = "/free-trial";
                    } else {
                      handleDownload();
                    }
                  }}
                  className="pointer flex h-[37px] flex-grow flex-nowrap items-center justify-center gap-[8px] mt-2 rounded-xl bg-white border  border-[#2a3b80] p-[12px] group-hover:bg-[#2a3b80] group-hover:text-white"
                >
                  {downloadLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <>
                      {ownerStatus ? (
                        // ✅ Kalau sudah punya product
                        <span className="font-katide-bold z-[5] flex flex-row items-center gap-1 text-[14px] sm:text-[16px] text-[#2a3b80] md:text-[16px] lg:text-[16px] leading-[16px]  transition-all group-hover:scale-0">
                          OWNED
                        </span>
                      ) : (
                        <span className="font-katide-bold z-[5] flex flex-row items-center gap-1 text-[14px] sm:text-[16px] md:text-[16px] text-[#2a3b80] lg:text-[16px] leading-[16px]  transition-all group-hover:scale-0">
                          {isDiscount &&
                          !(activeSubcription && dataUser?.coin && dataUser?.coin !== 0) ? (
                            <p className="font-katide-regular text-sm text-white line-through">
                              ${data?.price[0]}
                            </p>
                          ) : null}
                          {/*{generatePrice()}*/} DOWNLOAD NOW
                        </span>
                      )}
                      <span className="font-katide-bold absolute hidden items-center justify-center rounded-[8px] bg-[#2a3b80] text-[16px] leading-[16px] group-hover:flex">
                        <span className="scale-0 text-[#fff] group-hover:scale-100">
                          {ownerStatus ? generateCTA() : generateCTA()}
                        </span>
                      </span>
                    </>
                  )}
                </button>
              ):(
                <div className=""></div>
              )}
                {/*{!ownerStatus &&  (*/}
                {/*    <button*/}
                {/*        id={`add-${data.id}-cart`}*/}
                {/*        type='button'*/}
                {/*        onClick={handleCart}*/}
                {/*        className='flex items-center justify-center rounded-xl border border-[#2a3b80] bg-white px-3.5'*/}
                {/*    >*/}
                {/*        <img*/}
                {/*            src={cartProduct.src}*/}
                {/*            alt='cart'*/}
                {/*            className='h-4 w-4 object-cover sm:h-5 sm:w-5'*/}
                {/*        />*/}
                {/*    </button>*/}
                {/*)}*/}
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
              } target='_blank' className='absolute left-[10px] top-[10px] z-[7] cursor-pointer bg-no-repeat opacity-0 transition-all duration-500 group-hover:opacity-100'>
              <img
                src={hoverPinterest.src}
                className='h-[35px] w-[35px]'
                alt={`share-pinterest-${data.name}`}
              />
            </Link>
            <Link href={
              data?.meta?.[0]?.title
              ? `https://api.whatsapp.com/send?text=${process.env.NEXT_PUBLIC_URL}/product/${data?.meta?.[0].title}`
              : '#'
              } target='_blank' className='absolute left-[50px] top-[10px] z-[7] cursor-pointer bg-no-repeat opacity-0 transition-all duration-500 group-hover:opacity-100'>
              <img
                src={hoverWA.src}
                className='h-[35px] w-[35px]'
                alt={`share-whatsapp-${data.name}`}
              />
            </Link>
            {token &&
              activeSubcriptionState?.subcription !== undefined &&
              subsData &&
              subsData.coin !== undefined &&
              activeSubcriptionState.subcription &&
              subsData.coin !== -1 && (
                <div className="absolute right-[10px] top-[10px] z-[7] flex items-center bg-white rounded-2xl gap-2 p-1 font-katide-bold shadow-lg text-[#61657D]">
                  <img src={drizzyCoin.src} alt="coin" className="w-5 h-5 ms-0.5" />
                  <span className="me-2">{data?.coinPrice?.[0] ?? 0}</span>
                </div>
              )}

          </div>
        </div>
      {isDownloading && (
        <DownloadProgressModal
          open={isDownloading}
          progress={downloadProgress}
        />
      )}
      <FreeTrialModal
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        productName={modalProductName}
      />
      <TrialDownloadSuccess
        isOpen={showTrialSuccessModal}
        onClose={() => setShowTrialSuccessModal(false)}
        remaining={downloadRemaining}
      />
      <TrialExpired
        isOpen={showTrialExpiredModal}
        onClose={() => setShowTrialExpiredModal(false)}
      />
    </>

  );
};

export default ProductCard;