/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/lib/store';

// const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });
const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });

import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';

import { setOpenModal } from '@/lib/slices/user';

import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

import { subscriptionPayment } from '@/app/api/billing/subscriptionPayment';

import {
  bestValue,
  checkblue,
  crossMember,
  drizzyCoin,
  vip,
} from '~/images';
import axios from 'axios';
import { SubsTransactionResI } from '@/interfaces/transaction.interfaces';
import { router } from 'next/client';
const CustomerSupportLottie = dynamic(
  () => import('../../components/lottie/customer-support'),
  { ssr: false }
);

export default function Membership() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { trackEvent } = PixelEventsHooks();
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
    {
      duration: 'BASIC 1 MONTH',
      buttonText: 'UNLOCK NOW !',
      price: '$24.99/mo',
      discount: '$30',
      extra: undefined,
      additional: 'First Month Only',
      text: "<p><br />Get unlimited access to <strong>all premium assets.</strong> Unleash boundless crafting joy, as effortless as drag-and-drop onto your beloved cutting, laser & sublimation machines. Commercial and POD license included. Cancel anytime <br /><br /></p>",
      coin: <p className='text-sm'>
        <span className='font-katide-semibold'>50 Drizy Coins</span> to all premium products
      </p>,
      features: [
        { title: 'Daily SVG Updates', desc: 'always something new to explore' },
        { title: 'Breezy Mode', desc: 'seamless creations with drag & drop' },
        { title: 'Machine Compatibility', desc: 'works seamlessly with cutting, laser, and sublimation devices' },
        { title: 'Custom Designs on Request', desc: 'chat with our team for unique creations' },
        { title: 'Full License Coverage', desc: 'includes commercial and POD licensing' },
      ],
      exclude: [
        { title: 'Business Assistance', desc: 'tools and support to elevate your project' },
        { title: 'Premium Support', desc: 'priority access to our dedicated artist team' },
      ],
      priceId: process.env.NEXT_PUBLIC_PRICE_MONTHLY,
    },
    {
      duration: 'ANNUAL ACCESS',
      buttonText: 'GET YEARLY !',
      price: '$6.25/mo',
      discount: '$299.88',
      extra: '($74.99/year)',
      additional: undefined,
      text: "<p><br/> Crafting your Way! Unlock a year of <strong>premium features</strong> at the lowest price. Save more. <br/><br/>You're billed $74.99 per year, saving you 75% compared to the monthly plan! Cancel anytime. <br/></p>",
      coin: <p className='text-sm'>
        <span className='font-katide-semibold'>Unlimited Drizy Coins</span> for
        Diverse Crafting Options
      </p>,
      features: [
        { title: 'Unlimited Premium Products', desc: 'access every asset, all year long' },
        { title: 'Daily SVG Updates', desc: 'always something new to explore' },
        { title: 'Breezy Mode', desc: 'seamless creations with drag & drop' },
        { title: 'Machine Compatibility', desc: 'works seamlessly with cutting, laser, and sublimation devices' },
        { title: 'Custom Designs on Request', desc: 'chat with our team for unique creations' },
        { title: 'Full License Coverage', desc: 'includes commercial and POD licensing' },
        { title: 'Business Assistance', desc: 'tools and support to elevate your project' },
        { title: 'Premium Support', desc: 'priority access to our dedicated artist team' },
      ],
      exclude: [],
      priceId: process.env.NEXT_PUBLIC_PRICE_ANNUAL,
    },
  ];
  const [showChat, setShowChat] = useState(false);
  const refChat = useRef<any>();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (refChat.current && !refChat.current.contains(event.target)) {
        setShowChat(false);
      }
    };
    document.addEventListener('click', handleClick);

    if (!token) {
      dispatch(setOpenModal(true)); // buka modal login
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [showChat]);

  // Handle subscription 
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

      await trackEvent(EventsEnum.InitCheckoutMembership, {
        priceId: priceId as string,
        membership,
      });

      window.location.replace(data.data);

    } catch (error: any) {
      toast('Create Checkout Page failed, please reach out to the administrator');
    }
  };

  return (
    <main>
        {/* Card Membership  */}
      <section className='flex flex-col items-center justify-center text-[#1A214C] pt-10 mt-10'>
        <div className='flex w-full flex-col items-center text-[#1A214C] lg:max-w-[1264px]'>
          <div className='relative flex flex-col flex-wrap items-center justify-center rounded-lg lg:border border-[#1A214C] p-2 lg:p-12 mb-12 sm:border-0' style={{ borderRadius: '24px' }}>
            {/* Badge Image at Top */}
            <div className='absolute -top-3 left-0 flex w-full justify-center'>
              <div className='absolute -top-7 left-1/2 transform -translate-x-1/2'>
                <Image src={vip.src} alt='Cov Product' width={235} height={78} className="z-10" />
              </div>
            </div>

            {/* Subscription Plan Cards */}
            <div className='flex w-full flex-col justify-center lg:flex-row gap-10 lg:gap-9 max-lg:px-8 mt-8 lg:mt-8'>
              {subscriptionPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl shadow-2xl shadow-[#00000033] max-md:min-h-[400px] max-md:w-[280px] lg:!min-h-[1020px] lg:w-1/4 relative group border-white hover:border-[#EE4C73] transition-all max-sm:p-2 max-sm:shadow-2xl ${
                    plan.duration === "ANNUAL ACCESS"
                      ? "bg-[#C2E5FF] mt-14 lg:mt-0"
                      : plan.duration === "BASIC 1 MONTH"
                        ? "bg-[#E4F6FB]"
                        : "bg-white"
                  }`}
                >

                  {/* Header Style Color */}
                  {plan.duration === "ANNUAL ACCESS" && (
                    <div className='bg-[#61A9FA] w-full h-36 absolute top-0 left-0 rounded-t-2xl' />
                  )}
                  {plan.duration === "0" && (
                    <div className='bg-[#61A9FA] w-full h-36 absolute top-0 left-0 rounded-2xl' />
                  )}

                  {/* Best Value Badge */}
                  {plan.duration === "ANNUAL ACCESS" && (
                    <div className='bg-[#FFBB3C] w-full h-36 absolute -top-14 left-0 rounded-2xl -z-10 text-center pt-2 flex flex-col'>
                      <span className='font-katide-bold text-[#61657D] tracking-widest h-5'>LIMITED TIME !</span>
                      <span className='font-katide-heavy text-lg text-[#1A214C]'>SAVE 75%</span>
                    </div>
                  )}

                  {/* <div className={`flex flex-col rounded-2xl p-2 lg:p-6 z-10 w-full ${plan.duration === "ANNUAL ACCESS" ? "absolute bg-transparent" : ""}`}> */}
                  <div className="flex flex-col rounded-2xl p-2 lg:p-6 z-10 w-full">
                    <div className='flex flex-col items-center gap-4 rounded-2xl border border-[#DDDDDD] bg-[#F8F8FA] pt-4 h-[274px] relative'>
                      <p className='w-5/6 rounded-xl bg-[#1A214C] py-2 text-center text-white whitespace-nowrap'>
                        {plan.duration}
                      </p>

                      {plan.price === 'Free Trial' ? (
                        <div className='rounded-xl w-full h-2/4 flex justify-center items-center'>
                          <div className='flex flex-col items-center gap-3 text-center'>
                            <div className='font-katide-heavy text-[40px] text-[#1A214C]'>
                              {plan.price}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='rounded-[20px] bg-[#EBECF5] p-3.5'>
                          <div className='flex flex-row items-center gap-1'>
                            <div className='font-katide-heavy text-[48px] text-[#1A214C]'>
                              {plan.price.split('.')[0]}
                            </div>
                            <div className='flex flex-col'>
                              <p className='font-katide-semibold text-base text-[#1A214C]'>
                                .{plan.price.split('.')[1].split('/')[0]}
                              </p>
                              <p className='font-katide-regular text-base text-[#1A214C]'>
                                /{plan.price.split('.')[1].split('/')[1]}
                              </p>
                            </div>
                          </div>
                          {plan.extra && (
                            <div className='text-[#1A214C] text-xl font-katide-bold'>{plan.extra}</div>
                          )}
                          <div className='text-center font-katide-semibold text-gray-400 line-through'>{plan.discount}</div>
                        </div>
                      )}

                      {/* Coin Info */}

                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex w-[101%] items-center gap-3 rounded-2xl p-4 h-14 ${
                          plan.duration === "ANNUAL ACCESS" ? "bg-[#61A9FA]" : "bg-[#C2E5FF]"
                        }`}
                      >
                        <Image
                          src={drizzyCoin.src}
                          alt='coin'
                          width={40}
                          height={40}
                          className='h-7'
                        />
                        {plan.coin}
                      </div>
                    </div>

                    {/* Plan Description */}
                    <div
                      className='hidden lg:flex items-center justify-center text-[#1A214C] text-[10px] leading-tight text-center mt-2 px-4'
                      dangerouslySetInnerHTML={{ __html: plan.text }}
                    />
                    {/* Subscribe Button */}
                    {plan.duration !== "0" ? (
                      <button
                        className='font-katide-bold my-4 mx-auto w-11/12 rounded-xl bg-[#EE4C73] py-6 text-[20px] tracking-[0.12em] group-hover:bg-[#FFBB3C] text-white shadow-lg transition-all group-hover:text-[#1A214C] hover:!bg-[#ED9B37]'
                        onClick={() => handleSubscribe(plan.priceId!, token as string, plan.duration)}
                      >
                        {plan.buttonText}
                      </button>
                    ) : (
                      <button
                        // className='font-katide-bold my-4 rounded-xl bg-[#4065D1] py-6 text-[20px] tracking-[0.12em] text-white shadow-lg transition-all hover:!bg-[#2A3B80]'
                        className='font-katide-bold my-4 mx-auto w-11/12 rounded-xl bg-[#EE4C73] py-6 text-[20px] tracking-[0.12em] group-hover:bg-[#FFBB3C] text-white shadow-lg transition-all group-hover:text-[#1A214C] hover:!bg-[#ED9B37]'

                        onClick={() => handleSubscribe(plan.priceId!, token as string, plan.duration)}
                      >
                        {plan.buttonText}
                      </button>
                    )}

                    {/* Features Included */}
                    <div className='hidden lg:flex flex-col gap-3.5'>
                      <p className='font-katide-bold text-xs text-[#1A214C]'>
                        This includes:
                      </p>

                      {plan.features.map((feature, idx) => (
                        <div key={idx} className='flex items-center gap-3'>
                          <Image
                            src={checkblue.src}
                            alt='check'
                            width={15}
                            height={15}
                          />
                          <div>
                            <p className='text-xs font-katide-bold text-[#1A214C]'>{feature.title}</p>
                            <p className='text-xs font-katide-light text-[#1A214C]'>{feature.desc}</p>
                          </div>
                        </div>
                      ))}

                      {/* Excluded Features */}
                      {plan.exclude.map((feature, idx) => (
                        <div key={idx} className='flex gap-3'>
                          <Image
                            src={crossMember.src}
                            alt='cross'
                            width={15}
                            height={15}
                          />
                          <div>
                            <p className='text-xs font-katide-bold text-[#AAAAAA]'>{feature.title}</p>
                            <p className='text-xs font-katide-light text-[#AAAAAA]'>{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Free Plan Note */}
                  {plan.duration === "0" && (
                    <p className='bg-[#F8F8FA] w-full absolute bottom-0 left-0 rounded-2xl text-[#1A214C] text-xs text-center p-8 leading-[24px]'>
                      Take your business to the next level with the <span className='font-bold'>Reseller Pro Plan</span>. Join now and boost your online store’s offerings and profitability. Consult now!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {showChat ?
          <div ref={refChat} className='fixed bottom-0 right-0 z-[99]'>
            <iframe height={500} src='https://tawk.to/chat/672866874304e3196adcbd50/1ibqt10pq' />
          </div>
          :
          <div onClick={() => setShowChat(true)} className="fixed bottom-0 right-0 z-[500]">
            <div className='-mb-8 max-w-[200px]'>
              <CustomerSupportLottie />
            </div>
          </div>
        }
    </main>
  );
}
