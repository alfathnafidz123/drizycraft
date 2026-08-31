'use client';

import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Loader } from 'lucide-react';

import ProductCard from '@/components/ProductCard';

import { productI } from '@/interfaces/product.interface';

interface SwipeToSlideProps {
  handleShowDetail?: (product: productI) => void;
  more?: string;
}

const LIMIT = 12;
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product`;

const ProductSlider2: React.FC<SwipeToSlideProps> = ({
                                                       handleShowDetail,
                                                       more,
                                                     }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState<productI[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (pageToFetch: number, isInitial: boolean) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await fetch(
        `${API_URL}?page=${pageToFetch}&limit=${LIMIT}&sortType=Latest`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const json = await res.json();
      const newItems: productI[] = json?.data ?? json ?? [];

      setItems((prev) => (isInitial ? newItems : [...prev, ...newItems]));
      // kalau jumlah item yang didapat kurang dari LIMIT, berarti sudah halaman terakhir
      setHasMore(newItems.length === LIMIT);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, true);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, false);
  };

  return (
    <div className="slider-container">
      {/* Desktop View */}
      <div className="">
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div
                key={i}
                className="aspect-square w-full animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-sm font-normal text-red-500">
            Gagal memuat data: {error}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-sm font-normal text-gray-500">
            Belum ada produk.
          </p>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
              {items.map((item, index) => (
                <div key={item.id ?? index} className="">
                  <ProductCard
                    data={item}
                    isDragging={isDragging}
                    handleShowDetail={(data) => handleShowDetail?.(data)}
                  />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center justify-center rounded-full border border-[#4065D1] px-6 py-2 text-sm font-semibold text-[#4065D1] transition hover:bg-[#4065D1] hover:text-white disabled:opacity-60"
                >
                  {loadingMore ? (
                    <Loader className="animate-spin" size={16} />
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSlider2;