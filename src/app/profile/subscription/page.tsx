/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

export interface SubscriptionI {
  product: string;
  start_date: string;
  end_date: string;
  payment: string;
}

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [subsData, setSubsData] = useState<SubscriptionI>();

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
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='divide-y divide-gray-200 bg-white'>
            <tr className='bg-gray-100'>
              <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                Status Subscription
              </td>
              <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                {getSubscriptionType(subsData?.product as string)}
              </td>
            </tr>
            <tr className='bg-white'>
              <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                Subscription Plan
              </td>
              <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                {getSubscriptionDuration(subsData?.product as string)}
              </td>
            </tr>
            <tr className='bg-gray-100'>
              <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                Remaining Drizy Coins
              </td>
              <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                17 Drizy Coin
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
        <div className='mt-8 flex w-full justify-center'>
          <button className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb]'>
            Cancel subscription
          </button>
        </div>
      </div>
    </>
  );
}
