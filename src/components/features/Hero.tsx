import React from 'react'

import { sectionProps } from '@/interfaces/features.interface'

const Hero = ({ sectionStyle }: sectionProps) => {
  return (
    <section className={`${sectionStyle}`}>
      <div className='flex flex-col items-center justify-center '>
        <h1 className='text-center mb-[50px]'>All The Features That You Need</h1>
        <p className='max-w-[488px] text-center text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </div>
    </section>
  )
}

export default Hero