/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import * as React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { cartIllustration } from '~/images';

export default function Register() {
  return (
    <main>
      <section className='flex gap-4 bg-[#F4F4F4] p-20'>
        <div className='flex basis-3/12 flex-col gap-12 rounded-xl bg-white p-8 pr-16 shadow-lg'>
          <p className='text-3xl font-semibold'>My Cart</p>
          <img className='w-[300px]' src={cartIllustration.src} alt='Sign Up' />
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-lg'>
          <table className='table-fixed'>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td className='w-1/6'>
                  <button>
                    <IoIosCloseCircleOutline />
                  </button>
                </td>
                <td className='w-1/6'>
                  <Image
                    src='https://drizy-media.quadrakaryasantosa.com/2024/05/14/Fireworks-c5510.png'
                    width={120}
                    height={80}
                    alt='Image'
                  />
                </td>
                <td className='w-1/6'>
                  Glancyr - Modern Geometric Font - Extended License
                </td>
                <td className='w-1/6'>$2</td>
                <td className='w-1/6'>1</td>
                <td className='w-1/6'>$2</td>
              </tr>
              <tr>
                <td className='w-1/6'>
                  <button>
                    <IoIosCloseCircleOutline />
                  </button>
                </td>
                <td className='w-1/6'>
                  <Image
                    src='https://drizy-media.quadrakaryasantosa.com/2024/05/14/Fireworks-c5510.png'
                    width={120}
                    height={80}
                    alt='Image'
                  />
                </td>
                <td className='w-1/6'>
                  Glancyr - Modern Geometric Font - Extended License
                </td>
                <td className='w-1/6'>$2</td>
                <td className='w-1/6'>1</td>
                <td className='w-1/6'>$2</td>
              </tr>
            </tbody>
          </table>
          <button className='self-end rounded-full bg-[#4065D1] px-24 py-3 text-white'>
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
}
