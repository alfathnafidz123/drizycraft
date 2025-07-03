'use client';

import { lazy, useCallback, useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = lazy(() => import("@/components/slider/ProductSlider"));
import { useParams } from "next/navigation";
import Slider from "react-slick";
import { toast } from "react-toastify";

import SectionContainer from "@/components/container/sectionContainer";
import NextImage from "@/components/NextImage";

import { getRelevantProduct, SortType } from "@/app/api/product/getProduct";
import { productI } from "@/interfaces/product.interface";

const HandPickedSection = ({ product }: { product: productI[] }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [selectedSeasonsOption, setSelectedSeasonsOption] = useState('');
  const [selectedShortByOption, setSelectedShortByOption] = useState<SortType>(
      SortType.Latest
    );

  const [productList, setProductList] = useState<productI[]>([]);
  const getProduct = useCallback(async () => {
    try {
      setLoading(true);

      // Ambil childSubCategory dari localStorage
      const allChildSubCategory = JSON.parse(localStorage.getItem("childSubCategory") || '[]') as string[];

      console.log('🔎 Fetching products with:', {
        childSubCategory: allChildSubCategory,
        sortType: selectedShortByOption,
      });

      // Ambil produk terbaru yang sudah dilihat dari localStorage
      const storedRecent = localStorage.getItem("recentProducts");
      const recent = storedRecent ? JSON.parse(storedRecent) : [];

      // Ambil daftar product ID dari recentProducts
      const recentProductIds = recent.map((item: any) => item.product?.id).filter(Boolean);
      console.log('🟢 Exclude product IDs:', recentProductIds);

      // 1️⃣ Fetch utama
      const mainResponse = await getRelevantProduct({
        page: 1,
        limit: 15,
        sortType: selectedShortByOption,
        category: allChildSubCategory,
      });

      let products = mainResponse.data || [];

      console.log('📦 Main products fetched:', products);

      // 2️⃣ Jika kurang dari 5, fetch lagi pakai 3 kategori terakhir
      if (products.length < 5) {
        const lastThreeCats = allChildSubCategory.slice(-3);

        const fallbackResponse = await getRelevantProduct({
          page: 1,
          limit: 15,
          sortType: selectedShortByOption,
          category: lastThreeCats,
        });

        const fallbackProducts = (fallbackResponse.data || []).filter(
          (item: any) =>
            !recentProductIds.includes(item.id) &&
            !products.find((p: any) => p.product?.id === item.id)
        );
        console.log('📦 Fallback products fetched:', fallbackProducts);
        

        // Gabungkan & ambil maksimal 4 produk
        products = [...products, ...fallbackProducts].slice(0, 5);
      }

      const fallbackProducts = (mainResponse.data || []).filter(
        (item: any) =>
          !recentProductIds.includes(item.id) &&
          !products.find((p: any) => p.product?.id === item.id)
      );
      console.log("🟡 Fallback products before merge:", fallbackProducts);

      products = fallbackProducts.slice(0, 5);

      setProductList(products);
      
      console.log('✅ Final products:', products);

      if (products.length === 0) {
        console.warn('⚠️ No products returned!');
      }

    } catch (error) {
      console.error('❌ Error when trying to get all products:', error);
      toast('Error when trying to get all products');
    } finally {
      setLoading(false);
    }
  }, [params.id, selectedSeasonsOption, selectedShortByOption]);



    
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  const handleShowDetail = (product: productI) => {
    setShowProductDetail({ show: true, product });
  };

   useEffect(() => {
      getProduct();
    }, [selectedSeasonsOption, selectedShortByOption, getProduct]);

  const chunkArrayWithCycledPadding = (array: productI[], size: number): productI[][] => {
    const result: productI[][] = [];
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
      {productList.length > 0 && localStorage.getItem('lastSubCategory') && (
        <SectionContainer>
          <div className="flex w-full flex-col max-md:max-w-full mt-6 mb-6 md:px-4 lg:px-0">
            <div className="font-katide-bold text-2xl text-indigo-950 px-4 lg:px-0">
              Handpicked for you!
            </div>

            {/* Mobile View - Slider */}
            <div className="block md:hidden mt-6">
              <Slider dots={true} arrows={false} className="custom-slider">
                {chunkArrayWithCycledPadding(productList, 4).map((group, pageIndex) => (
                  <div key={pageIndex}>
                    <div className="grid grid-cols-2 gap-4 px-4 ">
                      {group.map((item) => (
                        <div key={item.id} className="group block overflow-hidden rounded-2xl">
                          <div className="w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg rounded-2xl overflow-hidden">
                            <a href={`/product/${item.meta?.[0]?.title}`}>
                              <NextImage
                                  src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl}
                                  alt={item.name}
                                  width={300}
                                  height={300}
                                  className="object-cover w-full h-auto rounded-2xl"
                                />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* {productList.map((item) => (
                  
                ))} */}
              </Slider>
            </div>

            {/* Desktop View - Grid */}
            <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
              {productList.map((item) => (
                <div key={item.id} className="group block overflow-hidden rounded-2xl">
                  <div className="w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-90 group-hover:shadow-lg rounded-2xl overflow-hidden">
                    <a href={`/product/${item.meta?.[0]?.title}`}>
                      <NextImage
                          src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="object-cover w-full h-auto rounded-2xl"
                        />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      )}

    </>
  );
};

export default HandPickedSection;
