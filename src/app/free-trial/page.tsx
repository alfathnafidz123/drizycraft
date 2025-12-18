'use client';

import axios from 'axios';
import Image from 'next/image';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import PixelEventsHooks, {
  EventsEnum,
  RedditEventsEnum,
} from '@/components/pixel-custom-events';
import { setOpenModal } from '@/lib/slices/user';
import {
  AmexLogo,
  arrowRightCircleFill,
  DinersClubLogo,
  DiscoverLogo,
  JcbLogo,
  MasterCardLogo,
  StripeLogo,
  VisaLogo,
} from '~/images';
import NextImage from '@/components/NextImage';
import { SubsTransactionResI } from '@/interfaces/transaction.interfaces';
import { subscriptionPayment } from '@/app/api/billing/subscriptionPayment';

export default function Register() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const activeSubcription = React.useMemo(() => {
    return activeSubcriptionState;
  }, [activeSubcriptionState]);
  const subscriptionPlans = [
    {
      duration: '7 DAYS',
      buttonText: 'START FREE !',
      price: 'Free Trial',
      discount: undefined,
      extra: undefined,
      additional: undefined,
      text: "<p><br/> Get started with <strong>Drizy VIP+ Annual Access</strong> with a 7 DAYS of free trial. Download premium products for 7 DAYS. <br/> <br/> You'll be billed <strong>$74.99/year on the 7th day</strong>. You can cancel anytime before the trial ends.</p>",
      coin: <p className='text-sm'>Free up to 10 designs</p>,
      features: [
        { title: 'Daily SVG Updates', desc: 'always something new to explore' },
        { title: 'Breezy Mode', desc: 'seamless creations with drag & drop' },
        { title: 'Machine Compatibility', desc: 'works seamlessly with cutting, laser, and sublimation devices' },
      ],
      exclude: [
        { title: 'Custom Designs on Request', desc: 'chat with our team for unique creations' },
        { title: 'Full License Coverage', desc: 'includes commercial and POD licensing' },
        { title: 'Business Assistance', desc: 'tools and support to elevate your project' },
        { title: 'Premium Support', desc: 'priority access to our dedicated artist team' },
      ],
      priceId: process.env.NEXT_PUBLIC_PRICE_TRIAL,
    },
  ];
  const { trackEvent } = PixelEventsHooks();

  const [hasModalBeenShown, setHasModalBeenShown] = React.useState(false);

  React.useEffect(() => {
    // Cek jika tidak ada token DAN modal belum pernah ditunjukkan
    if (!token && !hasModalBeenShown) {
      dispatch(setOpenModal(true));
      setHasModalBeenShown(true);
    }

    // Reset state jika token tersedia (user login)
    if (token) {
      setHasModalBeenShown(false);
    }
  }, [token, hasModalBeenShown, dispatch]);

  const plan = subscriptionPlans.find(plan => plan.duration === '7 DAYS');

  const handleSubscribe = async (priceId: string, token: string, membership: string) => {
    try {
      if (!token) {
        dispatch(setOpenModal(true));
        return;
      }

      // Cek transaksi dulu
      const params = { page: 1, limit: 10 }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-subs-transaction`,
        { headers: { Authorization: `bearer ${token}` }, params }
      );

      const transactionData = res.data as SubsTransactionResI;

      // Cek apakah sudah pernah ambil Free Trial
      const alreadyUsedTrial = transactionData.data.some(
        (trx) =>
          trx.name?.toLowerCase() === 'free trial' && trx.status === 'success'
      );

      if (alreadyUsedTrial && membership?.toLowerCase().includes("7")) {
        toast.error('You have already used the Free Trial. Please choose another plan.');
        return;
      }

      // Lanjut proses checkout
      const data = await subscriptionPayment({
        priceId: priceId as string,
        token: token,
        membership: membership,
      });
      localStorage.setItem('checkoutSession', JSON.stringify(data));

      await trackEvent(EventsEnum.StartTrial, {
        priceId: priceId as string,
        membership,
      });
      
      await trackEvent(RedditEventsEnum.SignUp);

      window.location.replace(data.data);

      await trackEvent(EventsEnum.AddPaymentInfo, {
        paymentMethod: "Stripe",
        membership,
      });

    } catch (error: any) {
      toast('Create Checkout Page failed, please reach out to the administrator');
    }
  };

  return (
    <main className='bg-[#F4F4F4] pb-20'>
      <section className='flex flex-col lg:gap-12 gap-2 max-md:p-2 lg:flex-row lg:py-20 mx-auto w-full max-w-[1164px]'>
        <div className='flex h-1/2 flex-grow flex-col gap-4 rounded-xl bg-white py-6 px-6 m-2 shadow-lg lg:px-12 lg:py-10'>
          <h2 className=' text-2xl font-katide-extrabold text-gray-900 mb-10'>
            Enjoy Free Trial – Unlock 10 Downloads Today
          </h2>

          <div className='flex w-full flex-col gap-6 mb-16'>
            <div className='flex items-start gap-4'>
              <Image src={arrowRightCircleFill} width={20} height={20} alt="check" />
              <p className='text-[16px] text-gray-700'>
                The trial will end in <span className='font-semibold'>7 days</span>. You will not be charged if you cancel before the trial ends. You can cancel anytime.
              </p>
            </div>

            <div className='flex items-start gap-4'>
              <Image src={arrowRightCircleFill} width={20} height={20} alt="check" />
              <p className='text-[16px] text-gray-700'>
                The trial will renew at <span className=''>$6.25/month</span>, billed yearly, either 7 days after your trial starts or once you use your 10th download credit.
              </p>
            </div>

            <div className='flex items-start gap-4'>
              <Image src={arrowRightCircleFill} width={20} height={20} alt="check" />
              <p className='text-[16px] text-gray-700'>
                By clicking "<span className='font-semibold'>Confirm and Pay</span>", you agree to our <a href='/terms' className='text-blue-600 hover:underline'>Terms & Conditions</a> and <a href='/cancellation-policy' className='text-blue-600 hover:underline'>Cancellation Policy</a>.
              </p>
            </div>
          </div>
        </div>
        <div className="flex basis-5/12 flex-col items-center rounded-xl m-2 bg-white shadow-lg">
          {/* Cart Subtotal */}
          <div className="w-full border-b pb-4 p-8">
            <div className="flex justify-between">
              <span className="text-gray-600 font-katide-medium">Cart Subtotal</span>
              <span className="font-bold">$74.99</span>
            </div>

            <div className="mt-3">
              <div className="flex justify-between">
                <label className="text-gray-600 font-katide-medium">Your promo code:</label>
                <div>
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-lg px-3 py-1 text-gray-800 font-katide-regular">
                      0309WKWK29
                    </div>
                  </div>
                  <p className="text-blue-500 text-sm mt-2 text-end">You are saving $74.99</p>
                </div>
              </div>

            </div>
          </div>

          {/* Total */}
          <div className="w-full mt-4 px-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">TOTAL</span>
              <span className="text-lg font-bold">$ 0.00</span>
            </div>

            <button
              className="w-full rounded-full bg-[#FFBB3C] py-3 font-bold text-lg hover:bg-yellow-500 transition"
              onClick={() => plan && handleSubscribe(plan.priceId!, token as string, plan.duration)}
            >
              CHECKOUT
            </button>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center px-8 mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Safe checkout. Trusted by millions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="text-sm flex gap-2 mt-3 ">
                <NextImage alt="stripe" src={StripeLogo} width={150} height={10} className="bg-[#19224C] rounded-full" />
                <NextImage alt="stripe" src={MasterCardLogo} width={44} height={10} />
                <NextImage alt="stripe" src={VisaLogo} width={54} height={20} className="mt-1" />
              </div>
              <div className="text-sm flex gap-2 mt-3 ">
                <NextImage alt="stripe" src={AmexLogo} width={44} height={10} />
                <NextImage alt="stripe" src={DiscoverLogo} width={68} height={30} />
                <NextImage alt="stripe" src={JcbLogo} width={36} height={10} />
                <NextImage alt="stripe" src={DinersClubLogo} width={68} height={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
