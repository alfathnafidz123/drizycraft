import React from 'react';
import ReactDOM from "react-dom";
import Image from 'next/image';
import { cartIllustration, CheckNonLoginAds } from '~/images';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  remaining?: number;
}

const TrialDownloadSuccess = ({ isOpen, onClose, remaining  }: ModalProps) => {
  if (!isOpen) return null;
  const closeModal = () => {
    onClose && onClose();
  };

  return ReactDOM.createPortal(
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
                  src={CheckNonLoginAds}
                  alt="Free Trial"
                  className="w-10 h-auto"
                />
              </div>
              <h2 className="text-2xl font-katide-extrabold my-2 mt-4 text-gray-900">
                Download Sucessful!
              </h2>
            </div>
            <div className="mb-2 py-2 space-y-3 text-left text-gray-600 px-14">
              <p className="text-gray-600 font-katide-bold justify-center text-center">
                You have {remaining} out of 10 free downloads left.
              </p>
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => {
                  localStorage.setItem("productUrl", window.location.pathname);
                  window.location.href = "/select-plan";
                }}
                className="w-full rounded-full bg-[#FFBB3C] p-3 font-bold text-md hover:bg-yellow-500 transition"
              >
                UPGRADE TO DOWNLOAD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>, document.body
  );
};

export default TrialDownloadSuccess;