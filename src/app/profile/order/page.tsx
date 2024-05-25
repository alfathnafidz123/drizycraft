/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import moment from 'moment';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import {
  Meta,
  TransactionI,
  TransactionResI,
} from '@/interfaces/transaction.interfaces';

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [transactions, setTransactions] = React.useState<TransactionI[]>([]);
  const [meta, setMeta] = React.useState<Meta>();
  const [params, setParams] = React.useState({ page: 1, limit: 2 });

  const getTransactions = async () => {
    if (token) {
      try {
        const res = await axios.get(
          'https://drizy-api.quadrakaryasantosa.com/billing/get-transaction',
          { headers: { Authorization: `bearer ${token}` }, params }
        );
        const transactionData = res.data as TransactionResI;
        setTransactions((prev) => [...prev, ...transactionData.data]);
        setMeta(transactionData.meta);
      } catch (error) {
        const err = error as AxiosError;
        const errorData: any = err.response?.data;
        toast.error(
          (errorData.message as string) ?? 'Error when get transactions!'
        );
      }
    }
  };

  React.useEffect(() => {
    getTransactions();
  }, [params.page]);

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
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{moment(item.createdAt).format('MMMM DD, YYYY')}</td>
                <td>Completed</td>
                <td>
                  {item.checkoutId === 'coin'
                    ? `${item.price} coin`
                    : `$${item.price / 100}`}{' '}
                  for 1 item
                </td>
                <td>Invoice</td>
              </tr>
            ))}
          </tbody>
        </table>
        {meta?.hasNextPage && (
          <button
            onClick={() =>
              setParams((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className='mt-8 flex w-full cursor-pointer justify-center text-blue-600 underline'
          >
            Load more...
          </button>
        )}
      </div>
    </>
  );
}
