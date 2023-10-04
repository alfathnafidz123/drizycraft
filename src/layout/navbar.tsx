'use client';

import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

import Button from '@/components/buttons/Button';

import { navigationLinks } from '@/constant/data';

const Navbar = () => {
  return (
    <nav className='absolute z-[3] flex w-full items-center px-8 py-10'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <div className='text-3xl font-bold text-gray-700'>
          Kanabagi<span className='text-blue-500'>.</span>
        </div>

        <div className='flex'>
          <ul className='hidden space-x-[30px] md:flex'>
            {navigationLinks.map((nav, i) => (
              <li key={i}>
                <Link
                  href={nav.hash}
                  className="before:origin-[100%, 50%] before:scale-z-[1] hover:before:origin-[100%, 0%] hover:before:scale-z-[1] relative pb-2 text-[12px] font-semibold uppercase tracking-[2px] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:scale-y-[1] before:bg-blue-500 before:transition-all before:duration-300 before:ease-in-out before:will-change-transform before:content-[''] hover:before:scale-x-[1] hover:before:scale-y-[1]"
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>

          <button className='text-2xl md:hidden'>
            <GiHamburgerMenu />
          </button>
        </div>

        <Button className='hidden rounded-[12px] border-2 border-blue-500 bg-transparent px-3 py-2 text-blue-500 transition duration-200 ease-in hover:bg-blue-500 md:flex'>
          Getting Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
