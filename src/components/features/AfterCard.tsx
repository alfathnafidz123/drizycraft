import React from 'react'

import { featureDetailContent } from '@/constant/data'
import { sectionProps } from '@/interfaces/features.interface'

const AfterCard = ({ sectionStyle }: sectionProps) => {
  return (
    <section className={`${sectionStyle}`} id='card'>
      <div className='flex justify-center items-center flex-wrap'>
        <div className='grid grid-cols-1 lg:grid-cols-2 w-10/12 lg:gap-4 gap-10'>
          {featureDetailContent.map((item, i) => (
            <div key={i} className='flex items-start justify-center gap-6'>
              <span className='p-4 rounded-full bg-[#0151c6] flex items-center justify-center'>
                <item.icon className='text-2xl text-white' />
              </span>

              <div className='w-8/12'>
                <h3>{item.title}</h3>
                <p className='text-gray-500 leading-relaxed'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AfterCard