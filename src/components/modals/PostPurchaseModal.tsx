'use client';

import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaMugHot } from '@react-icons/all-files/fa/FaMugHot';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import Link from 'next/link';

interface PostPurchaseModalProps {
  type: 'free' | 'paid';
  onClose: () => void;
}

const PostPurchaseModal = ({ type, onClose }: PostPurchaseModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[380px] rounded-2xl border border-[#4065D1]/20 bg-white p-6 text-center shadow-xl">
        {type === 'free' ? (
          <>
            {/* Icon */}
            <div className="flex justify-center">
              <FaHeart className="h-8 w-8 text-[#4065D1]" />
            </div>

            {/* Judul */}
            <h3 className="font-katide-bold mt-4 text-lg text-[#1A214C]">
              Enjoying this free design?
            </h3>

            {/* Deskripsi */}
            <p className="mt-2 text-sm font-katide-regular leading-relaxed text-gray-500">
              Free downloads are made possible by crafters like you. If this saved you time, a small coffee keeps new designs coming every week.
            </p>

            {/* CTA */}
            <Link
              href="https://buymeacoffee.com/drizycraft"
              target="_blank"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#EE4C73] py-3 text-sm font-katide-semibold text-white transition hover:bg-[#CE4768]"
            >
              <FaMugHot size={16} />
              Buy me a coffee
            </Link>

            {/* Maybe later */}
            <button
              onClick={onClose}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </>
        ) : (
          <>
            {/* Badge */}
            <div className="flex justify-center">
              <span className="rounded-full bg-[#E4F6FB] px-3 py-1 text-xs font-katide-semibold text-[#4065D1]">
                Most popular
              </span>
            </div>

            {/* Judul */}
            <h3 className="font-katide-bold mt-4 text-lg text-[#1A214C]">
              Get unlimited designs for less
            </h3>

            {/* Deskripsi */}
            <p className="mt-2 text-sm font-katide-regular leading-relaxed text-gray-500">
              This design cost you a one-time fee. For $3.99/mo, unlock every premium SVG, commercial and POD licensing, and daily new drops.
            </p>

            {/* Checklist */}
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5">
                <FaCheck className="h-3 w-3 text-[#4065D1]" />
                <span className="text-xs font-katide-medium text-[#1A214C]">Unlimited access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCheck className="h-3 w-3 text-[#4065D1]" />
                <span className="text-xs font-medium text-[#1A214C]">Bussiness license</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/membership"
              className="mt-5  flex w-full items-center justify-center rounded-full bg-[#EE4C73] py-3 text-sm font-katide-semibold text-white transition hover:bg-[#CE4768]"
            >
              Start membership
            </Link>

            {/* No thanks */}
            <button
              onClick={onClose}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              No thanks, keep single design
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPurchaseModal;