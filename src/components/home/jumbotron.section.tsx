import Image from 'next/image';

import Button from '@/components/buttons/Button';

const JumbotronSection = () => {
  return (
    <section className='mb-[100px] pt-[125px]'>
      <div className='flex flex-col px-[20px] md:flex-row md:items-center md:justify-center md:gap-[190px]'>
        <div className='flex flex-col items-center justify-center md:max-w-[520px] md:items-start md:pt-24'>
          <h2 className='text-xl font-bold md:text-3xl'>
            Lorem Ipsum Dolor Sit Amet
          </h2>
          <p className='mb-[12px] mt-[12px] text-center text-sm md:text-start md:text-base'>
            consectetur a dipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <Button className='rounded-xl border-none bg-[#0151C6] px-6 text-lg transition duration-200 hover:bg-[#0151C6]/70 md:px-8'>
            Button
          </Button>
        </div>
        <div className='mt-10'>
          <Image
            className=''
            src='/images/edu.png'
            width={500}
            height={358}
            alt='edu'
          />
        </div>
      </div>
    </section>
  );
};

export default JumbotronSection;
