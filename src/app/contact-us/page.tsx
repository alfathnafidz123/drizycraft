'use client';

import { useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import useSupportMessage from '@/lib/hooks/useSupportMessage';
import ValidationError from '@/components/validation/error';
import { ContactUs } from '~/images';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const { handleCreate, isLoading, register, errors } = useSupportMessage();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaError, setCaptchaError] = useState(false);

  console.log(captchaError);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = recaptchaRef.current?.getValue();
    console.log('token recaptcha', token);
    if (!token) {
      setCaptchaError(true);
      return;
    }

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      token,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await handleCreate(payload, token);
    console.log('payload terkirim:', token);
    recaptchaRef.current?.reset();
  };


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
          <form onSubmit={onSubmit} className='m-[8%]'>
            <div className='flex flex-grow flex-col'>
              <label className='pl-4 text-[#1A214C]'>Your name</label>
              <input
                type='text'
                className='border-grey-100 m-[3%] rounded-full border-[1px]'
                {...register('name')}
              />
              <ValidationError error={errors.name} />
            </div>

            <div className='flex flex-grow flex-col pt-[3%]'>
              <label className='pl-4 text-[#1A214C]'>Your email</label>
              <input
                type='email'
                className='border-grey-100 m-[3%] rounded-full border-[1px]'
                {...register('email')}
              />
              <ValidationError error={errors.email} />
            </div>

            <div className='flex flex-grow flex-col pt-[3%]'>
              <label className='pl-4 text-[#1A214C]'>Subject</label>
              <input
                type='text'
                className='border-grey-100 m-[3%] rounded-full border-[1px]'
                {...register('subject')}
              />
              <ValidationError error={errors.subject} />
            </div>

            <div className='flex flex-grow flex-col pt-[3%]'>
              <label className='pl-4 text-[#1A214C]'>Your message</label>
              <textarea
                className='border-grey-100 m-[3%] rounded-xl border-[1px]'
                {...register('message')}
              />
              <ValidationError error={errors.message} />
            </div>

            <div className='mt-4 flex justify-center'>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              />
            </div>

            {captchaError && (
              <p className='text-red-500 text-center mt-2 text-sm'>
                Please verify that you are not a robot
              </p>
            )}

            <div className='mt-8 flex w-full justify-center'>
              <button
                type='submit'
                className='rounded-full bg-[#4065D1] hover:bg-[#2A3B80] px-[30%] py-[1%] font-semibold text-[#e4f6fb]'
              >
                {isLoading ? <Loader className='animate-spin' /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
