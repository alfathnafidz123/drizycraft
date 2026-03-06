'use client';
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import SectionContainer from "@/components/container/sectionContainer";
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

import { subscriptionPayment } from '@/app/api/billing/subscriptionPayment';
import { HomepageDataI } from "@/interfaces/product.interface";

import { bannerVector, craftToConnect, projectStars } from "~/images";
import { SubsTransactionResI } from '@/interfaces/transaction.interfaces';
import axios from 'axios';

const JumbotronSection = ({ homeProduct }: { homeProduct: HomepageDataI }) => {
  const { trackEvent } = PixelEventsHooks();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const subscriptionPlans = [
    {
      duration: '7 DAYS',
      buttonText: 'START FREE !',
      price: 'Free Trial',
      discount: undefined,
      extra: undefined,
      additional: undefined,
      text: "<br/> Get started with Drizy VIP+ Annual Access with a 14 DAYS of free trial. Download premium products for 14 DAYS. <br/> <br/> You’ll be billed $35.88/year on the 15th day. You can cancel anytime before the trial ends.",
      coin: <p className='text-sm'>
        <span className='font-katide-semibold'>5 Drizy Coins</span> for a day
      </p>,
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

  const plan = subscriptionPlans.find(plan => plan.duration === '7 DAYS');

  const handleSubscribe = async (priceId: string, token: string, membership: string) => {
      try {
        if (token) {
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

          if (alreadyUsedTrial && priceId == process.env.NEXT_PUBLIC_PRICE_TRIAL) {
            toast.error('You have already used the Free Trial. Please choose another plan.');
            return;
          }
          const data = await subscriptionPayment({
            priceId: priceId as string,
            token: token,
            membership:membership,
          });
          await trackEvent(EventsEnum.InitCheckoutMembership, {
            priceId: priceId as string,
            membership,
          });
          window.location.replace(data.data);
        } else {
          dispatch(setOpenModal(true));
        }
      } catch (error: any) {
        toast(
          'Create Checkout Page failed, please reach out to the administrator'
        );
      }
    };
  return (
    <>
      <SectionContainer
        className='flex flex-col items-center justify-center pt-[5px] text-center lg:pt-[40px] px-4 lg:px-0'
      >
        <div className="bg-[#C2E5FF] w-full my-8 mx-4 sm:mx-6 lg:mx-8 rounded-2xl relative overflow-hidden">
          {/* Absolute Right Image for Desktop */}
          <Image 
            src={craftToConnect}
            alt="Craft Banner Image"
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-[400px] lg:w-[600px] h-full"
          />

          <div className="flex flex-col items-start max-w-[600px]  px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            {/* Stars */}
            <div className="flex mb-2">
              {Array.from({ length: 5 }, (_, index) => (
                <Image
                  alt={`Project Star ${index + 1}`}
                  key={index}
                  width={20}
                  height={20}
                  src={projectStars.src}
                  className="my-auto"
                />
              ))}
            </div>

            {/* Title */}
            
            <h2 className="font-katide-heavy text-[40px] leading-[120%] text-indigo-950 lg:text-[64px] mt-5 mb-6">
              Craft to Connect
            </h2>

            {/* List */}
            <ul className="font-katide-regular space-y-3 text-gray-700 text-base mb-6 items-start text-left">
              <li className="flex items-start gap-2">
                <Image
                  src={bannerVector.src}
                  alt="banner"
                  width={20}
                  height={20}
                  className="mt-2"
                />
                <span>
                  Discover fresh ideas with <strong>Drizy Projects</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Image
                  src={bannerVector.src}
                  alt="banner"
                  width={20}
                  height={20}
                  className="mt-2"
                />
                <span>
                  Thousands of easy with <strong>Drizy Breezy</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Image
                  src={bannerVector.src}
                  alt="banner"
                  width={20}
                  height={20}
                  className="mt-2"
                />
                <span>
                  <strong>Request design?</strong> Yes! Go unlimited with your machine!
                </span>
              </li>
            </ul>

            {/* Buttons */}
            <div className="mt-6 flex gap-3 w-full justify-center lg:justify-start">
              <button 
                onClick={() => plan && handleSubscribe(plan.priceId!, token as string, plan.duration)}
                className="bg-[#4065D1] h-12 lg:h-10 w-[180px] lg:w-[140px] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all">
                Try for free
              </button>
              <Link
                href="/membership"
                className="bg-white h-12 lg:h-10 w-[180px] lg:w-[140px] text-[#61657D] border-[#CCCCCC] border-2 px-6 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all inline-block text-center flex items-center justify-center"
              >
                Learn more
              </Link>
            </div>

            
          </div>
          {/* Mobile Image Below Buttons */}
          <div className="w-full flex lg:hidden justify-end">
              <Image 
                src={craftToConnect}
                alt="Craft Banner Image Mobile"
                className="w-full max-w-xs"
              />
          </div>
        </div>
        
      </SectionContainer>
    </>
  )
}

export default JumbotronSection;