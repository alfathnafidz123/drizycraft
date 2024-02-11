'use client';

import { logodrizy } from '~/images';

const Navbar = () => {
  console.log(logodrizy);
  return (
    <nav className='fixed top-0 z-10 flex w-full items-center bg-white py-10 shadow-xl md:px-[80px]'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <img src={logodrizy.src} alt='Logo' className='object-contain' />
      </div>
    </nav>
  );
};

export default Navbar;
