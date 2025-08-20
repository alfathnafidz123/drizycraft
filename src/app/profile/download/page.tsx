/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FaInfinity } from '@react-icons/all-files/fa6/FaInfinity';
import { IoChevronDown } from '@react-icons/all-files/io5/IoChevronDown';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { Meta, TransactionI, TransactionResI } from '@/interfaces/transaction.interfaces';

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [ordersData, setOrdersData] = useState<TransactionI[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [loading, setLoading] = useState<{ loading: boolean; id?: number }>({ loading: false });
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })

  const getTransactionData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=${params.page}&limit=${params.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transactionData = res.data as TransactionResI;
      setOrdersData(prev => ([...prev, ...transactionData.data]));
      setMeta(transactionData.meta);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleDownloadClick = async (item: TransactionI) => {
    try {
      setLoading({ loading: true, id: item.id });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-file-download/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to download file: ${res.statusText}`);
      }
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const response = await res.json();
        const url = response.productUrl;
        const link = document.createElement('a');
        link.href = url;

        let fileName = `${item.product.name}.zip`;
        const contentDisposition = res.headers.get('content-disposition');
        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="(.+)"/);
          if (matches && matches.length === 2) {
            fileName = matches[1];
          }
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        let fileName = `${item.product.name}.zip`;
        const contentDisposition = res.headers.get('content-disposition');
        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="(.+)"/);
          if (matches && matches.length === 2) {
            fileName = matches[1];
          }
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setLoading({ loading: false });
    }
  };

  useEffect(() => {
    getTransactionData();
  }, [params.page]);

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <table className='min-w-full border border-gray-300 border-collapse'>
          <thead className='bg-gray-100'>
          <tr className='text-center text-[#1A214C]'>
            <th className='border border-gray-300 px-4 py-2'>Product</th>
            <th className='border border-gray-300 px-4 py-2'>Download remaining</th>
            <th className='border border-gray-300 px-4 py-2'>Expires</th>
            <th className='border border-gray-300 px-4 py-2'></th>
          </tr>
          </thead>
          <tbody className='text-[#1A214C]'>
          {ordersData?.map((item, index) => (
            <tr key={index} className='hover:bg-gray-50'>
              <td className='border border-gray-300 px-4 py-2'>{item?.product?.name}</td>
              <td className='border border-gray-300 px-4 py-2 '>
                <FaInfinity />
              </td>
              <td className='border border-gray-300 px-4 py-2'>Never</td>
              <td className='border border-gray-300 px-4 py-2'>
                <button
                  onClick={() => handleDownloadClick(item)}
                  className='rounded-full bg-[#008ECC] px-6 py-2 font-semibold text-white'
                >
                  {loading.id === item.id && loading.loading ? (
                    <Loader className='animate-spin' />
                  ) : (
                    "Download"
                  )}
                </button>
              </td>
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
        <div className='mt-8 flex w-full justify-center'></div>
      </div>
    </>
  );
}
