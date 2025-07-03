'use client';

import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import Link from "next/link";
import { lazy, useState } from "react";

import ModalProduct from "@/components/modals/product";
const ProductSlider = lazy(() => import("@/components/slider/ProductSlider"));


import { productI } from "@/interfaces/product.interface";


const BestSellerSection = ({ product }: { product: productI[] }) => {
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  return (
    <>
      <div className="bg-[#AAD3FF] flex w-full justify-center">
        <div className=" mx-auto w-full overflow-hidden lg:min-h-[470px] lg:max-w-[1164px] px-4 lg:px-0">
          <div className='flex flex-col pb-20 lg:pb-0 lg:mb-10 pt-2 font-bold'>
            <div className='mb-4 mt-12 flex max-w-[1164px] items-center justify-between'>
              <div className='font-katide-bold text-[24px] leading-10 text-indigo-950'>
                Best Seller
              </div>
              <Link
                href='/category'
                prefetch={false}
                className='cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] flex'
              >
                <div>Explore Best Seller</div>
                <FaAngleRight />
              </Link>
            </div>
            <div className='lg:h-auto'>
              <ProductSlider
                more='/category'
                items={product}
                handleShowDetail={(data) =>
                  setShowProductDetail({ show: true, product: data })
                }
              />
            </div>
            {/* <Link prefetch={false} href="/category" className='flex justify-center gap-4 lg:hidden'>
              <span>see more</span>
              <Image
                src={arrowRight.src}
                width={8}
                height={8}
                alt='arrow right'
              />
            </Link> */}
          </div>
        </div>
      </div>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </>
  )
}

export default BestSellerSection;