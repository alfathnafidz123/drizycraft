'use client';

import Button from '@/components/buttons/Button';

const Footer = () => {
  return (
    <nav className='flex h-16 w-full items-center justify-between border-b border-gray-300 bg-white px-4'>
      <div>Footer</div>
      <Button>CTA Button</Button>
    </nav>
  );
};

export default Footer;
