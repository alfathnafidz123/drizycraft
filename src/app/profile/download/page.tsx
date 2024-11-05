/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { FaInfinity } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';
import { Loader } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  imageUrl: string[];
  description: string;
  category: string;
  url: string;
  categories: string[];
  subCategories: string[];
  chilSubCategories: string[];
  tags: string[];
  purchasedCount: number;
  price: number[];
  coinPrice: number[];
  enableDiscount: boolean;
  discount: number[];
  discountPeriod: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  authorId: string;
}

interface OrderI {
  id: number;
  checkoutId: string;
  sessionId: string;
  status: boolean;
  licenseType: number;
  price: number;
  createdAt: string;
  userId: string;
  productId: string;
  affiliateId: string | null;
  product: Product;
}

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const [ordersData, setOrdersData] = React.useState<OrderI[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getTransactionData = async () => {
    try {
      const res = await axios.get(
        'https://drizy-api.quadrakaryasantosa.com/billing/get-transaction?page=1&limit=10',
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

  const handleDownloadClick = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://drizy-api.quadrakaryasantosa.com/billing/get-file-download/${id}`,
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

      let fileName = 'downloaded-file.zip';
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

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
                        handleDownloadClick(item?.id);
                      }}
                      className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'
                    >
                      {loading ?
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
        <div className='mt-8 flex w-full justify-center'></div>
      </div>
    </>
  );
}
