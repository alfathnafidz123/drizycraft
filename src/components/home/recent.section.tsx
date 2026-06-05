'use client';

import { lazy, useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SectionContainer from "@/components/container/sectionContainer";
const ProductSlider = lazy(() => import("@/components/slider/ProductSlider"));
import Link from "next/link";

import NextImage from "@/components/NextImage";
import { HomepageDataI } from '@/interfaces/product.interface';
import Image from 'next/image';


interface RecentProduct {
  id: string;
  title: string;
  image: string | string[];
  name: string;
}

const RecentSection = ({ product }: { product: HomepageDataI }) => {
  
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: RecentProduct;
  }>({ show: false });

  useEffect(() => {
    const viewed = localStorage.getItem("recentProducts");
    if (viewed) {
      try {
        const data: RecentProduct[] = JSON.parse(viewed);
        setRecentProducts(data);
      } catch (err) {
        console.error("Failed to parse recent products:", err);
      }
    }
  }, []);


  const handleShowDetail = (product: RecentProduct) => {
    setShowProductDetail({ show: true, product });

    setRecentProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      const updated = [product, ...prev];
      return updated.slice(0, 5);
    });
  };

  const chunkArrayWithCycledPadding = (array: RecentProduct[], size: number): RecentProduct[][] => {
    const result: RecentProduct[][] = [];
    const length = array.length;

    for (let i = 0; i < length; i += size) {
      let chunk = array.slice(i, i + size);

      // Jika chunk belum penuh, isi dengan data dari awal
      if (chunk.length < size) {
        const needed = size - chunk.length;
        chunk = chunk.concat(array.slice(0, needed));
      }

      result.push(chunk);
    }

    return result;
  };
  return (
    <>
      {recentProducts.length > 0 && (
        <SectionContainer>
          <div className="flex w-full flex-col max-md:max-w-full mt-2 mb-10 lg:mt-8 lg:mb-10 md:px-4 lg:px-0">
            <div className="font-katide-bold text-2xl text-indigo-950 px-4 lg:px-0">
              Your recent activity
            </div>
            <div className="block md:hidden mt-6">
              {recentProducts.length >= 5 ? (
                <Slider dots={true} arrows={false} className="custom-slider">
                  {chunkArrayWithCycledPadding(recentProducts, 4).map((group, pageIndex) => (
                    <div key={pageIndex}>
                      <div className="grid grid-cols-2 gap-4 px-4 md:px-4">
                        {group.map((item) => (
                          <Link
                            key={item.id + "-mobile"}
                            href={`/product/${item.title}`}
                            className="group block overflow-hidden rounded-2xl"
                          >
                            <div className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg rounded-2xl overflow-hidden">
                              <Image
                                src={Array.isArray(item.image) ? item.image[0] : item.image}
                                alt={item.name}
                                width={200}
                                height={200}
                                className="object-cover w-full h-auto rounded-2xl"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-2 lg:gap-4 lg:px-4 md:gap-2 md:grid-cols-2 md:px-2 gap-2 px-2">
                  {recentProducts.map((item) => (
                    <Link
                      key={item.id + "-mobile"}
                      href={`/product/${item.title}`}
                      className="group block overflow-hidden rounded-2xl"
                    >
                      <div className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg rounded-2xl overflow-hidden">
                        <NextImage
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.name}
                          width={240}
                          height={240}
                          className="object-cover w-full h-auto rounded-2xl"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

           
            {/* Desktop View - Grid */}
            <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-4 mt-8">
              {recentProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.title}`}
                  className="group block overflow-hidden rounded-2xl"
                >
                  <div className=" transition-all duration-300 group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg rounded-2xl overflow-hidden">
                    <NextImage
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                      width={240}
                      height={240}
                      className="object-cover w-full h-auto rounded-2xl"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      )}

    </>
  )
};

export default RecentSection;
