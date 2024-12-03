'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";

import SectionContainer from "@/components/container/sectionContainer";
import ModalProduct from "@/components/modals/product";
import ProductSlider from "@/components/slider/ProductSlider";

import { productI } from "@/interfaces/product.interface";

import { arrowRight } from "~/images";

const BundlesSection = ({ product }: { product: productI[] }) => {
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });
  return (
    <>
      <SectionContainer bgColor='#AAD3FF' fullwidth>
        <div className='flex flex-col pb-12 pt-2 font-bold'>
          <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
            <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
              Bundles
            </div>
            <Link
              href='/catalog-bundles'
              prefetch={false}
              className='hidden cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] lg:flex'
            >
              <div>Explore Bundles SVG</div>
              <FaAngleRight />
            </Link>
          </div>
          <div className='lg:h-[400px]'>
            <ProductSlider
              more='/catalog-bundles'
              items={product}
              handleShowDetail={(data) =>
                setShowProductDetail({ show: true, product: data })
              }
            />
          </div>
          <Link prefetch={false} href='/catalog-bundles' className='flex justify-center gap-4 lg:hidden'>
            <span>see more</span>
            <Image
              src={arrowRight.src}
              width={8}
              height={8}
              alt='arrow right'
            />
          </Link>
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

export default BundlesSection;