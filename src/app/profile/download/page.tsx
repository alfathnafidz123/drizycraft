/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { FaInfinity } from '@react-icons/all-files/fa6/FaInfinity';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { Meta, TransactionI, TransactionResI } from '@/interfaces/transaction.interfaces';

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [ordersData, setOrdersData] = React.useState<TransactionI[]>([]);
  const [meta, setMeta] = React.useState<Meta>();
  const [loading, setLoading] = React.useState<{ loading: boolean; id?: number }>({ loading: false });
  const [params, setParams] = React.useState({
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
            {ordersData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.product?.name}</td>
                  <td>
                    <FaInfinity />
                  </td>
                  <td>Never</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDownloadClick(item);
                      }}
                      className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'
                    >
                      {loading.id === item.id && loading.loading ?
                        <Loader className='animate-spin' />
                        :
                        "Download"
                      }
                    </button>
                  </td>
                </tr>
              );
            })}
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
        <div className='mt-8 flex w-full justify-center'></div>
      </div>
    </>
  );
}
