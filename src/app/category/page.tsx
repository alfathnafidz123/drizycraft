'use client';
import { Loader } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { toast } from 'react-toastify';

import ModalProduct from '@/components/modals/product';
import ProductCard from '@/components/ProductCard';

import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { getSeason } from '@/app/api/product/getSeason';
import { CategoryI, productI } from '@/interfaces/product.interface';

export default function CatalogCrafter() {
  const [isShortByDropdownOpen, setIsShortByDropdownOpen] = useState(false);
  const [selectedShortByOption, setSelectedShortByOption] = useState<SortType>(SortType.Popularity);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState(false);
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [productData, setProductData] = useState<productI[] | []>([]);
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });
  const [seasonalData, setSeasonalData] = useState<CategoryI[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const shortByOptions = [
    SortType.Latest,
    SortType.Popularity,
    SortType.LowToHigh,
    SortType.HighToLow,
  ];

  const handleShortByDropdownClick = () => {
    setIsShortByDropdownOpen(!isShortByDropdownOpen);
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
    try {
      setLoading(true);
      const response = await getAllProduct({
        page: currentPage,
        limit: 15,
        sortType: selectedShortByOption,
        extraCategory:
          selectedSeasonsOption !== '' ? selectedSeasonsOption : '',
      });
      setProductData(prev => ([...prev, ...response.data]));
      setHasMore(response.meta.hasNextPage);
    } catch (error) {
      toast('Error when trying to get all products');
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategoryOption, selectedSeasonsOption, selectedShortByOption]);

  const getSeasonalData = async () => {
    try {
      const response = await getSeason();
      setSeasonalData(response.data);
    } catch (error) {
      toast('Error when trying to get category');
    }
  };

  useEffect(() => {
    getSeasonalData();
  }, []);

  useEffect(() => {
    getProduct();
  }, [selectedCategoryOption, selectedSeasonsOption, selectedShortByOption, getProduct]);

  return (
    <main className='w-full'>
      <section className='flex bg-[#EBECF5] w-full'>
        <div className='flex flex-col py-[4%] max-md:px-2 lg:mx-auto lg:w-[1164px] lg:flex-row gap-4 w-full'>
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
                  <FaChevronDown className='mt-2 mr-2 w-[12px]' />
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
                  className='short-by-dropdown m-1 flex w-full cursor-pointer justify-between p-2 lg:w-[252px]'
                  onClick={handleSeasonsDropdownClick}
                >
                  <p className='font-katide-semibold mt-2 w-full text-[14px] text-[#1A214C] lg:w-[252px]'>
                    Seasons
                  </p>
                  <FaChevronDown className='mt-2 mr-2 w-[12px]' />
                </div>
              </div>
              {isSeasonsDropdownOpen && (
                <div className='dropdown-content m-2 p-2'>
                  {seasonalData.map((option, index) => (
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
                  <div className='flex flex-row gap-2 items-center justify-center'>
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
