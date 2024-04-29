import { useRouter } from 'next/navigation';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';
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
}

const ProductSlider: React.FC<SwipeToSlideProps> = ({ items }) => {
  const router = useRouter();
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
                image={item?.image || (item?.imageUrl as unknown as string)}
                price={item?.price as number}
                // isSale={item?.isSales}
                isSale={false}
                // discountPrice={item?.discountPrice}
              />
            </div>
          );
        })}
        <div>
          <div className='flex h-[335px] items-center'>
            <button
              onClick={() => {
                router.push('/catalog-crafter');
              }}
              className='font-katide-bold flex aspect-square h-[87px] flex-col items-center justify-center rounded-full border-2 border-[#4065D1] pt-4 text-[12px] uppercase text-[#4065D1]'
            >
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
