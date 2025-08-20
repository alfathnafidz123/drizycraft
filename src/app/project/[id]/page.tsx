/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import axios, { AxiosError } from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

import AffiliateBanner from '@/components/AffiliateBanner';
import LoadingComponent from '@/components/Loading';
import NextImage from '@/components/NextImage';

import {
  MetaProductI,
  OrderI,
  productI,
  ReviewI
} from '@/interfaces/product.interface';
import { CrafterI } from '@/interfaces/crafter.interfaces';
import {
  cartProduct,
  defaultAvatar,
  dgroupBanner, difficultyLevel, materialUsed,
  operationType,
  projectLike,
  projectPinterest,
  projectShare1, totalTime
} from '~/images';
import Link from 'next/link';
import { FaArrowUpRightFromSquare } from '@react-icons/all-files/fa6/FaArrowUpRightFromSquare';
import { FaArrowDown } from 'react-icons/fa';

export interface StarSummary {
  average: number
  one: number
  two: number
  three: number
  four: number
  five: number
}

interface ModalProps {
  onClick: () => void;
  onLike: (id: string) => void;
  item: CrafterI;
}

enum OperationType {
  Cut = "Cut",
  Draw = "Draw",
  Print = "Print",
  CutnDraw = "CutnDraw",
  Engrave = "Engrave",
  Embroidery = "Embroidery",
}

const operationTypes = [
  { value: OperationType.Cut, label: "Cut" },
  { value: OperationType.Draw, label: "Draw" },
  { value: OperationType.Print, label: "Print" },
  { value: OperationType.CutnDraw, label: "Cut & Draw" },
  { value: OperationType.Engrave, label: "Engrave" },
  { value: OperationType.Embroidery, label: "Embroidery" },
];

enum MaterialType {
  Paper = "Paper",
  Cardstock = "Cardstock",
  Vinyl = "Vinyl",
  Wood = "Wood",
  Acrylic = "Acrylic",
  Acetate = "Acetate",
  PaperMotif = "PaperMotif",
  Chipboard = "Chipboard",
  CrepePaper = "CrepePaper",
  FauxLeather = "FakeLeather",
}

const materialTypes = [
  { value: MaterialType.Paper, label: "Paper" },
  { value: MaterialType.Cardstock, label: "Cardstock" },
  { value: MaterialType.Vinyl, label: "Vinyl" },
  { value: MaterialType.Wood, label: "Wood" },
  { value: MaterialType.Acrylic, label: "Acrylic" },
  { value: MaterialType.Acetate, label: "Acetate" },
  { value: MaterialType.PaperMotif, label: "Paper Motif" },
  { value: MaterialType.Chipboard, label: "Chipboard" },
  { value: MaterialType.CrepePaper, label: "Crepe Paper" },
  { value: MaterialType.FauxLeather, label: "Faux Leather" },
];

export default function Register() {
  const params = useParams();
  const [type, setType] = useState(0);
  const [productData, setProductData] = useState<CrafterI>();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const searchParams = useSearchParams();
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter/${params.id}`
        // `http://localhost:3001/crafter/${params.id}`
      );
      const product = response.data.data;

      setProductData(product);
      // console.log('respon', product);

    } catch (error) {
      toast('Error when trying to get all products');
    }
  };

  const token = localStorage.getItem("user_token");

  const onLike = async () => {
    // 1. Optimistic UI update
    setProductData((prev) => ({
      ...(prev ?? { likeCount: 0 } as CrafterI),
      likeCount: (prev?.likeCount ?? 0) + 1,
    }));

    try {
      // 2. Simpan ke database
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter/like`,
        { crafterId: productData?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      // Ambil pesan error dari backend
      const backendMessage =
        error.response?.data?.message || "Gagal menyimpan like";
      toast.error(backendMessage);

      // rollback jumlah like
      setProductData((prev) => ({
        ...prev!,
        likeCount: (prev?.likeCount ?? 1) - 1,
      }));
    }
  };

  console.log(productData)

  useEffect(() => {
    getProduct();
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  const handleClick = (index: React.SetStateAction<number>) => {
    setActiveStep(index);
  };

  return productData ? (
    <>
      <main>
        <section className='mx-auto flex w-full max-w-[1164px] flex-col gap-12 max-md:p-2 lg:pt-16 lg:pb-8'>
          <div className='grid gap-4 lg:grid-cols-8 px-4 lg:px-0 mb-4'>
            <div className='flex flex-col gap-4 lg:col-span-5'>
              <div className='grid grid-cols-1 lg:grid-cols-8'>
                <div className='max-w-full max-md:overflow-scroll lg:order-first order-last'>

                </div>
                {productData && (
                  <div className='w-full relative order-first lg:col-span-7 mb-4'>
                    <NextImage
                      src={productData.imageUrl}
                      alt='Product'
                      width={724}
                      height={300}
                      quality={70}
                      className='order-first w-full rounded-xl object-cover lg:order-last'
                      classNames={{
                        image: 'w-full rounded-xl object-cover'
                      }}
                      useSkeleton
                      priority={true}
                      loading='eager'
                    />
                    {/*<button onClick={() => {*/}
                    {/*  if (selectedImage !== productData.imageUrl.length - 1) {*/}
                    {/*    setSelectedImage(prev => prev + 1);*/}
                    {/*  }*/}
                    {/*}} className='absolute right-5 top-1/3 z-10 bg-black/40 p-2 rounded-full'>*/}
                    {/*  <IoChevronForward className='text-white w-6 h-6' />*/}
                    {/*</button>*/}
                    {/*<button onClick={() => {*/}
                    {/*  if (selectedImage !== 0) {*/}
                    {/*    setSelectedImage(prev => prev - 1);*/}
                    {/*  }*/}
                    {/*}} className='absolute left-5 top-1/3 z-10 bg-black/40 p-2 rounded-full'>*/}
                    {/*  <IoChevronBack className="text-white w-6 h-6" />*/}
                    {/*</button>*/}
                    <div className='mt-10 text-[14px] hidden lg:block'>
                      <div className='font-katide-bold text-xl mb-3 text-[#61657D]'>Information </div>
                      <div className='font-katide-regular text-sm mb-3 text-[#61657D]'>{productData.description} </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start gap-2 lg:col-span-3 lg:pl-6'>
              <div className='flex items-center text-[14px] text-[#1A204C]'>
                <img
                  loading='lazy'
                  src={productData.user.avatar ?? defaultAvatar.src}
                  className='w-10 h-10 rounded-full mr-3'
                />
                <div className='font-katide-regular'>By</div>
                <div className='font-katide-bold text-xl ms-1'>{productData?.user?.displayName}</div>
              </div>
              <p className='font-katide-medium mt-1 text-[#61657D]'>
                {new Date(productData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className='mt-4 lg:mt-10 w-full'>
                <div className='font-katide-bold text-xl ms-1 mb-3 text-[#61657D]'>Design File </div>
                <div className="rounded-xl border w-full">
                  {Array.isArray(productData?.product) &&
                    productData.product.map((item) => {
                      const title = item.meta?.[0]?.title ?? ""; // fallback kosong kalau nggak ada
                      return (
                        <a
                          key={item.id}
                          href={`/product/${title}`}
                          className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <span className="text-[#1A214C] font-katide-semibold">{item.name}</span>
                          <FaArrowUpRightFromSquare className="text-[#61A9FA]" />
                        </a>
                      );
                    })}

                  {Array.isArray(productData?.breezy) && productData.breezy.map(item => (
                    <a
                      key={item.id}
                      href={`https://breezy.drizycraft.com?token=${token}&search=${encodeURIComponent(item.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <span className="text-[#1A214C] font-katide-semibold">{item.title}</span>
                      <FaArrowUpRightFromSquare className='text-[#61A9FA]' />
                    </a>
                  ))}
                </div>
                <div className='mt-5 flex gap-5 text-center '>
                  <div
                    className='flex w-[39px] flex-col'
                    onClick={onLike}
                  >
                    <div className=' flex h-[40px] flex-col items-center rounded-full bg-[#A5272B] pt-1 hover:bg-[#872A2D]'>
                      <div className='flex h-[40px] flex-col items-center justify-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'>
                        <img
                          loading='lazy'
                          src={projectLike.src}
                          className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
                        />

                      </div>
                    </div>
                    <div className=' font-katide-bold text-xs text-indigo-950'>
                      <a className='font-katide-bold text-xs mr-1'>
                        {productData && productData.likeCount > 0 ? productData.likeCount : ''}
                      </a>
                      Like
                    </div>
                  </div>
                  <div className='flex w-[39px] flex-col'>
                    <Link href={`https://pinterest.com/pin/create/button/?description=${productData?.description}&url=${process.env.NEXT_PUBLIC_URL}/project?id=${productData?.id}&media=${productData?.imageUrl}`} target='_blank' className=' flex h-[39px] items-center rounded-full bg-[#A5272B] hover:bg-[#872A2D]'>
                      <img
                        loading='lazy'
                        src={projectPinterest.src}
                        className='mx-auto h-[20px] transition-all duration-300 hover:scale-110'
                      />
                    </Link>
                    <div className=' font-katide-bold text-xs text-indigo-950'>
                      Share
                    </div>
                  </div>
                </div>
                <div className='mt-10 text-[14px] lg:hidden block'>
                  <div className='font-katide-bold text-xl mb-3 text-[#61657D]'>Information </div>
                  <div className='font-katide-regular text-sm mb-3 text-[#61657D]'>{productData.description} </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='flex flex-col gap-8 bg-[#EBECF5] max-md:p-2 lg:py-16'>
          <div className='mx-auto w-full max-w-[1164px] flex-col gap-4 lg:grid lg:grid-cols-4 px-4 lg:px-0'>
            {productData?.steps?.length > 0 && (
              <>
                <div className='col-span-3 flex flex-col gap-8'>
                  <p className='font-katide-bold mt-4 text-base text-[#1A214C] lg:mt-0 lg:text-[24px]'>
                    Instruction
                  </p>
                  <div className="space-y-6 mb-4">
                    {productData?.steps?.map((item, i) => (
                      <>
                      <div key={i} id={item.stepsNumber.toString()} className="flex flex-col lg:flex-row items-start lg:items-start space-y-4 lg:space-y-0 lg:space-x-4 relative pb-5">

                        {/* Nomor step + garis */}
                        <div className="relative flex flex-col items-center mb-2 lg:mb-0">
                          {/* Lingkaran nomor */}
                          <div className="w-8 h-8 rounded-full bg-[#1A214C] text-white flex items-center justify-center font-bold z-10">
                            {item.stepsNumber}
                          </div>
                        </div>

                        {/* Gambar + Deskripsi */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-start space-y-4 lg:space-y-0 lg:space-x-4 flex-1 w-full">
                          {/* Gambar */}
                          {item.imageUrl && (
                            <Image
                              src={item.imageUrl}
                              alt={`Step ${item.stepsNumber}`}
                              width={384}   // sesuai lg:w-96 (96 * 4 = 384px)
                              height={288}  // sesuai h-72 (72 * 4 = 288px)
                              className="w-full lg:w-96 h-72 object-cover rounded-lg mr-3"
                            />
                          )}

                          {/* Deskripsi */}
                          <p className="text-sm font-katide-regular text-[#61657D] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className='col-span-3 flex flex-col mt-1 mb-3 w-full border-t-2 border-[#1A214C]/15' />
                      </>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col pl-3 lg:block hidden">
                  <p className="font-bold text-base text-[#1A214C] mb-4">Instruction</p>
                  <div className="relative flex flex-col items-start">
                    {productData?.steps?.map((step, index) => {
                      const isActive = activeStep === index;
                      const handleClickStep = (
                        i: React.SetStateAction<number>
                      ) => {
                        setActiveStep(i); // update activeStep jika perlu
                        const element = document.getElementById(
                          step.stepsNumber.toString()
                        );
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                        }
                      };

                      return (
                        <button
                          key={index}
                          onClick={() => handleClickStep(index)}
                          className="flex items-stretch gap-3 relative z-10"
                        >
                          <div
                            className={`w-1 flex-1 border ${isActive ? "bg-[#1A214C] text-white border-[#1A214C]" : "bg-gray-300 text-gray-600 border-gray-300"}`}
                          ></div>
                          <span
                            className={`text-sm flex items-center my-2 ${
                              isActive ? "text-[#1A214C] font-semibold" : "text-gray-500"
                            }`}
                          >
        Step {step.stepsNumber}
      </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <div className='col-span-3 flex flex-col gap-8'>
              <p className='font-katide-bold mt-6 text-base text-[#1A214C] lg:mt-0 lg:text-[24px]'>
                Production
              </p>
              <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl w-full">
                <div className="rounded-2xl border w-full">
                  <div className='flex items-center border-b last:border-b-0'>
                    <div className='border-r px-3 py-3 gap-2 w-2/5 lg:w-1/4'>
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#61657D]">
                        <NextImage
                          src={operationType}
                          alt="Operation Type"
                          width={15}
                          height={15}
                        />
                        Operation Type
                      </h2>
                    </div>
                    <div className='ms-3 px-3 py-3 w-auto'>
                      <div className="flex items-center gap-2">
                        {productData?.operation && productData.operation.length > 0 ? (
                          productData.operation.map((item, i) => {
                            const opLabel = operationTypes.find(op => op.value === item)?.label || item;
                            return (
                              <p
                                key={i}
                                className="text-sm font-katide-semibold text-[#61657D] border border-[#1A214C]/15 rounded-lg px-2"
                              >
                                {opLabel}
                              </p>
                            );
                          })
                        ) : (
                          <p className="text-sm font-katide-semibold text-[#61657D] rounded-lg px-2">
                            -
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center border-b last:border-b-0'>
                    <div className='border-r px-3 py-3 gap-2 w-2/5 lg:w-1/4'>
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#61657D]">
                        <NextImage
                          src={materialUsed}
                          alt="Operation Type"
                          width={15}
                          height={15}
                        />
                        Material Used
                      </h2>
                    </div>
                    <div className='ms-3 px-3 py-3 w-auto'>
                      <div className="flex items-center gap-2">
                        {productData?.material && productData.material.length > 0 ? (
                          productData.material.map((item, i) => {
                            const opLabel = materialTypes.find(op => op.value === item)?.label || item;
                            return (
                              <p
                                key={i}
                                className="text-sm font-katide-semibold text-[#61657D] border border-[#1A214C]/15 rounded-lg px-2"
                              >
                                {opLabel}
                              </p>
                            );
                          })
                        ) : (
                          <p className="text-sm font-katide-semibold text-[#61657D] rounded-lg px-2">
                            -
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                  <div className='flex items-center border-b last:border-b-0'>
                    <div className='border-r px-3 py-3 gap-2 w-2/5 lg:w-1/4'>
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#61657D]">
                        <NextImage
                          src={difficultyLevel}
                          alt="Operation Type"
                          width={15}
                          height={15}
                          style={{ width: '15px', height: '15px' }} // ukuran fix
                          className="flex-shrink-0" // jangan mengecil di flex container
                        />
                        Difficulty Level
                      </h2>
                    </div>
                    <div className='ms-3 px-3 py-3 w-auto'>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-katide-semibold text-[#61657D] px-2">
                          {productData.difficulty ? `${productData.difficulty}` : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center border-b last:border-b-0'>
                    <div className='border-r px-3 py-3 gap-2 w-2/5 lg:w-1/4'>
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-[#61657D]">
                        <NextImage
                          src={totalTime}
                          alt="Operation Type"
                          width={15}
                          height={15}
                        />
                        Total Time
                      </h2>
                    </div>
                    <div className='ms-3 px-3 py-3 w-auto'>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-katide-semibold text-[#61657D] px-2">
                          {productData.time ? `${productData.time} min` : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full items-center justify-center pt-20 lg:px-40 px-4 mb-4'>
            <a href="https://www.facebook.com/groups/drizyfreebies" className='h-[200px] lg:h-auto' target="_blank" rel="noopener noreferrer">
              <img className='b rounded-[20px] object-cover h-full' alt='dgroup banner'
                   src={dgroupBanner.src} loading='lazy' />
            </a>
          </div>
        </section>
        <AffiliateBanner />
      </main>
    </>
  ) : <LoadingComponent />;
}
