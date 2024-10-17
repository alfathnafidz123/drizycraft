/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface SeasonCategoriesProps {
  name: string;
  image: StaticImageData;
}
const SeasonCategories: React.FC<SeasonCategoriesProps> = ({ name, image }) => {
  return (
    <Link
      href={`/category/${name}`}
      aria-label={`product-season-${name}`}
      id={`product-season-${name}`}
      className='group mb-4'
    >
      <div className='flex h-[116px] w-[116px] items-center justify-center lg:h-[150px] lg:w-[150px]'>
        <img
          loading='lazy'
          src={image.src}
          alt={name}
          className='aspect-square rounded-full border-[9px] border-stone-300 transition-all hover:scale-[1.1] hover:border-[4px] hover:border-[#FFBB3C]'
        />
      </div>
      <div className='font-katide-bold pt-1 text-center text-black decoration-2 underline-offset-[7px] group-hover:underline'>
        {name}
      </div>
    </Link>
  );
};

export default SeasonCategories;
