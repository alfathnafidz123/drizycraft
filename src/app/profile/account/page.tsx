/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import * as React from 'react';
import { toast } from 'react-toastify';

import { fetchProfile } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import {
  PasswordFormI,
  PasswordPayloadI,
  UserFormI,
  UserPayloadI,
} from '@/interfaces/user.interface';

export default function Register() {
  const dispatch = useAppDispatch();
  const { token, dataUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<UserFormI>({
    email: dataUser?.email ?? '',
    displayName: dataUser?.displayName ?? '',
    firstName: dataUser?.username?.split(' ')[0] ?? '',
    lastName: dataUser?.username?.split(' ')[1] ?? '',
  });
  const [formPassword, setFormPassword] = React.useState<PasswordFormI>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  React.useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    dispatch(fetchProfile(token!));
  };

  const updateDataUser = async () => {
    try {
      setLoading(true);
      const body: UserPayloadI = {
        username: `${data.firstName} ${data.lastName}`,
        displayName: data.displayName,
        email: data.email,
      };
      await axios.put('https://drizy-api.quadrakaryasantosa.com/auth/user/profile', body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updatePassword();
      toast.success('Update profile success!');
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      setLoading(true);
      if (formPassword.newPassword !== '' && formPassword.oldPassword !== '') {
        const body: PasswordPayloadI = {
          oldPassword: formPassword.oldPassword,
          newPassword: formPassword.newPassword,
        };
        await axios.put(
          'https://drizy-api.quadrakaryasantosa.com/auth/user/change-password',
          body,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Update password success!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <p className='pl-4 text-lg font-semibold text-[#1A214C]'>
          Account Details
        </p>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              First Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Name'
              name='firstName'
              value={data.firstName}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              Last Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Name'
              name='lastName'
              value={data.lastName}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              Display Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Display Name'
              name='displayName'
              value={data.displayName}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              Email Address <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='name@gmail.com'
              name='email'
              value={data.email}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <p className='w-1/2 text-sm italic text-[#1A214C]/50'>
          This will be how your name will be displayed in the account section
          and in reviews.
        </p>
      </div>

      <div className='mb-4 mt-8 flex w-full'>
        <div className='basis-1/12 border-b border-[#1A214C]/25' />
        <p className='mx-4 -mb-3 font-semibold text-[#1A214C]'>
          Password change
        </p>
        <div className='flex-grow border-b border-[#1A214C]/25' />
      </div>
      <div className='flex w-full flex-col'>
        <label className='pl-4 text-[#1A214C]'>
          Current password (leave blank to leave unchanged)
        </label>
        <input
          type='password'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          value={formPassword.oldPassword}
          name='oldPassword'
          onChange={handlePassword}
          required
        ></input>
      </div>
      <div className='flex w-full flex-col'>
        <label className='pl-4 text-[#1A214C]'>
          New password (leave blank to leave unchanged)
        </label>
        <input
          type='password'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          value={formPassword.newPassword}
          name='newPassword'
          onChange={handlePassword}
          required
        ></input>
      </div>
      <div className='flex w-full flex-col'>
        <label className='pl-4 text-[#1A214C]'>Confirm new password</label>
        <input
          type='password'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          value={formPassword.confirmPassword}
          name='confirmPassword'
          onChange={handlePassword}
          required
        ></input>
      </div>
      <div className='mt-8 flex w-full justify-center'>
        <button
          onClick={updateDataUser}
          className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb]'
        >
          {loading ? <Loader /> : 'Submit'}
        </button>
      </div>
    </>
  );
}
