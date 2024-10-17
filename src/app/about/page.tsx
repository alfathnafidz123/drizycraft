/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import * as React from 'react';
import { CiYoutube } from 'react-icons/ci';
import { FaBehance } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import Button from '@/components/buttons/Button';

import {
  aboutHeader,
  crafterProduct,
  designBundles,
  drizyteam1,
  drizyteam2,
  drizyteam3,
  fontDesign,
  freepik,
  goDaddy,
  samsung,
  vectorDesign,
} from '~/images';

export default function Register() {
  return (
    <main>
      <section className='bg-[#1A214C] py-28'>
        <div className='mx-auto flex w-full max-w-[1164px] items-center justify-between gap-4 lg:gap-24 flex-row '>
          <div className='flex h-full items-center gap-6 text-[#AAAAAA] flex-col'>
            <div className='h-32 w-[2px] flex-grow bg-[#AAAAAA]' />
            <FaBehance className='h-10 w-10 max-md:h-5 max-md:w-5' />
            <FaFacebookF className='h-10 w-10 max-md:h-5 max-md:w-5' />
            <FaPinterest className='h-10 w-10 max-md:h-5 max-md:w-5' />
            <FaInstagram className='h-10 w-10 max-md:h-5 max-md:w-5' />
            <CiYoutube className='h-10 w-10 max-md:h-5 max-md:w-5' />
            <FaXTwitter className='h-10 w-10 max-md:h-5 max-md:w-5' />
            <div className='h-32 w-[2px] flex-grow bg-[#AAAAAA]' />
          </div>
          <div className='flex-col lg:flex-row flex gap-4 lg:gap-24'>
            <div className='flex max-w-[435px] flex-col gap-8 max-md:px-4'>
              <div>
                <p className='font-katide-bold text-2xl text-white lg:text-[32px]'>
                  We`re Pleased
                </p>
                <p className='font-katide-bold mt-0.5 text-2xl font-semibold text-[#FFBB3C] lg:mt-2 lg:text-[32px]'>
                  To Meet You!
                </p>
              </div>
              <p className='font-katide-regular text-xs text-white lg:text-sm'>
                We believe that our passions in graphic design can help more
                people like you in whatever project you’re working. With good
                intention in minds, happy hearts, passions, and professionalism,
                we present to you our hand-crafted graphics.
              </p>
              <div className='flex w-full flex-row gap-5 lg:gap-10'>
                <Button className='font-katide-bold flex w-full items-center justify-center rounded-full border-none bg-[#008ECC] py-2 lg:py-5 text-lg lg:w-[195px] lg:text-2xl'>
                  HIRE ME
                </Button>
                <Button className='font-katide-bold flex w-full items-center justify-center rounded-full border-2 border-[#008ECC] bg-[#1A214C] py-2 lg:py-5 text-lg lg:w-[195px] lg:text-2xl'>
                  KNOW MORE!
                </Button>
              </div>
            </div>
            <div className='w-[366px]'>
              <img
                src={aboutHeader.src}
                width={300}
                height={300}
                alt='header'
                className='!w-[366px] grow object-contain'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-[#4065D1] py-28'>
        <div className='mx-auto flex w-full max-w-[1164px] flex-col items-center'>
          <p className='mb-24 text-[32px] font-semibold text-[#FFBB3C]'>
            Our Journey
          </p>
          <div className='relative flex w-full flex-col text-white'>
            <div className='absolute left-[11px] h-full w-[2px] bg-[#AAAAAA]' />
            <div className='mt-16 flex flex-col gap-4 lg:flex-row'>
              <div className='z-20 h-6 w-6 flex-shrink-0 rounded-full border-[6px] border-[#4065D1] bg-white' />
              <div className='ml-5 lg:ml-0'>
                <p className='mb-4 text-[32pt] leading-10 font-semibold font-hastle'>
                  Font <br /> Design
                </p>
                <p className='text-[20pt]'>2016</p>
              </div>
              <Image
                src={fontDesign}
                width={330}
                height={530}
                alt='Font Design'
                className='mx-auto lg:mx-16'
              />
              <div className='ml-5 flex flex-col lg:ml-0'>
                <p className='mb-8 max-md:px-4 text-[14pt]'>
                  Faqih, founder of Drizy started Drizy Studio by developing
                  display fonts in 2016. He created various font categories and
                  had them selling on several marketplaces. Getting the fonts
                  used in commercial advertising media for a brand and other
                  graphic projects is a good starting point for Drizy.
                </p>
                <p className='mb-8'>Featured on:</p>
                <Image src={samsung} width={312} height={48} alt='Samsung' />
                <button className='mt-12 flex w-2/3 justify-center rounded-full border-none bg-[#1A214C] px-8 py-4 font-semibold'>
                  <p className='text-lg'>Explore our fonts here</p>
                </button>
              </div>
            </div>

            <div className='mt-36 flex flex-col justify-between gap-4 lg:flex-row'>
              <div className='z-20 h-6 w-6 flex-shrink-0 rounded-full border-[6px] border-[#4065D1] bg-white' />
              <div className='ml-5 lg:ml-0'>
                <p className='mb-4 text-[32pt] font-semibold leading-tight font-hastle'>
                  Vector Graphic &
                  <br />
                  Illustration
                </p>
                <p className='mb-16 text-[20pt]'>2019</p>
                <div className='flex flex-col text-[14pt]'>
                  <p className='mb-8 text-sm'>
                    A year after, he was inpired to build a team to help him
                    explore the creation into illustration, graphic, character
                    illustration, UI/UX layout template and print-ready graphic
                    template as portfolio.
                  </p>
                  <p className='mb-8'>Collaborated With: </p>
                  <div className='flex items-center gap-4 lg:gap-8'>
                    <Image
                      src={freepik}
                      width={200}
                      height={50}
                      alt='Freepik'
                    />
                    <Image
                      src={goDaddy}
                      width={202}
                      height={42}
                      alt='GoDaddy'
                      className='h-[42px] w-[202px]'
                    />
                  </div>
                  <button className='mt-12 flex w-2/3 justify-center rounded-full border-none bg-[#1A214C] px-8 py-4 font-semibold'>
                    <p className='font-katide-bold text-base'>
                      Explore our vectors here
                    </p>
                  </button>
                </div>
              </div>
              <div className='w-full max-md:px-4 lg:ml-16'>
                <Image
                  src={vectorDesign}
                  width={450}
                  height={560}
                  alt='Font Design'
                // className='ml-16'
                />
              </div>
            </div>
          </div>
          <div className='relative mt-36 flex flex-col gap-4 text-white lg:flex-row'>
            <div className='absolute -top-[200px] left-[11px] h-[200px] w-[2px] bg-[#AAAAAA]' />
            <div className='absolute  left-[11px] h-[100px] w-[2px] bg-[#AAAAAA]' />
            <div className='z-20 h-6 w-6 flex-shrink-0 rounded-full border-[6px] border-[#4065D1] bg-white' />
            <div className='ml-5 lg:ml-0'>
              <p className='mb-4 text-[32pt] font-semibold leading-tight'>
                Crafters <br /> Product
              </p>
              <p className='text-[20pt]'>2016</p>
            </div>
            <Image
              src={crafterProduct}
              width={330}
              height={530}
              alt='Font Design'
              className='lg:-ml-16 lg:mr-16'
            />
            <div className='flex flex-col text-[14pt]'>
              <p className='mb-8 max-md:px-4'>
                n 2020, Drizy Studio selected by Designbundles.net to be an
                exclusive designer that provides some graphic assets,
                spesifically Crafty Design. Crafty design has its own common
                categories as sublimation illustrations, SVG cut files, 3D SVG,
                paper cut, laser cutting design and many more. It is a new big
                challenge for Drizy, to made a neat, flawless and print-ready of
                thousand products for each month
              </p>
              <p className='mb-8 max-md:px-4'>
                A solid team and all new experiences Drizy have, make Drizy
                grows every day and ready to provides Drizy’s own premium
                personal shop.
              </p>
              <p className='mb-8 max-md:px-4'>Collaborated With: </p>
              <Image
                src={designBundles}
                width={312}
                height={48}
                alt='Samsung'
              />
              <button className='mt-12 flex w-2/3 justify-center rounded-full border-none bg-[#1A214C] px-8 py-4 font-semibold max-md:mx-auto'>
                <p className='font-katide-bold text-base'>
                  Explore our Crafty heree
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='flex w-full flex-col items-center justify-center gap-12 bg-[#1A214C] px-4 py-40 text-white lg:gap-24 lg:px-40'>
        <p className='text-[32px] font-semibold'>Drizy Team</p>
        <p className='w-full text-center text-sm text-[#AAAAAA] lg:w-1/2'>
          We started with only a couple then grow into 42 high-skilled creatives
          (and counting!) as a solid team, including Art Directors, Graphic
          Designers, Font Designers, Copywriters, Design Managers, Mockup
          Designers, Quality Control Inspectors, and Uploaders. We believe in
          professionalism meets artistic skills and the heart-warming atmosphere
          to deliver best service for our clients.
        </p>
        <div className='flex flex-col justify-center gap-6 max-md:w-full lg:flex-row lg:gap-14'>
          <Image
            src={drizyteam1}
            width={275}
            height={208}
            alt='Drizy Team'
            className='rounded-lg p-2.5 transition-all duration-500 hover:scale-110 hover:border hover:border-[#AAAAAA] hover:p-2 max-md:w-full'
          />
          <Image
            src={drizyteam2}
            width={275}
            height={208}
            alt='Drizy Team'
            className='rounded-lg p-2.5 transition-all duration-500 hover:scale-110 hover:border hover:border-[#AAAAAA] hover:p-2 max-md:w-full'
          />
          <Image
            src={drizyteam3}
            width={275}
            height={208}
            alt='Drizy Team'
            className='rounded-lg p-2.5 transition-all duration-500 hover:scale-110 hover:border hover:border-[#AAAAAA] hover:p-2 max-md:w-full'
          />
        </div>
      </section>
      <section className='flex flex-col items-center bg-[#1A214C] text-white max-md:pt-6'>
        <p className='mb-8 text-xl font-semibold'>Find us here!</p>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.164407102488!2d107.66151755725397!3d-6.91556131634898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e775215f0e05%3A0x34b80d88cdca44a!2sDrizy%20Studio!5e0!3m2!1sen!2sid!4v1710964039713!5m2!1sen!2sid'
          className='h-[400px] w-full'
          loading='lazy'
        ></iframe>
        {/* <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
      </section>
    </main>
  );
}
