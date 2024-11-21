'use client';

import Image from "next/image";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

import SectionContainer from "@/components/container/sectionContainer";
import ModalProduct from "@/components/modals/product";
import ProductSlider from "@/components/slider/ProductSlider";

import { productI } from "@/interfaces/product.interface";

import { arrowRight } from "~/images";

const ExculsiveSection = ({ product }: { product: productI[] }) => {
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });
  return (
    <>
      <SectionContainer bgColor='#FFBB3C' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Exclusive Partner
            </div>
            <div className='hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] lg:flex'>
              <div>Explore Crative Contributors SVG</div>
              <FaAngleRight />
            </div>
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              items={product}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <div className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </div>
        </div>
      </SectionContainer>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </>
  )
}

export default ExculsiveSection;