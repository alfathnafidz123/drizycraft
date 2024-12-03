'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

import TrendingTag from "@/components/tag/TrendingTag";

import { search } from "~/images";

const SearchSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/category/search/${searchValue}?category=all`)
  }

  return (
    <>
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
    </>
  )
}

export default SearchSection;