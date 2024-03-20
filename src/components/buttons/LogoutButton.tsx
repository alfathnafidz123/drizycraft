'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { resetUser } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

const LogoutButton: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logout = () => {
    dispatch(resetUser());
    router.push('/');
  };
  return (
    <button onClick={logout} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;
