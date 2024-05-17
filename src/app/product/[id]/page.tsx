/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import ProductCard from '@/components/ProductCard';

import { itemPayment } from '@/app/api/billing/itemPayment';
import { getAllProduct } from '@/app/api/product/getProduct';
import { getProductById } from '@/app/api/product/getProductById';
import { productI } from '@/interfaces/product.interface';

import { crafterItem1, project1 } from '~/images';

const productInitialState: productI = {
  id: 'string',
  name: 'string',
  imageUrl: [project1.src],
  image: 'string',
  description: 'string',
  category: 'string',
  purchasedCount: 0,
  createdAt: 'string',
  updatedAt: 'string',
  price: [1, 2, 3],
};

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const params = useParams();
  const [type, setType] = useState(0);
  const [productData, setProductData] = useState<productI>(productInitialState);
  const [productSliderData, setSliderProductData] = useState<productI[]>([
    productInitialState,
  ]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const crafterSlider = [
    { name: 'crafterItem1', image: crafterItem1.src, price: 5 },
    {
      name: 'Winter Characters 3D Shadow Box - Christmas Light Box',
      image: crafterItem1.src,
      price: 5,
    },
    {
      name: 'A5 Cricut Christmas Card with Adorable Stocking - Warm Winter Wishes',
      image: crafterItem1.src,
      price: 5,
    },
    {
      name: 'Winter Village with Aurora 3D Shadow Box - Northern Lights 3D Light Box',
      image: crafterItem1.src,
      price: 5,
    },
  ];

  const getProduct = async () => {
    try {
      const response = await getProductById({ title: params.id as string });
      setProductData(response.data);
    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  const getProductSlider = async () => {
    try {
      const response = await getAllProduct({ page: 1, limit: 4 });
      setSliderProductData(response.data);
    } catch (error) {
      // toast('Error when trying to get all products');
    }
  };

  const handleBuy = async () => {
    try {
      const data = await itemPayment({
        productId: params.id as string,
        licenseType: `${type}`,
        token: token,
      });
      window.location.replace(data.data);
    } catch (error: any) {
      toast(
        'Create Checkout Page failed, please reach out to the administrator'
      );
    }
  };

  useEffect(() => {
    getProduct();
    getProductSlider();
  }, []);

  return (
    <main>
      <section className='flex flex-col gap-12 px-24 py-16'>
        <p className='text-[#B8B8B8]'>
          Drizy Studio » Crafters » Craft Design SVGs » Paper Cut Templates »{' '}
          {productData.name}
        </p>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-8'>
              <div className='flex flex-col gap-4'>
                {productData?.imageUrl?.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt='Product'
                    width={50}
                    height={50}
                    className={`h-[50px] w-[50px] rounded-md object-cover ${
                      index === selectedImage ? 'opacity-100' : 'opacity-50'
                    }`}
                    onClick={() => {
                      setSelectedImage(index);
                    }}
                  />
                ))}
              </div>
              {productData && (
                <Image
                  src={productData?.imageUrl[selectedImage]}
                  alt='Product'
                  width={724}
                  height={300}
                  className='rounded-xl'
                />
              )}
            </div>

            <div className='mt-8 grid grid-cols-2 grid-rows-2 gap-4 text-[14px]'>
              <div>
                <p className='font-semibold text-[#1A214C]'>File Type</p>
                <p className='text-[#1A214C]'>AI | EPS | PNG | JPG | SVG</p>
              </div>
              <div>
                <p className='font-semibold text-[#1A214C]'>File Size</p>
                <p className='text-[#1A214C]'>7.5 mb</p>
              </div>
              <div>
                <p className='font-semibold text-[#1A214C]'>By Drizy Studio</p>
              </div>
              <div>
                <p className='text-[#1A214C]'>January 15, 2024</p>
              </div>
            </div>
          </div>
          <div className='flex basis-1/3 flex-col gap-16 pl-6'>
            <p className='text-2xl font-semibold text-[#1A214C]'>
              {productData.name}
            </p>
            <p className='font-katide-bold text-[40px] text-[#1A214C]'>
              ${productData?.price[type] ?? '1'}
            </p>
            <div className='flex w-5/6 flex-col gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>
                License Option
              </p>
              <div className='flex justify-between gap-2'>
                <button
                  onClick={() => {
                    setType(0);
                  }}
                  className={
                    type === 0
                      ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb]'
                      : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1]'
                  }
                >
                  Personal
                </button>
                <button
                  onClick={() => {
                    setType(1);
                  }}
                  className={
                    type === 1
                      ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb]'
                      : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1]'
                  }
                >
                  Commercial
                </button>
                <button
                  onClick={() => {
                    setType(2);
                  }}
                  className={
                    type === 2
                      ? 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#4065D1] px-4 py-1 text-[14px] text-[#e4f6fb]'
                      : 'font-katide-semibold rounded-full border-2 border-[#C7C7C7] bg-[#E4F6FB] px-4 py-1 text-[14px] text-[#A1A1A1]'
                  }
                >
                  Business
                </button>
              </div>
              <button
                onClick={() => {
                  handleBuy();
                }}
                className='w-[342px] rounded-full bg-[#1A214C] px-10 py-2 font-semibold text-[#e4f6fb]'
              >
                Buy Now
              </button>
              <div className='border-[#1A214C]/15 my-4 w-full border-t-2' />
              <p className='text-lg font-semibold text-[#1A214C]'>
                License Terms
              </p>
              <ul className='list-disc text-[12px] text-[#1A214C]'>
                <li>Personal Use Only</li>
                <li>
                  End Products Not For Resell, sub-license, share or
                  (re)distribute any of the digital files
                </li>
                <li>
                  You can give physical works as gifts, but not for commercial
                  purposes such as trade, services or others
                </li>
                <li>
                  Do not modify it to make a new work that is recognized as your
                  work
                </li>
                <li>
                  Digital files may not be shared or sold again, either offline
                  or online on marketplace sites and the like
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-8 bg-[#EBECF5] px-24 py-16'>
        <div className='flex'>
          <div className='flex basis-2/3 flex-col gap-8'>
            <p className='text-[24px] font-semibold text-[#1A214C]'>
              Product Detail
            </p>
            <p className='text-[16px] font-semibold text-[#707070]'>
              {productData?.name}
            </p>
            <div className='text-[16px] font-light text-[#707070]'>
              <div
                style={{ whiteSpace: 'pre-line' }}
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              />
            </div>
          </div>
          <div className='mt-16 basis-1/3 rounded-3xl bg-white p-8 shadow-xl'>
            <p className='text-lg font-semibold text-[#1A214C]'>
              Customer Review
            </p>
            <div className='mt-2 flex gap-4'>
              <p className='text-2xl font-semibold text-[#1A214C]'>5.0</p>
              <div className='flex items-center text-[#ED9B37]'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>5.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#ED9B37]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>134</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>4.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>3.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>2.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <p className='text-lg font-semibold text-[#1A214C]'>1.0</p>
              <div className='flex w-full items-center gap-4 text-[#ED9B37]'>
                <FaStar />
                <div className='h-4 w-3/4 rounded-full bg-[#AAAAAA]'></div>
                <p className='text-lg font-semibold text-[#AAAAAA]'>0</p>
              </div>
            </div>
            <div className='border-[#1A214C]/15 my-12 w-full border-t-2' />
            <div className='relative w-full'>
              <div className='h-[300px] overflow-y-scroll'>
                <div className='mt-2 flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-full bg-[#1A214C]'></div>
                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold text-[#1A214C]'>
                        Lisa N.s
                      </p>
                      <p className='text-lg font-thin text-[#1A214C]'>
                        22 Feb, 2024
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-[#ED9B37]'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className='font-base text-[#AAAAAA]'>
                    Beautifully Crafted, captures love's essence, perfect
                    valentine gift.
                  </p>
                </div>

                <div className='mt-2 flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-full bg-[#1A214C]'></div>
                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold text-[#1A214C]'>
                        Lisa N.s
                      </p>
                      <p className='text-lg font-thin text-[#1A214C]'>
                        22 Feb, 2024
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-[#ED9B37]'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className='font-base text-[#AAAAAA]'>
                    Beautifully Crafted, captures love's essence, perfect
                    valentine gift.
                  </p>
                </div>

                <div className='mt-2 flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-full bg-[#1A214C]'></div>
                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold text-[#1A214C]'>
                        Lisa N.s
                      </p>
                      <p className='text-lg font-thin text-[#1A214C]'>
                        22 Feb, 2024
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-[#ED9B37]'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className='font-base text-[#AAAAAA]'>
                    Beautifully Crafted, captures love's essence, perfect
                    valentine gift.
                  </p>
                </div>

                <div className='mt-2 flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-full bg-[#1A214C]'></div>
                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold text-[#1A214C]'>
                        Lisa N.s
                      </p>
                      <p className='text-lg font-thin text-[#1A214C]'>
                        22 Feb, 2024
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-[#ED9B37]'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className='font-base text-[#AAAAAA]'>
                    Beautifully Crafted, captures love's essence, perfect
                    valentine gift.
                  </p>
                </div>
              </div>
              <div className='absolute bottom-0 h-[100px] w-full bg-gradient-to-t from-white'></div>
              <div className='absolute bottom-0 left-0 rounded-full border-2 border-[#1A214C] bg-white px-6 text-[11px] text-[#1A214C]'>
                Load more
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex max-w-[788px] flex-wrap gap-3'>
          <p className='font-katide-bold text-[16px] text-[#707070]'>Tags:</p>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            3d Craft
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Couple
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Circuit Crafts
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            DIY
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Layered Paper Cut
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Romantic
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Shadow Box
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Silhoute Crafts
          </div>
          <div className='rounded-full bg-[#D1D1D1] px-3 text-[16px] text-[#4A4A4A]'>
            Valentine's Day
          </div>
        </div>
      </section>
      <section className='flex flex-col items-center gap-8 px-24 py-16'>
        <p className='text-2xl font-semibold text-[#1A214C]'>
          Product Recommendation
        </p>
        <div className='flex w-full justify-between gap-4'>
          {productSliderData.map((item, index) => (
            <ProductCard
              id={item.id as string}
              key={index}
              name={item.name}
              image={item.imageUrl?.[0] as string}
              price={item?.price[0] as number[]}
              isSlider={false}
            />
          ))}
        </div>
        <p className='w-full text-right text-lg font-semibold text-[#1A214C]'>
          See More &gt;
        </p>
      </section>
      <AffiliateBanner />
    </main>
  );
}
