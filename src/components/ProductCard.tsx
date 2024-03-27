/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import {
  cartProduct,
  hoverPinterest,
  hoverWA,
  pintCrafter,
  waCrafter,
} from '~/images';

interface ProductCardProps {
  image: StaticImageData;
  name: string;
  price: number;
  discountPrice?: number;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  discountPrice,
  isSale,
}) => {
  const router = useRouter();
  return (
    <div
      className='group relative m-8 mx-1 ml-[13px] h-[335px] w-[281px] shadow-2xl'
      onClick={() => {
        router.push('/product');
      }}
    >
      <div className='absolute left-0 top-0 flex h-[335px] w-[281px] flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] pb-[12px] pl-[12px] pr-[12px] pt-[12px] shadow-xl transition-none hover:border-[2px]'>
        <img src={image.src} alt={name} />
        <span className='relative z-[2] flex h-[54px] w-[257px] shrink-0 items-start justify-start self-stretch overflow-hidden text-left text-[16px] font-semibold leading-[17.6px] text-[#1a204c]'>
          {name}
        </span>
        <div className='flex'>
          <button className='pointer z-[3] flex h-[37px] w-[182px] shrink-0 flex-nowrap items-center justify-center gap-[8px] rounded-[8px] bg-[#2a3b80] pb-[12px] pl-[24px] pr-[24px] pt-[12px] group-hover:bg-[#4065D1]'>
            <span className='font-katide-bold z-[5] text-[20px] leading-[16px] text-[#fff] group-hover:scale-0'>
              $1
            </span>
            <span className='font-katide-bold absolute hidden items-center justify-center rounded-[8px] bg-[#4065D1] text-[16px] leading-[16px] group-hover:flex'>
              <span className='text-[#fff]'>BUY NOW</span>
            </span>
          </button>
          <button className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white pb-[12px] pl-[24px] pr-[24px] pt-[12px]'>
            <img src={cartProduct.src} alt='cart'></img>
          </button>
        </div>
        <img
          src={pintCrafter.src}
          className='absolute left-[7px] top-[5px] z-[6] h-[40px] w-[40px] cursor-pointer bg-no-repeat opacity-100 group-hover:opacity-0'
        />
        <img
          src={hoverPinterest.src}
          className='absolute left-[7px] top-[5px] z-[6] h-[40px] w-[40px] cursor-pointer bg-no-repeat opacity-0 group-hover:opacity-100'
        />
        <img
          src={waCrafter.src}
          className='absolute left-[55px] top-[5px] z-[7] h-[40px] w-[40px] cursor-pointer bg-no-repeat opacity-100 group-hover:opacity-0'
        />
        <img
          src={hoverWA.src}
          className='absolute left-[55px] top-[5px] z-[7] h-[40px] w-[40px] cursor-pointer bg-no-repeat opacity-0 group-hover:opacity-100'
        />
      </div>
    </div>
  );
};

export default ProductCard;
