/* eslint-disable @next/next/no-img-element */
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { MdArrowOutward } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';

import { setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import ModalLogin from '@/components/modals/login';

import { cart, drizzyCoin, logodrizy, newMember, search } from '~/images';

interface MenuState {
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
  const isLogin = useAppSelector((state) => state.user?.token);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<MenuState>({
    crafter: false,
    vector: false,
    all: false,
  });

  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({
    seasonal: false,
    craft: false,
  });

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

  const toggleSubMenu = (key: keyof SubMenuState) => {
    setShowSubMenu((prevState) => {
      const updatedState: SubMenuState = {
        seasonal: key === 'seasonal' ? !prevState.seasonal : false,
        craft: key === 'craft' ? !prevState.craft : false,
      };

      return updatedState;
    });
  };
  const handleLogoClick = () => {
    router.push('/');
  };
  return (
    <GoogleOAuthProvider clientId='573180511153-d4i99q167jv717sa0jq8o0enld076gub.apps.googleusercontent.com'>
      <nav className='sticky top-0 z-30 flex h-[139px] items-center bg-white shadow-xl'>
        <ModalLogin />
        <div className='container mx-auto flex w-[1164px] items-center justify-between'>
          <a onClick={handleLogoClick}>
            <img src={logodrizy.src} alt='Logo' className='object-contain' />
          </a>

          <div className='flex flex-row'>
            <div className='mr-2 mt-2 flex flex-col '>
              <label
                htmlFor='allProducts'
                className='font-katide-semibold mr-2 inline-flex cursor-pointer items-center justify-center text-[14px]'
              >
                <input
                  type='checkbox'
                  id='allProducts'
                  name='productType'
                  value='all'
                  className='hidden'
                />
                <span className='font-katide-bold ml-5 mr-4 mt-1 flex'>
                  All product
                </span>
                <FaChevronDown />
              </label>

              <div className='relative pt-[15px]'>
                <label className=' font-katide-semibold flex h-[40px] w-[85%] items-center justify-center gap-2 rounded-full bg-[#e4f6fb] text-[14px] hover:bg-[#CCE7EF]'>
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
                  className={`${
                    showMenu.crafter ? 'block' : 'hidden'
                  } absolute top-16 z-10 min-w-[285px] justify-between overflow-hidden rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB] `}
                >
                  <div className='font-katide-semibold flex'>
                    <div className='flex w-full min-w-[285px] flex-col whitespace-nowrap'>
                      <div className='group flex justify-between bg-[#E4F6FB] py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Featured</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div className='group flex justify-between bg-[#E4F6FB] py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Premium SVG</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div className='group flex justify-between bg-[#E4F6FB] py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Exclusive Partners</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div className='group flex justify-between bg-[#E4F6FB] p-6 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <label>
                          Seasonal
                          <button
                            id='crafter'
                            className='crafter'
                            onClick={() => {
                              toggleSubMenu('seasonal');
                            }}
                          ></button>
                        </label>
                        <MdArrowForwardIos />
                      </div>
                      <div className='group flex justify-between bg-[#E4F6FB] p-6 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <label>
                          Craft Design SVGs
                          <button
                            id='crafter'
                            className='crafter'
                            onClick={() => {
                              toggleSubMenu('craft');
                            }}
                          ></button>
                        </label>
                        <MdArrowForwardIos />
                      </div>
                    </div>
                    {showMenu.crafter && showSubMenu.seasonal ? (
                      <div className='flex'>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Summer SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Fall SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Halloween SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Thanksgiving SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Winter SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                        </div>
                        <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div className='group flex justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Christmas SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Easter SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex justify-between py-6 pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
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
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Free SVGs</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Shadow Box SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Cricut SVG</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>SVG cut files</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Tshirt Designs</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                        </div>
                        <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                        <div className='flex min-w-[214px] flex-col whitespace-nowrap bg-white'>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Printable Craft</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Papercut Templates</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Monogram Designs</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                            <p>Card Making</p>
                            <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                          </div>
                          <div className='group flex flex-grow items-center justify-between pl-8 pr-2 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
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
              <div className='group flex h-[42px] w-[480px] items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 p-2 pl-4 text-left text-sm font-normal leading-4 tracking-tighter text-[#6F6F6F]'>
                <input
                  placeholder='Search for unique craft designs, categories, occasions...'
                  className='flex-grow truncate border-none text-sm outline-none'
                ></input>
                <div className='flex rounded-full bg-[#008ECC]'>
                  <img
                    src={search.src}
                    className='w-[32px] flex-grow transition-all duration-300 group-hover:w-0 group-hover:opacity-0'
                    alt='search'
                  />
                  <div className='w-0 overflow-hidden transition-all duration-300 group-hover:w-[80px]'>
                    <p className='px-4 py-2 text-center text-white'>Search</p>
                  </div>
                </div>
              </div>

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
                    className={`${
                      showMenu.vector ? 'block' : 'hidden'
                    } absolute top-16 z-10 w-[285px] overflow-hidden rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB]`}
                  >
                    <div className='flex w-full min-w-[285px] flex-col'>
                      <div className='group flex justify-between py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Illustration</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div className='group flex justify-between py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Icon</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      <div className='group flex justify-between py-6 pl-8 pr-4 hover:bg-[#CBEAF2] hover:text-[#4065D1]'>
                        <p>Print Template</p>
                        <MdArrowOutward className='opacity-0 group-hover:opacity-100' />
                      </div>
                      {showMenu.vector && showSubMenu.craft && <div></div>}
                    </div>
                  </div>
                </div>
                <button className=' flex h-[40px] items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 hover:bg-[#CCE7EF]'>
                  Bundles
                </button>
                <button className='flex h-[40px] w-[116px] items-center justify-center gap-2 rounded-full bg-[#e4f6fb] px-4 py-3 hover:bg-[#CCE7EF]'>
                  Free SVGs
                </button>
                <button className='flex h-[40px] items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 hover:bg-[#CCE7EF]'>
                  Blog
                </button>
              </div>
            </div>

            <div className='flex flex-col pl-4'>
              <div className='flex flex-row justify-between gap-8'>
                <button
                  className='font-katide-bold h-[39px] w-[93px] rounded-full bg-[#e4f6fb] text-[14px] text-[#008ECC] hover:bg-[#C0E9F4]'
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onClick={!isLogin ? openModalLogin : openProfile}
                >
                  {isLogin ? 'PROFILE' : 'LOGIN'}
                </button>
                <button className='rounded-full bg-[#e4f6fb] px-2 py-2 text-[#008ECC] hover:bg-[#C0E9F4]'>
                  <img src={cart.src} alt='cart' />
                </button>
                <button className='font-katide-semibold flex h-[39px] items-center gap-4 rounded-full border border-solid border-gray-300 px-1 py-1 text-[10px] text-gray-300 hover:bg-[#E4F6FB]'>
                  <img src={drizzyCoin.src} alt='cart' />
                  <span className='font-katide-semibold text-[14px] text-[#008ECC]'>
                    11
                  </span>
                  COIN
                </button>
              </div>

              <div className='flex flex-row justify-between gap-4 pt-[10px]'>
                <button
                  onClick={() => {
                    router.push('/project/');
                  }}
                  className='font-katide-semibold flex h-[40px] items-center gap-2 rounded-full bg-[#008ECC] px-6 py-3 text-[14px] text-white hover:bg-[#4065D1]'
                >
                  Project
                </button>
                <button
                  onClick={() => {
                    router.push('/membership');
                  }}
                  className='font-katide-semibold flex h-[40px] w-[178px] items-center gap-2 rounded-full bg-[#EE4C73] px-8 py-4 text-[14px] text-white hover:bg-[#CE4768]'
                >
                  <img src={newMember.src} alt='Membership' />
                  <p className='mt-0.5'>Membership</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .dropdown {
            display: none;
          }

          .crafter:checked + .dropdown {
            display: block !important;
          }
        `}</style>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
