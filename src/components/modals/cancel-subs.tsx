import React, { useState } from 'react';
import Image from 'next/image';
import { cartIllustration, CheckNonLoginAds, Unhappy } from '~/images';
import axios, { AxiosError } from 'axios';
import { fetchSubs } from '@/lib/slices/subcription';
import { fetchCoin, fetchProfile } from '@/lib/slices/user';
import { store, useAppDispatch, useAppSelector } from '@/lib/store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SubscriptionI } from '@/app/profile/subscription/page';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelSubsModal = ({ isOpen, onClose  }: ModalProps) => {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [subsData, setSubsData] = useState<SubscriptionI>();
  const [showRecharge, setShowRecharge] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dataUser = useAppSelector((state) => state.user.dataUser);
  const [coin, setCoin] = useState(dataUser?.coin);
  const isLogin = useAppSelector((state) => state.user.token);

  if (!isOpen) return null;
  const closeModal = () => {
    onClose && onClose();
  };

  const cancelNow  = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/cancel-active-sub`,
        {cancelType: "immediate"},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (token) {
        await Promise.all([
          dispatch(fetchSubs(token)),
          dispatch(fetchProfile(token)),
          dispatch(fetchCoin(token)),
        ]);

        // ambil coin terbaru dari Redux store setelah dispatch selesai
        const updatedUser = store.getState().user.dataUser;
        setCoin(updatedUser?.coin ?? 0);
      }
      getSubscriptionData();
      window.location.reload();
      toast.success("Subscription cancelled successfully");
    } catch (error) {
      const err = error as AxiosError;
      toast.error(
        (err.response?.data as any).message ?? "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelAtPeriodEnd  = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/cancel-active-sub`,
        {cancelType: "period_end"},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (token) {
        await Promise.all([
          dispatch(fetchSubs(token)),
          dispatch(fetchProfile(token)),
          dispatch(fetchCoin(token)),
        ]);

        // ambil coin terbaru dari Redux store setelah dispatch selesai
        const updatedUser = store.getState().user.dataUser;
        setCoin(updatedUser?.coin ?? 0);
      }
      getSubscriptionData();
      window.location.reload();
      toast.success("Subscription will be cancelled at the end of the current period");
    } catch (error) {
      const err = error as AxiosError;
      toast.error(
        (err.response?.data as any).message ?? "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/current-sub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubsData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error((err.response?.data as any).message ?? "Unknown error");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        {isOpen && (
          <div
            onClick={closeModal}
            className='!fixed left-0 top-0 h-full w-full '
          ></div>
        )}
        {/* TAMBAHKAN relative DI SINI - di container card */}
        <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg mx-4">
          {/* BUTTON X - di dalam card */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 h-8 w-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-gray-200 transition-colors z-10"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center">
            <div className="px-14 pt-12">
              <div className="flex justify-center">
                <Image
                  src={Unhappy}
                  alt="Free Trial"
                  className="w-10 h-auto"
                />
              </div>
              <h2 className="text-2xl font-katide-extrabold my-2 mt-4 text-gray-900">
                CANCEL SUBSCRIPTION ?
              </h2>
            </div>
            <div className="mb-2 py-2 space-y-3 text-left text-gray-600 px-14">
              <p className="text-gray-600 font-katide-regular justify-center text-center">
                Really want to cancel your subscription? You will lose access to all premium features.
              </p>
            </div>
            <div className="space-y-4 px-8 pb-8">
              <button
                onClick={cancelNow}
                disabled={loading}
                className="w-full rounded-full bg-[#EE4C73] text-white p-3 font-bold text-md transition disabled:opacity-50"
              >
                CANCEL NOW
              </button>
              {!subsData?.cancel_at_period_end && (
                <button
                  onClick={cancelAtPeriodEnd}
                  disabled={loading}
                  className="w-full rounded-full bg-[#FFBB3C] p-3 font-bold text-md transition disabled:opacity-50 text-[#61657D]"
                >
                  CANCEL WHEN CURRENT PERIOD ENDS
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubsModal;