/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCoin, fetchProfile, setDataUser, setOpenModal, setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import GoogleLoginButton from '@/components/buttons/GoogleLogin';

import { loginSocial } from '@/app/api/auth/loginSocial';

import { Copy } from '~/images';
import { SubscriptionI } from '@/app/profile/subscription/page';
import { fetchDownloadRemaining } from '@/lib/slices/download';
import PixelEventsHooks, { EventsEnum, RedditEventsEnum } from '@/components/pixel-custom-events';

const LoginLottie = dynamic(() => import('../../components/lottie/login'), { ssr: false });

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [googleUser, setUser] = useState<any>([]);
  const router = useRouter();
  const [support, setSupport] = useState(true);
  const [coppied, setCoppied] = useState(false);
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const activeSubcription = useMemo(() => {
    return activeSubcriptionState;
  }, [activeSubcriptionState]);
  const [subsData, setSubsData] = useState<SubscriptionI>();
  const { trackEvent } = PixelEventsHooks();

  const getSubscriptionData = async (token: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/current-sub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubsData(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch subscription data:", error);
      return null;
    }
  };

  const handleLoginSocial = async (email: string, fullName: string, gid: string, avatar: string, provider: "google" | "facebook") => {
    try {
      setLoading(true);
      const response = await loginSocial({ email, fullName, id: `${gid}`, avatar, provider });
      const { user, token, isNewUser } = response;

      dispatch(setOpenModal(false));
      localStorage.setItem('resetEmail', user.email);

      if (isNewUser) {
        router.push(`/create-password?token=${token}&email=${email}&message=verification-success`);
        await trackEvent(EventsEnum.CompleteRegistration, {
          email: email,
        });

      } else {
        dispatch(setDataUser({ userData: user }));
        dispatch(setToken({ token }));
        toast(`Welcome ${user.username} !`);
        const subs = await getSubscriptionData(token);
        if (window.location.pathname === "/select-plan") {
          if (subs) {
            const productUrl = localStorage.getItem("productUrl");
            if (productUrl) {
              router.push(productUrl);
              localStorage.removeItem("productUrl");
            } else {
              router.push("/");
            }
          } else {
            // tetap di halaman /select-plan
            router.push("/select-plan");
          }
        } else if (window.location.pathname === "/free-trial") {
          if (subs) {
            const productUrl = localStorage.getItem("productUrl");
            if (productUrl) {
              router.push(productUrl);
              localStorage.removeItem("productUrl");
            } else {
              router.push("/");
            }
          } else {
            // tetap di halaman
            router.push("/free-trial");
          }
        }
      }
      localStorage.setItem('user_token', token);
      await Promise.all([
        dispatch(fetchProfile(token!)),
        dispatch(fetchCoin(token!)),
        dispatch(fetchDownloadRemaining(token!)),
      ]);

    } catch (error: any) {
      const errorData = error?.response?.data;

      if (
        Array.isArray(errorData?.message) &&
        (errorData.message.includes("email should not be empty") ||
          errorData.message.includes("email must be an email"))
      ) {
        toast.error(
          "You don’t have a verified email on your Facebook account. Please verify your email on Facebook or try another login method."
        );
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/register`,
        {
          email,
          username: firstName,
          displayName,
        }
      );
      setFirstName('');
      setLastName('');
      setEmail('');
      setDisplayName('');
      toast('Please check your email to verify your account');
      await trackEvent(EventsEnum.CompleteRegistration, {
        email: email,
      });
      // const { token, email: returnedEmail } = response.data;
      // localStorage.setItem('resetEmail', returnedEmail);
      // router.push(`/create-password?token=${token}`);
    } catch (error) {
      toast('Email already registered');
    }
  };

  useEffect(() => {
    dispatch(setOpenModal(false));
  }, [])


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

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.match(/FBAN|FBAV/i) || userAgent.includes('LinkedInApp')) {
      setSupport(false);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId='660205853013-i0r4emab9r16stvggpb9gu24gmd0mgqr.apps.googleusercontent.com' >
      <main>
        <section className='flex flex-col gap-12 bg-[#E5F6FB] p-8 lg:flex-row lg:gap-0 lg:bg-white lg:p-20'>
          <div className='flex basis-5/12 flex-col-reverse gap-12 pr-16 lg:flex-col'>
            <div className='flex flex-col gap-12'>
              <p className='text-3xl font-semibold'>Sign Up</p>
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
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='flex w-full flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  First Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-full rounded-full border p-4'
                  placeholder='Name'
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className='flex w-full flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  Last Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-full rounded-full border p-4'
                  placeholder='Names'
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
              <div className='flex w-full flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  Display Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-full rounded-full border p-4'
                  placeholder='Display Name'
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                ></input>
              </div>
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
                {loading ? <Loader color='#fff' /> : 'Sign Up'}
              </button>
            </div>
            <div className='col-span-2 col-start-2 row-span-1 w-full'>
              <div className='flex justify-center'>
                <p className='rounded-full px-20 py-3 font-semibold text-[#1A214C]'>
                  Or
                </p>
              </div>
            </div>
            {support ?
              <div className='flex flex-col justify-center lg:flex-row lg:gap-8'>
                <GoogleLoginButton onSuccess={(data) => setUser(data)} />
                <FacebookLogin
                  appId="618724301311674"
                  onProfileSuccess={(res) => {
                    if (!res.email) {
                      toast.error(
                        "You don’t have a verified email on your Facebook account. Please verify your email on Facebook or try another login method."
                      );
                      return; // stop here, jangan lanjut ke handleLoginSocial
                    }

                    handleLoginSocial(
                      res.email,
                      res.name!,
                      res.id!,
                      res.picture!.data.url,
                      "facebook"
                    );
                  }}
                  onFail={(res) => {
                    toast.error(res.status);
                  }}
                  render={({ onClick }) => {
                    return (
                      <button onClick={onClick} className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1]'>
                        <FaFacebookF style={{ color: '#4065D1' }} />
                        <p>Login with Facebook</p>
                      </button>
                    )
                  }}
                />
              </div>
              :
              <>
                <p className='text-sm text-start'>
                  We’re sorry, but your browser is not supported for social login.
                  For the best experience, please open this page on <span className='font-bold font-katide-bold'>your mobile browser</span>.
                  <br />Copy the link below:
                </p>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}`).then(() => {
                      toast.info("Link coppied");
                      setCoppied(true);
                    });
                  }}
                  className='border border-gray-300 rounded-xl flex flex-row justify-between items-start gap-4 px-4 py-2 mt-2 cursor-pointer'
                >
                  <p>{process.env.NEXT_PUBLIC_URL}</p>
                  <img src={Copy.src} alt='copy' />
                </div>
                {coppied &&
                  <p className='text-xs text-green-600'>Link coppied</p>
                }
              </>
            }
            <div className='mt-4 flex items-center justify-center gap-2'>
              <p>Already have an account?</p>
              <button onClick={() => { dispatch(setOpenModal(true)); }} className='flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1]'>
                <p>Sign in</p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </GoogleOAuthProvider>
  );
}
