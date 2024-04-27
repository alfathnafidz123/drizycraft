import { bannerArticle } from '~/images';
import AffiliateBanner from '@/components/AffiliateBanner';

export default function Article() {
  return (
    <main>
      <section>
        <img src={bannerArticle.src} />
        <div className='h-[64px] bg-[#EBECF5]'></div>
      </section>

      <section className='pt-[106px] pl-[48px] pb-20'>
        <div>
          <p className='font-katide-bold text-[48px] w-[701px]'>7 Fun Facts About Cricut That You Likely Did Not Know</p>
          <div className='flex text-[12px] pt-[58px] text-[#AAAAAA]'>
            Share:
          </div>
        </div>
      </section>

      <AffiliateBanner/>
    </main>
  );
}
