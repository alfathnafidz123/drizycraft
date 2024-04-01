/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import { setOpenModal } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import SectionContainer from '@/components/container/sectionContainer';
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
    <nav className='sticky top-0 z-30 flex h-[139px] items-center bg-white shadow-xl'>
      <ModalLogin />
      <SectionContainer
        bgColor='white'
        className='flex items-center justify-center'
      >
        <div className='grid w-full grid-cols-12 grid-rows-1 gap-4'>
          <div className='col-span-3'>
            <a onClick={handleLogoClick}>
              <img src={logodrizy.src} alt='Logo' className='object-contain' />
            </a>
          </div>
          <div className='col-span-9 col-start-4'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-row items-center justify-between pl-2'>
                <label
                  htmlFor='allProducts'
                  className='mr-4 cursor-pointer items-center gap-2 font-semibold'
                >
                  <input
                    type='checkbox'
                    id='allProducts'
                    name='productType'
                    value='all'
                    className='hidden'
                  />
                  <span className='font-katide-bold flex text-[14px] '>
                    All product <FaChevronDown />
                  </span>
                </label>
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
                <button
                  className='font-katide-bold h-[39px] w-[93px] rounded-full bg-[#e4f6fb] text-[14px] text-[#008ECC]'
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onClick={!isLogin ? openModalLogin : openProfile}
                >
                  {isLogin ? 'PROFILE' : 'LOGIN'}
                </button>
                <button className='rounded-full bg-[#e4f6fb] px-2 py-2 text-[#008ECC]'>
                  <img src={cart.src} alt='cart' />
                </button>
                <button className='font-katide-semibold flex h-[39px] items-center gap-2 rounded-full border border-solid border-gray-300 px-1 py-1 text-[10px] text-gray-300'>
                  <img src={drizzyCoin.src} alt='cart' />
                  <span className='font-katide-semibold text-[14px] text-[#008ECC]'>
                    11
                  </span>
                  COIN
                </button>
              </div>
              <div className='font-katide-semibold flex flex-row justify-between gap-4 text-[14px]'>
                <div className='relative'>
                  <label className='flex h-[40px] w-[102px] items-center justify-center gap-2 rounded-full bg-[#e4f6fb] '>
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
                    } absolute top-16 z-10 justify-between overflow-hidden rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB]`}
                  >
                    <div className='flex gap-8'>
                      <div className='flex flex-col whitespace-nowrap px-8'>
                        <div className='my-8 flex'>
                          <p>Featured</p>
                        </div>
                        <div className='my-8 flex'>
                          <p>Premium SVG</p>
                        </div>
                        <div className='my-8 flex'>
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
                        </div>
                        <div className='my-8 flex'>
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
                        </div>
                      </div>
                      {showMenu.crafter && showSubMenu.seasonal ? (
                        <div className='flex'>
                          <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                            <div className='my-8'>
                              <p>Summer SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Fall SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Halloween SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Thanksgiving SVG</p>
                            </div>
                          </div>
                          <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                          <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                            <div className='my-8'>
                              <p>Winter SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Christmas SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Easter SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Spring SVG</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {showMenu.crafter && showSubMenu.craft ? (
                        <div className='flex'>
                          <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                            <div className='my-8'>
                              <p>Free SVGs</p>
                            </div>
                            <div className='my-8'>
                              <p>Shadow Box SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>Cricut SVG</p>
                            </div>
                            <div className='my-8'>
                              <p>SVG cut files</p>
                            </div>
                          </div>
                          <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                          <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                            <div className='my-8'>
                              <p>Printable Craft</p>
                            </div>
                            <div className='my-8'>
                              <p>Papercut Templates</p>
                            </div>
                            <div className='my-8'>
                              <p>Monogram Designs</p>
                            </div>
                            <div className='my-8'>
                              <p>Card Making</p>
                            </div>
                          </div>
                          <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                          <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                            <div className='my-8'>
                              <p>Tshirt Designs</p>
                            </div>
                            <div className='my-8'>
                              <p>Sticker SVG</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className='relative'>
                  <label className='flex h-[40px] w-[96px] items-center justify-center gap-2 rounded-full bg-[#e4f6fb] '>
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
                    } absolute top-16 z-10 w-[285px] rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB] px-4`}
                  >
                    <div className='flex flex-col'>
                      <div className='my-8 flex'>
                        <p>Illustration</p>
                      </div>
                      <div className='my-8 flex'>
                        <p>Icon</p>
                      </div>
                      <div className='my-8 flex'>
                        <p>Print Template</p>
                      </div>
                      {showMenu.vector && showSubMenu.craft && <div></div>}
                    </div>
                  </div>
                </div>
                <button className=' flex h-[40px] items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 '>
                  Bundles
                </button>
                <button className='flex h-[40px] w-[116px] items-center gap-2 rounded-full bg-[#e4f6fb] px-4 py-3'>
                  Free SVGs
                </button>
                <button className='flex h-[40px] items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3'>
                  Blog
                </button>
                <button className='flex h-[40px] items-center gap-2 rounded-full bg-[#008ECC] px-6 py-3 text-white'>
                  Project
                </button>
                <button className='flex h-[40px] w-[178px] items-center gap-2 rounded-full bg-[#EE4C73] px-8 py-4 text-white'>
                  <img src={newMember.src} alt='Membership' />
                  Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <style jsx global>{`
        .dropdown {
          display: none;
        }

        .crafter:checked + .dropdown {
          display: block !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
