'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import type { Key } from 'react';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

type Craft = {
  id: Key | null | undefined;
  productUrl: string | StaticImport;
  title: string;
};

const BreezySection = () => {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("user_token");

  useEffect(() => {
    const fetchCrafts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://api.drizycraft.com/crafter/dump/free?page=1&limit=8&sortType=Latest&isFavorite=All'
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const json = await res.json();
        const items = json?.data ?? json ?? [];
        setCrafts(items.slice(0, 8));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCrafts();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="mx-auto w-full overflow-hidden lg:min-h-[400px] lg:max-w-[1164px] px-4 lg:px-0">
        <div className="flex flex-col pb-10 lg:pb-0 pt-2 font-bold">
          <div className="mb-4 mt-4 flex max-w-[1164px] items-center justify-between">
            <div className="flex items-center justify-center font-katide-bold text-[24px] leading-10 text-indigo-950">
              Drizy Breezy
              <span className="ms-2 bg-[#EE4C73] text-white text-[10px] font-katide-medium px-1.5 py-[5px] rounded-full leading-none shadow-sm">
                NEW !
              </span>
            </div>
            <Link
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_BREEZY_URL}?token=${token}`}
              target="_blank"
              className="cursor-pointer flex-row gap-3 text-right text-base font-bold leading-none text-[#4065D1] flex"
            >
              <div>See All Design</div>
              <FaAngleRight />
            </Link>
          </div>

          <div className="lg:h-auto">
            {loading && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-full animate-pulse rounded-xl bg-gray-200"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <p className="text-sm font-normal text-red-500">
                Failed to load data
              </p>
            )}

            {!loading && !error && crafts.length === 0 && (
              <p className="text-sm font-normal text-gray-500">
                No Data
              </p>
            )}

            {!loading && !error && crafts.length > 0 && (
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 mb-6'>
                {crafts.map(
                  (craft: {
                    id: Key | null | undefined;
                    productUrl: string | StaticImport;
                    title: string;
                  }) => (
                    <div
                      key={craft.id}
                      className="flex flex-col items-center gap-2 shadow-lg rounded-xl border border-gray-200 p-3"
                    >
                      <div
                        className="relative aspect-square w-full select-none overflow-hidden rounded-lg bg-white"
                        onContextMenu={(e) => e.preventDefault()} // blok klik kanan
                        onDragStart={(e) => e.preventDefault()} // blok drag
                      >
                        <Image
                          src={craft.productUrl}
                          alt={craft.title}
                          fill
                          draggable={false}
                          className="pointer-events-none object-contain" // blok interaksi langsung ke <img>
                          unoptimized
                        />
                        {/* layer transparan di atas gambar — sekaligus jadi penangkap klik kiri */}
                        <div
                          onClick={() => {
                            window.open(
                              `${process.env.NEXT_PUBLIC_BREEZY_URL}?token=${token}`,
                              '_blank'
                            );
                          }}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                          className="absolute inset-0 z-10 cursor-pointer"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreezySection;