'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { success } from '~/images';

export default function SubSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  const sessionId = params.get("sessionId");
  const checkoutId = params.get("checkoutId");
  const { token } = useAppSelector((state) => state.user);

  const handleBuySuccess = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/confirm-coin-payment`,
        {
          checkoutId: sessionId,
          sessionId: sessionId,
          token: token,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
        }
      );
      // router.replace('/profile/subscription');
      window.location.href = '/profile/subscription';
    } catch (error: any) {
      toast('Payment failed, please reach out to the administrator');
    }
  };

  useEffect(() => {
    void handleBuySuccess();
  }, []);

  return (
    <main>
      <section className='flex w-screen bg-[#EBECF5] py-24 text-[#1A214C]'>
        <div className=' flex w-full flex-col items-center justify-center gap-8'>
          <Image src={success.src} alt='success' width={200} height={200} />
          <p className='font-katide-bold text-[36px]'>Recharge Drizy Coin success!</p>
        </div>
      </section>
    </main>
  );
}
