/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.post(
        'https://drizy-api.quadrakaryasantosa.com/auth/user/reset-password',
        {
          password: form.password,
          token,
        }
      );
      toast('Password succesfully set. Please login!');
      router.push('/');
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Cannot generate affiliate link'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <section className='flex p-20'>
        <div className='flex basis-5/12 flex-col gap-12 pr-16'>
          <p className='text-3xl font-semibold'>Create Password</p>
          <p>
            Your personal data will be used to enhance your website experience,
            manage account access, and fulfill other purposes outlined in our{' '}
            <span className='font-semibold'>privacy policy.</span>
          </p>
          <img className='w-[300px]' src={loginImage.src} alt='Sign Up' />
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#E5F6FB] p-8 shadow-lg'
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
