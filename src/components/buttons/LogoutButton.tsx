'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { resetCart } from '@/lib/slices/cart';
import { resetSubs } from '@/lib/slices/subcription';
import { resetUser } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

const LogoutButton: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logout = () => {
    dispatch(resetUser());
    dispatch(resetSubs());
    dispatch(resetCart());
    router.push('/');
  };
  return (
    <button onClick={logout} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;
