'use client';

import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { usePathname } from 'next/navigation'
import Button from '@/components/buttons/Button';
import { navigationLinks } from '@/constant/data';
import Image from 'next/image';
import { quadra } from '~/images';

const Navbar = () => {

  const pathname = usePathname()
  let newPathname = ''

  newPathname = pathname;

  if (pathname.includes('/blog')) {
    newPathname = '/blog'
  } else if (pathname.includes('/projects')) {
    newPathname = '/projects'
  }

  return (
    <nav className='absolute z-[3] flex w-full items-center md:px-[80px] py-10 bg-tranparrent'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <div className='text-3xl font-bold text-white pr-[120px]'>
          <Image src={quadra} alt='' width={50} height={50} className='object-contain' />
        </div>
        {/* <div className='text-3xl font-bold text-gray-700'>
          Kanabagi<span className='text-blue-500'>.</span>
        </div> */}

        <div className=''>
          <ul className='hidden space-x-[30px] lg:flex'>
            {navigationLinks.map((nav, i) => (
              <li key={i} className=''>
                <Link
                  href={nav.hash}
                  className={`before:origin-[100%, 50%] before:scale-z-[1] hover:before:origin-[100%, 0%] hover:before:scale-z-[1] relative pb-2 text-[14px] font-semibold text-[#0151c6] uppercase tracking-[2px] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:scale-y-[1] before:bg-[#0151c6] before:transition-all before:duration-300 before:ease-in-out before:will-change-transform before:content-[''] hover:before:scale-x-[1] hover:before:scale-y-[1] ${newPathname === nav.hash ? "border-[#0151c6] before:scale-x-[1]" : "border-transparrent"}`}>
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>

          <button className='text-2xl lg:hidden text-[#0151c6]'>
            <GiHamburgerMenu />
          </button>
        </div>

        <Button className='hidden rounded-[20px] border-2 border-[#0151c6] bg-transparent px-8 py-2 text-[#0151c6] transition duration-200 ease-in hover:bg-[#0151c6] hover:border-transparent lg:flex'>
          Getting Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
