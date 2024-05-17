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

import { getAllProduct } from '@/app/api/product/getProduct';
import { productI } from '@/interfaces/product.interface';

import { catalogcrafter, crafterItem1 } from '~/images';

export default function CatalogCrafter() {
  const [isShortByDropdownOpen, setIsShortByDropdownOpen] = useState(false);
  const [selectedShortByOption, setSelectedShortByOption] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState(false);
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState(null);
  const [productData, setProductData] = useState<productI[] | []>([]);

  const shortByOptions = ['Latest', 'Popularity', 'Low to High', 'High to Low'];
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

  const getProduct = async () => {
    try {
      const response = await getAllProduct({ page: 1, limit: 10 });
      setProductData(response.data);
    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const products = [
    { name: 'crafterItem1', image: crafterItem1, price: 5 },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut',
      image: crafterItem1,
      price: 5,
    },
    { name: 'crafterItem1', image: crafterItem1, price: 5 },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut',
      image: crafterItem1,
      price: 5,
    },
    { name: 'crafterItem1', image: crafterItem1, price: 5 },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      image: crafterItem1,
      price: 5,
    },
    {
      name: 'Girl and Fox by The Forest 3D Shadow Box - Winter SVG Paper Cut',
      image: crafterItem1,
      price: 5,
    },
  ];

  return (
    <main>
      <section className='mb-[6%] ml-[7%] mr-[12%] mt-[4%] flex'>
        <img src={catalogcrafter.src} alt='Catalog' />

        <div className='ml-8 mt-2 flex flex-col'>
          <div className='font-katide-bold inline-flex h-16 w-48 items-center justify-center rounded-full bg-[#61A9FA] px-9 text-center text-[24px] text-white shadow-md'>
            CRAFTERS
          </div>

          <p className='font-katide-bold mt-10 text-[16px] text-[#1A214C]'>
            Find the perfect digital designs for your crafting projects at Drizy
            Studio!
          </p>

          <p className='font-katide-medium mt-4 text-[16px] text-[#1A214C]'>
            Thousands of expertly-made SVGs and sublimations made to fit home
            crafters' needs. Enjoy unbeatable prices on our designs.
          </p>

          <div className='mt-[22%] flex gap-5 text-[#AAAAAA]'>
            <FaBehance className='h-[24px] w-[24px]' />
            <FaFacebookF className='h-[22px] w-[22px]' />
            <FaXTwitter className='h-[22px] w-[22px]' />
            <FaPinterest className='h-[22px] w-[22px]' />
            <FaInstagram className='h-[24px] w-[24px]' />
            <CiYoutube className='h-[26px] w-[26px]' />
          </div>
        </div>
      </section>

      <section className='flex bg-[#EBECF5] p-[4%] pl-[8%]'>
        <div>
          <p className='font-katide-bold text-[20px]'>Filters</p>
          <div className='mt-6 rounded-lg bg-white shadow-lg'>
            <div className='rounded-tl-lg rounded-tr-lg border-b-2'>
              <div
                className='short-by-dropdown m-1 flex w-[252px] cursor-pointer justify-between p-2'
                onClick={handleShortByDropdownClick}
              >
                <p className='font-katide-semibold mt-2 w-[252px] text-[14px] text-[#1A214C]'>
                  Short by
                </p>
                <FaChevronDown className='mt-2 w-[12px]' />
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
                className='category-dropdown m-1 flex w-[252px] cursor-pointer justify-between p-2'
                onClick={handleCategoryDropdownClick}
              >
                <p className='font-katide-semibold mt-2 w-[252px] text-[14px] text-[#1A214C]'>
                  Category
                </p>
                <FaChevronDown className='mt-2 w-[12px]' />
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
                className='seasons-dropdown m-1 flex w-[252px] cursor-pointer justify-between p-2'
                onClick={handleSeasonsDropdownClick}
              >
                <p className='font-katide-semibold mt-2 w-[252px] text-[14px] text-[#1A214C]'>
                  Seasons
                </p>
                <FaChevronDown className='mt-2 w-[12px]' />
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
            <ProductCard
              id={product.id as string}
              key={index}
              name={product.name}
              image={product.imageUrl?.[0] || crafterItem1.src}
              price={5}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
