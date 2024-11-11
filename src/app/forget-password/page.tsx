/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { setDataUser, setToken } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

import { loginSocial } from '@/app/api/auth/loginSocial';

const LoginLottie = dynamic(() => import('../../components/lottie/login'), { ssr: false });

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Register() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [googleUser, setUser] = useState<any>([]);
  const router = useRouter();

  const handleLoginSocial = async (email: string, fullName: string, gid: string, avatar: string, provider: "google" | "facebook") => {
    try {
      setLoading(true);
      const response = await loginSocial({ email, fullName, id: `${gid}`, avatar, provider });
      const { user, token } = response;
      dispatch(setDataUser({ userData: user }));
      dispatch(setToken({ token }));
      router.replace("/");
    } catch (error: any) {
      toast('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/request-reset-password`,
        {
          email,
        }
      );
      setEmail('');
      toast('Please check your email to reset the password!');
    } catch (error) {
      toast('Email not registered');
    }
  };

  useEffect(() => {
    if (googleUser.access_token !== undefined) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          handleLoginSocial(res.data.email, res.data.name, res.data.id, res.data.picture, "google");
        })
        .catch(() => toast('Google analytics error'));
    }
  }, [googleUser]);

  return (
    <GoogleOAuthProvider clientId='660205853013-i0r4emab9r16stvggpb9gu24gmd0mgqr.apps.googleusercontent.com' >
      <main>
        <section className='flex flex-col gap-12 bg-[#E5F6FB] p-8 lg:flex-row lg:gap-0 lg:bg-white lg:p-20'>
          <div className='flex basis-5/12 flex-col-reverse gap-12 pr-16 lg:flex-col'>
            <div className='flex flex-col gap-12'>
              <p className='text-3xl font-semibold'>Forget Password</p>
              <p>
                Your personal data will be used to enhance your website
                experience, manage account access, and fulfill other purposes
                outlined in our{' '}
                <strong className='font-katide-semibold'>
                  <Link href='/privacy'>privacy policy.</Link>
                </strong>
              </p>
            </div>
            <LoginLottie />
          </div>
          <div className='basis-7/12 rounded-xl bg-[#E5F6FB] lg:p-8 lg:shadow-lg '>
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex w-full flex-col'>
                <div className='flex flex-col'>
                  <label className='pl-4 text-[#1A214C]'>
                    Email address <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    className='border-grey-700 my-2 w-full rounded-full border p-4'
                    placeholder='Name@gmail.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            <div className='mt-8 flex w-full justify-center'>
              <button
                onClick={handleRegister}
                className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb]'
              >
                {loading ? <Loader color='#fff' /> : 'Send Mail'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </GoogleOAuthProvider>
  );
}
