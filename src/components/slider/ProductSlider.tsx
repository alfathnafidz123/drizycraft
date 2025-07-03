'use client';

import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import { useRouter } from 'next/navigation';
import React from 'react';
import Slider from 'react-slick';

import ProductCard from '@/components/ProductCard';

import { productI } from '@/interfaces/product.interface';

// interface SlideItem {
//   image?: string;
//   imageUrl?: string;
//   name: string;
//   price: number;
//   discountPrice?: number;
//   isSales?: boolean;
// }

interface SwipeToSlideProps {
  items: productI[];
  handleShowDetail?: (product: productI) => void;
  more?: string;
}

const ProductSlider: React.FC<SwipeToSlideProps> = ({
  items,
  handleShowDetail,
  more,
}) => {
  const router = useRouter();
  const settings = {
    className: 'center',
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 4,
    swipeToSlide: true,
    nextArrow: <></>,
    prevArrow: <></>,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const chunkArray = (arr: productI[], size: number): productI[][] => {
    const chunked: productI[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };



  return (
    <div className="slider-container">
      {/* Desktop View */}
      <div className="hidden md:block">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className="pb-8 me-2">
              <ProductCard
                data={item}
                handleShowDetail={(data) => handleShowDetail?.(data)}
              />
            </div>
          ))}
          <div className="block">
            <div className="ml-4 flex items-center justify-left h-[335px]">
              <button
                id="see-more"
                aria-label="Go to catalog"
                onClick={() => (more ? router.push(more) : null)}
                className="font-katide-bold flex aspect-square h-[87px] flex-col items-center justify-center rounded-full border-2 border-[#4065D1] text-[12px] uppercase text-[#4065D1]"
              >
                <span>see more</span>
                <div className="flex w-full justify-center">
                  <FaAngleRight />
                </div>
              </button>
            </div>
          </div>
        </Slider>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <Slider dots={true} arrows={false} className="custom-slider ">
          {chunkArray(items, 4).map((group, pageIndex) => (
            <div key={pageIndex} className='px-1'>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {group.map((item, i) => (
                  <div key={i} className="">
                    <ProductCard
                      data={item}
                      handleShowDetail={(data) => handleShowDetail?.(data)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
