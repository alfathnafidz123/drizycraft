'use client';

import Button from '@/components/buttons/Button';
import { navigationLinks } from '@/constant/data';
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className='px-8 absolute py-10 w-full z-[3] flex items-center'>
      <div className='flex px-4 mx-auto justify-between items-center container'>
        <div className='text-3xl text-gray-700 font-bold'>Kanabagi<span className='text-blue-500'>.</span></div>

        <div className='flex'>
          <ul className='hidden md:flex space-x-[30px]'>
            {navigationLinks.map((nav, i) => (
              <li key={i}>
                <Link href={nav.hash} className="text-[12px] tracking-[2px] uppercase font-semibold relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-blue-500 before:origin-[100%, 50%] before:transition-all before:duration-300 before:ease-in-out before:scale-x-0 before:scale-y-[1] before:scale-z-[1] before:will-change-transform hover:before:origin-[100%, 0%] hover:before:scale-x-[1] hover:before:scale-y-[1] hover:before:scale-z-[1] pb-2">{nav.name}</Link>
              </li>
            ))}
          </ul>

          <button className='md:hidden text-2xl'>
            <GiHamburgerMenu />
          </button>
        </div>

        <Button className='hidden md:flex border-2 border-blue-500 bg-transparent rounded-[12px] text-blue-500 px-3 py-2 hover:bg-blue-500 transition duration-200 ease-in'>Getting Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
