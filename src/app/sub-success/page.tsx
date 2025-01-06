'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/lib/store';

import { success } from '~/images';
import { fetchCoin } from '@/lib/slices/user';
import { fetchSubs } from '@/lib/slices/subcription';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

export default function SubSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  const sessionId = params.get("sessionId");
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { trackEvent } = PixelEventsHooks();

  const handleSubSuccess = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/confirm-subs-payment`,
        {
          checkoutId: sessionId as string,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
        }
      );
      await trackEvent(EventsEnum.Subscribe, {
        sessionId,
      });
      dispatch(fetchSubs(token!));
      dispatch(fetchCoin(token!));
      router.replace("/");
    } catch (error: any) {
      toast('Subs failed, please reach out to the administrator');
    }
  };

  useEffect(() => {
    void handleSubSuccess();
  }, []);

  return (
    <main>
      <section className='flex w-screen bg-[#EBECF5] py-24 text-[#1A214C]'>
        <div className=' flex w-full flex-col items-center justify-center gap-8'>
          <Image src={success.src} alt='success' width={200} height={200} />
          <p className='font-katide-bold text-[36px]'>You are subscribed!</p>
        </div>
      </section>
    </main>
  );
}
