'use client';

import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import Link from "next/link";
import { lazy, useState } from "react";

import ModalProduct from "@/components/modals/product";
const ProductSlider = lazy(() => import("@/components/slider/ProductSlider"));

import { productI } from "@/interfaces/product.interface";


const CrafterSection = ({ product }: { product: productI[] }) => {
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  return (
    <>
      <div className=" flex w-full justify-center">
        <div className=" mx-auto w-full overflow-hidden lg:min-h-[400px] lg:max-w-[1164px] px-4 lg:px-0">
          <div className='flex flex-col pb-10 lg:pb-0 pt-2 font-bold'>
            <div className='mb-4 mt-4 flex max-w-[1164px] items-center justify-between'>
              <div className='flex items-center justify-center font-katide-bold text-[24px] leading-10 text-indigo-950'>
                Daily Crafts
                <span className="ms-2 bg-[#EE4C73] text-white text-[10px] font-katide-medium px-1.5 py-[5px] rounded-full leading-none shadow-sm">
                  NEW !
                </span>
              </div>
              <Link
                prefetch={false}
                href='/catalog-crafter'
                className='cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] flex'
              >
                <div>Explore Crafts</div>
                <FaAngleRight />
              </Link>
            </div>
            <div className='lg:h-auto'>
              <ProductSlider
                more='/catalog-crafter'
                items={product}
                handleShowDetail={(data) =>
                  setShowProductDetail({ show: true, product: data })
                }
              />
            </div>
            {/* <Link prefetch={false} href="/catalog-crafter" className='flex justify-center gap-4 lg:hidden'>
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

export default CrafterSection;