/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from 'next/image';

interface ProductCategoriesProps {
  name: string;
  image: StaticImageData;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  name,
  image,
}) => {
  return (
    <button className='relative mb-6 h-16 w-full overflow-hidden rounded-[32px]'>
      <div className='font-katide-bold absolute top-0 z-10 flex h-full w-full items-center justify-center rounded-[32px] bg-[#4065D1]/50 hover:bg-[#4065D1]/80'>
        {name}
      </div>
      <div className='absolute top-0 z-0'>
        <img src={image.src} alt={name} />
      </div>
    </button>
  );
};

export default ProductCategories;
