/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { CiYoutube } from 'react-icons/ci';
import {
  FaBehance,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

import AffiliateBanner from '@/components/AffiliateBanner';
import RelatedPost from '@/components/RelatedPost';

import { ResArticleI } from '@/interfaces/article.interfaces';

import {
  articlePage,
  AssetSubscribe,
  avatarExample,
  bannerArticle,
} from '~/images';

async function getArticle(id: string) {
  const res = await fetch(
    `https://drizy-api.quadrakaryasantosa.com/crafter/article/by-id/${id}`
  );
  const article: ResArticleI = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return article;
}

export default async function Article({ params }: { params: { id: string } }) {
  const {
    data: { article },
  } = await getArticle(params.id);
  return (
    <main className='w-full max-w-full'>
      <section>
        <img
          src={article.banner ?? bannerArticle.src}
          alt={article.title}
          className='h-[420px] w-full'
        />

        <div className='flex h-16 flex-col items-center gap-2 bg-[#EBECF5] px-4 py-2 xl:flex-row xl:justify-between xl:py-6'>
          <div className='flex text-xs text-[#B1B1B1] xl:text-base'>
            Drizy Studio
            <MdKeyboardDoubleArrowRight className='ml-1 mr-1 mt-1' />
            Post
            <MdKeyboardDoubleArrowRight className='ml-1 mr-1 mt-1' />
            <div className='line-clamp-1 text-ellipsis'>{article.title}</div>
          </div>

          <div className='text-xs text-[#B1B1B1] xl:mr-44 xl:text-base'>
            Categories : / Post / {article.categories[0]}
          </div>
        </div>
      </section>

      <section className='mt-24 flex flex-col gap-28 p-4 xl:flex-row xl:justify-between xl:p-12'>
        <section className=''>
          <div>
            <h1 className='font-katide-bold text-3xl leading-9 xl:text-5xl xl:leading-[50px]'>
              7 Fun Facts About Cricut That You Likely Did Not Know
            </h1>

            <div className='mt-4 flex text-[#AAAAAA] lg:mt-14'>
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

          <div
            dangerouslySetInnerHTML={{ __html: article.description }}
            className='without-tailwind !font-katide-regular mt-10 xl:mt-24'
          />

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
          {article.author && (
            <div className='mt-[91px] flex'>
              <div className='flex h-[212px] w-[570px] items-center rounded-[12px] bg-[#EBECF5]'>
                <div className='ml-[27px] flex items-center'>
                  <img
                    src={article.author?.avatar ?? avatarExample.src}
                    alt={article.author?.name}
                    className='h-[99px] w-[99px]'
                  />
                </div>

                <div className='ml-[24px] flex w-[396px] flex-col text-[16px] text-[#808080]'>
                  <p
                    style={{ textTransform: 'uppercase' }}
                    className='font-katide-bold'
                  >
                    {article.author?.name}
                  </p>
                  <p>{article.author?.description ?? ''}</p>
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
          )}
        </section>

        <section className='rounded-[12px] bg-[#EBECF5] shadow-lg xl:max-w-[342px]'>
          <div className='m-4 flex flex-col rounded-xl bg-indigo-300 px-4 pt-4 text-2xl text-black'>
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

          <div className='border-1 m-4 h-[305px] rounded-[12px] border-[#61A9FA] bg-white p-4 transition-all duration-300 ease-in-out hover:border'>
            <img
              src={articlePage.src}
              alt='Article'
              className='h-[187px] w-full rounded-[6px]'
            />
            <p className='font-katide-semibold mt-6 text-[20px] text-[#1A214C]'>
              Cool Travel Destination 3D Shadow Box Designs
            </p>
          </div>

          <div className='border-1 m-4 h-[305px] rounded-[12px] border-[#61A9FA] bg-white p-4 transition-all duration-300 ease-in-out hover:border'>
            <img
              src={articlePage.src}
              alt='Article'
              className='h-[187px] w-full rounded-[6px]'
            />
            <p className='font-katide-semibold mt-6 text-[20px] text-[#1A214C]'>
              Cool Travel Destination 3D Shadow Box Designs
            </p>
          </div>

          <div className='border-1 m-4 h-[305px] rounded-[12px] border-[#61A9FA] bg-white p-4 transition-all duration-300 ease-in-out hover:border'>
            <img
              src={articlePage.src}
              alt='Article'
              className='h-[187px] w-full rounded-[6px]'
            />
            <p className='font-katide-semibold mt-6 text-[20px] text-[#1A214C]'>
              Cool Travel Destination 3D Shadow Box Designs
            </p>
          </div>
        </section>
      </section>

      <section className='mb-[193px] mt-[117px]'>
        <p className='text-center text-[32px] text-[#3D3D3D]'>Related Post</p>

        <div className='mx-2 mt-12 grid grid-cols-1 xl:mx-12 xl:grid-cols-3'>
          <RelatedPost />
          <RelatedPost />
          <RelatedPost />
        </div>
      </section>

      <AffiliateBanner />
    </main>
  );
}
