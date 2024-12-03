'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react';

import { useAppSelector } from "@/lib/store";

const AffiliatorNavigation = () => {
  const pathName = usePathname();
  const { dataUser } = useAppSelector(state => state.user);

  return (
    <>
      {dataUser?.affiliate.eligible === false &&
        <div className="w-full rounded-xl p-2 lg:p-4 bg-red-400 text-white mb-6">
          Your affiliate account has been banned. Please contact the administrator for further information.
        </div>
      }
      <div className="max-w-full overflow-x-scroll mb-5">
        <div className="flex flex-row">
          <Link className={`px-3 py-1 border-black ${pathName === '/dashboard-afilliator' ? 'border-b-2' : 'border-b'}`} href="/dashboard-afilliator">Overview</Link>
          <Link className={`px-3 py-1 border-black ${pathName === '/dashboard-afilliator/coupon' ? 'border-b-2' : 'border-b'}`} href="/dashboard-afilliator/coupon">Coupon</Link>
        </div>
      </div>
    </>
  )
}

export default AffiliatorNavigation;