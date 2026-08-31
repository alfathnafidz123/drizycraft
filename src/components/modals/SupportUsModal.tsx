'use client';

import { useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/lib/store';

interface SupportUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface DonatePayload {
  amount: number;
  message?: string;
  token?: string;
}

export const donate = async (payload: DonatePayload) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/donate`,
    { amount: payload.amount, message: payload.message },
    {
      headers: payload.token
        ? { Authorization: `Bearer ${payload.token}` }
        : {},
    }
  );
  return res.data;
};


const SupportUsModal = ({ isOpen, onClose }: SupportUsModalProps) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1);
    const [customAmount, setCustomAmount] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const dataUserState = useAppSelector(state => state.user);
    const token = useMemo(() => {
      return dataUserState.token;
    }, [dataUserState.token]);

    const presetAmounts = [1, 3, 5];

    if (!isOpen) return null;

    const handleSelectPreset = (amount: number) => {
        setSelectedAmount(amount);
        setIsCustom(false);
        setCustomAmount('');
    };

    const handleCustomFocus = () => {
        setIsCustom(true);
        setSelectedAmount(null);
    };

    const handleCustomChange = (value: string) => {
        const cleaned = value.replace(/[^0-9.]/g, '');
        setCustomAmount(cleaned);
    };

    const getFinalAmount = (): number => {
        if (isCustom) {
            return parseFloat(customAmount) || 0;
        }
        return selectedAmount ?? 0;
    };


  const handleDonate = async () => {
    const amount = getFinalAmount();
    if (amount <= 0) {
      return;
    }

    try {
      const data = await donate({ amount, token });
      window.location.replace(data.data);
    } catch (error) {
      toast.error('Failed to process donation, please try again.');
    }
  };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-[380px] rounded-2xl bg-white p-6 shadow-xl">
                <h3 className="font-katide-bold text-lg text-[#1A214C]">
                    Support Us
                </h3>
                <p className="mt-1 text-sm font-katide-regular text-gray-500">
                    Choose an amount to support our team.
                </p>

                {/* Preset amounts */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                    {presetAmounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => handleSelectPreset(amount)}
                            className={`rounded-xl border-2 py-3 text-sm font-katide-bold transition ${
                                !isCustom && selectedAmount === amount
                                    ? 'border-[#4065D1] bg-[#EAF2FB] text-[#4065D1]'
                                    : 'border-gray-200 text-[#1A214C] hover:border-gray-300'
                            }`}
                        >
                            ${amount}
                        </button>
                    ))}
                </div>

                {/* Custom amount */}
                <div className="mt-3">
                    <div
                        className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition ${
                            isCustom ? 'border-[#4065D1] bg-[#EAF2FB]' : 'border-gray-200'
                        }`}
                    >
                        <span className="text-sm font-katide-bold text-[#1A214C]">$</span>
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder="Custom amount"
                            value={customAmount}
                            onFocus={handleCustomFocus}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            className="w-full bg-transparent text-sm font-katide-regular text-[#1A214C] border-0 outline-none placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2">
                    <button
                        onClick={handleDonate}
                        disabled={getFinalAmount() <= 0}
                        className="w-full rounded-full bg-[#4065D1] py-3 text-sm font-katide-bold text-white transition hover:bg-[#2A3B80] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Donate ${getFinalAmount().toFixed(2)}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm font-katide-regular text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportUsModal;