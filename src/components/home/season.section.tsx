'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

import SectionContainer from "@/components/container/sectionContainer";
import NextImage from '@/components/NextImage';

import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { HomepageDataI, productI } from '@/interfaces/product.interface';

import {
  arrowLefts,
  arrowRights,
  halloweenSeason,
  seasonAutumn,
  seasonChristmas,
  seasonSnow,
  seasonSpring,
} from '~/images';


const SeasonSection = ({ homeProduct }: { homeProduct: HomepageDataI }) => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
    const [selectedShortByOption, setSelectedShortByOption] = useState<SortType>(
        SortType.Latest
      );
  
    const [productList, setProductList] = useState<productI[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const getProduct = useCallback(async () => {
      try {
        setLoading(true);
        const rawCategory = 'Spring SVG';
        const category = decodeURIComponent(rawCategory.replace(/^"|"$/g, ''));
        setCategoryName(category);
        // console.log('Fetching products with params:', {
        //   extraCategory: selectedSeasonsOption,
        //   sortType: selectedShortByOption,
        // });
  
        const response = await getAllProduct({
          page: 1,
          limit: 12,
          sortType: selectedShortByOption,
          category: encodeURIComponent(category) || '',
          extraCategory:
            selectedSeasonsOption !== '' ? selectedSeasonsOption : '',
        });
        setProductList(response.data);
        // console.log('Product response:', response);
  
        // Cek jika data tidak kosong
        if (response?.data?.length > 0) {
          // console.log('Total products fetched:', response.data.length);
        } else {
          console.warn('No products returned!');
        }
  
      } catch (error) {
        console.error('Error when trying to get all products:', error);
        // toast('Error when trying to get all products');
      } finally {
        setLoading(false);
      }
    }, [params.id, selectedSeasonsOption, selectedShortByOption]);
  
      
    const [showProductDetail, setShowProductDetail] = useState<{
      show: boolean;
      product?: productI;
    }>({ show: false });
  
    const handleShowDetail = (product: productI) => {
      setShowProductDetail({ show: true, product });
    };

    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-06-01T23:59:59');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) return { days: 0, hours: 0 };

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

      return { days, hours };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
     useEffect(() => {
       if (typeof window === 'undefined') return;
        getProduct();
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000 * 60);

        return () => clearInterval(timer);
      }, [selectedSeasonsOption, selectedShortByOption, getProduct]);

    
  
  const chunkArray = (array: any[], size: number) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const sliderRef = useRef<Slider | null>(null);

  const mobileChunks = chunkArray(productList, 4);

  const settings = {
    dots: true,
    arrows: false,
    adaptiveHeight: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: {
          dots: true,
          arrows: false, // hide arrows on mobile
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  
  
  return (
    <>
      <SectionContainer
        className='flex flex-col items-center justify-center pt-[10px] text-center'
      >
        <div className="relative w-full my-8 mx-4 sm:mx-6 lg:mx-8 lg:rounded-2xl overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom, #9CFFF7, #DEE4B4)' }}>
          {/* Absolute Image on Right */}
          <div className="hidden lg:block absolute top-0 bottom-0 right-0 h-[250px]">
            <Image
              src={seasonSpring}
              alt="Craft Banner Image"
              className="h-[250px] w-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10 mt-8 max-w-full lg:max-w-[60%] text-left lg:text-left flex flex-col lg:items-start">
            <p className="lg:text-[16px] text-[14px] font-katide-bold text-[#1A214C]">
              EVENT ENDS IN
              <span className="bg-white rounded-full px-6 py-1 text-[14px] lg:text-[16px] font-katide-bold ml-2 text-[#1A214C]">
               {timeLeft.days} DAYS {timeLeft.hours} HOURS
              </span>
            </p>
            
            <h2 className="font-katide-extrabold text-[36px] sm:text-[40px] leading-[120%] text-[#1A214C] lg:text-[50px] mt-5 mb-6">
              Fresh Picks for Spring
            </h2>

            <p className="text-[16px] font-katide-regular text-[#1A214C] mb-4 max-w-xl leading-7">
              Let your creativity blossom with soft florals, pastel palettes, and SVGs inspired by sunny skies, garden walks, and cheerful spring days.
            </p>
          </div>
          {productList.length > 0 && (
            <div className="lg:mt-5 px-4">
              {/* Slider Content Dekstop*/}
              <div className="hidden md:block ">
                <Slider ref={sliderRef} {...settings} className='custom-slider max-h-[147px]'>
                  {productList.map((item) => (
                    <div key={item.id} className="px-2">
                      <div className="group block overflow-hidden rounded-2xl">
                        <div className="w-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg rounded-2xl overflow-hidden">
                          <a href={`/product/${item.meta?.[0]?.title}`}>
                            <NextImage
                              src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl}
                              alt={item.name}
                              width={300}
                              height={300}
                              className="object-cover w-full h-auto rounded-2xl"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* 🔽 Tambahkan slot explore more */}
                  <div className="px-2">
                    <div className="w-full h-full flex items-center justify-center bg-transparent border border-white text-white rounded-2xl transition hover:border-blue-500 hover:text-blue-500">
                      <a
                        href={`/category/${categoryName}`}
                        className="flex flex-col items-center justify-center w-full h-[141px] rounded-2xl text-sm font-medium"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mb-1 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                        Explore More
                      </a>
                    </div>
                  </div>
                </Slider>

                {/* Custom Arrows */}
                <div className="flex justify-end mx-5 gap-3 my-4 z-30">
                  <button
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="flex items-center justify-center w-14 h-14 z-10 rounded-full hover:bg-[#4065D1]"
                  >
                    <NextImage
                      src={arrowLefts}
                      alt="Previous"
                      width={50}
                      height={50}
                    />
                  </button>
                  <button
                    onClick={() => sliderRef.current?.slickNext()}
                    className="flex items-center justify-center w-14 h-14 z-10 rounded-full hover:bg-[#4065D1]"
                  >
                    <NextImage
                      src={arrowRights}
                      alt="Previous"
                      width={50}
                      height={50}
                    />
                  </button>
                </div>
              </div>
              {/* Mobile View - Slider */}
              <div className="block md:hidden pb-10">
                <Slider dots={true} arrows={false} className='custom-slider max-h-[280px]'>
                  {mobileChunks.map((group, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-2 gap-4 px-2 py-4">
                        {group.map((item, i) => (
                          <div key={i}>
                            <a href={`/product/${item.meta?.[0]?.title}`}>
                              <div className="overflow-hidden rounded-2xl transition-all group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg">
                                <NextImage
                                  src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl}
                                  alt={item.name}
                                  width={300}
                                  height={300}
                                  className="w-full h-auto object-cover rounded-2xl"
                                />
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </Slider>
                <Link prefetch={false}  href={`/category/${categoryName}`} className=' lg:hidden'>
                  <div className='mt-16 w-full justify-center flex gap-2 '>
                    <div className='border border-white rounded-2xl px-4 py-2 flex items-center gap-2'>
                      <span className='text-white'>Explore more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>

                  </div>

                </Link>
              </div>
            </div>
          )}
        </div>

      </SectionContainer>
    </>
  )
}

export default SeasonSection;