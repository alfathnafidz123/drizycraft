/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { setDataUser, setOpenModal, setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { login } from '@/app/api/auth/login';
import { loginSocial } from '@/app/api/auth/loginSocial';

import { loginImage } from '~/images';

const ModalLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.user?.openModal);
  const closeModal = () => {
    dispatch(setOpenModal(false));
  };

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState('');
  const [password, setPassword] = useState('');
  const [googleUser, setUser] = useState<any>([]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login({ payload, password });
      const { user, token } = response;
      dispatch(setDataUser({ userData: user }));
      dispatch(setToken({ token }));
      dispatch(setOpenModal(false));
      toast(`Welcome ${user.username}!`);
    } catch (error: any) {
      toast('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSocial = async (email: string, fullName: string) => {
    try {
      setLoading(true);
      const response = await loginSocial({ email, fullName });
      const { user, token } = response;
      dispatch(setDataUser({ userData: user }));
      dispatch(setToken({ token }));
      dispatch(setOpenModal(false));
    } catch (error: any) {
      toast('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => toast('Login failed'),
  });

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
          handleLoginSocial(res.data.email, res.data.name);
        })
        .catch(() => toast('Google analytics error'));
    }
  }, [googleUser]);

  return (
    <div>
      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={closeModal}
          className='fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {isOpen && (
        <div className='fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-[#E5F6FB] p-8 shadow-lg'>
          <div className='flex gap-16'>
            <div className='flex flex-col justify-between gap-8'>
              <img src={loginImage.src} alt='login' />
              <p className='text-grey-900'>
                New User?
                <Link href='/register'>
                  <span
                    onClick={() => dispatch(setOpenModal(false))}
                    className='text=[#1A214C] ml-5 text-lg font-semibold'
                  >
                    Register
                  </span>
                </Link>
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text=[#1A214C] mb-4 ml-5 text-lg font-semibold'>
                Login
              </p>
              <input
                type='text'
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Username or email address'
              ></input>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                placeholder='Password'
              ></input>
              <div className='flex items-center gap-2 p-4'>
                <input
                  type='checkbox'
                  className='border-grey-700 h-4 w-4 appearance-none rounded-full border-2 checked:border-transparent checked:bg-gray-700 focus:border-gray-700 focus:outline-none'
                />
                <p className='text-grey-700'>Remember me</p>
              </div>
              <div className='mb-8 flex items-center gap-8'>
                <button
                  onClick={handleLogin}
                  className='rounded-full bg-[#1A214C] px-6 py-2 font-semibold text-white'
                >
                  {loading ? <Loader color='#fff' /> : 'LOGIN'}
                </button>
                <p className='text-grey-700'>Lost your password?</p>
              </div>
              <button className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1]'>
                <FaFacebookF style={{ color: '#4065D1' }} />
                <p>Login with Facebook</p>
              </button>
              {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
              <button
                onClick={() => {
                  loginGoogle();
                }}
                className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#1A214C] px-6 py-2 font-semibold text-[#1A214C]'
              >
                <FcGoogle />
                <p>Login with Google</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalLogin;
