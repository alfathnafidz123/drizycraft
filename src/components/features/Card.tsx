import { featuresContent } from '@/constant/data'
import { sectionProps } from '@/interfaces/features.interface'
import Link from 'next/link'
import React from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'

const Card = ({ sectionStyle }: sectionProps) => {
  return (
    <section className={`${sectionStyle}`}>
      <div className='flex flex-wrap justify-center items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:w-10/12 w-8/12'>
          {featuresContent.map((item, i) => (
            <Link href='#card' className='group bg-white pt-32 pl-10 pr-10 pb-20 rounded-lg relative overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#217DF7]'>
              <span className='text-[200px] absolute opacity-5 top-2 inline-block left-3 transition duration-700 ease-in-out group-hover:translate-y-4'>
                {item.number}
              </span>

              <div className='absolute top-10 right-10'>
                <item.icon className='text-3xl text-[#0151c6] group-hover:text-white' />
              </div>

              <div className='flex items-center gap-4 group-hover:text-white'>
                <span className='font-semibold text-[24px] group-hover:translate-x-4 transition duration-300 ease-in-out'>{item.number}</span>
                <h3 className='group-hover:translate-x-4 transition duration-300 ease-in-out'>{item.title}</h3>
              </div>

              <div className='absolute text-[30px] right-[40px] text-white group-hover:translate-y-4 transition duration-500 ease-in-out'>
                <BiSolidDownArrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Card