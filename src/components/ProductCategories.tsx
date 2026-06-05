/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import Image from 'next/image';


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
  const href =
    link === "catalog-crafter"
      ? `/${link}`
      : link === "cake topper"
        ? `/category/search/${link}?category=all`
        : `/category/${link}`;

  return (
    <Link
      prefetch={true}
      href={href}
      aria-label={`show-product-${name}`}
      id={`show-product-${name}`}
      className='relative h-20 w-full overflow-hidden rounded-[12px] border border-[#AAAAAA]  bg-[#EBECF5]/50 hover:bg-[#C2E5FF]'
    >
      <div className='font-katide-bold flex h-full w-full items-center gap-2 p-1'>
        {/* <NextImage
          width={48}
          height={48}
          src={image}
          alt={name.split(' ')[0]}
          className="rounded-lg object-cover h-full
          w-auto"
        /> */}
        <div className="h-full aspect-square ">
          <Image
            width={100}
            height={100}
            src={image} // ganti dengan path asli
            alt={name.split(' ')[0]}
            className="w-full h-full object-cover rounded-[12px]"
          />
        </div>
        
        <span className='text-[#61657D] lg:text-lg text-sm me-2'>{name}</span>
      </div>
    </Link>

  );
};

export default ProductCategories;
