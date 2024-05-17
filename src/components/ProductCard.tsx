/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';

import { cartProduct, hoverPinterest, hoverWA } from '~/images';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  partnerName?: string;
  price: number[];
  discountPrice?: number;
  isSale?: boolean;
  isSlider?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  partnerName,
  price,
  discountPrice,
  isSale,
  isSlider = true,
}) => {
  const router = useRouter();
  const containerClassNames = () => {
    if (!isSlider) {
      return 'group relative h-[380px] w-1/4';
    }
    if (partnerName) {
      return 'group relative my-4 h-[395px] w-[294px]';
    }
    return 'group relative my-4 h-[335px] w-[294px]';
  };

  const cardClassNames = () => {
    if (!isSlider) {
      return 'absolute left-0 top-0 flex h-[380px] w-full flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-[12px] shadow-xl transition-none hover:border-[2px]';
    }
    if (partnerName) {
      return 'absolute left-0 top-0 flex h-[395px] w-[281px] flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-[12px] shadow-xl transition-none hover:border-[2px]';
    }
    return 'absolute left-0 top-0 flex h-[335px] w-[281px] flex-col flex-nowrap items-start gap-[24px] rounded-[12px] border-[#61A9FA] bg-[#fff] p-[12px] shadow-xl transition-none hover:border-[2px]';
  };
  return (
    <>
      <div className={containerClassNames()}>
        <div className={cardClassNames()}>
          <img
            src={image}
            alt={name}
            className='h-[172px] w-[257px] rounded-[6px]'
          />
          <span className='relative z-[2] flex h-[54px] w-[257px] shrink-0 items-start justify-start self-stretch overflow-hidden text-left text-[16px] font-semibold leading-[17.6px] text-[#1a204c]'>
            {name}
          </span>
          <div className='flex w-full justify-between gap-2'>
            <button
              onClick={() => {
                router.push(`/product/${id}`);
              }}
              className='pointer z-[3] flex h-[37px] flex-grow flex-nowrap items-center justify-center gap-[8px] rounded-[8px] bg-[#2a3b80] pb-[12px] pl-[24px] pr-[24px] pt-[12px] group-hover:bg-[#4065D1]'
            >
              <span className='font-katide-bold z-[5] text-[20px] leading-[16px] text-[#fff] group-hover:scale-0'>
                ${price[0]}
              </span>
              <span className='font-katide-bold absolute hidden items-center justify-center rounded-[8px] bg-[#4065D1] text-[16px] leading-[16px] group-hover:flex'>
                <span className='text-[#fff]'>BUY NOW</span>
              </span>
            </button>
            <button className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white pb-[12px] pl-[24px] pr-[24px] pt-[12px]'>
              <img src={cartProduct.src} alt='cart'></img>
            </button>
          </div>
          {partnerName && (
            <div className='flex gap-2'>
              <p className='font-thin text-[#777777]'>
                By <span className='text-[#61A9FA]'>{partnerName}</span>
              </p>
            </div>
          )}

          <img
            src={hoverPinterest.src}
            className='absolute left-[7px] top-[5px] z-[6] h-[40px] w-[40px] cursor-pointer bg-no-repeat opacity-0 group-hover:opacity-100'
          />
          <img
            src={hoverWA.src}
            className='absolute left-[55px] top-[5px] z-[7] h-[40px] w-[40px] cursor-pointer bg-no-repeat opacity-0 group-hover:opacity-100'
          />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
