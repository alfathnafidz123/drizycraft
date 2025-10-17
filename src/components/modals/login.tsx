/* eslint-disable @next/next/no-img-element */
// components/Modal.tsx

import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebookF } from '@react-icons/all-files/fa6/FaFacebookF';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCoin, fetchProfile, setDataUser, setOpenModal, setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { login } from '@/app/api/auth/login';
import { loginSocial } from '@/app/api/auth/loginSocial';

import { Copy } from '~/images';
import { SubscriptionI } from '@/app/profile/subscription/page';
import { fetchDownloadRemaining } from '@/lib/slices/download';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

const LoginLottie = dynamic(() => import('../lottie/login'), { ssr: false });

const ModalLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [support, setSupport] = useState(true);
  const [coppied, setCoppied] = useState(false);
  const { openModal } = useAppSelector((state) => state.user);
  const closeModal = () => {
    dispatch(setOpenModal(false));
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState('');
  const [password, setPassword] = useState('');
  const [googleUser, setUser] = useState<any>([]);
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const { token, dataUser, activeSubcription } = useAppSelector((state) => ({
    ...state.user,
    ...state.subs,
  }));
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

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login({ payload, password });
      const { user, token } = response;
      dispatch(setDataUser({ userData: user }));
      dispatch(setToken({ token }));
      dispatch(setOpenModal(false));
      localStorage.setItem('user_token', token);
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
      localStorage.setItem('user_token', token);
      await Promise.all([
        dispatch(fetchProfile(token!)),
        dispatch(fetchCoin(token!)),
        dispatch(fetchDownloadRemaining(token!)),
      ]);
    } catch (error: any) {
      toast('Login failed');
    } finally {
      setLoading(false);
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
      console.log(error);
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

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => toast('Login failed'),
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.match(/FBAN|FBAV/i) || userAgent.includes('LinkedInApp')) {
      setSupport(false);
    }
  }, []);

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
    <div>
      {/* Modal overlay */}
      {openModal && (
        <div
          onClick={closeModal}
          className='fixed left-0 top-0 z-[90] h-full w-full bg-black bg-opacity-50'
        ></div>
      )}

      {/* Modal content */}
      {openModal && (
        <div className='fixed left-1/2 top-1/2 z-[90] max-h-screen w-full -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-3xl bg-[#E5F6FB] p-8 shadow-lg lg:h-fit lg:w-fit lg:overflow-hidden'>
          <button
            onClick={closeModal}
            className='absolute right-6 top-4 text-gray-600 hover:text-gray-800 text-2xl font-bold'
            aria-label='Close'
          >
            ×
          </button>
          <div className='flex flex-col gap-4 lg:flex-row lg:gap-16'>
            <div className='flex flex-col justify-between gap-8'>
              {/* <img src={loginImage.src} alt='login' /> */}
              <div className='hidden lg:flex'>
                <LoginLottie />
              </div>
              <p className='text-grey-900 hidden lg:block'>
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
              <p className='text=[#1A214C] mb-4 text-lg font-semibold lg:ml-5'>
                Login
              </p>
              <input
                type='text'
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className='border-grey-700 my-2 w-full rounded-full border p-4 lg:w-[300px]'
                placeholder='Username or email address'
              ></input>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border-grey-700 my-2 w-full rounded-full border p-4 lg:w-[300px]'
                placeholder='Password'
              ></input>
              <div className='flex items-center gap-2 p-4'>
                <input
                  type='checkbox'
                  className='border-grey-700 h-4 w-4 appearance-none rounded-full border-2 checked:border-transparent checked:bg-gray-700 focus:border-gray-700 focus:outline-none'
                />
                <p className='text-grey-700'>Remember me</p>
              </div>
              <div className='mb-8 flex flex-col items-end gap-2 lg:flex-row lg:items-center lg:gap-8'>
                <button
                  onClick={handleLogin}
                  className='rounded-full bg-[#1A214C] px-6 py-2 font-semibold text-white hover:bg-[#FFBB3C] hover:text-black max-md:w-full'
                >
                  {loading ? <Loader color='#fff' /> : 'LOGIN'}
                </button>
                <Link href="/forget-password" className='text-grey-700 hover:text-grey-800 max-md:text-right cursor-pointer'>
                  <span onClick={() => dispatch(setOpenModal(false))}>
                    Lost your password?
                  </span>
                </Link>
              </div>
              {support ?
                <>
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
                      toast.error(res.status || "Facebook login failed");
                    }}
                    render={({ onClick }) => {
                      return (
                        <button onClick={onClick} className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#4065D1] px-6 py-2 font-semibold text-[#4065D1] max-md:justify-center'>
                          <FaFacebookF style={{ color: '#4065D1' }} />
                          <p>Login with Facebook</p>
                        </button>
                      )
                    }}
                  />
                  <button
                    onClick={() => {
                      loginGoogle();
                    }}
                    className='mt-2 flex items-center gap-4 rounded-full border-2 border-[#1A214C] px-6 py-2 font-semibold text-[#1A214C] max-md:justify-center'
                  >
                    <FcGoogle />
                    <p>Login with Google</p>
                  </button>
                </>
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
              <p className='text-grey-900 mt-4 block lg:hidden'>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalLogin;
