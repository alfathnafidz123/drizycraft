'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

import SectionContainer from "@/components/container/sectionContainer";
import ModalProduct from "@/components/modals/product";
import SaleProductCard from "@/components/SaleProductCard";
import TrendingTag from "@/components/tag/TrendingTag";

import { HomepageDataI, productI } from "@/interfaces/product.interface";

import { bonnie, gridCrafter, leslie, michelle, pam, search, starBadge } from "~/images";

const JumbotronSection = ({ homeProduct }: { homeProduct: HomepageDataI }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/category/search/${searchValue}?category=all`)
  }

  return (
    <>
      <SectionContainer
        bgColor='#C2E5FF'
        className='flex flex-col items-center justify-center pb-10 pt-[30px] text-center lg:pt-[67px]'
      >
        <div className='font-katide-heavy mb-16 text-[30px] leading-[120%] text-indigo-950 lg:text-[64px]'>
          <p>Combating Loneliness</p>
          <p>with Creative Projects</p>
        </div>
        <form onSubmit={handleSearch} className='group mb-4 hidden h-[60px] w-[480px] items-center gap-4 rounded-full border border-solid border-blue-500 border-opacity-25 bg-[#F1F2FB] p-4 pl-6 text-left text-sm font-normal leading-4 text-[#6F6F6F] focus-within:bg-white lg:flex'>
          <input
            placeholder='Search for unique craft designs, categories, occasions...'
            className='!focus:border-none !focus:outline-none flex-grow truncate border-none bg-transparent text-sm tracking-wide !outline-none placeholder:tracking-wide placeholder:text-[#6F6F6F] focus:ring-0'
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          ></input>
          <button type="submit" className='flex rounded-full bg-[#008ECC]'>
            <img
              src={search.src}
              className='w-[32px] flex-grow transition-opacity duration-300 group-hover:w-0 group-hover:opacity-0'
              alt='search'
            />
            <div className='w-0 overflow-hidden transition-all duration-300 group-hover:w-[80px]'>
              <p className='px-4 py-2 text-center text-white'>Search</p>
            </div>
          </button>
        </form>
        <div className='flex flex-col items-center gap-2.5 lg:flex-row'>
          <p className='font-katide-bold text-[10px] text-[#008ECC]'>
            Trending:
          </p>
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <TrendingTag name='Shadow Box Svg' onClick={() => setSearchValue("Shadow Box Svg")} />
            <TrendingTag name='Laser cut' onClick={() => setSearchValue("Laser cut")} />
            <TrendingTag name='Sublimation' onClick={() => setSearchValue("Sublimation")} />
            <TrendingTag name='Free Svg' onClick={() => setSearchValue("Free Svg")} />
            <TrendingTag name='Papercut' onClick={() => setSearchValue("Papercut")} />
          </div>
        </div>
        <div className='h-76 mt-20 w-screen px-4 lg:w-full'>
          <div className='flex w-full flex-col gap-4 lg:h-[300px] lg:flex-row'>
            <div className='group relative z-[10] h-[224px] w-full rounded-2xl border-[20px] border-[#61A9FA] transition-all duration-300 hover:border-[#2A3B80] lg:h-full lg:w-5/12'>
              <div className='absolute h-full w-full bg-[#61A9FA] transition-all duration-300 group-hover:bg-[#2A3B80]' />
              <img
                src={gridCrafter.src}
                className='absolute h-full w-full rounded-xl bg-cover object-cover'
                alt='Crafter'
              />
              <div className='absolute flex h-full w-full flex-col justify-between rounded-2xl  bg-opacity-15 p-4 text-left hover:bg-[#2A3B80]/50 hover:bg-opacity-35'>
                <p className='font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100'>
                  <span className='block font-semibold'>
                    Have you tried Drizy's designs in your projects?
                  </span>
                  Share your creations in our gallery and and earn a valuable
                  Drizy Coin for more shopping!
                </p>
                <div className='relative w-full overflow-hidden'>
                  <Link
                    href='/project'
                    className='absolute bottom-0 flex h-full w-full translate-y-full cursor-pointer items-center justify-between rounded-full bg-[#1A214C] pl-4 transition-all duration-300 ease-in-out group-hover:-translate-y-0'
                  >
                    <p className='text-2xl text-white'>Upload Your Project</p>
                    <div className='flex h-full w-16 items-center justify-center rounded-full bg-[#2A3B80]'>
                      <FiUpload className='h-8 w-8 stroke-[3px] text-white' />
                    </div>
                  </Link>
                  <div className='flex w-full items-center justify-between transition-all duration-300 ease-in-out group-hover:-translate-y-full'>
                    <p className='w-1/2 text-lg font-semibold lg:text-2xl'>
                      Projects from crafters
                    </p>
                    <div className='flex'>
                      <img
                        src={leslie.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                      <img
                        src={michelle.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                      <img
                        src={bonnie.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                      <img
                        src={pam.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-10 w-10 lg:h-14 lg:w-14'
                        alt='avatar'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 flex h-[310px] w-full flex-col gap-[20px] lg:mt-0 lg:h-full lg:w-4/12'>
              <div className='group relative h-1/2 overflow-hidden rounded-[24px] bg-[#61A9FA] transition-all duration-300 hover:bg-[#4065D1]'>
                {/* <div className='absolute flex h-full w-[140px]'>
                  <div className='z-10 h-full w-full translate-y-full rounded-3xl bg-[#2A3B80] transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:transform'></div>
                </div> */}
                <div className='absolute flex h-full w-full items-center justify-between'>
                  <div className='flex h-full w-[140px] flex-col items-center justify-center'>
                    <div className='h-full w-full rounded-3xl bg-[#4065D1] p-2 relative'>
                      <div className='relative z-20 flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#FFBB3C]'>
                        <img
                          src={starBadge.src}
                          alt='star badge'
                          className='transition-all duration-300 group-hover:scale-110'
                        />
                      </div>
                      <div className='transition-all absolute opacity-0 bottom-0 left-0 w-[140px] h-full scale-y-0 origin-[bottom_center] rounded-3xl bg-[#2A3B80] group-hover:transform group-hover:scale-y-100 group-hover:opacity-100' />
                    </div>
                  </div>
                  <div className='flex h-[120px] w-auto flex-col items-center justify-start overflow-hidden text-white'>
                    <div className='flex w-full  items-center justify-center pt-4 text-8xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                      14
                    </div>
                    <div className='flex w-full translate-y-1/2 items-center justify-center pt-4 text-8xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                      14
                    </div>
                  </div>
                  <div className='flex w-auto flex-col items-start justify-start pr-2 text-left text-white'>
                    <div className='flex h-[25px] w-full flex-col items-center justify-start overflow-hidden text-white'>
                      <div className='p flex w-full items-center justify-start text-2xl font-bold tracking-wide transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Exclusive
                      </div>
                      <div className='p flex w-full translate-y-1/2 items-center justify-start text-2xl font-bold tracking-wide text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Exclusive
                      </div>
                    </div>
                    <div className='flex h-[25px] w-full flex-col items-center justify-start overflow-hidden text-white'>
                      <div className='p flex w-full items-center justify-start text-2xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Partners
                      </div>
                      <div className='p flex w-full translate-y-1/2 items-center justify-start text-2xl font-bold text-[#FFBB3C] transition-transform duration-300 ease-in-out group-hover:-translate-y-full'>
                        Partners
                      </div>
                    </div>
                    <div className='relative mt-3 overflow-hidden py-0 transition-all group-hover:rounded-full group-hover:px-1'>
                      <div className='absolute inset-0 z-10 translate-y-full scale-0 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:-translate-y-1/4 group-hover:scale-150'></div>
                      <p className='relative z-20 text-[10pt] font-light group-hover:text-[#4065D1]'>
                        Find out more!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='group relative col-span-3 col-start-4 row-span-1 row-start-2 h-1/4 rounded-3xl bg-[#6f82a6] lg:h-1/2'>
                <div className='absolute flex h-full w-full flex-row items-center justify-center gap-2 p-3 text-white transition-all duration-300 lg:flex-col lg:items-start lg:gap-5 lg:px-5 lg:py-5 lg:group-hover:opacity-0'>
                  <div className='flex-grow text-start'>
                    <p className='text-base font-semibold lg:text-xl'>
                      The Craft Community
                    </p>
                    <p className='text-xs lg:text-sm'>
                      21,000+ friendly home crafters
                    </p>
                  </div>
                  <div className='lg:flex lg:w-full lg:items-center'>
                    <div className='hidden lg:flex'>
                      <img
                        src={bonnie.src}
                        className='h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                      <img
                        src={michelle.src}
                        className='-ml-4 h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                      <img
                        src={pam.src}
                        className='-ml-4 h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                      <img
                        src={leslie.src}
                        className='-ml-4 h-[36px] rounded-full border-[3px] border-[#D2FF3A]'
                        alt='avatar'
                      />
                    </div>
                    <Link
                      href="https://www.facebook.com/groups/507583644200287/?ref=share_group_link"
                      target='__blank'
                      id='join-community'
                      aria-label='Request join community'
                      className='flex justify-center rounded-full bg-[#55668c] p-3 text-[10px] lg:ml-7 lg:px-3.5 lg:py-3 lg:text-xs'
                    >
                      Click here to request to join!
                    </Link>
                  </div>
                </div>
                <div className='absolute hidden h-full w-full flex-col items-start justify-center gap-2 px-5 py-5 text-white opacity-0 transition-all duration-300 hover:opacity-100 group-hover:opacity-100 lg:flex'>
                  <p className='font-katide-light text-left text-xs font-light italic tracking-wide'>
                    Before anything, why not join the{' '}
                    <span className='font-katide-semibold'>
                      Drizy Studio community on Facebook
                    </span>
                    , a group of 21,000+ friendly home crafters who are all
                    there to help each other succeed & get free product updates
                  </p>
                  <Link
                    href="https://www.facebook.com/groups/507583644200287/?ref=share_group_link"
                    target='__blank'
                    id='join-community-2'
                    aria-label='Request Join Community'
                    className='flex justify-center self-center rounded-full bg-[#61A9FA] p-2 text-indigo-950 transition-all duration-500 hover:bg-indigo-950 hover:text-white'
                  >
                    Click here to request to join!
                  </Link>
                </div>
              </div>
            </div>
            {homeProduct?.bestSellerData[0] &&
              <SaleProductCard
                handleShowDetail={(data) =>
                  setShowProductDetail({ show: true, product: data })
                }
                data={homeProduct.bestSellerData[0]}
              />
            }
          </div>
        </div>
      </SectionContainer>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </>
  )
}

export default JumbotronSection;