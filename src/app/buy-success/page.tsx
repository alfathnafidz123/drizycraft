'use client';

import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { success } from '~/images';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';
import { OrderI } from '@/interfaces/product.interface';
import DownloadProgressModal from '@/components/DownloadProgressModal';
import * as React from 'react';

export default function SubSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  const sessionId = params.get("sessionId");
  const checkoutId = params.get("checkoutId");
  const { token } = useAppSelector((state) => state.user);
  const { trackEvent } = PixelEventsHooks();

  const [loadingDownload, setLoadingDownload] = useState(false);
  // Perbaikan 1:Ubah state menjadi Array atau simpan single order yang cocok
  const [currentOrder, setCurrentOrder] = useState<OrderI>();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // 1. Return nilai total langsung dari fungsi konfirmasi
  const handleBuySuccess = async (): Promise<number> => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/confirm-item-payment`,
        {
          checkoutId: checkoutId,
          sessionId: sessionId,
          token: token,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
        }
      );

      await trackEvent(EventsEnum.Purchase, {
        checkoutId: checkoutId,
        sessionId: sessionId,
      });

      const total = res.data?.totalPrice ?? 0;
      setTotalPrice(total);
      return total; // Return nilai angka langsung

    } catch (error: any) {
      toast.error('Payment failed, please reach out to the administrator');
      return 0;
    }
  };

// 2. Terima price parameter di handleClickDownload
  const handleClickDownload = async (price: number) => {
    try {
      setLoadingDownload(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=500`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const ordersList: OrderI[] = res.data.data;
      const foundList = ordersList.filter(item => item.sessionId === sessionId);

      if (foundList.length > 0) {
        setCurrentOrder(foundList[0]);

        for (const found of foundList) {
          // Pass price ke downloadFile
          await downloadFile(found, price);
        }
      } else {
        // Jika tidak ada item yang diunduh, langsung jalankan redirect
        const popupType = price !== 0 ? 'paid' : 'free';
        router.replace(`/profile/download?popup=${popupType}`);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setLoadingDownload(false);
    }
  };

// 3. Terima price parameter di downloadFile
  const downloadFile = async (orderItem: OrderI, price: number) => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-file-download/${orderItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to download file: ${res.statusText}`);
      }

      const contentLength = res.headers.get("Content-Length");
      if (!contentLength) {
        throw new Error("Cannot get file size");
      }

      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = res.body!.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        loaded += value.length;

        const percent = Math.round((loaded / total) * 100);
        setDownloadProgress(percent);
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      let fileName = `${orderItem?.product?.name || 'download'}.zip`;
      const contentDisposition = res.headers.get("content-disposition");
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches?.[1]) {
          fileName = matches[1];
        }
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast.error(error.message || "Download error");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);

      // Gunakan parameter 'price' (bukan state 'totalPrice')
      const popupType = price !== 0 ? 'paid' : 'free';
      router.replace(`/profile/download?popup=${popupType}`);
    }
  };

// 4. Eksekusi berurutan pada useEffect
  useEffect(() => {
    const init = async () => {
      const fetchedPrice = await handleBuySuccess();
      await handleClickDownload(fetchedPrice);
    };
    void init();
  }, []);


  return (
    <main>
      <section className='flex w-screen bg-[#EBECF5] py-24 text-[#1A214C]'>
        <div className='flex w-full flex-col items-center justify-center gap-8'>
          <Image src={success.src} alt='success' width={200} height={200} />
          <p className='font-katide-bold text-[36px]'>
            Buy item success!
          </p>
        </div>
        {isDownloading && (
          <DownloadProgressModal
            open={isDownloading}
            progress={downloadProgress}
          />
        )}
      </section>
    </main>
  );
}