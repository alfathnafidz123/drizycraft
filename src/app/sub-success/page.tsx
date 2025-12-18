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
import PixelEventsHooks, {
  EventsEnum,
  RedditEventsEnum,
} from '@/components/pixel-custom-events';

export default function SubSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  const sessionId = params.get("sessionId");
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { trackEvent } = PixelEventsHooks();

  const handleSubSuccess = async () => {
    try {
      const res = await axios.post(
        // `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/confirm-subs-payment`,
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/subs-success`,
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
      const par = res.data.transactionSubs.name;
      if (par.toLowerCase().includes('trial')) {
        await trackEvent(EventsEnum.StartTrial, {
          sessionId,
        });
        await trackEvent(RedditEventsEnum.SignUp);
      } else {
        await trackEvent(EventsEnum.Subscribe, {
          sessionId,
          value: res.data.transactionSubs.price, // 💰 nilai harga dikirim ke Pixel
          currency: 'USD',  // ⚙️ tambahkan currency (disarankan oleh Meta)
        });
        await trackEvent(RedditEventsEnum.Purchase);
      }
      dispatch(fetchSubs(token!));
      dispatch(fetchCoin(token!));
      const productUrl = localStorage.getItem("productUrl");

      if (productUrl) {
        router.replace(productUrl);
        localStorage.removeItem("productUrl"); // optional supaya bersih
      } else {
        router.replace("/");
      }
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
