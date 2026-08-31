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
import NextImage from '@/components/NextImage';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import PostPurchaseModal from '@/components/modals/PostPurchaseModal';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [popupType, setPopupType] = useState<'free' | 'paid' | null>(null);

  const { token } = useAppSelector((state) => state.user);
  const [ordersData, setOrdersData] = useState<TransactionI[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [loading, setLoading] = useState<{ loading: boolean; id?: number }>({ loading: false });
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  })

  useEffect(() => {
    const popup = searchParams.get('popup');
    if (popup === 'free' || popup === 'paid') {
      setPopupType(popup);
      // bersihkan query param dari URL supaya tidak muncul lagi saat refresh
      router.replace('/profile/download');
    }
  }, []);

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
      {popupType && (
        <PostPurchaseModal
          type={popupType}
          onClose={() => setPopupType(null)}
        />
      )}
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-4">
          {ordersData?.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-[#008ECC]/40 hover:shadow-lg sm:flex-row"
            >
              <div className="relative aspect-[260/180] w-full overflow-hidden bg-gray-50 sm:w-[220px] sm:flex-shrink-0">
                <Image
                  fill
                  quality={60}
                  sizes="(max-width: 640px) 100vw, 220px"
                  className="object-cover object-center"
                  src={item?.product?.imageUrl[0]}
                  alt={item?.product?.name ?? ''}
                />
              </div>

              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex flex-col gap-1 sm:flex-1">
                  <h3 className="text-sm font-semibold text-[#1A214C]">
                    {item?.product?.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {{ 0: 'Personal', 1: 'Commercial', 2: 'Business' }[item.licenseType] ?? '-'} License
                  </p>
                  <div className="flex w-full justify-end mt-3">
                    <button
                      onClick={() => handleDownloadClick(item)}
                      disabled={loading.id === item.id && loading.loading}
                      className="flex items-center justify-center rounded-full bg-[#008ECC] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0077AD] disabled:opacity-70 sm:w-[140px]"
                    >
                      {loading.id === item.id && loading.loading ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        'Download'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {meta?.hasNextPage && (
          <div className="mt-8 flex w-full justify-center">
            <button
              onClick={() =>
                setParams((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={loading.loading}
              className="flex items-center justify-center gap-1.5 rounded-full border border-[#1A214C]/20 bg-white px-5 py-2 text-sm font-medium text-[#1A214C] transition-all hover:border-[#61A9FA] hover:bg-[#61A9FA] hover:text-white disabled:opacity-60"
            >
              {loading.loading ? (
                <Loader className="animate-spin" size={16} />
              ) : (
                <>
                  <span>Load More</span>
                  <IoChevronDown />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
