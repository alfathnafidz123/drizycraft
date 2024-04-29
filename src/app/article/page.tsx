import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
  FaBehance,
} from 'react-icons/fa6';

import { CiYoutube } from 'react-icons/ci';

import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

import AffiliateBanner from '@/components/AffiliateBanner';

import RelatedPost from '@/components/RelatedPost';

import {
  bannerArticle,
  articlePage,
  avatarExample,
  AssetSubscribe,
} from '~/images';

export default function Article() {
  return (
    <main>
      <section>
        <img
          src={bannerArticle.src}
          alt='Article'
          className='h-[420px] w-full'
        />

        <div className=' flex h-[64px] justify-between bg-[#EBECF5] '>
          <div className='flex pl-[48px] pt-6 text-[16px] text-[#B1B1B1]'>
            Drizy Studio
            <MdKeyboardDoubleArrowRight className='ml-1 mr-1 mt-1' />
            Post
            <MdKeyboardDoubleArrowRight className='ml-1 mr-1 mt-1' />7 Fun Facts
            About Cricut That You Likely Did Not Know
          </div>

          <div className='pr-[124px] pt-6 text-[16px] text-[#B1B1B1]'>
            Categories : / Post / Arts and Crafts
          </div>
        </div>
      </section>

      <section className='flex '>
        <section className='mb-20 ml-[48px] mt-[106px] w-[888px]'>
          <div>
            <p className='font-katide-bold text-[48px] leading-[50px]'>
              7 Fun Facts About Cricut That You Likely Did Not Know
            </p>

            <div className='flex pt-[58px] text-[#AAAAAA]'>
              <div className=' text-[12px]'>Share:</div>
              <div className='ml-[18px] mt-0.5 flex gap-3 text-[17px]'>
                <FaLinkedinIn />
                <FaFacebookF />
                <FaXTwitter />
                <FaPinterest />
                <FaInstagram />
                <FaWhatsapp />
              </div>
            </div>
          </div>

          <div className='mt-[109px] text-justify text-[#3D3D3D]'>
            <p className='  text-[16px] '>
              Hello, crafters!
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur. A nunc purus ullamcorper
              massa. Urna non rhoncus ornare id. Eget et sit nulla est cras. Leo
              sodales tincidunt facilisi tortor. Arcu lectus integer ut
              facilisis integer sed. Tincidunt rutrum lacus libero urna nisl
              mauris. Elementum cursus laoreet ac et ornare.
              <br />
              <br />
              Dignissim volutpat malesuada pellentesque leo ut magna non nam.
              Risus rhoncus condimentum arcu elit convallis. A posuere neque
              morbi diam. Condimentum volutpat venenatis ante nisi. Convallis
              interdum tellus lectus iaculis ipsum orci fringilla et. Id
              porttitor hac eu ornare velit fames. Mattis curabitur id
              scelerisque condimentum morbi auctor quis. Fames nulla in donec
              mattis eleifend mi parturient ante non. Suspendisse in diam eu
              vivamus lorem at massa. Placerat amet urna purus nisl in imperdiet
              quis luctus. Mauris semper etiam tristique cursus condimentum
              morbi feugiat integer. Ac ultrices id eget volutpat lacus.
              Venenatis natoque elementum dolor enim nunc laoreet et dui. Nunc
              senectus turpis lacinia et vitae enim duis nunc. Volutpat euismod
              suspendisse nisi ullamcorper urna. A sed elementum et congue purus
              placerat vestibulum vestibulum. Dictum id ornare turpis nec odio
              non. Et ac ultrices nullam accumsan pellentesque. Massa porta cras
              viverra suspendisse tincidunt sem nec etiam. Vel nisi diam neque
              praesent tincidunt lorem vulputate eget est.
            </p>
            <br />
            <p className='text-[32px]'>Lorem ipsum</p>
            <br />
            <p className='text-[16px]'>
              Lorem ipsum dolor sit amet consectetur. A nunc purus ullamcorper
              massa. Urna non rhoncus ornare id. Eget et sit nulla est cras. Leo
              sodales tincidunt facilisi tortor. Arcu lectus integer ut
              facilisis integer sed. Tincidunt rutrum lacus libero urna nisl
              mauris. Elementum cursus laoreet ac et ornare. Dignissim volutpat
              malesuada pellentesque leo ut magna non nam. Risus rhoncus
              condimentum arcu elit convallis. A posuere neque morbi diam.
              Condimentum volutpat venenatis ante nisi. Convallis interdum
              tellus lectus iaculis ipsum orci fringilla et. Id porttitor hac eu
              ornare velit fames. Mattis curabitur id scelerisque condimentum
              morbi auctor quis. Fames nulla in donec mattis eleifend mi
              parturient ante non. Suspendisse in diam eu vivamus lorem at
              massa. Placerat amet urna purus nisl in imperdiet quis luctus.
              Mauris semper etiam tristique cursus condimentum morbi feugiat
              integer. Ac ultrices id eget volutpat lacus. Venenatis natoque
              elementum dolor enim nunc laoreet et dui. Nunc senectus turpis
              lacinia et vitae enim duis nunc. Volutpat euismod suspendisse nisi
              ullamcorper urna. A sed elementum et congue purus placerat
              vestibulum vestibulum. Dictum id ornare turpis nec odio non. Et ac
              ultrices nullam accumsan pellentesque. Massa porta cras viverra
              suspendisse tincidunt sem nec etiam. Vel nisi diam neque praesent
              tincidunt lorem vulputate eget est.
            </p>
            <br />
            <p className='text-[32px]'>Lorem ipsum</p>
            <br />
            <p className='text-[16px]'>
              Lorem ipsum dolor sit amet consectetur. A nunc purus ullamcorper
              massa. Urna non rhoncus ornare id. Eget et sit nulla est cras. Leo
              sodales tincidunt facilisi tortor. Arcu lectus integer ut
              facilisis integer sed. Tincidunt rutrum lacus libero urna nisl
              mauris. Elementum cursus laoreet ac et ornare. Dignissim volutpat
              malesuada pellentesque leo ut magna non nam. Risus rhoncus
              condimentum arcu elit convallis. A posuere neque morbi diam.
              Condimentum volutpat venenatis ante nisi. Convallis interdum
              tellus lectus iaculis ipsum orci fringilla et. Id porttitor hac eu
              ornare velit fames. Mattis curabitur id scelerisque condimentum
              morbi auctor quis. Fames nulla in donec mattis eleifend mi
              parturient ante non. Suspendisse in diam eu vivamus lorem at
              massa. Placerat amet urna purus nisl in imperdiet quis luctus.
              Mauris semper etiam tristique cursus condimentum morbi feugiat
              integer. Ac ultrices id eget volutpat lacus. Venenatis natoque
              elementum dolor enim nunc laoreet et dui. Nunc senectus turpis
              lacinia et vitae enim duis nunc. Volutpat euismod suspendisse nisi
              ullamcorper urna. A sed elementum et congue purus placerat
              vestibulum vestibulum. Dictum id ornare turpis nec odio non. Et ac
              ultrices nullam accumsan pellentesque. Massa porta cras viverra
              suspendisse tincidunt sem nec etiam. Vel nisi diam neque praesent
              tincidunt lorem vulputate eget est.
            </p>
          </div>

          <img
            src={articlePage.src}
            alt='Article'
            className='ml-[81px] mt-[39px] h-[484px] w-[726px]'
          />

          <div className='flex justify-center'>
            <button className='mt-[32px] h-[32px] w-[314px] rounded-[49px] bg-[#E90B0B] text-[12px] text-white'>
              Download <b>Fairy Butterfly SVG</b> for free!
            </button>
          </div>

          <br />
          <p className='text-[32px]'>Lorem ipsum</p>
          <br />
          <p className='text-[16px]'>
            Lorem ipsum dolor sit amet consectetur. A nunc purus ullamcorper
            massa. Urna non rhoncus ornare id. Eget et sit nulla est cras. Leo
            sodales tincidunt facilisi tortor. Arcu lectus integer ut facilisis
            integer sed. Tincidunt rutrum lacus libero urna nisl mauris.
            Elementum cursus laoreet ac et ornare. Dignissim volutpat malesuada
            pellentesque leo ut magna non nam. Risus rhoncus condimentum arcu
            elit convallis. A posuere neque morbi diam. Condimentum volutpat
            venenatis ante nisi. Convallis interdum tellus lectus iaculis ipsum
            orci fringilla et. Id porttitor hac eu ornare velit fames. Mattis
            curabitur id scelerisque condimentum morbi auctor quis.
          </p>
          <br />
          <div className='border-1 border-b border-black ' />
          <br />
          <p className='text-[16px]'>
            Cricut is a fascinating world of creativity and endless
            possibilities. I trust that these seven fun facts about Cricut have
            provided you with valuable insights. Now, go forth and enjoy the
            wonderful world of crafting. Happy creating!
          </p>

          <div className='flex pt-[50px] text-[#AAAAAA]'>
            <div className=' text-[12px]'>Share:</div>
            <div className='ml-[18px] mt-0.5 flex gap-3 text-[17px]'>
              <FaLinkedinIn />
              <FaFacebookF />
              <FaXTwitter />
              <FaPinterest />
              <FaInstagram />
              <FaWhatsapp />
            </div>
          </div>

          <div className='mt-[91px] flex'>
            <div className='flex h-[212px] w-[570px] items-center rounded-[12px] bg-[#EBECF5]'>
              <div className='ml-[27px] flex items-center'>
                <img
                  src={avatarExample.src}
                  alt='Avatar'
                  className='h-[99px] w-[99px]'
                />
              </div>

              <div className='ml-[24px] flex w-[396px] flex-col text-[16px] text-[#808080]'>
                <p
                  style={{ textTransform: 'uppercase' }}
                  className='font-katide-bold'
                >
                  putri hendradi
                </p>
                <p>
                  I'm a craft blogger and a cat parent. I've been crafting since
                  2019. My favorite crafting projects are creating shadow boxes
                  and other layered papercut decorations. I love to share my
                  crafting journey through blogs and communities.
                </p>
              </div>
            </div>

            <div className=' ml-[90px] flex flex-col items-center justify-center text-[#AAAAAA]'>
              <div className=' text-center text-[16px]'>Follow</div>
              <div className='ml-[18px] mt-0.5 flex gap-3 text-[17px]'>
                <FaBehance />
                <FaFacebookF />
                <FaXTwitter />
                <FaPinterest />
                <FaInstagram />
                <CiYoutube />
              </div>
            </div>
          </div>
        </section>

        <section className='ml-[114px] mt-[374px] h-[1450px] w-[342px] rounded-[12px] bg-[#EBECF5] shadow-lg'>
          <div className='m-4 flex max-w-[310px] flex-col rounded-xl bg-indigo-300 px-4 pt-4 text-2xl text-black'>
            <div className='z-10 flex flex-col rounded bg-neutral-100 pb-5 pl-7 pr-3.5 pt-14'>
              <div className='self-center text-center leading-5'>
                Get <span className='font-bold'>10% off</span> your
              </div>
              <div className='self-center text-center leading-[83%]'>
                order and a
              </div>
              <div className='mt-1.5 text-center leading-5'>
                bundle of <span className='font-bold'>INSTANT</span>
              </div>
              <div className='mt-2 self-center text-center font-bold leading-[83%]'>
                FREEBIES!
              </div>
              <div className='mt-9 items-start justify-center whitespace-nowrap rounded border border-solid border-stone-300 bg-white p-2 text-sm text-zinc-800'>
                <input
                  type='email'
                  className='w-full border-none bg-transparent outline-none'
                  placeholder='Email'
                />
              </div>
              <button
                type='submit'
                className='mt-5 items-center justify-center whitespace-nowrap rounded bg-black px-16 py-4 text-center text-sm font-bold leading-5 text-white'
              >
                Subscribe
              </button>
            </div>
            <img
              loading='lazy'
              src={AssetSubscribe.src}
              className='mt-0 aspect-[1.96] w-full max-w-[248px] self-center'
            />
          </div>

          <div className='border-1 m-4 h-[305px] w-[310px] rounded-[12px] border-[#61A9FA] bg-white p-4 transition-all duration-300 ease-in-out hover:border'>
            <img
              src={articlePage.src}
              alt='Article'
              className='h-[187px] w-[280px] rounded-[6px]'
            />
            <p className='font-katide-semibold mt-6 text-[20px] text-[#1A214C]'>
              Cool Travel Destination 3D Shadow Box Designs
            </p>
          </div>

          <div className='border-1 m-4 h-[305px] w-[310px] rounded-[12px] border-[#61A9FA] bg-white p-4 transition-all duration-300 ease-in-out hover:border'>
            <img
              src={articlePage.src}
              alt='Article'
              className='h-[187px] w-[280px] rounded-[6px]'
            />
            <p className='font-katide-semibold mt-6 text-[20px] text-[#1A214C]'>
              Cool Travel Destination 3D Shadow Box Designs
            </p>
          </div>

          <div className='border-1 m-4 h-[305px] w-[310px] rounded-[12px] border-[#61A9FA] bg-white p-4 transition-all duration-300 ease-in-out hover:border'>
            <img
              src={articlePage.src}
              alt='Article'
              className='h-[187px] w-[280px] rounded-[6px]'
            />
            <p className='font-katide-semibold mt-6 text-[20px] text-[#1A214C]'>
              Cool Travel Destination 3D Shadow Box Designs
            </p>
          </div>
        </section>
      </section>

      <section className='mb-[193px]  mt-[117px]'>
        <p className='mb-[54px] ml-[48px] text-[32px] text-[#3D3D3D]'>
          Related Post
        </p>

        <div className='ml-[43px] flex'>
          <RelatedPost />
          <RelatedPost />
          <RelatedPost />
        </div>
      </section>

      <AffiliateBanner />
    </main>
  );
}
