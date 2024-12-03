/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { drizzyCoin } from '~/images';



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalRechargeCoin: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [productId, setProductId] = useState<string>();
  const [customAmount, setCustomAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    onClose && onClose();
  };
  const { token } = useAppSelector(state => state.user);

  const handlePayment = async () => {
    try {
      if (productId === undefined && customAmount < 2) {
        toast.error('Minimum 2 coins');
      } else {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/coin-payment`,
          {
            priceId: productId,
            qty: productId ? 1 : customAmount,
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token ?? ''}`,
            },
          }
        );
        window.location.replace(resp.data.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Error when generate payment!'
      );
    }
  };

  return (
    <div>
      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={closeModal}
          className='fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {isOpen && (
        <div className='fixed left-0 top-0 z-30 transform overflow-hidden rounded-3xl bg-white shadow-lg max-md:w-full lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <div className='flex h-4/5 w-full flex-col max-md:overflow-y-scroll lg:h-[500px] lg:w-[410px]'>
            <div className='flex flex-col items-center gap-4 bg-center bg-cover bg-[url(/images/banner-coin.png)] p-8 pb-4'>
              <h2 className='font-katide-bold text-5xl text-center'>RECHARGE DRIZY COIN</h2>
              <p className='text-center text-sm'>Coin validity aligns with your subscription period. Any purchased coins will expire if you cancel your Drizy VIP+ subscription.</p>
            </div>
            <div className='grid grid-cols-4 py-5 px-4 gap-3'>
              <label htmlFor='15' className={`border-[3px] ${productId === process.env.NEXT_PUBLIC_PRICE_FIFTEEN ? "border-[#FFBB3C]" : "border-[#AAAAAA]"} rounded-xl cursor-pointer px-3 pt-4 pb-2 flex flex-col items-center`}>
                <img src={drizzyCoin.src} alt='coin' className='w-8 h-8 mt-2' />
                <p className='text-[#AAAAAA] text-xl font-katide-bold mt-3.5'>15</p>
                <p className='text-[#AAAAAA] text-xs font-katide-regular'>Drizy Coin</p>
                <p className='text-[#AAAAAA] text-xs font-katide-bold mt-7'>$5</p>
                <input type='radio' onChange={(e) => setProductId(e.target.value)} name='coin' className='hidden' id='15' value={process.env.NEXT_PUBLIC_PRICE_FIFTEEN} />
              </label>
              <label htmlFor='30' className={`border-[3px] ${productId === process.env.NEXT_PUBLIC_PRICE_THIRTY ? "border-[#FFBB3C]" : "border-[#AAAAAA]"} rounded-xl cursor-pointer px-3 pt-4 pb-2 flex flex-col items-center`}>
                <img src={drizzyCoin.src} alt='coin' className='w-8 h-8 mt-2' />
                <p className='text-[#AAAAAA] text-xl font-katide-bold mt-3.5'>30</p>
                <p className='text-[#AAAAAA] text-xs font-katide-regular'>Drizy Coin</p>
                <p className='text-[#AAAAAA] text-xs font-katide-bold mt-7'>$10</p>
                <input type='radio' onChange={(e) => setProductId(e.target.value)} name='coin' className='hidden' id='30' value={process.env.NEXT_PUBLIC_PRICE_THIRTY} />
              </label>
              <label htmlFor='150' className={`border-[3px] ${productId === process.env.NEXT_PUBLIC_PRICE_HUNDREDFIFTY ? "border-[#FFBB3C]" : "border-[#AAAAAA]"} rounded-xl cursor-pointer px-3 pt-4 pb-2 flex flex-col items-center`}>
                <img src={drizzyCoin.src} alt='coin' className='w-8 h-8 mt-2' />
                <p className='text-[#AAAAAA] text-xl font-katide-bold mt-3.5'>150</p>
                <p className='text-[#AAAAAA] text-xs font-katide-regular'>Drizy Coin</p>
                <p className='text-[#AAAAAA] text-xs font-katide-regular mt-5 line-through'>$50</p>
                <p className='text-[#AAAAAA] text-xs font-katide-bold'>$25</p>
                <input type='radio' onChange={(e) => setProductId(e.target.value)} name='coin' className='hidden' id='150' value={process.env.NEXT_PUBLIC_PRICE_HUNDREDFIFTY} />
              </label>
              <label htmlFor='custom' className={`border-[3px] ${productId === undefined ? "border-[#FFBB3C]" : "border-[#AAAAAA]"} rounded-xl cursor-pointer px-3 pt-4 pb-2 flex flex-col items-center`}>
                <p className='text-[#AAAAAA] text-xs font-katide-regular text-center'>Choose Your Amount</p>
                <input value={customAmount} onChange={(e) => setCustomAmount(Number(e.target.value))} type='number' className='mt-2 w-full rounded-md border-[#999999] bg-[#EBECF5] h-5 text-xs text-center' />
                <p className='text-[#AAAAAA] text-xs font-katide-regular mt-1.5'>Drizy Coin</p>
                <p className='text-[#AAAAAA] text-xs font-katide-bold mt-7'>${(customAmount * (1 / 3)).toFixed(2)}</p>
                <input type='radio' onChange={() => setProductId(undefined)} name='coin' className='hidden' id='custom' value="price_1QFii6Qinl9UJNy4N7tw2yyH" />
              </label>
            </div>
            <div className='px-5'>
              <button onClick={handlePayment} disabled={loading} className='bg-[#FFBB3C] disabled:bg-[#FFBB3C]/80 disabled:cursor-not-allowed w-full rounded-full py-2.5 font-katide-bold'>
                {loading ? <FaSpinner className='animate-spin' /> : "GET DRIZY COIN"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalRechargeCoin;
