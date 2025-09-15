'use client';

import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline';
import axios, { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import * as React from 'react';
import { toast } from 'react-toastify';

import errorHandler from '@/lib/errorHandler';
import { fetchCart } from '@/lib/slices/cart';
import { setSubscriptionModalOpen } from '@/lib/slices/subcription';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

import { itemPayment } from '@/app/api/billing/itemPayment';
import { CheckCouponResI } from '@/interfaces/coupon.interface';
import {fetchCoin, fetchProfile, setOpenModal} from "@/lib/slices/user";
import {OrderI} from "@/interfaces/product.interface";
import { fetchDownloadRemaining } from '@/lib/slices/download';
import { useEffect, useState } from 'react';
import { SubscriptionI } from '@/app/profile/subscription/page';
import { getProductOwnedById } from '@/app/api/product/getProductOwnedById';
import FreeTrialModal from '@/components/modals/free-trial';
import TrialDownloadSuccess from '@/components/modals/trial-download-success';
import TrialExpired from '@/components/modals/trial-expired';
const CartLottie = dynamic(
  () => import('../../components/lottie/cart'),
  { ssr: false }
);

export default function Register() {
  const dispatch = useAppDispatch();
  const { token, cart } = useAppSelector((state) => ({
    ...state.user,
    ...state.cart,
  }));
  const [couponCode, setCouponCode] = React.useState('');
  const [coupon, setCoupon] = React.useState<CheckCouponResI>();
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const newTotal = cart.reduce((prev, current) => {
      const price = current?.product?.coinPrice?.[current.licenseType] || 0;
      return prev + price;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  const { trackEvent } = PixelEventsHooks();
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const activeSubcription = React.useMemo(() => {
    return activeSubcriptionState;
  }, [activeSubcriptionState]);
  const [subsData, setSubsData] = useState<SubscriptionI>();
  const [ownerStatus, setOwnerStatus] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [modalProductName, setModalProductName] = useState('');
  const [showTrialSuccessModal, setShowTrialSuccessModal] = useState(false);
  const downloadRemaining = useAppSelector(state => state.download.remaining);
  const [showTrialExpiredModal, setShowTrialExpiredModal] = useState(false);

  React.useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, []);

  useEffect(() => {
    getSubscriptionData();
  }, []);

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

  const getCoupon = React.useCallback(async () => {
    try {
      if (couponCode !== '') {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/coupon/check/${couponCode}`);
        const couponData = res.data as CheckCouponResI;
        if (couponData.status === "active") {
          setTotal(_ => {
            const temp = cart.reduce((prev, current) => prev + current.product.coinPrice[current.licenseType], 0);
            if (couponData.coupon?.percentage) {
              return temp - (temp * couponData.coupon?.percentage / 100);
            } else {
              return Number(temp) - Number(couponData.coupon?.discount ?? 0)
            }
          });
        }
        setCoupon(couponData);
      } else {
        setCoupon(undefined);
      }
    } catch (error) {
      setCoupon(undefined);
      errorHandler(error);
    }
  }, [couponCode]);

  React.useEffect(() => {
    const getData = setTimeout(() => {
      getCoupon();
    }, 1000);

    return () => clearTimeout(getData);
  }, [couponCode, getCoupon]);

  const handlePayment = async () => {
    try {
      if (activeSubcription.activeSubcription){
        const products: string[] = [];
        const licenses: number[] = [];
        const affiliates: string[] = [];
        cart.forEach((item) => {
          products.push(item.productId);
          licenses.push(item.licenseType);
          affiliates.push(item.affiliateId ?? '');
        });
        const data = await itemPayment({
          productId: products,
          licenseType: licenses,
          affiliateId: affiliates,
          token: token,
          coupon: coupon?.status === "active" ? couponCode : undefined,
        });
        await trackEvent(EventsEnum.InitCheckout, {
          products: cart.map(item => ({ productName: item.product.name, license: item.licenseType })),
          coupon: coupon?.status === "active" ? couponCode : undefined,
        });
        window.location.replace(data.data);
      } else {
        dispatch(setSubscriptionModalOpen(true));
      }
      
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Error when generate payment!'
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/cart/${id}`, {
        headers: { Authorization: `bearer ${token}` },
        params: { page: 1, limit: 25 },
      });
      dispatch(fetchCart(token!));
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error((errorData.message as string) ?? 'Unknown error!');
    }
  };

  const showSuccessToast = (data: { product: { name: string } }[]) => {
    const productList = data.map(item => `✅ ${item.product.name}`).join('\n');

    toast.success(`Successfully bought:\n${productList}`, {
      style: { whiteSpace: 'pre-line' }, // agar \n tampil sebagai line break
    });
  };

  const handleDownload = async () => {
    let remaining = downloadRemaining ?? 0; // copy nilai awal

    if (!token) {
      dispatch(setOpenModal(true));
      return;
    }

    // 🔑 cek quota cukup untuk semua item di cart
    if (subsData?.status === "trialing" && cart.length > remaining) {
      toast.error(
        `Your download quota is not enough. You only have ${remaining} download${remaining === 1 ? '' : 's'} left.`
      );
      return; // stop langsung
    }

    for (const data of cart) {
      try {
        if (subsData?.status === "trialing" && remaining === 0) {
          toast.error(
            "You reached the maximum download limit during the free trial period. Please upgrade your subscription to continue downloading."
          );
          setShowTrialExpiredModal(true);
          break;
        }

        if (activeSubcription.subcription !== undefined) {
          const payload: { [key: string]: string | number } = {
            productId: data.product.id,
            licenseType: 0,
          };

          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/buy-with-coin`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // kurangi quota lokal
          if (subsData?.status === "trialing") {
            remaining = Math.max(remaining - 1, 0);
          }

          await Promise.all([
            dispatch(fetchProfile(token!)),
            dispatch(fetchCoin(token!)),
            dispatch(fetchDownloadRemaining(token!)),
            getTransactionData(),
          ]);

          await trackEvent(EventsEnum.Purchase, {
            productId: data?.id,
            productName: data?.product.name,
            productPrice: data?.product.coinPrice,
            paymentType: 'coin'
          });

          if (subsData?.status === "trialing") {
            setShowTrialSuccessModal(true);
            toast.success(
              `Successfully downloaded ${data?.product.name}! Remaining quota: ${remaining}`
            );
          } else {
            toast.success(`Successfully downloaded ${data?.product.name}!`);
          }
        } else {
          toast.error(
            "You don't have enough coin to download this product, please top up your coin first!"
          );
        }
      } catch (error) {
        const err = error as AxiosError;
        const errorData: any = err.response?.data;
        toast.error(
          (errorData.message as string) ?? 'Error when generate payment!'
        );
      }
    }
  };


  const getTransactionData = async () => {
    for (const data of cart) {
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
        const found = orders.find(item => item.productId === data?.product.id);
        if (found) {
          await handleDownloadClick(found.id);
          await trackEvent(EventsEnum.Download, {productId: data.id, productName: data.product.name});
        }
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      }
    }
  };

  const handleDownloadClick = async (id: number) => {
    for (const data of cart) {
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

        let fileName = `${data.product.name}.zip`;
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
  };


  return (
    <main className='bg-[#F4F4F4]'>
      <section className='flex flex-col gap-4 max-md:p-2 lg:flex-row lg:py-20 mx-auto w-full max-w-[1164px]'>
        <div className='flex basis-3/12 flex-col items-center gap-12 rounded-xl bg-white p-8 pr-16 shadow-lg'>
          <p className='text-3xl font-bold'>My Cart</p>
          <CartLottie />
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 shadow-lg lg:p-8'>
          {cart.length === 0 ? (
            <div className='flex w-full items-center justify-center'>
              <div className='text-center text-sm italic'>
                No product in your cart
              </div>
            </div>
          ) : (
            <>
              <table className='table-fixed'>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className='w-1/12'>
                        <button onClick={() => handleDelete(item.id)}>
                          <IoIosCloseCircleOutline className='h-[24pt] w-[24pt]' />
                        </button>
                      </td>
                      <td className='w-2/12'>
                        <Image
                          src={item.product.imageUrl[0]}
                          width={120}
                          height={80}
                          alt={item.product.name}
                        />
                      </td>
                      <td className='w-4/12'>{item.product.name}</td>
                      <td className='w-2/12'>
                        {item.product.coinPrice[item.licenseType]} Coin
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full px-2 flex flex-row justify-end gap-2 items-center">
                <input type='text' onChange={(e) => setCouponCode(e.target.value)} placeholder='Type your coupon here' className='self-start rounded-full' />
                {coupon?.coupon && coupon?.status === "active" ?
                  <div className=''>
                    -{coupon.coupon.percentage ? `${coupon.coupon.percentage}%` : `$${coupon.coupon.discount}`}
                  </div>
                  :
                  null
                }
              </div>
              <div className="w-full px-2 flex flex-row justify-end gap-2 items-center font-katide-bold">
                <div className='text-sm'>Grand Total</div>
                <div className='text-sm'>{total} Coin</div>
              </div>
              <button
                onClick={handleDownload}
                className='self-end rounded-full bg-[#4065D1] hover:bg-[#2A3B80] px-24 py-3 text-white'
              >
                Download
              </button>
            </>
          )}
        </div>
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
      </section>

    </main>
  );
}
