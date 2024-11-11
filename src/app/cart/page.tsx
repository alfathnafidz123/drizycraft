/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import * as React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Lottie from 'react-lottie';
import { toast } from 'react-toastify';

import { fetchCart } from '@/lib/slices/cart';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { itemPayment } from '@/app/api/billing/itemPayment';

import animationData from '~/lottie/005_CHECKOUT-600px.json';

export default function Register() {
  const dispatch = useAppDispatch();
  const { token, cart } = useAppSelector((state) => ({
    ...state.user,
    ...state.cart,
  }));

  React.useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, []);

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
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData, // the animation data
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
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
                    <th>Quantity</th>
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
                      <td className='w-1/12'>
                        ${item.product.price[item.licenseType]}
                      </td>
                      <td className='w-2/12'>1</td>
                      <td className='w-2/12'>
                        ${item.product.price[item.licenseType]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
