/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from 'next/image';

interface SeasonCategoriesProps {
  name: string;
  image: StaticImageData;
}
const SeasonCategories: React.FC<SeasonCategoriesProps> = ({ name, image }) => {
  return (
    <div className='group mb-4'>
      <div className='mx-2.5 flex h-[116px] w-[116px] items-center justify-center lg:h-[150px] lg:w-[150px] '>
        <img
          loading='lazy'
          src={image.src}
          alt={name}
          className='aspect-square rounded-full border-[9px] border-stone-300 transition-all hover:border-[4px] hover:border-[#FFBB3C]'
        />
      </div>
      <div className='font-katide-bold pt-1 text-center text-black decoration-2 underline-offset-[7px] group-hover:underline'>
        {name}
      </div>
    </div>
  );
};

export default SeasonCategories;
