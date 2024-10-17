/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { CiYoutube } from 'react-icons/ci';
import { FaBehance } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import ProductCard from '@/components/ProductCard';

import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { productI } from '@/interfaces/product.interface';

import { freeSVGBanner } from '~/images';

export default function CatalogCrafter() {
  const [isShortByDropdownOpen, setIsShortByDropdownOpen] = useState(false);
  const [selectedShortByOption, setSelectedShortByOption] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState(false);
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [productData, setProductData] = useState<productI[] | []>([]);

  const shortByOptions = [
    SortType.Latest,
    SortType.Popularity,
    SortType.LowToHigh,
    SortType.HighToLow,
  ];
  const categoryOptions = [
    '3D Shadow Box',
    'Greeting Card',
    'Sublimation',
    'Tumbler 20oz',
    'Lollipop Holder',
    'Egg Holder',
  ];
  const seasonsOptions = ['Fall', 'Winter', 'Spring', 'Summer'];

  const handleShortByDropdownClick = () => {
    setIsShortByDropdownOpen(!isShortByDropdownOpen);
  };

  const handleCategoryDropdownClick = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleSeasonsDropdownClick = () => {
    setIsSeasonsDropdownOpen(!isSeasonsDropdownOpen);
  };

  const handleShortBySelect = (event: any) => {
    const option = event.target.value;
    setSelectedShortByOption(option);
  };

  const handleCategorySelect = (event: any) => {
    const option = event.target.value;
    setSelectedCategoryOption(option);
  };

  const handleSeasonsSelect = (event: any) => {
    const option = event.target.value;
    setSelectedSeasonsOption(option);
  };

  function optionFormatter(str: string) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  const getProduct = async () => {
    const extraCat =
      selectedSeasonsOption !== ''
        ? selectedSeasonsOption
        : selectedCategoryOption !== ''
        ? selectedCategoryOption
        : '';
    try {
      const response = await getAllProduct({
        page: 1,
        limit: 10,
        sortType: SortType.Latest,
        category: 'Free SVGs',
        extraCategory: extraCat !== '' ? extraCat : '',
      });
      setProductData(response.data);
    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getProduct();
  }, [selectedCategoryOption, selectedSeasonsOption, selectedShortByOption]);

  return (
    <main>
      <section className='flex w-full flex-col items-center'>
        <div className='font-katide-bold mt-16 text-center text-[36px] text-[#1A214C]'>
          DISCOVER FREE SVG
        </div>

        <p className='font-katide-regular mt-16 max-w-[777px] text-center text-[16px] text-[#1A214C]'>
          Searching for costless SVG templates for yourself or a special gift?
          We've got you covered! Presenting our collection of free SVG and craft
          files, created with the same level of quality as our paid files.
        </p>

        <p className='font-katide-bold mt-8 text-center text-[16px] text-[#1A214C] lg:text-start'>
          At Drizy Studio, you'll be sure to find designs that perfectly match
          your needs.
        </p>

        <div className='mb-9 mt-[55px] flex gap-5 text-[#AAAAAA]'>
          <FaBehance className='h-[24px] w-[24px]' />
          <FaFacebookF className='h-[22px] w-[22px]' />
          <FaXTwitter className='h-[22px] w-[22px]' />
          <FaPinterest className='h-[22px] w-[22px]' />
          <FaInstagram className='h-[24px] w-[24px]' />
          <CiYoutube className='h-[26px] w-[26px]' />
        </div>
        <img
          src={freeSVGBanner.src}
          alt='Free SVG'
          className='max-md:h-40 max-md:object-cover lg:w-full lg:object-contain'
        />
      </section>

      <section className='w-full bg-[#EBECF5]'>
        <div className='flex flex-col py-[4%] max-md:px-2 lg:mx-auto lg:w-[1164px] lg:flex-row'>
          <div>
            <p className='font-katide-bold text-[20px]'>Filters</p>
            <div className='mt-6 rounded-lg bg-white shadow-lg'>
              <div className='rounded-tl-lg rounded-tr-lg border-b-2'>
                <div
                  className='short-by-dropdown m-1 flex w-full cursor-pointer justify-between p-2 lg:w-[252px]'
                  onClick={handleShortByDropdownClick}
                >
                  <p className='font-katide-semibold mt-2 w-full text-[14px] text-[#1A214C] lg:w-[252px]'>
                    Short by
                  </p>
                  <FaChevronDown className='mr-2 mt-2 w-[12px]' />
                </div>
              </div>
              {isShortByDropdownOpen && (
                <div className='dropdown-content m-2 p-2'>
                  {shortByOptions.map((option, index) => (
                    <div key={index} className='mb-3'>
                      <input
                        type='radio'
                        id={option}
                        name='shortByOptions'
                        value={option}
                        checked={selectedShortByOption === option}
                        onChange={handleShortBySelect}
                        className='h-[13px] w-[13px] text-black'
                      />
                      <label
                        htmlFor={option}
                        style={{
                          marginLeft: '5%',
                          fontSize: '14px',
                          color: '#17181A',
                        }}
                      >
                        {optionFormatter(option)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='mt-6 rounded-lg bg-white shadow-lg'>
              <div className='rounded-tl-lg rounded-tr-lg border-b-2'>
                <div
                  className='category-dropdown m-1 flex w-full cursor-pointer justify-between p-2 lg:w-[252px]'
                  onClick={handleCategoryDropdownClick}
                >
                  <p className='font-katide-semibold mt-2 w-full text-[14px] text-[#1A214C] lg:w-[252px]'>
                    Category
                  </p>
                  <FaChevronDown className='mr-2 mt-2 w-[12px]' />
                </div>
              </div>
              {isCategoryDropdownOpen && (
                <div className='dropdown-content m-2 p-2'>
                  {categoryOptions.map((option, index) => (
                    <div key={index} className='mb-3'>
                      <input
                        type='radio'
                        id={option}
                        name='categoryOptions'
                        value={option}
                        checked={selectedCategoryOption === option}
                        onChange={handleCategorySelect}
                        className='h-[13px] w-[13px] text-black'
                      />
                      <label
                        htmlFor={option}
                        style={{
                          marginLeft: '5%',
                          fontSize: '14px',
                          color: '#17181A',
                        }}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='mt-6 rounded-lg bg-white shadow-lg'>
              <div className='rounded-tl-lg rounded-tr-lg border-b-2'>
                <div
                  className='seasons-dropdown m-1 flex w-full cursor-pointer justify-between p-2 lg:w-[252px]'
                  onClick={handleSeasonsDropdownClick}
                >
                  <p className='font-katide-semibold mt-2 w-full text-[14px] text-[#1A214C] lg:w-[252px]'>
                    Seasons
                  </p>
                  <FaChevronDown className='mr-2 mt-2 w-[12px]' />
                </div>
              </div>
              {isSeasonsDropdownOpen && (
                <div className='dropdown-content m-2 p-2'>
                  {seasonsOptions.map((option, index) => (
                    <div key={index} className='mb-3'>
                      <input
                        type='radio'
                        id={option}
                        name='seasonsOptions'
                        value={option}
                        checked={selectedSeasonsOption === option}
                        onChange={handleSeasonsSelect}
                        className='h-[13px] w-[13px] text-black'
                      />
                      <label
                        htmlFor={option}
                        style={{
                          marginLeft: '5%',
                          fontSize: '14px',
                          color: '#17181A',
                        }}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='ml-[7%] flex flex-wrap'>
            {productData.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
