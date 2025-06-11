'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

import { resetCart } from '@/lib/slices/cart';
import { resetSubs } from '@/lib/slices/subcription';
import { resetUser } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

const LogoutButton: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    const token = localStorage.getItem('user_token');

    try {
      if (token) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Selalu hapus token dan reset state meskipun request gagal
      localStorage.removeItem('user_token');
      dispatch(resetUser());
      dispatch(resetSubs());
      dispatch(resetCart());
      router.push('/');
    }
  };

  return (
    <button onClick={logout} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;
