/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import { useState } from 'react';
import { BsFillCreditCard2BackFill } from '@react-icons/all-files/bs/BsFillCreditCard2BackFill';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

export default function Register() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const options: OptionType[] = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
  ];
  const handleChange = (newValue: OptionType | null) => {
    setSelectedOption(newValue);
  };

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <p className='pl-4 text-lg font-semibold text-[#1A214C]'>
          Enter your payment details
        </p>
        <div className='relative w-full'>
          <input
            type='text'
            className='my-2 w-full rounded-full border border-[#abaaab] p-4 pl-12 placeholder-[#abaaab]'
            placeholder='Card Number'
            required
          ></input>
          <span className='absolute inset-y-0 left-3 flex items-center pl-3'>
            <BsFillCreditCard2BackFill className='text-[#abaaab]' />
          </span>
          <span className='absolute inset-y-0 right-3 flex items-center pr-3 text-[#abaaab]'>
            <p>MM / YY CVC</p>
          </span>
        </div>
        <input
          type='text'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          placeholder='Street address'
          required
        ></input>
        <input
          type='text'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          placeholder='Apt, unit, suite, etc. (optional)'
          required
        ></input>
        <Select
          defaultValue={selectedOption}
          onChange={handleChange}
          options={options}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '9999px',
              padding: '8px',
            }),
          }}
        />
      </div>
      <div className='flex w-full gap-1'>
        <input
          type='text'
          className='my-2 basis-3/6 rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          placeholder='City'
          required
        ></input>
        <Select
          defaultValue={selectedOption}
          onChange={handleChange}
          options={options}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '9999px',
              padding: '16px',
            }),
          }}
          className='my-2 basis-2/6'
        />
        <input
          type='text'
          className='my-2 basis-1/6 rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          placeholder='Zip Code'
          required
        ></input>
      </div>
      <div className='mt-8 flex w-full justify-center'>
        <button className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb]'>
          Save
        </button>
      </div>
    </>
  );
}
