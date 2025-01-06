'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { success } from '~/images';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

export default function SubSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  const sessionId = params.get("sessionId");
  const checkoutId = params.get("checkoutId");
  const { token } = useAppSelector((state) => state.user);
  const { trackEvent } = PixelEventsHooks();

  const handleBuySuccess = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/confirm-item-payment`,
        {
          checkoutId: checkoutId,
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
      await trackEvent(EventsEnum.Purchase, {
        checkoutId: checkoutId,
        sessionId: sessionId,
      });
      router.replace('/profile/download');
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
          <p className='font-katide-bold text-[36px]'>Buy item success!</p>
        </div>
      </section>
    </main>
  );
}
