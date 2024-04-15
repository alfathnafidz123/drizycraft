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
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {items.map((item, index) => {
          return (
            <div key={index}>
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
                    <button className='h-[87px] aspect-square rounded-full border-2 border-[#4065D1] pt-4 text-[#4065D1] uppercase font-katide-bold text-[12px]' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
                <span>see more</span>
              <FaAngleRight />
            </button>
      </Slider>
    </div>
  );
};

export default ProductSlider;
