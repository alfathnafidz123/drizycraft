/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

export default function Register() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setToken({ token: 'testing token' }));
  }, []);
  const data = [
    { id: 'Status Subscription', name: 'Commercial' },
    { id: 'Subscription Plan', name: '3 month' },
    { id: 'Remaining Drizy Coins', name: '17 Drizy Coin' },
    { id: 'Start Date', name: '20 February 2024' },
    { id: 'Renewal Date', name: '20 August 2024' },
    { id: 'Payment', name: 'Via Paypal' },
  ];
  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <p className='pl-4 text-lg font-semibold text-[#1A214C]'>
          Subscription
        </p>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#1A214C]'>
                  {item.id}
                </td>
                <td className='whitespace-nowrap border border-[#AAAAAA] px-6 py-4 text-[#AAAAAA]'>
                  {item.name}
                </td>
              </tr>
            ))}
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
