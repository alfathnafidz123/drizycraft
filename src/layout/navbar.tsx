/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

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
const Navbar = () => {
  const [showMenu, setShowMenu] = useState<MenuState>({
    crafter: false,
    vector: false,
    all: false,
  });

  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({
    seasonal: false,
    craft: false,
  });

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
  return (
    <nav className='container fixed top-0 z-20 mx-auto flex w-full items-center bg-white py-3.5 shadow-xl'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <img src={logodrizy.src} alt='Logo' className='object-contain' />
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
              <span className='flex gap-2'>
                All product <FaChevronDown />
              </span>
            </label>
            <div className='group flex min-w-[400px] items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 p-2 pl-4 text-left text-sm font-normal leading-4 tracking-tighter text-[#6F6F6F]'>
              <input
                placeholder='Search for unique craft designs, categories, occasions...'
                className='flex-grow truncate border-none text-sm outline-none'
              ></input>
              <div className='flex rounded-full bg-[#008ECC]'>
                <img
                  src={search.src}
                  className='w-[32px] flex-grow transition-all duration-300 group-hover:hidden'
                  alt='search'
                />
                <p className='hidden scale-0 px-4 py-2 text-white transition-all duration-300 group-hover:flex group-hover:scale-100'>
                  Search
                </p>
              </div>
            </div>
            <button className='rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold text-[#008ECC]'>
              LOGIN
            </button>
            <button className='rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold text-[#008ECC]'>
              <img src={cart.src} alt='cart' />
            </button>
            <button className='flex items-center gap-2 rounded-full border border-solid border-gray-300 px-6 py-3 font-semibold text-gray-300'>
              <img src={drizzyCoin.src} alt='cart' />
              <span className='text-[#008ECC]'>11</span>
              COIN
            </button>
          </div>
          <div className='flex flex-row justify-between gap-4'>
            <div className='relative'>
              <label className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
                <button
                  id='crafter'
                  className='crafter'
                  onClick={() => {
                    toggleMenu('crafter');
                  }}
                ></button>
                Crafters <FaChevronDown />
              </label>
              <div
                className={`${
                  showMenu.crafter ? 'block' : 'hidden'
                } absolute top-16 z-10 justify-between overflow-hidden rounded-bl-3xl rounded-br-3xl bg-[#E4F6FB]`}
              >
                <div className='flex gap-8'>
                  <div className='flex flex-col whitespace-nowrap px-8'>
                    <div className='my-8 flex font-semibold'>
                      <p>Featured</p>
                    </div>
                    <div className='my-8 flex font-semibold'>
                      <p>Premium SVG</p>
                    </div>
                    <div className='my-8 flex font-semibold'>
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
                    <div className='my-8 flex font-semibold'>
                      <p>Craft Design SVGs</p>
                    </div>
                  </div>
                  {showMenu.crafter && showSubMenu.seasonal ? (
                    <div className='flex'>
                      <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                        <div className='my-8 font-semibold'>
                          <p>Summer SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Fall SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Halloween SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Thanksgiving SVG</p>
                        </div>
                      </div>
                      <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                      <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                        <div className='my-8 font-semibold'>
                          <p>Winter SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Christmas SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Easter SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
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
                        <div className='my-8 font-semibold'>
                          <p>Summer SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Fall SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Halloween SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Thanksgiving SVG</p>
                        </div>
                      </div>
                      <div className='h-full w-[1px] bg-[#E5E7EB]'></div>
                      <div className='flex flex-col whitespace-nowrap bg-white px-8'>
                        <div className='my-8 font-semibold'>
                          <p>Winter SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Christmas SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Easter SVG</p>
                        </div>
                        <div className='my-8 font-semibold'>
                          <p>Spring SVG</p>
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
              <label className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
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
                <div className='flex'>
                  <div className='my-8 flex font-semibold'>
                    <p>Illustration</p>
                  </div>
                  <div className='my-8 flex font-semibold'>
                    <p>Icon</p>
                  </div>
                  <div className='my-8 flex font-semibold'>
                    <p>Print Template</p>
                  </div>
                  {showMenu.vector && showSubMenu.craft && <div></div>}
                </div>
              </div>
            </div>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Deals
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Free SVGs
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#e4f6fb] px-6 py-3 font-semibold'>
              Blog
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#008ECC] px-6 py-3 font-semibold text-white'>
              Project
            </button>
            <button className='flex items-center gap-2 rounded-full bg-[#EE4C73] px-6 py-3 font-semibold text-white'>
              <img src={newMember.src} alt='Membership' />
              Membership
            </button>
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
  );
};

export default Navbar;
