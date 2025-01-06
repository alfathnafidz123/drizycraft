/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { IoChevronDown } from '@react-icons/all-files/io5/IoChevronDown';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import {
  Meta,
  TransactionI,
  TransactionResI,
} from '@/interfaces/transaction.interfaces';

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [transactions, setTransactions] = useState<TransactionI[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const [loading, setLoading] = useState<{ loading: boolean; id?: number }>({ loading: false });
  const router = useRouter();

  const getTransactions = async () => {
    if (token) {
      setLoading({ loading: true })
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction`,
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
      } finally {
        setLoading({ loading: false });
      }
    }
  };

  const downloadInvoice = async (chechoutId: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-invoice/${chechoutId}`,
        { headers: { Authorization: `bearer ${token}` } }
      );
      router.push(res.data);
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Error when generate Invoice!'
      );
    }
  }

  useEffect(() => {
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
                <td><div className='hover:underline cursor-pointer' onClick={() => downloadInvoice(item.checkoutId)}>Invoice</div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {meta?.hasNextPage && (
          <div className='mt-8 flex w-full justify-center'>
            <div onClick={() => { setParams(prev => ({ ...prev, page: prev.page + 1 })) }} className='flex items-center justify-center cursor-pointer text-center mt-10'>
              {loading.loading
                ? <Loader className='animate-spin' />
                :
                <div className='flex flex-row gap-1 items-center justify-center transition-all hover:text-white bg-white hover:bg-[#61A9FA] rounded-full px-3 py-1 border-black border'>
                  <p>Load More</p>
                  <IoChevronDown />
                </div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
