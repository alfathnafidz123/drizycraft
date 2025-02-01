'use client';
import { CiYoutube } from '@react-icons/all-files/ci/CiYoutube';
import { FaBehance } from '@react-icons/all-files/fa/FaBehance';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaPinterest } from '@react-icons/all-files/fa/FaPinterest';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { IoChevronDown } from '@react-icons/all-files/io5/IoChevronDown';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ModalProduct from '@/components/modals/product';
import NextImage from '@/components/NextImage';
import ProductCard from '@/components/ProductCard';

import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { getSeason } from '@/app/api/product/getSeason';
import { getSubCategories } from '@/app/api/product/getSubCategories';
import { CategoryI, productI } from '@/interfaces/product.interface';

import { catalogcrafter, emptyState } from '~/images';

export default function CatalogCrafter() {
  const [isShortByDropdownOpen, setIsShortByDropdownOpen] = useState(false);
  const [selectedShortByOption, setSelectedShortByOption] = useState(SortType.Latest);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState(true);
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [productData, setProductData] = useState<productI[] | []>([]);
  const [seasonsOptions, setSeasonalData] = useState<CategoryI[] | []>([]);
  const [categoryData, setCategoryData] = useState<CategoryI[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  const shortByOptions = [
    SortType.Latest,
    SortType.Popularity,
    SortType.LowToHigh,
    SortType.HighToLow,
  ];


  const getSeasonalData = async () => {
    try {
      const response = await getSeason();
      setSeasonalData(response.data);
    } catch (error) {
      toast('Error when trying to get category');
    }
  };


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
    setCurrentPage(1);
    setProductData([]);
  };

  const handleCategorySelect = (event: any) => {
    const option = event.target.value;
    setSelectedCategoryOption(option);
    setCurrentPage(1);
    setProductData([]);
  };

  const handleSeasonsSelect = (event: any) => {
    const option = event.target.value;
    setSelectedSeasonsOption(option);
    setCurrentPage(1);
    setProductData([]);
  };

  function optionFormatter(str: string) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  const getProduct = useCallback(async () => {
    const extraCat =
      selectedSeasonsOption !== ''
        ? selectedSeasonsOption
        : selectedCategoryOption !== ''
          ? selectedCategoryOption
          : '';
    try {
      setLoading(true);
      const response = await getAllProduct({
        page: currentPage,
        limit: 15,
        sortType: selectedShortByOption,
        category: 'Crafters',
        extraCategory: extraCat !== '' ? extraCat : '',
      });
      setProductData(prev => ([...prev, ...response.data]));
      setHasMore(response.meta.hasNextPage);
    } catch (error) {
      toast('Error when trying to get all products');
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategoryOption, selectedSeasonsOption, selectedShortByOption]);

  const getSubCategoryData = async () => {
    try {
      const response = await getSubCategories();
      setCategoryData(response.data);
    } catch (error) {
      toast('Error when trying to get category');
    }
  };

  useEffect(() => {
    getSeasonalData();
    getSubCategoryData();
  }, []);

  useEffect(() => {
    getProduct();
  }, [selectedCategoryOption, selectedSeasonsOption, selectedShortByOption, currentPage, getProduct]);

  return (
    <main>
      <section className='flex flex-col-reverse lg:mx-auto lg:mb-[6%] lg:mt-[4%] lg:w-[1164px] lg:flex-row'>
        <img src={catalogcrafter.src} alt='Catalog' />

        <div className='mt-4 flex flex-col items-center p-2 lg:ml-8 lg:mt-2 lg:items-start lg:p-0'>
          <div className='font-katide-bold inline-flex h-16 w-48 items-center justify-center rounded-full bg-[#61A9FA] px-9 text-center text-[24px] text-white shadow-md'>
            Exclusive Partners
          </div>

          <p className='font-katide-bold mt-10 text-center text-[16px] text-[#1A214C] lg:text-start'>
            Find the perfect digital designs for your crafting projects at Drizy
            Studio!
          </p>

          <p className='font-katide-medium mt-4 text-center text-[16px] text-[#1A214C] lg:text-start'>
            Thousands of expertly-made SVGs and sublimations made to fit home
            crafters' needs. Enjoy unbeatable prices on our designs.
          </p>

          <div className='mt-[22%] flex gap-5 text-[#AAAAAA]'>
            <Link href="https://www.behance.net/drizycraft" target='_blank'>
              <FaBehance className='h-[24px] w-[24px]' />
            </Link>
            <Link href="https://www.facebook.com/DrizyStudio" target="_blank">
              <FaFacebookF className='h-[22px] w-[22px]' />
            </Link>
            <Link href="https://www.facebook.com/groups/drizyfreebies" target='__blank'>
              <FaUsers className='h-[22px] w-[22px]' />
            </Link>
            <Link href="https://id.pinterest.com/Drizy_Studio/" target="_blank">
              <FaPinterest className='h-[22px] w-[22px]' />
            </Link>
            <Link href="https://www.instagram.com/drizy_craft/" target="_blank">
              <FaInstagram className='h-[24px] w-[24px]' />
            </Link>
            <Link href="https://www.youtube.com/@drizystudio" target="_blank">
              <CiYoutube className='h-[26px] w-[26px]' />
            </Link>
          </div>
        </div>
      </section>

      <section className='w-full bg-[#EBECF5]'>
        <div className='flex flex-col py-[4%] max-md:px-2 lg:mx-auto lg:w-[1164px] lg:flex-row gap-4'>
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

            <div className='mt-6 rounded-lg bg-white shadow-lg max-h-[400px] lg:max-w-[260px] overflow-x-hidden overflow-y-scroll remove-scrollbar relative'>
              <div className='rounded-tl-lg rounded-tr-lg border-b-2 sticky top-0 bg-white'>
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
                  {categoryData.map((option, index) => (
                    <div key={index} className='mb-3'>
                      <input
                        type='radio'
                        id={option.id.toString()}
                        name='categoryOptions'
                        value={option.name}
                        checked={selectedCategoryOption === option.name}
                        onChange={handleCategorySelect}
                        className='h-[13px] w-[13px] text-black'
                      />
                      <label
                        htmlFor={option.id.toString()}
                        style={{
                          marginLeft: '5%',
                          fontSize: '14px',
                          color: '#17181A',
                        }}
                        dangerouslySetInnerHTML={{ __html: option.name }}
                      />
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
                        id={option.id.toString()}
                        name='seasonsOptions'
                        value={option.name}
                        checked={selectedSeasonsOption === option.name}
                        onChange={handleSeasonsSelect}
                        className='h-[13px] w-[13px] text-black'
                      />
                      <label
                        htmlFor={option.id.toString()}
                        style={{
                          marginLeft: '5%',
                          fontSize: '14px',
                          color: '#17181A',
                        }}
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='w-full'>
            {productData.length === 0 && !loading ?
              <div className="flex items-center justify-center">
                <NextImage src={emptyState.src} width={500} height={500} alt="Product is empty" />
              </div>
              :
              null}
            <div className='w-full flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-y-2'>
              {productData.map((product, index) => (
                <ProductCard
                  key={index}
                  data={product}
                  handleShowDetail={(data) =>
                    setShowProductDetail({ show: true, product: data })
                  }
                  isSlider={false}
                />
              ))}
            </div>
            {hasMore &&
              <div onClick={() => { !loading ? setCurrentPage(prev => prev + 1) : null }} className='flex items-center justify-center cursor-pointer text-center mt-10'>
                {loading
                  ? <Loader className='animate-spin' />
                  :
                  <div className='flex flex-row gap-1 items-center justify-center transition-all hover:text-white bg-white hover:bg-[#61A9FA] rounded-full px-3 py-1 border-black border'>
                    <p>Load More</p>
                    <IoChevronDown />
                  </div>}
              </div>
            }
          </div>
        </div>
      </section>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </main>
  );
}
