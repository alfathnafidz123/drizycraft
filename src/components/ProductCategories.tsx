/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';

import NextImage from '@/components/NextImage';

interface ProductCategoriesProps {
  name: string;
  image: string;
  link: string;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  name,
  image,
  link,
}) => {
  return (
    <Link
      prefetch={true}
      href={`/category/${link}`}
      aria-label={`show-product-${name}`}
      id={`show-product-${name}`}
      className='relative h-16 w-full overflow-hidden rounded-[32px]'
    >
      <div className='font-katide-bold absolute top-0 z-10 flex h-full w-full items-center justify-center rounded-[32px] bg-[#4065D1]/50 hover:bg-[#4065D1]/80'>
        {name}
      </div>
      <div className='absolute top-0 z-0'>
        <NextImage width={300} height={100} src={image} alt={name.split(' ')[0]} />
      </div>
    </Link>
  );
};

export default ProductCategories;
