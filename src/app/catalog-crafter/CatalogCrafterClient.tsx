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
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getMoreProducts } from '@/lib/getCrafterData';

import ModalProduct from '@/components/modals/product';
import NextImage from '@/components/NextImage';
import ProductCard from '@/components/ProductCard';

import { SortType } from '@/app/api/product/getProduct';
import { CategoryI, productI } from '@/interfaces/product.interface';

import { catalogcrafter, emptyState } from '~/images';

interface CatalogCrafterClientProps {
  initialData: {
    seasonsOptions: CategoryI[];
    categoryData: CategoryI[];
    productData: productI[];
    hasMore: boolean;
  };
}

export default function CatalogCrafterClient({ initialData }: CatalogCrafterClientProps) {
  const [isShortByDropdownOpen, setIsShortByDropdownOpen] = useState(false);
  const [selectedShortByOption, setSelectedShortByOption] = useState(SortType.Latest);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState(true);
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [productData, setProductData] = useState<productI[]>(initialData.productData);
  const [seasonsOptions] = useState<CategoryI[]>(initialData.seasonsOptions);
  const [categoryData] = useState<CategoryI[]>(initialData.categoryData);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
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

  const handleShortByDropdownClick = () => {
    setIsShortByDropdownOpen(!isShortByDropdownOpen);
  };

  const handleCategoryDropdownClick = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleSeasonsDropdownClick = () => {
    setIsSeasonsDropdownOpen(!isSeasonsDropdownOpen);
  };

  const handleShortBySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value as SortType;
    setSelectedShortByOption(option);
    setCurrentPage(1);
    setProductData([]);
    getMoreProduct(1, option); 
  };


  const handleCategorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedCategoryOption(option);
    setCurrentPage(1);
    setProductData([]);
    getMoreProduct();
  };

  const handleSeasonsSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedSeasonsOption(option);
    setCurrentPage(1);
    setProductData([]);
    getMoreProduct();
  };

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
    getMoreProduct();
  }

  function optionFormatter(str: string) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  const getMoreProduct = useCallback(
    async (page = currentPage, sortOption = selectedShortByOption) => {
      const extraCat =
        selectedSeasonsOption !== ''
          ? selectedSeasonsOption
          : selectedCategoryOption !== ''
          ? selectedCategoryOption
          : '';
      try {
        setLoading(true);
        const response = await getMoreProducts(
          page,
          sortOption,
          'Crafters',
          extraCat
        );
        setProductData(prev =>
          page === 1 ? response.productData : [...prev, ...response.productData]
        );
        setHasMore(response.hasMore);
      } catch (error) {
        toast('Error when trying to get more products');
      } finally {
        setLoading(false);
      }
    },
    [currentPage, selectedCategoryOption, selectedSeasonsOption, selectedShortByOption]
  );


  // useEffect(() => {
  //   getMoreProduct(1, SortType.Latest);
  // }, []);

  useEffect(() => {
    const sortTypeParam = searchParams.get('sortType') as SortType || SortType.Latest;
    setSelectedShortByOption(sortTypeParam);
    getMoreProduct(1, sortTypeParam);
  }, [searchParams]);

  
  return (
    <main>
      <section className='flex flex-col-reverse lg:mx-auto lg:mb-[6%] lg:mt-[4%] lg:w-[1164px] lg:flex-row'>
        <div className='flex items-center justify-center lg:justify-start lg:w-[200%] rounded-2xl mx-2 lg:mx-0'>
          <img src={catalogcrafter.src} alt='Catalog' className='rounded-3xl' />
        </div>
        <div className='mt-4 flex flex-col items-center p-2 lg:ml-8 lg:mt-2 lg:items-start lg:p-0'>
          <div className='font-katide-bold inline-flex h-16 w-48 items-center justify-center rounded-full bg-[#61A9FA] px-9 text-center text-[24px] text-white shadow-md'>
            Exclusive Partners
          </div>

          <p className='font-katide-bold mt-10 text-center text-[16px] text-[#1A214C] lg:text-start'>
            Find the perfect digital designs for your crafting projects at Drizy
            Craft!
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
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
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
              <div onClick={handleNext} className='flex items-center justify-center cursor-pointer text-center mt-10'>
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
