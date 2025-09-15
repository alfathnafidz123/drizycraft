import React from 'react';
import Image from 'next/image';
import { cartIllustration, CheckNonLoginAds } from '~/images';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const FreeTrialModal = ({ isOpen, onClose, productName  }: ModalProps) => {
  if (!isOpen) return null;
  const closeModal = () => {
    onClose && onClose();
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
                  src={cartIllustration}
                  alt="Free Trial"
                  className="w-40 h-auto"
                />
              </div>
              <h2 className="text-2xl font-katide-extrabold my-6 text-gray-900">
                Start Your Free Trial & Get 10 Free Downloads!
              </h2>

              <p className="text-gray-600 font-katide-bold">
                Download {productName} now at no cost.
              </p>
            </div>
            <div className="mb-6 py-6 space-y-3 text-left text-gray-600 border-b px-14">
              <div className="flex items-center gap-3">
                <Image src={CheckNonLoginAds} alt="check"/>
                <span>Access the entire Drizy premium library</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src={CheckNonLoginAds} alt="check"/>
                <span>Access Breezy, Project & Atelier</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src={CheckNonLoginAds} alt="check"/>
                <span>Request custom designs anytime</span>
              </div>
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => {
                  localStorage.setItem("productUrl", window.location.pathname);
                  window.location.href = "/free-trial";
                }}
                className="w-full rounded-full bg-[#FFBB3C] p-3 font-bold text-md hover:bg-yellow-500 transition"
              >
                JOIN FREE TRIAL & START DOWNLOADING
              </button>

              <p className="mt-4 text-sm font-katide-regular text-gray-500">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    localStorage.setItem("productUrl", window.location.pathname);
                    window.location.href = "/free-trial";
                  }}
                  className="text-blue-600 hover:underline font-katide-bold"
                >
                  Log in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FreeTrialModal;