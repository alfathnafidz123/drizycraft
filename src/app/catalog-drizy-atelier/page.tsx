// page.tsx (SERVER)
import { CiYoutube } from '@react-icons/all-files/ci/CiYoutube';
import { FaBehance } from '@react-icons/all-files/fa/FaBehance';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaPinterest } from '@react-icons/all-files/fa/FaPinterest';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { getSeason } from '@/app/api/product/getSeason';
import { getSubCategories } from '@/app/api/product/getSubCategories';
import CatalogCrafter from '@/app/catalog-drizy-atelier/client-page';
import Link from 'next/link';
import { drizyAtelierBanner } from '~/images';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function Page() {
  const seasonalData = await getSeason().catch(() => ({ data: [] }));
  const categoryData = await getSubCategories().catch(() => ({ data: [] }));

  return (
    <main>
      <section className='flex w-full flex-col items-center'>
        <div className='font-katide-heavy tracking-[0.2em] mt-16 text-center text-[36px] text-[#1A214C]'>
          <h1 className='font-katide-heavy tracking-[0.2em]'>
            DRIZY ATELIER
          </h1>

        </div>

        <p className='font-katide-regular mt-16 max-w-[777px] text-center text-[16px] text-[#1A214C]'>
          Atelier is more than just a showcase. it's a heaven for those seeking the hottest and newest designs!
          Scroll down to discover our latest releases, fresh out of the oven, with sleek layouts, stunning visuals, and
          an unparalleled experience. Keep diving to uncover hidden treasures!
        </p>

        <div className='mb-9 mt-[55px] flex gap-5 text-[#AAAAAA]'>
          <Link href="https://www.behance.net/drizycraft" target='_blank'>
            <FaBehance className='h-10 w-10 max-md:h-5 max-md:w-5' />
          </Link>
          <Link href="https://www.facebook.com/DrizyStudio" target='_blank'>
            <FaFacebookF className='h-10 w-10 max-md:h-5 max-md:w-5' />
          </Link>
          <Link href="https://www.facebook.com/groups/drizyfreebies" target='_blank'>
            <FaUsers className='h-10 w-10 max-md:h-5 max-md:w-5' />
          </Link>
          <Link href="https://id.pinterest.com/Drizy_Studio/" target='_blank'>
            <FaPinterest className='h-10 w-10 max-md:h-5 max-md:w-5' />
          </Link>
          <Link href="https://www.instagram.com/drizy_craft/" target='_blank'>
            <FaInstagram className='h-10 w-10 max-md:h-5 max-md:w-5' />
          </Link>
          <Link href="https://www.youtube.com/@drizystudio" target='_blank'>
            <CiYoutube className='h-10 w-10 max-md:h-5 max-md:w-5' />
          </Link>
        </div>
        <img
          src={drizyAtelierBanner.src}
          alt='Drizy Atelier Banner'
          className='max-md:h-40 max-md:object-cover lg:w-full lg:object-contain'
        />
      </section>
      <ErrorBoundary>
        <CatalogCrafter
          seasonalData={seasonalData.data}
          categoryData={categoryData.data}
        />
      </ErrorBoundary>
    </main>

  );
}
