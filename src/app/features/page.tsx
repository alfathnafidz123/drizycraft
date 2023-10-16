import AfterCard from '@/components/features/AfterCard'
import Card from '@/components/features/Card'
import Hero from '@/components/features/Hero'
import React from 'react'

const page = () => {
  return (
    <main className='bg-[#f3f5f8]'>
      <Hero sectionStyle='pt-[150px]' />
      <Card sectionStyle='pt-[100px]' />
      <AfterCard sectionStyle='lg:py-32 py-24' />
    </main>
  )
}

export default page