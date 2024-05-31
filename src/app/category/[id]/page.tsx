'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

import ModalProduct from '@/components/modals/product';
import ProductCard from '@/components/ProductCard';

import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { productI } from '@/interfaces/product.interface';

export default function CatalogCrafter() {
  const params = useParams();
  const [isShortByDropdownOpen, setIsShortByDropdownOpen] = useState(false);
  const [selectedShortByOption, setSelectedShortByOption] = useState<SortType>(
    SortType.Latest
  );
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
  const [isSeasonsDropdownOpen, setIsSeasonsDropdownOpen] = useState(false);
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [productData, setProductData] = useState<productI[] | []>([]);
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
    try {
      const response = await getAllProduct({
        page: 1,
        limit: 10,
        sortType: selectedShortByOption,
        category: params.id as string,
        extraCategory:
          selectedSeasonsOption !== '' ? selectedSeasonsOption : '',
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
              key={index}
              data={product}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          ))}
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
