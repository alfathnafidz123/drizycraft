'use client';
import { ContactUs } from '~/images';

export default function Contact() {
  return (
    <main className='bg-[#F4F4F4]'>
      <p className=' font-katide-bold mb-[2%] pt-[5%] text-center text-[36px] tracking-wider text-[#1A214C]'>
        CONTACT US
      </p>

      <section className='flex p-20'>
        <div className='flex basis-5/12 flex-col gap-12 text-[#1A214C] pr-16'>
          <p className='font-katide-bold text-[20px]'>
            DAISY IS HERE TO HELP YOU!
          </p>
          <p className='text-[14px]'>
            If you have any problem, any question, or anything regarding our
            services, or simply want to say “Hi!”, our teammate Daisy is ready
            to help you.
            <br />
            <br />
            Just fill-in the form below to contact drizy studio, then Daisy will
            respond to you in no time!
          </p>
          <img className='' src={ContactUs.src} alt='Contact Us' />
        </div>

        <div className='ml-[10%] flex flex-col gap-4 rounded-xl bg-white p-8 shadow-lg w-[569px] h-[701px] text-[14px]'>
          <div className='m-[8%]'>
          <div className='flex flex-col flex-grow'>
            <label className='pl-4 text-[#1A214C]'>
              Your name
            </label>
            <input
              type='text'
              className='border-grey-100 border-[1px] rounded-full m-[3%]'
              placeholder=''
              required
            ></input>
          </div>

          <div className='flex flex-col flex-grow pt-[3%]'>
            <label className='pl-4 text-[#1A214C]'>
              Your email
            </label>
            <input
              type='email'
              className='border-grey-100 border-[1px] rounded-full m-[3%]'
              placeholder=''
              required
            ></input>
          </div>

          <div className='flex flex-col flex-grow pt-[3%]'>
            <label className='pl-4 text-[#1A214C]'>
              Subject
            </label>
            <input
              type='text'
              className='border-grey-100 border-[1px] rounded-full m-[3%]'
              placeholder=''
              required
            ></input>
          </div>

          <div className='flex flex-col flex-grow pt-[3%]'>
            <label className='pl-4 text-[#1A214C]'>
              Your message
            </label>
            <input
              type='gi'
              className='border-grey-100 border-[1px] rounded-xl m-[3%] p-[15%]'
              placeholder=''
              required
            ></input>
          </div>

          <div className='mt-8 flex w-full'>
            <button className='rounded-full bg-[#4065D1] px-[30%] py-[1%] font-semibold text-[#e4f6fb] m-[3%]'>
              Submit
            </button>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
