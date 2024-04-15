import { StaticImageData } from 'next/image';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import Slider from 'react-slick';

import ProductCard from '@/components/ProductCard';

interface SlideItem {
  image: StaticImageData;
  name: string;
  price: number;
  discountPrice?: number;
  isSales?: boolean;
}

interface SwipeToSlideProps {
  items: SlideItem[];
}

const ProductSlider: React.FC<SwipeToSlideProps> = ({ items }) => {
  const settings = {
    className: 'center',
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
    nextArrow: <></>,
    prevArrow: <></>,
    variableWidth: true,
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {items.map((item, index) => {
          return (
            <div key={index} className='pb-8'>
              <ProductCard
                name={item.name}
                image={item?.image}
                price={item?.price}
                isSale={item?.isSales}
                discountPrice={item?.discountPrice}
              />
            </div>
          );
        })}
        <div>
          <div className='flex h-[335px] items-center'>
            <button className='font-katide-bold flex aspect-square h-[87px] flex-col items-center justify-center rounded-full border-2 border-[#4065D1] pt-4 text-[12px] uppercase text-[#4065D1]'>
              <span>see more</span>
              <div className='flex w-full justify-center'>
                <FaAngleRight />
              </div>
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ProductSlider;
