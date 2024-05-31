/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { register } from '@/app/api/auth/register';

import { loginImage } from '~/images';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const handleRegister = async () => {
    try {
      const response = await register({
        email,
        username: firstName,
        displayName,
      });
      if (response.success === true) {
        toast('Success');
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setDisplayName('');
    } catch (error) {
      toast('Email already registered');
    }
  };

  return (
    <main>
      <section className='flex p-20'>
        <div className='flex basis-5/12 flex-col gap-12 pr-16'>
          <p className='text-3xl font-semibold'>Sign Up</p>
          <p>
            Your personal data will be used to enhance your website experience,
            manage account access, and fulfill other purposes outlined in our{' '}
            <span className='font-semibold'>privacy policy.</span>
          </p>
          <img className='w-[300px]' src={loginImage.src} alt='Sign Up' />
        </div>
        <div className='flex basis-7/12 flex-col gap-4 rounded-xl bg-[#E5F6FB] p-8 shadow-lg'>
          <div className='flex justify-center gap-8'>
            <div className='flex flex-col'>
              <label className='pl-4 text-[#1A214C]'>
                First Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Name'
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className='flex flex-col'>
              <label className='pl-4 text-[#1A214C]'>
                Last Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Names'
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className='flex justify-center gap-8'>
            <div className='flex flex-col'>
              <label className='pl-4 text-[#1A214C]'>
                Display Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Display Name'
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              ></input>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  Email address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
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
              Sign Up
            </button>
          </div>
          <div className='col-span-2 col-start-2 row-span-1 w-full'>
            <div className='flex justify-center'>
              <p className='rounded-full px-20 py-3 font-semibold text-[#1A214C]'>
                Or
              </p>
            </div>
          </div>
          <div className='flex justify-center gap-8'>
            <button className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#1A214C] px-6 py-2 font-semibold text-[#1A214C]'>
              <FcGoogle />
              <p>Login with Facebook</p>
            </button>
            <button className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1]'>
              <FaFacebookF style={{ color: '#4065D1' }} />
              <p>Login with Facebook</p>
            </button>
          </div>
          <div className='mt-4 flex items-center justify-center gap-2'>
            <p>Already have an account?</p>
            <button className='flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1]'>
              <p>Sign in</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
