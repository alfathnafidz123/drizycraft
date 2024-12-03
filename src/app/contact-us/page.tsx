'use client'

import { toast } from 'react-toastify';

import { ContactUs } from '~/images';

export default function Contact() {
  return (
    <main className='bg-[#F4F4F4]'>
      <p className=' font-katide-bold mb-[2%] pt-[5%] text-center text-[36px] tracking-wider text-[#1A214C]'>
        CONTACT US
      </p>

      <section className='flex flex-col lg:flex-row mx-auto w-full max-w-[1164px] py-20 gap-4'>
        <div className='flex lg:basis-5/12 flex-col gap-12 pr-16 text-[#1A214C] max-md:px-2'>
          <p className='font-katide-bold text-[20px] max-lg:text-center'>
            Sylvia IS HERE TO HELP YOU!
          </p>
          <p className='text-[14px]'>
            If you have any problem, any question, or anything regarding our
            services, or simply want to say “Hi!”, our teammate Sylvia is ready
            to help you.
            <br />
            <br />
            Just fill-in the form below to contact drizy studio, then Sylvia will
            respond to you in no time!
          </p>
          <img className='' src={ContactUs.src} alt='Contact Us' />
        </div>

        <div className='flex w-full max-w-[569px] flex-col gap-4 rounded-xl bg-white p-4 xl:p-8 text-[14px] shadow-lg'>
          <div className='m-[8%]'>
            <div className='flex flex-grow flex-col'>
              <label className='pl-4 text-[#1A214C]'>Your name</label>
              <input
                type='text'
                className='border-grey-100 m-[3%] rounded-full border-[1px]'
                placeholder=''
                required
              ></input>
            </div>

            <div className='flex flex-grow flex-col pt-[3%]'>
              <label className='pl-4 text-[#1A214C]'>Your email</label>
              <input
                type='email'
                className='border-grey-100 m-[3%] rounded-full border-[1px]'
                placeholder=''
                required
              ></input>
            </div>

            <div className='flex flex-grow flex-col pt-[3%]'>
              <label className='pl-4 text-[#1A214C]'>Subject</label>
              <input
                type='text'
                className='border-grey-100 m-[3%] rounded-full border-[1px]'
                placeholder=''
                required
              ></input>
            </div>

            <div className='flex flex-grow flex-col pt-[3%]'>
              <label className='pl-4 text-[#1A214C]'>Your message</label>
              <textarea
                className='border-grey-100 m-[3%] rounded-xl border-[1px]'
                placeholder=''
                required
              ></textarea>
            </div>

            <div className='mt-8 flex w-full'>
              <button
                onClick={() => {
                  toast.info('Message sent!');
                }}
                className='m-[3%] rounded-full bg-[#4065D1] hover:bg-[#2A3B80] px-[30%] py-[1%] font-semibold text-[#e4f6fb]'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
