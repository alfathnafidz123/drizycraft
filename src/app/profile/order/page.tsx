/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

export interface OrdersI {
  checkoutId: string;
  totalPrice: number;
  count: string;
}

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [ordersData, setOrdersData] = React.useState<OrdersI[]>([]);

  const getOrdersId = (id: string) => {
    if (id?.includes('cs')) {
      const idString = id?.split('_');
      return idString[2].slice(0, 10);
    } else {
      return id;
    }
  };
  const getSubscriptionData = async () => {
    try {
      const res = await axios.get(
        'https://drizy-api.quadrakaryasantosa.com/billing/get-transaction-grouped?page=1&limit=10',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrdersData(res.data.data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    getSubscriptionData();
  }, []);

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <table className='table-auto'>
          <thead>
            <tr className='text-left text-[#1A214C]'>
              <th>Orders</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-[#1A214C]'>
            {ordersData?.length > 0 &&
              ordersData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{getOrdersId(item?.checkoutId)}</td>
                    <td>{item?.count}</td>
                    <td>Completed</td>
                    <td>
                      ${item?.totalPrice / 100} for {item?.count} item
                    </td>
                    <td>Invoice</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className='mt-8 flex w-full justify-center'></div>
      </div>
    </>
  );
}
