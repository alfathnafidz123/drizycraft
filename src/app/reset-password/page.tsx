/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';

import errorHandler from '@/lib/errorHandler';
import { setOpenModal } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

import { loginImage } from '~/images';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Register() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [form, setForm] = React.useState({
    password: '',
    confirm: '',
  });
  const [match, setMatch] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    if (form.password === form.confirm && form.password !== '') {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [form.password, form.confirm]);

  React.useEffect(() => {
    dispatch(setOpenModal(false));
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/reset-password`, {
        password: form.password,
        token,
      });
      toast('Password succesfully set. Please login!');
      router.push('/');
      dispatch(setOpenModal(true));
    } catch (error) {
      errorHandler(error);
      toast('Try another password');
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <section className='flex flex-col lg:flex-row p-4 lg:p-20 gap-4 lg:gap-0'>
        <div className='flex lg:basis-5/12 flex-col gap-12 lg:pr-16'>
          <p className='text-3xl font-semibold'>Create Password</p>
          <p>
            Your personal data will be used to enhance your website experience,
            manage account access, and fulfill other purposes outlined in our{' '}
            <span className='font-semibold'>privacy policy.</span>
          </p>
          <img className='w-[200px] lg:w-[300px] self-center lg:self-start' src={loginImage.src} alt='Sign Up' />
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex lg:h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#E5F6FB] p-4 lg:p-8 shadow-lg'
        >
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              New Password <span className='text-red-500'>*</span>
            </label>
            <input
              type='password'
              className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
              placeholder='Password'
              name='password'
              value={form.password}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              Confirm Password <span className='text-red-500'>*</span>
            </label>
            <input
              type='password'
              className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
              placeholder='Confirm Password'
              name='confirm'
              value={form.confirm}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='mt-8 flex w-full justify-center'>
            <button
              disabled={!match}
              className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb] disabled:cursor-not-allowed disabled:bg-gray-500'
            >
              {loading ? <Loader /> : 'Set Password'}
            </button>
          </div>
          {!match && (
            <div className='flex flex-row items-end justify-end text-sm italic text-red-400'>
              * Password not match
            </div>
          )}
        </form>
      </section>
    </main>
  );
}