/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { FaInfinity } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { Meta } from '@/interfaces/article.interfaces';
import {
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
          (errorData.message as string) ?? 'Error when get downloads product!'
        );
      }
    }
  };

  const handleDownload = async (id: number) => {
    if (token) {
      try {
        const res = await axios.get(
          `https://drizy-api.quadrakaryasantosa.com/billing/get-file-download/${id}`,
          { headers: { Authorization: `bearer ${token}` } }
        );
        await fetch(res.data);
      } catch (error) {
        const err = error as AxiosError;
        const errorData: any = err.response?.data;
        toast.error(
          (errorData.message as string) ?? 'Error when download product!'
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
              <th>Product</th>
              <th>Download remaining</th>
              <th>Expires</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody className='text-[#1A214C]'>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>
                  <FaInfinity />
                </td>
                <td>Never</td>
                <td>
                  <button
                    onClick={() => {
                      handleDownload(item.id);
                    }}
                    className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='mt-8 flex w-full justify-center'></div>
      </div>
    </>
  );
}
