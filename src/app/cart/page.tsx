'use client';

import axios, { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import * as React from 'react';
import { IoIosCloseCircleOutline } from '@react-icons/all-files/io/IoIosCloseCircleOutline';
import { toast } from 'react-toastify';

import errorHandler from '@/lib/errorHandler';
import { fetchCart } from '@/lib/slices/cart';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { itemPayment } from '@/app/api/billing/itemPayment';
import { CheckCouponResI } from '@/interfaces/coupon.interface';
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
  const [total, setTotal] = React.useState(cart.reduce((prev, current) => prev + current.product.price[current.licenseType], 0));

  React.useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, []);

  const getCoupon = React.useCallback(async () => {
    try {
      if (couponCode !== '') {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/coupon/check/${couponCode}`);
        const couponData = res.data as CheckCouponResI;
        if (couponData.status === "active") {
          setTotal(_ => {
            const temp = cart.reduce((prev, current) => prev + current.product.price[current.licenseType], 0);
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
      window.location.replace(data.data);
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
                        ${item.product.price[item.licenseType]}
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
                <div className='text-sm'>${total}</div>
              </div>
              <button
                onClick={handlePayment}
                className='self-end rounded-full bg-[#4065D1] hover:bg-[#2A3B80] px-24 py-3 text-white'
              >
                Checkout
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
