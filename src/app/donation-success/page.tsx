'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { success } from '~/images';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

export default function DonationSuccess() {
  const params = useSearchParams();
  const sessionId = params.get('sessionId');
  const { trackEvent } = PixelEventsHooks();
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const track = async () => {
      if (sessionId && !tracked) {
        await trackEvent(EventsEnum.Purchase, {
          sessionId: sessionId,
          type: 'donation',
        });
        setTracked(true);
      }
    };
    void track();
  }, [sessionId]);

  return (
    <main>
      <section className="flex w-screen flex-col items-center justify-center gap-8 bg-[#EBECF5] py-24 text-[#1A214C]">
        <Image src={success.src} alt="success" width={200} height={200} />
        <div className="flex flex-col items-center gap-3 px-4 text-center">
          <p className="font-katide-bold text-[36px]">Thank you!</p>
          <p className="max-w-md font-katide-regular text-sm text-gray-500">
            Your support means a lot to us and helps keep new designs coming every week.
          </p>
        </div>

        <Link
          href="/"
          className="rounded-full bg-[#4065D1] px-8 py-3 text-sm font-katide-bold text-white transition hover:bg-[#2A3B80]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}