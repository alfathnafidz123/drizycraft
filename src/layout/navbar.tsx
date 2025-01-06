/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle';
import { FaChevronDown } from '@react-icons/all-files/fa6/FaChevronDown';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { IoCloseCircle } from '@react-icons/all-files/io5/IoCloseCircle';
import { IoPerson } from '@react-icons/all-files/io5/IoPerson';
import { MdArrowForwardIos } from '@react-icons/all-files/md/MdArrowForwardIos';
import { MdArrowOutward } from '@react-icons/all-files/md/MdArrowOutward';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchCart } from '@/lib/slices/cart';
import { fetchSubs } from '@/lib/slices/subcription';
import { fetchCoin, fetchProfile, setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import useOutsideClick from '@/lib/useOutsideClick';

import Button from '@/components/buttons/Button';
const ModalLogin = dynamic(() => import('@/components/modals/login'));
import dynamic from 'next/dynamic';

import NextImage from '@/components/NextImage';
import PixelEventsHooks, { EventsEnum } from '@/components/pixel-custom-events';

import {
  betaLogo,
  cart,
  drizzyCoin,
  emptyCoin,
  newBadge,
  newMember,
  search,
} from '~/images';

export interface MenuState {
  crafter: boolean;
  vector: boolean;
  all: boolean;
}

interface SubMenuState {
  seasonal: boolean;
  craft: boolean;
}

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.token);
  const dataUser = useAppSelector((state) => state.user.dataUser);
  const cartData = useAppSelector((state) => state.cart.cart);
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCrafterMenuOpen, setCrafterMenuOpen] = useState(false);
  const [coin, setCoin] = useState(dataUser?.coin);
  const [showTopup, setShowTopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { trackEvent } = PixelEventsHooks();
  const [isSeasonalOpen, setIsSeasonalOpen] = useState(false);
  const [isCraftSVGOpen, setIsCraftSVGOpen] = useState(false);
  const [isVectorOpen, setIsVectorOpen] = useState(false);
  const [showMenu, setShowMenu] = useState<MenuState>({
    crafter: false,
    vector: false,
    all: false,
  });
  const [inputValue, setInputValue] = useState('');
  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({
    seasonal: false,
    craft: false,
  });
  const handleClickOutsideCrafter = useCallback(() => {
    if (showMenu.crafter) {
      setShowMenu((prev) => ({ ...prev, crafter: false }));
      setShowSubMenu((prev) => ({
        ...prev,
        seasonal: false,
        craft: false,
      }));
    }
  }, [showMenu.crafter]);
  const crafterRef = useOutsideClick(handleClickOutsideCrafter, showMenu);

  const handleClickOutsideVector = () => {
    if (showMenu.vector) {
      setShowMenu((prev) => ({ ...prev, vector: false }));
    }
  };
  const vectorRef = useOutsideClick(handleClickOutsideVector, showMenu);

  const handleClickOutsideAll = () => {
    if (showMenu.all) {
      setShowMenu((prev) => ({ ...prev, all: false }));
    }
  };
  const allRef = useOutsideClick(handleClickOutsideAll, showMenu);

  const handleClickOutsideSidebar = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };
  const allSidebar = useOutsideClick(
    handleClickOutsideSidebar,
    showMenu,
    isSidebarOpen
  );

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchCart(isLogin));
      dispatch(fetchProfile(isLogin));
      dispatch(fetchSubs(isLogin));
      dispatch(fetchCoin(isLogin));
    }
  }, [isLogin]);

  useEffect(() => {
    if (dataUser?.coin) {
      setCoin(dataUser.coin);
    }
  }, [dataUser?.coin]);

  const openModalLogin = () => {
    dispatch(setOpenModal(true));
  };
  const openProfile = () => {
    router.push('/profile/account');
  };
  const toggleMenu = (key: keyof MenuState) => {
    setShowMenu((prevState) => {
      const updatedState: MenuState = {
        crafter: key === 'crafter' ? !prevState.crafter : false,
        vector: key === 'vector' ? !prevState.vector : false,
        all: key === 'all' ? !prevState.all : false,
      };

      return updatedState;
    });
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    await trackEvent(EventsEnum.Search, { text: inputValue, category: selectedCategory });
    router.push(`/category/search/${inputValue}?category=${selectedCategory}`);
  }

  return (
    <GoogleOAuthProvider clientId='660205853013-i0r4emab9r16stvggpb9gu24gmd0mgqr.apps.googleusercontent.com'>
      <nav className='sticky top-0 z-30 hidden h-[139px] items-center bg-white shadow-xl lg:flex'>
        <ModalLogin />
        <div className='container mx-auto flex w-[1164px] items-center justify-between'>
          <Link href='/'>
            <NextImage width={200} height={200} src={betaLogo.src} alt='Logo' className='object-contain' />
          </Link>

          <div className='flex flex-row'>
            <div className='mr-2 flex flex-col '>
              <select onChange={(e) => { setSelectedCategory(e.target.value) }} value={selectedCategory} className='font-katide-bold mb-2 mr-2 max-w-[130px] border-none text-sm outline-none ring-0 focus:ring-0'>
                <option value='all'>All Product</option>
                <option value='Bundles'>Bundles</option>
                <option value='Crafters'>Crafters</option>
                <option value='Freebies'>Freebies</option>
                <option value='Membership'>Membership</option>
                <option value='Vector'>Vector</option>
                <option value='Print Template'>Print Template</option>
                <option value='Time Limited Freebies'>
                  Time Limited Freebies
                </option>
              </select>

              <div ref={crafterRef} className='relative pt-[6px]'>
                <label className=' font-katide-semibold flex h-[40px] w-[85%] items-center justify-center gap-2 rounded-full bg-[#e4f6fb] text-[14px] hover:bg-[#CCE7EF] cursor-pointer'>
                  <button
                    id='crafter'
                    className='crafter'
                    onClick={() => {
                      toggleMenu('crafter');
                    }}
                  ></button>
                  Crafters
                  <FaChevronDown className='' />
                </label>
                <div
                  className={`${showMenu.crafter ? 'block' : 'hidden'
                    } absolute top-16 z-10 min-w-[285px] justify-between overflow-hidden rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB] `}
                >
                  <div className='font-katide-semibold flex'>
                    <div className='relative flex w-full min-w-[285px] flex-col'>
                      <div
                        onClick={() => {
                          router.push('/category/Featured');
                        }}
                        onMouseEnter={() =>
                          setShowSubMenu((prev) => ({
                            ...prev,
                            seasonal: false,
                            craft: false,
                          }))
                        }
                        className='cursor-pointer group flex justify-between bg-[#E4F6FB] py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                      >
                        <p>Featured</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div
                        onClick={() => {
                          router.push('/category/Premium SVG');
                        }}
                        onMouseEnter={() =>
                          setShowSubMenu((prev) => ({
                            ...prev,
                            seasonal: false,
                            craft: false,
                          }))
                        }
                        className='cursor-pointer group flex justify-between bg-[#E4F6FB] py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                      >
                        <p>Premium SVG</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div
                        onMouseEnter={() =>
                          setShowSubMenu((prev) => ({
                            ...prev,
                            seasonal: false,
                            craft: false,
                          }))
                        }
                        className='cursor-pointer group flex justify-between bg-[#E4F6FB] py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                      >
                        <p>Exclusive Partners</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div
                        onMouseEnter={() =>
                          setShowSubMenu((prev) => ({
                            ...prev,
                            seasonal: true,
                            craft: false,
                          }))
                        }
                        // onMouseLeave={() => toggleSubMenu('seasonal')}
                        className='cursor-pointer flex justify-between bg-[#E4F6FB] p-6 pl-8 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                      >
                        <label>Seasonal</label>
                        <MdArrowForwardIos />
                      </div>
                      <div
                        onMouseEnter={() =>
                          setShowSubMenu((prev) => ({
                            ...prev,
                            craft: true,
                            seasonal: false,
                          }))
                        }
                        // onMouseLeave={() => toggleSubMenu('craft')}
                        className='cursor-pointer group flex justify-between bg-[#E4F6FB] p-6 pl-8 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                      >
                        <label>
                          Craft Design SVGs
                          <button id='svgs' className='crafter'></button>
                        </label>
                        <MdArrowForwardIos />
                      </div>
                    </div>
                    {showMenu.crafter && showSubMenu.seasonal ? (
                      <div className='flex'>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div
                            onClick={() => {
                              router.push('/category/Summer SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Summer SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Fall SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Fall SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Halloween SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Halloween SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Thanksgiving SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Thanksgiving SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Winter SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Winter SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                        </div>
                        <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div
                            onClick={() => {
                              router.push('/category/Christmas SVG');
                            }}
                            className='cursor-pointer group flex justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Christmas SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Easter SVG');
                            }}
                            className='cursor-pointer group flex justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Easter SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Spring SVG');
                            }}
                            className='cursor-pointer group flex justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Spring SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {showMenu.crafter && showSubMenu.craft ? (
                      <div className='flex'>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div
                            onClick={() => {
                              router.push('/category/Free SVGs');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Free SVGs</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/3D Shadow Box SVGs');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Shadow Box SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Cricut SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Cricut SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/SVG Cut files');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>SVG cut files</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/T-Shirt Designs');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Tshirt Designs</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Printable Crafts');
                          }}
                          className='h-full w-[1px] bg-[#E5E7EB]'
                        ></div>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Printable Craft</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Paper Cut Templates');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Papercut Templates</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Monogram Designs');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Monogram Designs</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Card Making');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Card Making</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div
                            onClick={() => {
                              router.push('/category/Stickers SVG');
                            }}
                            className='cursor-pointer group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'
                          >
                            <p>Sticker SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='mr-2 flex flex-col'>
              <form onSubmit={handleSearch} className='group flex h-[42px] w-[480px] items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 bg-[#F1F2FB] p-2 pl-4 pr-1 text-left text-sm font-normal leading-4 tracking-tighter text-[#6F6F6F] transition-all focus-within:bg-white'>
                <input
                  placeholder='Search for unique craft designs, categories, occasions...'
                  className='!focus:border-none !focus:outline-none flex-grow truncate border-none bg-transparent text-sm tracking-wide !outline-none placeholder:tracking-wide placeholder:text-[#6F6F6F] focus:ring-0'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className='flex rounded-full bg-[#008ECC] cursor-pointer'
                >
                  <img
                    src={search.src}
                    className='w-[32px] flex-grow transition-all duration-300 group-hover:w-0 group-hover:opacity-0'
                    alt='search'
                  />
                  <div className='w-0 overflow-hidden transition-all duration-300 group-hover:w-[80px]'>
                    <p className='px-4 py-2 text-center text-white'>Search</p>
                  </div>
                </button>
              </form>

              <div className='font-katide-semibold flex flex-row justify-between pt-2 text-[14px]'>
                <div className='relative'>
                  <label className=' flex h-[40px] w-[96px] items-center justify-center rounded-full bg-[#e4f6fb] hover:bg-[#CCE7EF]'>
                    <button
                      id='crafter'
                      className='crafter'
                      onClick={() => {
                        toggleMenu('vector');
                      }}
                    ></button>
                    Vector <FaChevronDown />
                  </label>
                  <div
                    ref={vectorRef}
                    className={`${showMenu.vector ? 'block' : 'hidden'
                      } absolute top-16 z-10 w-[285px] overflow-hidden rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB]`}
                  >
                    <div className='flex w-full min-w-[285px] flex-col'>
                      <Link href='/catalog-vector?filter=Illustration' className='group flex justify-between py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Illustration</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </Link>
                      <Link href='/catalog-vector?filter=Icon' className='group flex justify-between py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Icon</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </Link>
                      <Link href='/catalog-vector?filter=Print Template' className='group flex justify-between py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Print Template</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </Link>
                      {showMenu.vector && showSubMenu.craft && <div></div>}
                    </div>
                  </div>
                </div>
                <Link
                  href='/catalog-bundles'
                  id='bundles'
                  className=' flex h-[40px] items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 hover:bg-[#CCE7EF]'
                >
                  Bundles
                </Link>
                <Link
                  href='/catalog-free-svg'
                  id='freeSvg'
                  className='flex h-[40px] w-[116px] items-center justify-center gap-2 rounded-full bg-[#e4f6fb] px-4 py-3 hover:bg-[#CCE7EF]'
                >
                  Free SVGs
                </Link>
                <Link
                  href='/blog'
                  className='flex h-[40px] items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 hover:bg-[#CCE7EF]'
                >
                  Blog
                </Link>
              </div>
            </div>

            <div className='flex flex-col pl-4'>
              <div className='flex flex-row justify-between gap-[20px]'>
                <button
                  id='profilelogin'
                  className='font-katide-bold h-[39px] w-[93px] rounded-full bg-[#e4f6fb] text-[14px] text-[#008ECC] hover:bg-[#C0E9F4]'
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onClick={!isLogin ? openModalLogin : openProfile}
                >
                  {isLogin ? 'PROFILE' : 'LOGIN'}
                </button>
                <Link
                  href='/cart'
                  prefetch={false}
                  className='relative rounded-full bg-[#e4f6fb] px-2 py-2 text-[#008ECC] transition-all hover:bg-[#C0E9F4]'
                >
                  <img src={cart.src} alt='cart' />
                  <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#008ECC] pt-0.5 text-[10px] text-[#e4f6fb] transition-all'>
                    {cartData.length}
                  </div>
                </Link>
                <div className='relative'>
                  <button
                    id='coin'
                    onClick={() => {
                      if (isLogin) {
                        setShowTopup(!showTopup);
                      } else {
                        openModalLogin();
                      }
                    }}
                    className='font-katide-semibold flex h-[39px] items-center gap-4 rounded-full border border-solid border-gray-300 py-1 pl-0.5 pr-2 text-[10px] text-gray-300 hover:bg-[#E4F6FB]'
                  >
                    <img src={drizzyCoin.src} alt='cart' />
                    <span className='font-katide-semibold text-[14px] text-[#008ECC]'>
                      {isLogin && dataUser ? (
                        (coin === 0) ? (
                          <Image
                            src={emptyCoin.src}
                            alt='empty-coin'
                            width={80}
                            height={80}
                            className='h-4 w-4'
                          />
                        ) : coin === -1 ? "♾️" : (
                          coin
                        )
                      ) : (
                        <Image
                          src={emptyCoin.src}
                          alt='empty-coin'
                          width={80}
                          height={80}
                          className='h-4 w-4'
                        />
                      )}
                    </span>
                    COIN
                  </button>
                  {showTopup &&
                    <div className='rounded-xl absolute -bottom-40 right-0 bg-gray-50 p-2 w-52'>
                      <div className='flex flex-col justify-center items-center gap-2 relative'>
                        <div className='absolute right-1 top-1 cursor-pointer' onClick={() => setShowTopup(false)}>
                          <IoCloseCircle />
                        </div>
                        <p className='font-katide-bold text-sm'>Your Drizy Coins</p>
                        <img src={drizzyCoin.src} alt='cart' className='w-8 h-8' />
                        <p className=''>
                          {(coin === 0) ? (
                            <Image
                              src={emptyCoin.src}
                              alt='empty-coin'
                              width={80}
                              height={80}
                              className='h-4 w-4'
                            />
                          ) : coin === -1 ? "♾️" : (
                            coin
                          )}
                        </p>
                        <Button onClick={() => {
                          if (coin === -1) toast('You have unlimited coin');
                          else router.push('/profile/subscription');
                        }} className='font-katide-bold flex w-full items-center justify-center rounded-full border-none bg-[#008ECC] hover:bg-[#008ECC]/90 text-xs'>
                          TOP UP HERE
                        </Button>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div className='flex flex-row justify-between gap-4 pt-[10px]'>
                <Link
                  href='/project'
                  prefetch={false}
                  className='font-katide-semibold flex h-[40px] items-center gap-2 rounded-full bg-[#008ECC] px-6 py-3 text-[14px] text-white hover:bg-[#4065D1]'
                >
                  Project
                </Link>
                <Link
                  href='/membership'
                  className='font-katide-semibold flex h-[40px] w-[178px] items-center gap-2 rounded-full bg-[#EE4C73] px-8 py-4 text-[14px] text-white hover:bg-[#CE4768]'
                >
                  <img src={newMember.src} alt='Membership' />
                  <p className='mt-0.5'>Membership</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className='sticky top-0 z-30 flex h-[139px] items-center bg-white lg:hidden'>
        <ModalLogin />
        <div className='relative flex h-full w-full flex-col justify-evenly px-2'>
          <div className='container mx-auto flex h-1/2 items-center justify-between lg:px-0'>
            <div className='flex gap-4'>
              <button
                id='sidebartoggle'
                onClick={() => {
                  setSidebarOpen(!isSidebarOpen);
                }}
              >
                {isSidebarOpen ? (
                  <AiFillCloseCircle className='h-8 w-8 text-[#008ECC]' />
                ) : (
                  <GiHamburgerMenu className='h-8 w-8 text-[#008ECC]' />
                )}
              </button>
              <button
                id='profileLoginMobile'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-[#E4F6FB] text-[#008ECC]'
                onClick={!isLogin ? openModalLogin : openProfile}
              >
                <IoPerson className='h-4 w-4' />
              </button>
            </div>

            <Link href='/'>
              <NextImage
                src={betaLogo.src}
                alt='Logo'
                height={100}
                width={100}
                className='h-8 object-contain'
              />
            </Link>
            <div className='flex gap-4'>
              <Link
                href='/cart'
                prefetch={false}
                className='relative h-8 w-8 rounded-full bg-[#e4f6fb] px-2 py-2 text-[#008ECC] transition-all hover:bg-[#C0E9F4]'
              >
                <img src={cart.src} alt='cart' />
                <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#008ECC] pt-0.5 text-[10px] text-[#e4f6fb] transition-all'>
                  {cartData.length}
                </div>
              </Link>
              <div className='relative'>
                <button
                  onClick={() => {
                    if (isLogin) {
                      setShowTopup(!showTopup);
                    } else {
                      openModalLogin();
                    }
                  }}
                  id='cartmobile'
                  className='font-katide-semibold flex h-8 w-8 items-center gap-4 rounded-full border border-solid border-gray-300 px-1 py-1 text-[10px] text-gray-300 hover:bg-[#E4F6FB]'
                >
                  <img src={drizzyCoin.src} alt='cart' />
                </button>
                {showTopup &&
                  <div className='rounded-xl absolute -bottom-40 right-0 bg-gray-50 p-2 w-52'>
                    <div className='flex flex-col justify-center items-center gap-2 relative'>
                      <div className='absolute right-1 top-1 cursor-pointer' onClick={() => setShowTopup(false)}>
                        <IoCloseCircle />
                      </div>
                      <p className='font-katide-bold text-sm'>Your Drizy Coins</p>
                      <img src={drizzyCoin.src} alt='cart' className='w-8 h-8' />
                      <p className=''>
                        {(coin === 0) ? (
                          <Image
                            src={emptyCoin.src}
                            alt='empty-coin'
                            width={80}
                            height={80}
                            className='h-4 w-4'
                          />
                        ) : coin === -1 ? "♾️" : (
                          coin
                        )}
                      </p>
                      <Button onClick={() => {
                        if (coin === -1) toast('You have unlimited coin');
                        else router.push('/profile/subscription');
                      }} className='font-katide-bold flex w-full items-center justify-center rounded-full border-none bg-[#008ECC] hover:bg-[#008ECC]/90 text-xs'>
                        TOP UP HERE
                      </Button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='container mx-auto flex h-1/2 items-center justify-between gap-2 max-md:mx-0 lg:px-0'>
            <select onChange={(e) => { setSelectedCategory(e.target.value) }} value={selectedCategory} className='font-katide-bold max-w-[130px] border-none text-sm outline-none ring-0 focus:ring-0'>
              <option value='all'>All Product</option>
              <option value='Bundles'>Bundles</option>
              <option value='Crafters'>Crafters</option>
              <option value='Free SVGs'>Freebies</option>
              <option value='Membership'>Membership</option>
              <option value='Vector'>Vector</option>
              <option value='Printable Crafts'>Print Template</option>
              <option value='Time Limited Freebies'>
                Time Limited Freebies
              </option>
            </select>
            <form onSubmit={handleSearch} className='group flex h-[42px] grow items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 p-2 pl-4 text-left text-sm font-normal leading-4 tracking-tighter text-[#6F6F6F]'>
              <input
                placeholder='Search for unique craft designs, categories, occasions...'
                className='w-full truncate border-none text-sm outline-none placeholder:text-gray-300'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              ></input>
              <button
                type="submit"
                className='flex rounded-full bg-[#008ECC] cursor-pointer'
              >
                <img
                  src={search.src}
                  className='w-[32px] flex-grow transition-all duration-300'
                  alt='search'
                />
              </button>
            </form>
          </div>
          {isSidebarOpen && (
            <div className='absolute left-0 top-full flex w-full'>
              <div
                ref={allSidebar}
                className='flex h-screen w-10/12 flex-col overflow-y-scroll bg-white py-4'
              >
                <div
                  onClick={() => {
                    setCrafterMenuOpen(!isCrafterMenuOpen);
                  }}
                  className='flex w-full justify-between border-t-2 '
                >
                  <p className='p-4 font-katide-semibold'>Crafters</p>
                  <div className='flex items-center justify-center border-l px-6 py-4'>
                    <FaChevronDown
                      className={`${isCrafterMenuOpen ? 'rotate-0' : '-rotate-90'
                        } transition-all`}
                    />
                  </div>
                </div>
                {isCrafterMenuOpen && (
                  <>
                    <div className='ml-4 border-t-2 p-4'>
                      <p className='font-katide-semibold'>Featured</p>
                    </div>
                    <div
                      onClick={() => {
                        router.push('/category/Premium SVG');
                        setSidebarOpen(false);
                      }}
                      className='ml-4 border-t-2 p-4'
                    >
                      <p className='font-katide-semibold'>Premium SVG</p>
                    </div>
                    <div onClick={() => {
                      router.push('/exclusive-partners');
                      setSidebarOpen(false);
                    }} className='ml-4 border-t-2 p-4'>
                      <p className='font-katide-semibold'>Exclusive Partner</p>
                    </div>
                    <div
                      onClick={() => {
                        setIsSeasonalOpen(prev => !prev);
                      }}
                      className='ml-4 border-t-2 pl-4 flex justify-between items-center'
                    >
                      <p className='font-katide-semibold'>Seasonal</p>
                      <div className='flex items-center justify-center border-l px-6 py-4'>
                        <FaChevronDown
                          className={`${isSeasonalOpen ? 'rotate-0' : '-rotate-90'
                            } transition-all`}
                        />
                      </div>
                    </div>
                    {isSeasonalOpen &&
                      <div className='ml-4'>
                        <div
                          onClick={() => {
                            router.push('/category/Fall SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Fall SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Halloween SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Halloween SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Thanksgiving SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Thanksgiving SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Winter SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Winter SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Christmas SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Christmas SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Easter SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Easter SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Spring SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Spring SVG</p>
                        </div>
                      </div>
                    }
                    <div
                      onClick={() => {
                        setIsCraftSVGOpen(prev => !prev)
                      }}
                      className='ml-4 border-t-2 pl-4 flex justify-between items-center'
                    >
                      <p className='font-katide-semibold'>Craft Design SVG</p>
                      <div className='flex items-center justify-center border-l px-6 py-4'>
                        <FaChevronDown
                          className={`${isCraftSVGOpen ? 'rotate-0' : '-rotate-90'
                            } transition-all`}
                        />
                      </div>
                    </div>
                    {isCraftSVGOpen &&
                      <div className='ml-4'>
                        <div
                          onClick={() => {
                            router.push('/category/Free SVGs');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Free SVGs</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/3D Shadow Box SVGs');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Shadow Box SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Cricut SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Cricut SVG</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/SVG Cut files');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>SVG cut files</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/T-Shirt Designs');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Tshirt Designs</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Printable Crafts');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Printable Craft</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Paper Cut Templates');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Papercut Templates</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Monogram Designs');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Monogram Designs</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Card Making');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Card Making</p>
                        </div>
                        <div
                          onClick={() => {
                            router.push('/category/Stickers SVG');
                            setSidebarOpen(false);
                          }}
                          className='ml-4 border-t-2 p-4'
                        >
                          <p className='font-katide-semibold'>Sticker SVG</p>
                        </div>
                      </div>
                    }
                  </>
                )}
                <div
                  onClick={() => {
                    setIsVectorOpen(prev => !prev);
                  }}
                  className='flex w-full justify-between border-t-2 '
                >
                  <p className='p-4 font-katide-semibold'>Vector</p>
                  <div className='flex items-center justify-center border-l px-6 py-4'>
                    <FaChevronDown
                      className={`${isVectorOpen ? 'rotate-0' : '-rotate-90'
                        } transition-all`}
                    />
                  </div>
                </div>
                {isVectorOpen && (
                  <>
                    <div
                      onClick={() => {
                        router.push('/catalog-vector?filter=Illustration');
                        setSidebarOpen(false);
                      }}
                      className='ml-4 border-t-2 p-4'
                    >
                      <p className='font-katide-semibold'>Illustration</p>
                    </div>
                    <div
                      onClick={() => {
                        router.push('/catalog-vector?filter=Icon');
                        setSidebarOpen(false);
                      }}
                      className='ml-4 border-t-2 p-4'
                    >
                      <p className='font-katide-semibold'>Icon</p>
                    </div>
                    <div
                      onClick={() => {
                        router.push('/catalog-vector?filter=catalog-vector?filter=Print Template');
                        setSidebarOpen(false);
                      }}
                      className='ml-4 border-t-2 p-4'
                    >
                      <p className='font-katide-semibold'>Print Template</p>
                    </div>
                  </>
                )}
                <div
                  onClick={() => {
                    router.push('/category/Bundle');
                    setSidebarOpen(false);
                  }}
                  className='border-t-2 p-4'
                >
                  <p className='font-katide-semibold'>Bundle</p>
                </div>
                <div
                  onClick={() => {
                    router.push('/category/Free SVG');
                    setSidebarOpen(false);
                  }}
                  className='border-t-2 p-4'
                >
                  <p className='font-katide-semibold'>Free SVGs</p>
                </div>
                <div
                  onClick={() => {
                    router.push('/blog');
                    setSidebarOpen(false);
                  }}
                  className='border-t-2 p-4'
                >
                  <p className='font-katide-semibold'>Blog</p>
                </div>
                <div
                  onClick={() => {
                    router.push('/project');
                    setSidebarOpen(false);
                  }}
                  className='border-t-2 p-4'
                >
                  <p className='font-katide-semibold'>Project</p>
                </div>
                <div
                  onClick={() => {
                    router.push('/membership');
                    setSidebarOpen(false);
                  }}
                  className='border-t-2 p-4 flex flex-row gap-2 items-center'
                >
                  <img src={newBadge.src} />
                  <p className='font-katide-semibold text-[#EE4C73]'>Membership</p>
                </div>
              </div>
              <div className='h-screen grow bg-black opacity-20'></div>
            </div>
          )}
        </div>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
