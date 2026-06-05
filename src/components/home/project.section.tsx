'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

import SectionContainer from "@/components/container/sectionContainer";
import NextImage from "@/components/NextImage";
import Image from "next/image";

import { getAllCrafter } from "@/app/api/product/getCrafter";
import { CrafterI, HomepageDataI } from "@/interfaces/product.interface";

import { bonnie, jennieg, jennieGproject, kerryb, kerryBproject, leslie, michelle, pam, projectImg1, projectLeftBg, syelmaProject, syelmav } from "~/images";


const ProjectSection = ({ homeProduct }: { homeProduct: HomepageDataI }) => {
  const [params, setParams] = useState({ page: 1, limit: 6 });
  const [crafterData, setCrafterData] = useState<CrafterI[]>([]);
  const getCrafter = async () => {
    try {
      // console.log("Fetching crafter with params:", params);
      const response = await getAllCrafter(params);
      // console.log("Crafter data response:", response);
      setCrafterData(prev => [...prev, ...response.data]);
    } catch (error) {
      // console.error("Failed to fetch crafter", error);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    getCrafter();
  }, [params.page]);
  
  return (
    <>
      <SectionContainer

        className='flex flex-col items-center justify-center pb-0 lg:pb-2 pt-[10px] text-center lg:pt-[40px]'
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 bg-white w-full px-4 lg:px-0 pt-8 pb-4 lg:py-0">
          {/* <!-- Left Panel --> */}
          <div className="col-span-1 lg:col-span-2 relative bg-[#f7f8fc] rounded-xl p-4 sm:p-6 lg:p-10 flex flex-col justify-center text-left overflow-hidden min-h-[300px] lg:min-h-[700px]">
            <div className="absolute w-full min-h-[300px] lg:min-h-[700px] overflow-hidden group rounded-xl left-0 top-0 bottom-0">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url('${projectLeftBg.src}')` }}
              />
            </div>
            <div className="relative z-10 space-y-2 sm:space-y-2 px-2 mt-5 lg:mt-0">
              <h2 className="text-[24px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-katide-bold mt-5 mb-5 lg:mt-0">
                Projects from crafters
              </h2>

              <p className="text-[16px] sm:text-[12px] md:text-[16px] font-katide-bold text-gray-600 leading-1">
                Have you tried Drizy's designs in your projects?
              </p>

              <p className="text-[16px] sm:text-base md:text-[16px] font-katide-regular text-gray-600 leading-1">
                Share your creations in our gallery and earn a 
              </p>

              <p className="text-[16px] sm:text-base md:text-[16px] font-katide-regular text-gray-600 leading-1">
                valuable Drizy Coin for more shopping!
              </p>
            </div>

            <div className="mt-24 relative">
              <div className="absolute bottom-2 right-2 flex -space-x-7">
                <NextImage
                        width={56}
                        height={56}
                        src={leslie.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-14 w-14 lg:h-14 lg:w-14'
                        classNames={{ image: 'rounded-full' }}
                        priority={false}
                        loading="lazy"
                        alt='avatar'
                      />
                <NextImage
                        width={56}
                        height={56}
                        src={michelle.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-14 w-14 lg:h-14 lg:w-14'
                        classNames={{ image: 'rounded-full' }}
                        priority={false}
                        loading="lazy"
                        alt='avatar'
                      />
                <NextImage
                        width={56}
                        height={56}
                        src={bonnie.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-14 w-14 lg:h-14 lg:w-14'
                        classNames={{ image: 'rounded-full' }}
                        priority={false}
                        loading="lazy"
                        alt='avatar'
                      />
                <NextImage
                        width={56}
                        height={56}
                        src={pam.src}
                        className='lg:-ml-6 -ml-4 rounded-full border-[3px] border-white h-14 w-14 lg:h-14 lg:w-14'
                        classNames={{ image: 'rounded-full' }}
                        priority={false}
                        loading="lazy"
                        alt='avatar'
                      />
              </div>
            </div>

            <Link
              href="/project"
              className="group mt-20 mb-4 w-full relative bg-[#1A214C] text-white font-katide-bold rounded-full h-14 flex items-center justify-between px-10 gap-2 hover:bg-[#4065D1] transition"
            >
              <span className="z-10 text-[20px]">Upload your project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 right-0 absolute bg-[#2A3B80] rounded-full p-3 text-white group-hover:bg-[#4065D1] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0L8 8m4-4l4 4"
                />
              </svg>
            </Link>
          </div>

          {/* <!-- Right Grid of Images --> */}
          <div className="col-span-1 lg:col-span-3 grid-cols-2 gap-4 hidden lg:grid">
            {/* Card 1 */}
            <div className="relative rounded-xl overflow-hidden shadow group">
              <Image
                src={jennieGproject.src}
                alt="Project 1"
                fill
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl text-sm text-gray-800 shadow flex items-center gap-2 h-[70px]">
                <NextImage
                  src={jennieg.src}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  classNames={{ image: "rounded-full object-cover" }}
                />
                <span className="font-katide-regular">By <strong>JennieG</strong></span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative rounded-xl overflow-hidden shadow group">
              <Image
                src={kerryBproject.src}
                alt="Project 1"
                fill
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl text-sm text-gray-800 shadow flex items-center gap-2 h-[70px]">
                <NextImage
                  src={kerryb.src}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  classNames={{ image: "rounded-full object-cover" }}
                />
                <span className="font-katide-regular">By <strong>KerryB</strong></span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative rounded-xl overflow-hidden shadow group">
              <Image
                src={projectImg1.src}
                alt="Project 1"
                fill
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl text-sm text-gray-800 shadow flex items-center gap-2 h-[70px]">
                <NextImage
                  src={kerryb.src}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  classNames={{ image: "rounded-full object-cover" }}
                />
                <span className="font-katide-regular">By <strong>KerryB</strong></span>
              </div>
            </div>
            {/* Card 4 */}
            <div className="relative rounded-xl overflow-hidden shadow group">
              <Image
                src={syelmaProject.src}
                alt="Project 1"
                fill
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl text-sm text-gray-800 shadow flex items-center gap-2 h-[70px]">
                <NextImage
                  src={syelmav.src}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  classNames={{ image: "rounded-full object-cover" }}
                />
                <span className="font-katide-regular">By <strong>syelma</strong></span>
              </div>
            </div>
          </div>
        </div>
        {/* Dekstop View  */ }
        <div className="hidden lg:block w-full py-4 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {crafterData.slice(0, 5).map((item, index) => (
                <Image
                  key={index}
                  src={item.imageUrl}
                  alt={`Project ${index + 1}`}
                  width={400}
                  height={400}
                  className="object-cover aspect-square w-full h-auto rounded-2xl"
                />
            ))}
          </div>
        </div>
        {/* Mobile View  */ }
        <div className="lg:hidden block w-full bg-white px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {crafterData.slice(0, 6).map((item, index) => (
              <Image
                key={index}
                src={item.imageUrl}
                alt={`Project ${index + 1}`}
                width={320}
                height={320}
                className="object-cover aspect-square w-full h-auto rounded-2xl"
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default ProjectSection;
