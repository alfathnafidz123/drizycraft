/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import SectionContainer from '@/components/container/sectionContainer';
// const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });
const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });

import localFont from 'next/font/local';

import AffiliateBanner from '@/components/AffiliateBanner';

import { subscriptionPayment } from '@/app/api/billing/subscriptionPayment';

import {
  bestValue,
  checkblue,
  cov,
  crossMember,
  drizzyCoin,
  member1,
  member2,
  member3,
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
      ],
      exclude: [
        'Be the first to know about new features and surprises',
        'Receive VIP treatment with fast, dedicated support',
        'Access to Projects from Crafters',
        '10% off every purchase',
        'Recive a free Exclusive Seasonal bundle once',
      ],
      priceId: 'price_1PFrgOGNsowyAud71NGolxlL',
    },
    {
      duration: '1 Month',
      buttonText: 'SUBSCRIBE',
      price: '$9.49/month',
      features: [
        'Personal License',
        '10 Drizy Coins for a month',
        'New SVG Every Day',
        'Be the first to know about new features and surprises',
        'Receive VIP treatment with fast, dedicated support',
        'Access to Projects from Crafters',
        '10% off every purchase',
      ],
      exclude: ['Recive a free Exclusive Seasonal bundle once'],
      priceId: 'price_1PF9jAGNsowyAud7Z9wea3bZ',
    },
    {
      duration: '3 Months',
      buttonText: 'SUBSCRIBE',
      price: '$24.49/3 months',
      features: [
        'Personal License',
        '100 Drizy Coins for 3 months to spend on our exclusive products',
        'New SVG Every Day',
        'Be the first to know about new features and surprises',
        'Receive VIP treatment with fast, dedicated support',
        'Access to Projects from Crafters',
        '20% off every purchase',
        'Recive a free Exclusive Seasonal bundle once',
      ],
      exclude: [],
      priceId: 'price_1PF9jQGNsowyAud7yoSqaeJn',
    },
    {
      duration: '1 Year',
      buttonText: 'SUBSCRIBE',
      price: '$99.49/year',
      features: [
        'Personal License',
        'Unlimited Drizy Coins to spend on our exclusive products (max. 100 coins per month)',
        'New SVG Every Day',
        'Be the first to know about new features and surprises',
        'Receive VIP treatment with fast, dedicated support',
        'Access to Projects from Crafters',
        '20% off every purchase',
        'Recive a free Exclusive Seasonal bundle once',
      ],
      exclude: [],
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
      <SectionContainer className='font-katide-bold flex flex-col-reverse gap-4 px-4 py-20 leading-10 lg:flex-row lg:gap-0 lg:px-0'>
        <div className='flex flex-col gap-8'>
          <p className='font-katide-heavy text-[48px] text-[#4065D1]'>
            Sign up and get unlimited access to our SVG.
          </p>
          <p className='font-katide-regular leading-[30px] text-[#1A214C] lg:pr-16'>
            Pay once at a fixed price and save thousands of dollars. No more
            purchasing one-by-one. Now you can create unlimited works. Download
            any SVG you want anytime, anywhere.
          </p>
          <Image src={vip.src} alt='Cov Product' width={235} height={78} />
        </div>
        <img
          src={cov.src}
          alt='Cov Product'
          className='!h-[489px] !w-[489px]'
        />
      </SectionContainer>

      <section className='flex flex-col items-center justify-center bg-[#EBECF5] text-[#1A214C]'>
        <div className='flex w-full flex-col bg-[#EBECF5] py-[10%] text-[#1A214C] lg:max-w-[1264px]'>
          <div className='flex flex-col flex-wrap lg:flex-row'>
            <div className='mb-16 flex w-full gap-4 lg:w-1/2'>
              <Image
                src={membership1.src}
                alt='nocommitment'
                width={60}
                height={60}
              />
              <div className='flex flex-col gap-4'>
                <p className='font-katide-bold text-[24px] text-[#4065D1]'>
                  No conditions
                </p>
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
                <p className='font-katide-bold text-[24px] text-[#4065D1]'>
                  No commitments
                </p>
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
                <p className='font-katide-bold text-[24px] text-[#4065D1]'>
                  No hidden fees
                </p>
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
                <p className='font-katide-bold text-[24px] text-[#4065D1]'>
                  Cancel anytime
                </p>
                <p className='text-[#1A214C] lg:pr-16'>
                  You can cancel your subscription or service anytime, offering
                  you the flexibility and convenience you need.
                </p>
              </div>
            </div>
          </div>

          <div className='relative flex flex-col flex-wrap items-center justify-center rounded-lg border border-[#1A214C] p-2 lg:p-12 mt-24'>
            <div className='absolute -top-3 left-0 flex w-full justify-center'>
              <p className='bg-[#EBECF5] px-4 text-[24px] tracking-[0.12em]'>
                SELECT LICENSE
              </p>
            </div>
            <div className='relative mt-4 flex h-[66px] items-center justify-center gap-8 rounded-full border-2 border-white bg-[#4065D1] px-6 shadow-lg lg:mt-0 lg:px-12'>
              <p
                onClick={() => {
                  setSelectedPlan(0);
                }}
                className={`${selectedPlan === 0
                  ? 'absolute -top-1 left-0 flex h-[70px] items-center rounded-full border-8 border-[#FFBB3C] bg-[#1A214C] px-6 align-middle text-[24px] text-white'
                  : 'align-middle text-[24px] text-white'
                  } font-katide-bold`}
              >
                Personal use
              </p>
              <p
                onClick={() => {
                  setSelectedPlan(1);
                }}
                className={`${selectedPlan === 1
                  ? 'absolute -top-1 right-0 flex h-[70px] items-center rounded-full border-8 border-[#FFBB3C] bg-[#1A214C] px-6 align-middle text-[24px] text-white'
                  : 'align-middle text-[24px] text-white'
                  } font-katide-bold`}
              >
                Commercial
              </p>
              {selectedPlan === 1 && (
                <p
                  className='font-katide-bold align-middle text-[24px] text-white'
                  onClick={() => {
                    setSelectedPlan(0);
                  }}
                >
                  Personal use
                </p>
              )}
              {selectedPlan === 0 && (
                <p
                  className='font-katide-bold align-middle text-[24px] text-white'
                  onClick={() => {
                    setSelectedPlan(1);
                  }}
                >
                  Commercial
                </p>
              )}
            </div>
            <p className='py-8 text-center tracking-[0.12em] text-[#1A214C]'>
              Subscribe Now and Enjoy up to{' '}
              <span className='font-semibold'>68% OFF</span>
            </p>

            <div className='flex w-full flex-col lg:flex-row gap-4'>
              {subscriptionPlans.map((plan, index) => (
                <div
                  key={index}
                  className='rounded-2xl bg-white shadow-lg max-md:min-w-[350px] max-md:min-h-[600px] lg:w-1/4 relative'
                >
                  {plan.duration === "1 Year" &&
                    <div className='bg-[#EE4C73] w-full h-36 absolute top-0 left-0 rounded-t-2xl' />
                  }
                  {plan.duration === "1 Year" &&
                    <img src={bestValue.src} alt='best value' className='absolute -top-10 -right-10 z-20' />
                  }
                  <div className={`flex flex-col rounded-2xl p-2 lg:p-6 z-10 w-full ${plan.duration === "1 Year" && "absolute bg-transparent"}`}>
                    <div className='flex flex-col items-center gap-4 rounded-2xl border border-[#DDDDDD] bg-[#F8F8FA] pt-4'>
                      <p className='w-1/2 rounded-xl bg-[#1A214C] py-2 text-center text-white'>
                        {plan.duration}
                      </p>
                      {plan.price === 'Free Trial' ? (
                        <p className='font-katide-heavy py-[26px] text-[32px]'>
                          {plan.price}
                        </p>
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
                        </div>
                      )}
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
                      className='font-katide-bold my-4 rounded-xl bg-[#EE4C73] py-6 text-[20px] tracking-[0.12em] text-white shadow-lg'
                      onClick={() => {
                        handleSubscribe(plan.priceId, token as string);
                      }}
                    >
                      {plan.buttonText}
                    </button>
                    <div className='flex flex-col gap-3.5'>
                      <p className='font-katide-bold text-xs text-[#1A214C]'>
                        This includes:
                      </p>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className='flex gap-3'>
                          <Image
                            src={checkblue.src}
                            alt='check'
                            width={15}
                            height={15}
                          />
                          <p className='text-xs text-[#1A214C]'>{feature}</p>
                        </div>
                      ))}
                      {plan.exclude.map((feature, idx) => (
                        <div key={idx} className='flex gap-3'>
                          <Image
                            src={crossMember.src}
                            alt='cross'
                            width={15}
                            height={15}
                          />
                          <p className='text-xs text-[#AAAAAA]'>{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col items-center justify-center bg-[#4065D1] text-white'>
        <div className='flex flex-col bg-[#4065D1] py-[10%] text-white lg:max-w-[1264px]'>
          <div className='relative flex flex-col flex-wrap items-center justify-center rounded-3xl border border-[#fff] p-6 lg:p-12'>
            <div className='absolute -top-3 left-0 flex w-full justify-center'>
              <p className='font-katide-regular bg-[#4065D1] px-4 text-lg lg:text-[48px]'>
                What They Say About Us
              </p>
            </div>
            <p className='py-[20px] text-center text-sm tracking-[0.14em] lg:text-lg'>
              Trusted by hundreds of thousands <br /> of crafters around the
              world
            </p>

            <div className='mt-[76px] grid w-full grid-cols-1 gap-4 rounded-lg bg-[#2A3B80] p-3 lg:grid-cols-3 lg:p-8'>
              <div className='flex flex-col items-center justify-start gap-4 border-white/15 px-3 border-b-[3px] lg:border-b-0 lg:border-r-[3px] lg:px-12 max-md:py-10'>
                <Image src={member1.src} alt='Review' width={72} height={72} />
                <p className='grow text-center'>
                  This is the first time I found a site that specially provides
                  affordable cut files. The designs are unique and excellent.
                  They’re responsible for my newfound crafting addiction!
                </p>
                <div className='h-0.5 w-[40px] rounded-full bg-[#EE4C73]'></div>
                <div className='flex flex-col items-center'>
                  <p className='text-[16px] font-extrabold'>Mary Haw</p>
                  <p className='text-[12px] font-extrabold text-[#4A90E2]'>
                    USA
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center justify-start gap-4 border-white/15 px-3 border-b-[3px] lg:border-b-0 lg:border-r-[3px] lg:px-12 max-md:py-10'>
                <Image src={member2.src} alt='Review' width={72} height={72} />
                <p className='grow text-center'>
                  Very helpful to small business owners like me. The prices are
                  low so I can sell my products more competitively. I can now
                  release new products every day, thank you very much.
                </p>
                <div className='h-0.5 w-[40px] rounded-full bg-[#EE4C73]'></div>
                <div className='flex flex-col items-center'>
                  <p className='text-[16px] font-extrabold'>Lisa</p>
                  <p className='text-[12px] font-extrabold text-[#4A90E2]'>
                    CANADA
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center justify-start gap-4 px-3 lg:px-12 max-md:py-10'>
                <Image src={member3.src} alt='Review' width={72} height={72} />
                <p className='grow text-center'>
                  Now I can save thousands of dollars to support my hobby. The
                  unlimited access really helps me get the design I want.
                </p>
                <div className='h-0.5 w-[40px] rounded-full bg-[#EE4C73]'></div>
                <div className='flex flex-col items-center'>
                  <p className='text-[16px] font-extrabold'>Ashley Rebecca</p>
                  <p className='text-[12px] font-extrabold text-[#4A90E2]'>
                    UK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionContainer className='font-katide flex flex-col items-center justify-center py-20 leading-10'>
        <div className={`${myFont.className} mb-8 text-[32px]`}>FAQ</div>
        <div className='mt-24 flex flex-col justify-between gap-8 p-4 lg:flex-row lg:p-0'>
          <div className='flex flex-col gap-[60px]'>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                Do I get access to all files?
              </p>
              <p className='text-base text-[#595959]'>
                Yes, after you register you can immediately download all the
                designs on this website. The prices displayed will change to $0
                for all items.{' '}
                <span className='text-[#FF0000]'>
                  (Excluding bundle products)
                </span>
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                What license is included?
              </p>
              <p className='text-base text-[#595959]'>
                As written on the description of the plan you choose, either
                Personal License or Commercial License.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                What file formats are included?
              </p>
              <p className='text-base text-[#595959]'>
                For crafts we include SVG / PNG / DXF / EPS. For graphics it is
                up to the designer to choose the format. For fonts we offer OTF
                and TTF formats. All fonts include at least one of these
                formats.
              </p>
              <p className='text-base text-[#595959]'>
                The format files are listed on each product page. You are
                allowed to convert them to other formats for your own use.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                Does it include product bundles?
              </p>
              <p className='text-base text-[#595959]'>
                <span className='font-bold'>Not included</span>, this membership
                package only includes a single crafter file. Bundles are
                products that must be purchased separately.
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-[60px]'>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                Can I use the files commercially?
              </p>
              <p className='text-base text-[#595959]'>
                Yes, if you choose the Commercial plan. For the Personal plan,
                you can only use it for personal projects. After the
                subscription ends, you still have commercial rights.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                Can I cancel at any time?
              </p>
              <p className='text-base text-[#595959]'>
                Yes, you can cancel your subscription at any time. There is no
                condition for it.
              </p>
            </div>
            <div className='flex flex-col gap-6'>
              <p className='text-lg text-[#1A204C]'>
                What happens when I end my subscription?
              </p>
              <p className='text-base text-[#595959]'>
                Once you end your subscription, you will lose access to download
                new files and updates.
              </p>
              <p className='text-base text-[#595959]'>
                You won't be allowed to create new works with the files you
                downloaded. However, you can keep using and selling the works
                that you created while you had an active subscription.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
      <section>
        <AffiliateBanner />
      </section>
    </main>
  );
}
