/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import logger from '@/lib/logger';
import { fetchProfile } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { AffiliateI, StatusType } from '@/interfaces/affiliate.interface';
import {
  PasswordFormI,
  PasswordPayloadI,
  UserFormI,
  UserPayloadI,
} from '@/interfaces/user.interface';

export default function Register() {
  const dispatch = useAppDispatch();
  const { token, dataUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserFormI>({
    email: dataUser?.email ?? '',
    displayName: dataUser?.displayName ?? '',
    firstName: dataUser?.username?.split(' ')[0] ?? '',
    lastName: dataUser?.username?.split(' ')[1] ?? '',
  });
  const [formPassword, setFormPassword] = useState<PasswordFormI>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [affiliateData, setAffiliateData] = useState<AffiliateI>();

  const getRequestAffiliate = async () => {
    try {
      if (token) {
        const affiliateData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/affiliate/user/request`, { headers: { Authorization: `bearer ${token}` } })
        if (affiliateData.data !== '') {
          setAffiliateData(affiliateData.data);
        }
      }
    } catch (error) {
      logger(error);
    }
  }

  useEffect(() => {
    getDataUser();
    getRequestAffiliate();
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
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/profile`, body, {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/change-password`,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setFormPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <p className='pl-4 text-lg font-semibold text-[#1A214C]'>
          Account Details
        </p>
        <div className='flex flex-col lg:flex-row w-full gap-4'>
          <div className='flex flex-col flex-grow'>
            <label className='pl-4 text-[#1A214C]'>
              First Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 min-w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Name'
              name='firstName'
              value={data.firstName}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='flex flex-col flex-grow'>
            <label className='pl-4 text-[#1A214C]'>
              Last Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 min-w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Name'
              name='lastName'
              value={data.lastName}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row w-full gap-4'>
          <div className='flex flex-col flex-grow'>
            <label className='pl-4 text-[#1A214C]'>
              Display Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 min-w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Display Name'
              name='displayName'
              value={data.displayName}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='flex flex-col flex-grow'>
            <label className='pl-4 text-[#1A214C]'>
              Email Address <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              className='my-2 min-w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='name@gmail.com'
              name='email'
              value={data.email}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        {affiliateData &&
          <div className='flex flex-col items-end'>
            <label className='pl-4 text-[#1A214C]'>
              Affiliate Status
            </label>
            {affiliateData?.status === StatusType.pending &&
              <div className='ml-4 rounded-full w-fit px-5 py-1 bg-blue-400 text-white'>In-review</div>
            }
            {affiliateData?.status === StatusType.rejected &&
              <div className='ml-4 rounded-full w-fit px-5 py-1 bg-red-400 text-white'>Rejected</div>
            }
            {affiliateData?.status === StatusType.accepted &&
              <div className='ml-4 rounded-full w-fit px-5 py-1 bg-green-400 text-white'>Active</div>
            }
          </div>
        }
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
