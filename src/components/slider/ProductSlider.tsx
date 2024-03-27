import { StaticImageData } from 'next/image';
import React from 'react';
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
    infinite: true,
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
      </Slider>
    </div>
  );
};

export default ProductSlider;
