'use client';

import { logodrizy } from '~/images'

const Navbar = () => {

  return (
    <nav className='fixed top-0 z-10 flex w-full items-center md:px-[80px] py-10 bg-white shadow-xl'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <img src={logodrizy} alt='Logo' className='object-contain' />
      </div>
    </nav>
  );
};

export default Navbar;
