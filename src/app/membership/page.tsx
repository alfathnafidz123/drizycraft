'use client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import SectionContainer from '@/components/container/sectionContainer';

import { subscriptionPayment } from '@/app/api/billing/subscriptionPayment';

import {
  checkblue,
  cov,
  drizzyCoin,
  membership1,
  membership2,
  membership3,
  membership4,
  vip,
} from '~/images';

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const { token } = useAppSelector((state) => state.user);
  const subscriptionPlans = [
    {
      duration: '1 Day',
      buttonText: 'TRY NOW',
      price: 'Free Trial',
      features: [
        'Personal License',
        '5 Drizy Coins for a day',
        'New SVG Every Day',
        'Be the first to know about new features and surprises',
        'Receive VIP treatment with fast, dedicated support',
        'Access to Projects from Crafters',
      ],
      priceId: 'price_1PFrgOGNsowyAud71NGolxlL',
    },
    {
      duration: '1 Month',
      buttonText: 'SUBSCRIBE',
      price: '$9.99/month',
      features: [
        'Personal License',
        '10 Drizy Coins for a month',
        'New SVG Every Day',
        'Exclusive features',
        'Priority support',
        'Access to Premium Projects from Crafters',
      ],
      priceId: 'price_1PF9jAGNsowyAud7Z9wea3bZ',
    },
    {
      duration: '3 Months',
      buttonText: 'SUBSCRIBE',
      price: '$24.99 for 3 months',
      features: [
        'Personal License',
        '15 Drizy Coins for 3 months',
        'New SVG Every Day',
        'Exclusive features and content',
        'Priority support',
        'Access to Premium Projects from Crafters',
      ],
      priceId: 'price_1PF9jQGNsowyAud7yoSqaeJn',
    },
    {
      duration: '1 Year',
      buttonText: 'SUBSCRIBE',
      price: '$99.99/year',
      features: [
        'Personal License',
        '50 Drizy Coins for a year',
        'New SVG Every Day',
        'Exclusive features and content',
        'Priority support',
        'Access to Premium Projects from Crafters',
      ],
      priceId: 'price_1PFrepGNsowyAud7x3FESmnr',
    },
  ];

  const handleSubscribe = async (priceId: string, token: string) => {
    try {
      const data = await subscriptionPayment({
        priceId: priceId as string,
        token: token,
      });
      window.location.replace(data.data);
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    }
  };
  return (
    <main>
      <SectionContainer className='font-katide-bold flex flex-col py-20 leading-10 lg:flex-row'>
        <div className='flex flex-col gap-8'>
          <p className='text-[48px] text-[#4065D1]'>
            Sign up and get unlimited access to our SVG.
          </p>
          <p className='text-[#1A214C] lg:pr-16'>
            Pay once at a fixed price and save thousands of dollars. No more
            purchasing one-by-one. Now you can create unlimited works. Download
            any SVG you want anytime, anywhere.
          </p>
          <Image src={vip.src} alt='Cov Product' width={235} height={78} />
        </div>
        <Image src={cov.src} alt='Cov Product' width={480} height={480} />
      </SectionContainer>

      <section className='flex flex-col items-center justify-center bg-[#EBECF5] pb-[20%] text-[#1A214C]'>
        <div className='flex flex-col bg-[#EBECF5] py-[10%] text-[#1A214C] lg:w-[1264px]'>
          <div className='flex flex-col flex-wrap lg:flex-row'>
            <div className='mb-16 flex w-full gap-4 lg:w-1/2'>
              <Image
                src={membership1.src}
                alt='nocommitment'
                width={60}
                height={60}
              />
              <div className='flex flex-col gap-4'>
                <p className='text-[24px] text-[#4065D1]'>No conditions</p>
                <p className='text-[#1A214C] lg:pr-16'>
                  You can enjoy our services freely, without any conditions
                  attached. Relax and indulge without any obligations.
                </p>
              </div>
            </div>
            <div className='mb-16 flex w-full gap-4 lg:w-1/2'>
              <Image
                src={membership2.src}
                alt='nocommitment'
                width={60}
                height={60}
              />
              <div className='flex flex-col gap-4'>
                <p className='text-[24px] text-[#4065D1]'>No commitments</p>
                <p className='text-[#1A214C] lg:pr-16'>
                  You can explore and enjoy all that we offer without any
                  obligations or promises necessary on your part.
                </p>
              </div>
            </div>
            <div className='mb-16 flex w-full gap-4 lg:w-1/2'>
              <Image
                src={membership3.src}
                alt='nocommitment'
                width={60}
                height={60}
              />
              <div className='flex flex-col gap-4'>
                <p className='text-[24px] text-[#4065D1]'>No hidden fees</p>
                <p className='text-[#1A214C] lg:pr-16'>
                  Rest assured, our pricing is transparent with absolutely no
                  hidden fees. Enjoy our services worry-free.
                </p>
              </div>
            </div>
            <div className='mb-16 flex w-full gap-4 lg:w-1/2'>
              <Image
                src={membership4.src}
                alt='nocommitment'
                width={60}
                height={60}
              />
              <div className='flex flex-col gap-4'>
                <p className='text-[24px] text-[#4065D1]'>Cancel anytime</p>
                <p className='text-[#1A214C] lg:pr-16'>
                  You can cancel your subscription or service anytime, offering
                  you the flexibility and convenience you need.
                </p>
              </div>
            </div>
          </div>

          <div className='relative flex flex-col flex-wrap items-center justify-center rounded-lg border border-[#1A214C] p-12'>
            <div className='absolute -top-3 left-0 flex w-full justify-center'>
              <p className='bg-[#EBECF5] px-4 text-[24px]'>SELECT LICENSE</p>
            </div>
            <div className='relative flex h-[66px] items-center justify-center gap-8 rounded-full border-2 border-white bg-[#4065D1] px-10 shadow-lg'>
              <p
                onClick={() => {
                  setSelectedPlan(0);
                }}
                className={
                  selectedPlan === 0
                    ? 'absolute left-0 top-0 h-[66px] rounded-full border-8 border-[#FFBB3C] bg-[#1A214C] px-6 pt-3 align-middle text-[24px] text-white'
                    : 'align-middle text-[24px] text-white'
                }
              >
                Personal use
              </p>
              <p
                onClick={() => {
                  setSelectedPlan(1);
                }}
                className={
                  selectedPlan === 1
                    ? 'absolute right-0 top-0 h-[66px] rounded-full border-8 border-[#FFBB3C] bg-[#1A214C] px-6 pt-3 align-middle text-[24px] text-white'
                    : 'align-middle text-[24px] text-white'
                }
              >
                Commercial
              </p>
              {selectedPlan === 1 && (
                <p
                  className='align-middle text-[24px] text-white'
                  onClick={() => {
                    setSelectedPlan(0);
                  }}
                >
                  Personal use
                </p>
              )}
              {selectedPlan === 0 && (
                <p
                  className='align-middle text-[24px] text-white'
                  onClick={() => {
                    setSelectedPlan(1);
                  }}
                >
                  Commercial
                </p>
              )}
            </div>
            <p className='py-8 text-center text-[#1A214C]'>
              Subscribe Now and Enjoy up to{' '}
              <span className='font-semibold'>68% OFF</span>
            </p>

            <div className='flex w-full flex-col gap-4 lg:flex-row'>
              {subscriptionPlans.map((plan, index) => (
                <div
                  key={index}
                  className='flex w-1/4 flex-col rounded-2xl bg-white p-6 shadow-lg'
                >
                  <div className='flex flex-col items-center gap-4 rounded-2xl border border-[#DDDDDD] bg-[#F8F8FA] pt-4'>
                    <p className='w-1/2 rounded-xl bg-[#1A214C] py-4 text-center text-white'>
                      {plan.duration}
                    </p>
                    <p>{plan.price}</p>
                    <div className='flex w-full justify-center gap-2 rounded-2xl bg-[#C2E5FF] p-2'>
                      <Image
                        src={drizzyCoin.src}
                        alt='coin'
                        width={40}
                        height={40}
                      />
                      <p className='text-sm'>
                        <span className='font-semibold'>5 Drizy Coins</span> for
                        Diverse Crafting Options
                      </p>
                    </div>
                  </div>
                  <button
                    className='my-4 rounded-xl bg-[#EE4C73] py-6 text-[20px] font-bold text-white shadow-lg'
                    onClick={() => {
                      handleSubscribe(plan.priceId, token as string);
                    }}
                  >
                    {plan.buttonText}
                  </button>
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold text-[#1A214C]'>
                      This includes:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className='flex gap-2'>
                        <Image
                          src={checkblue.src}
                          alt='check'
                          width={15}
                          height={15}
                        />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
