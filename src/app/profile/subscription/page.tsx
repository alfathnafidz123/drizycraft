/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import ModalRechargeCoin from '@/components/modals/recharge-coin';

export interface SubscriptionI {
  product: string;
  start_date: string;
  end_date: string;
  payment: string;
  coin: number;
}

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [subsData, setSubsData] = useState<SubscriptionI>();
  const [showRecharge, setShowRecharge] = useState(false);
  const { activeSubcription } = useAppSelector(state => state.subs);

  const getSubscriptionData = async () => {
    try {
      const res = await axios.get(
        'https://drizy-api.quadrakaryasantosa.com/billing/current-sub',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubsData(res.data.data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getSubscriptionData();
  }, []);

  const getSubscriptionType = (plan: string) => {
    if (plan?.includes('Personal')) {
      return 'Personal';
    }
    if (plan?.includes('Commercial')) {
      return 'Commercial';
    }
    if (plan?.includes('Free')) {
      return 'Free Trial';
    }
    return 'No Plan';
  };

  const getSubscriptionDuration = (plan: string) => {
    if (plan?.includes('1')) {
      return '1 Month';
    }
    if (plan?.includes('3')) {
      return '3 Month';
    }
    if (plan?.includes('Yearly')) {
      return '1 Year';
    }
    return '-';
  };

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <p className='pl-4 text-lg font-semibold text-[#1A214C]'>
          Subscription
        </p>
        <div className='max-w-full overflow-x-scroll lg:overflow-x-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <tbody className='divide-y divide-gray-200 bg-white'>
              <tr className='bg-gray-100'>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  Status Subscription
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  {subsData ? "Active" : "-"}
                </td>
              </tr>
              <tr className='bg-white'>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  Subscription Plan
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  {subsData?.product}
                </td>
              </tr>
              <tr className='bg-gray-100'>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  Remaining Drizy Coins
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  {subsData?.coin === -1 ? 'Unlimited' : subsData?.coin ?? 0} Drizy Coin
                </td>
              </tr>
              <tr className='bg-white'>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  Start Date
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  {subsData?.start_date}
                </td>
              </tr>
              <tr className='bg-gray-100'>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  Renewal Date
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  {subsData?.end_date}
                </td>
              </tr>
              <tr className='bg-white'>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  Payment
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  Via {subsData?.payment}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='mt-8 flex lg:flex-row flex-col-reverse w-full justify-between items-center gap-3'>
          <button className='rounded-full bg-[#008ECC] px-14 py-3 font-semibold text-[#e4f6fb] whitespace-nowrap'>
            Cancel subscription
          </button>
          {activeSubcription && subsData?.coin !== -1 &&
            <div className='w-full flex justify-center lg:justify-end'>
              <button className="button-coin" onClick={() => { setShowRecharge(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <rect className="border-coin" pathLength="100"></rect>
                  <rect className="loading-coin" pathLength="100"></rect>

                  <svg
                    className="done-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="done done-cloud"
                      pathLength="100"
                      d="M 6.5,20 Q 4.22,20 2.61,18.43 1,16.85 1,14.58 1,12.63 2.17,11.1 3.35,9.57 5.25,9.15 5.88,6.85 7.75,5.43 9.63,4 12,4 14.93,4 16.96,6.04 19,8.07 19,11 q 1.73,0.2 2.86,1.5 1.14,1.28 1.14,3 0,1.88 -1.31,3.19 Q 20.38,20 18.5,20 Z"
                    ></path>
                    <path
                      className="done done-check"
                      pathLength="100"
                      d="M 7.515,12.74 10.34143,15.563569 15.275,10.625"
                    ></path>
                  </svg>
                </svg>
                <div className="txt-upload">Recharge Coin</div>
              </button>
            </div>
          }
        </div>
      </div>
      <ModalRechargeCoin isOpen={showRecharge} onClose={() => { setShowRecharge(false) }} />
    </>
  );
}
