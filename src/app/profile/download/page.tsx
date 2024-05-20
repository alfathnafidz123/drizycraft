/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import { FaInfinity } from 'react-icons/fa6';

export default function Register() {
  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <table className='table-auto'>
          <thead>
            <tr className='text-left text-[#1A214C]'>
              <th>Product</th>
              <th>Download remaining</th>
              <th>Expires</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody className='text-[#1A214C]'>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td>Crocodile Skater Boy</td>
              <td>
                <FaInfinity />
              </td>
              <td>Never</td>
              <td>
                <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='mt-8 flex w-full justify-center'></div>
      </div>
    </>
  );
}
