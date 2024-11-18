'use client';
import axios, { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import logger from '@/lib/logger';
import { setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { AffiliateI, StatusType } from '@/interfaces/affiliate.interface';
const myFont = localFont({ src: '../../public/fonts/Hastle.woff2' });
const AffiliateBanner = () => {
  const dispatch = useAppDispatch();
  const { token, dataUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [affiliateData, setAffiliateData] = useState<AffiliateI>();
  const router = useRouter();

  const handleRequestAffiliate = async () => {
    if (token) {
      try {
        setLoading(true);
        if (affiliateData?.status === StatusType.pending) {
          router.push('/profile/account');
        } else {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/affiliate/user/request`,
            {},
            { headers: { Authorization: `bearer ${token}` } }
          );
        }
      } catch (error) {
        const err = error as AxiosError;
        const errorData: any = err.response?.data;
        toast.error(
          (errorData.message as string) ?? 'Cannot generate affiliate link'
        );
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(setOpenModal(true));
    }
  };

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
    getRequestAffiliate();
  }, [token]);

  return dataUser?.affiliate ? null : (
    <div
      className='font-montserrat z-20 flex flex-col justify-center bg-[#3D5DD1] text-center text-white'
      style={{
        backgroundImage: `url('/images/affiliatebanner.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className='relative flex min-h-[321px] w-full flex-col items-center justify-center overflow-hidden px-16 py-12 max-md:max-w-full max-md:px-5'>
        <div className='mb-6 mt-12 flex w-[341px] max-w-full flex-col items-center max-md:mt-10'>
          <div
            className={`whitespace-nowrap text-2xl leading-9 ${myFont.className}`}
          >
            Share &amp; Earn
          </div>
          <p className='font-hastle mt-4 w-[254px] text-xs leading-5'>
            Get The Extra Money With Only Few Clicks
            <br /> 30% Commission
          </p>
          <button
            id='become-affiliator'
            aria-label='become-affiliator'
            onClick={handleRequestAffiliate}
            className='hover: mt-5 items-center justify-center rounded-[47px] border-[3px] border-indigo-950 bg-[#FFBB3C] px-20 py-4  shadow-md transition-all ease-out hover:bg-[#ECA014]'
          >
            {loading ? (
              <Loader />
            ) : (
              <div className='font-katide-semibold text-center text-black'>
                Become an Affiliator
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateBanner;
