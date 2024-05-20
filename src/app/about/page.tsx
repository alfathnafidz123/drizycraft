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
      <section className='flex h-[80vh] w-full items-center justify-center gap-24 bg-[#1A214C] px-40 py-28'>
        <div className='flex h-full flex-col items-center gap-4 text-[#AAAAAA]'>
          <div className='h-full w-[2px] flex-grow bg-[#AAAAAA]' />
          <FaBehance className='h-20 w-20' />
          <FaFacebookF className='h-20 w-20' />
          <FaPinterest className='h-20 w-20' />
          <FaInstagram className='h-20 w-20' />
          <CiYoutube className='h-20 w-20' />
          <FaXTwitter className='h-20 w-20' />
          <div className='h-full w-[2px] flex-grow bg-[#AAAAAA]' />
        </div>
        <div className='flex flex-col gap-8'>
          <div>
            <p className='text-2xl text-white'>We`re Pleased</p>
            <p className='text-2xl font-semibold text-[#FFBB3C]'>
              To Meet You!
            </p>
          </div>
          <p className='text-lg text-white'>
            We believe that our passions in graphic design can help more people
            like you in whatever project you’re working. With good intention in
            minds, happy hearts, passions, and professionalism, we present to
            you our hand-crafted graphics.
          </p>
          <div>
            <Button className='mr-12 rounded-full border-none bg-[#008ECC] px-12 py-6 font-semibold'>
              <p className='text-2xl'>HIRE ME</p>
            </Button>
            <Button className='rounded-full border-2 border-[#008ECC] bg-[#1A214C] px-12 py-6 font-semibold'>
              <p className='text-2xl'>KNOW MORE!</p>
            </Button>
          </div>
        </div>
        <Image src={aboutHeader} width={300} height={300} alt='header' />
      </section>
      <section className='flex flex-col items-center bg-[#4065D1] px-60 py-28'>
        <p className='mb-24 text-2xl font-semibold text-[#FFBB3C]'>
          Our Journey
        </p>
        <div className='relative flex w-full flex-col text-white'>
          <div className='absolute left-[11px] h-full w-[2px] bg-[#AAAAAA]' />
          <div className='mt-16 flex gap-4'>
            <div className='z-20 h-6 w-6 flex-shrink-0 rounded-full border-[6px] border-[#4065D1] bg-white' />
            <div>
              <p className='mb-4 text-xl font-semibold'>
                Font <br /> Design
              </p>
              <p className='text-lg'>2016</p>
            </div>
            <Image
              src={fontDesign}
              width={330}
              height={530}
              alt='Font Design'
              className='mx-16'
            />
            <div className='flex flex-col'>
              <p className='mb-8'>
                Faqih, founder of Drizy started Drizy Studio by developing
                display fonts in 2016. He created various font categories and
                had them selling on several marketplaces. Getting the fonts used
                in commercial advertising media for a brand and other graphic
                projects is a good starting point for Drizy.
              </p>
              <p className='mb-8'>Featured on:</p>
              <Image src={samsung} width={312} height={48} alt='Samsung' />
              <button className='mt-12 flex w-2/3 justify-center rounded-full border-none bg-[#1A214C] px-8 py-4 font-semibold'>
                <p className='text-lg'>Explore our fonts here</p>
              </button>
            </div>
          </div>

          <div className='mt-36 flex gap-4'>
            <div className='z-20 h-6 w-6 flex-shrink-0 rounded-full border-[6px] border-[#4065D1] bg-white' />
            <div>
              <p className='mb-4 text-xl font-semibold'>
                Vector Graphic &
                <br />
                Illustration
              </p>
              <p className='mb-16 text-lg'>2019</p>
              <div className='flex flex-col'>
                <p className='mb-8'>
                  A year after, he was inpired to build a team to help him
                  explore the creation into illustration, graphic, character
                  illustration, UI/UX layout template and print-ready graphic
                  template as portfolio.
                </p>
                <p className='mb-8'>Collaborated With: </p>
                <div className='flex items-center gap-8'>
                  <Image src={freepik} width={200} height={50} alt='Freepik' />
                  <Image
                    src={goDaddy}
                    width={202}
                    height={42}
                    alt='GoDaddy'
                    className='h-[42px] w-[202px]'
                  />
                </div>
                <button className='mt-12 flex w-2/3 justify-center rounded-full border-none bg-[#1A214C] px-8 py-4 font-semibold'>
                  <p className='text-lg'>Explore our vectors here</p>
                </button>
              </div>
            </div>
            <Image
              src={vectorDesign}
              width={450}
              height={560}
              alt='Font Design'
              className='mx-16'
            />
          </div>
        </div>
        <div className='relative mt-36 flex gap-4 text-white'>
          <div className='absolute -top-[200px] left-[11px] h-[200px] w-[2px] bg-[#AAAAAA]' />
          <div className='absolute  left-[11px] h-[100px] w-[2px] bg-[#AAAAAA]' />
          <div className='z-20 h-6 w-6 flex-shrink-0 rounded-full border-[6px] border-[#4065D1] bg-white' />
          <div>
            <p className='mb-4 text-xl font-semibold'>
              Font <br /> Design
            </p>
            <p className='text-lg'>2016</p>
          </div>
          <Image
            src={crafterProduct}
            width={330}
            height={530}
            alt='Font Design'
            className='-ml-16 mr-16'
          />
          <div className='flex flex-col'>
            <p className='mb-8'>
              n 2020, Drizy Studio selected by Designbundles.net to be an
              exclusive designer that provides some graphic assets, spesifically
              Crafty Design. Crafty design has its own common categories as
              sublimation illustrations, SVG cut files, 3D SVG, paper cut, laser
              cutting design and many more. It is a new big challenge for Drizy,
              to made a neat, flawless and print-ready of thousand products for
              each month
            </p>
            <p className='mb-8'>
              A solid team and all new experiences Drizy have, make Drizy grows
              every day and ready to provides Drizy’s own premium personal shop.
            </p>
            <p className='mb-8'>Collaborated With: </p>
            <Image src={designBundles} width={312} height={48} alt='Samsung' />
            <button className='mt-12 flex w-2/3 justify-center rounded-full border-none bg-[#1A214C] px-8 py-4 font-semibold'>
              <p className='text-lg'>Explore our Crafty heree</p>
            </button>
          </div>
        </div>
      </section>
      <section className='flex w-full flex-col items-center justify-center gap-24 bg-[#1A214C] px-40 py-40 text-white'>
        <p className='text-3xl font-semibold'>Drizy Team</p>
        <p className='w-1/2 text-center'>
          We started with only a couple then grow into 42 high-skilled creatives
          (and counting!) as a solid team, including Art Directors, Graphic
          Designers, Font Designers, Copywriters, Design Managers, Mockup
          Designers, Quality Control Inspectors, and Uploaders. We believe in
          professionalism meets artistic skills and the heart-warming atmosphere
          to deliver best service for our clients.
        </p>
        <div className='flex justify-center gap-16'>
          <Image src={drizyteam1} width={275} height={208} alt='Drizy Team' />
          <Image src={drizyteam2} width={275} height={208} alt='Drizy Team' />
          <Image src={drizyteam3} width={275} height={208} alt='Drizy Team' />
        </div>
      </section>
      <section className='flex flex-col items-center bg-[#1A214C] text-white'>
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
