'use client';

import Button from '@/components/buttons/Button';

const Navbar = () => {
  return (
    <nav className='flex h-16 w-full items-center justify-between border-b border-gray-300 bg-white px-4'>
      <div>Header</div>
      <Button>CTA Button</Button>
    </nav>
  );
};

export default Navbar;
