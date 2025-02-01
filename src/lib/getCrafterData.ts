import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { getSeason } from '@/app/api/product/getSeason';
import { getSubCategories } from '@/app/api/product/getSubCategories';

export async function getInitialData() {
  try {
    const [seasonalData, categoryData, productData] = await Promise.all([
      getSeason(),
      getSubCategories(),
      getAllProduct({
        page: 1,
        limit: 15,
        sortType: SortType.Latest,
        category: 'Crafters',
        extraCategory: '',
      }),
    ]);

    return {
      seasonsOptions: seasonalData.data,
      categoryData: categoryData.data,
      productData: productData.data,
      hasMore: productData.meta.hasNextPage,
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      seasonsOptions: [],
      categoryData: [],
      productData: [],
      hasMore: false,
    };
  }
}

export async function getMoreProducts(
  page: number,
  sortType: SortType,
  category: string,
  extraCategory: string
) {
  try {
    const response = await getAllProduct({
      page,
      limit: 15,
      sortType,
      category,
      extraCategory,
    });
    return {
      productData: response.data,
      hasMore: response.meta.hasNextPage,
    };
  } catch (error) {
    console.error('Error fetching more products:', error);
    return {
      productData: [],
      hasMore: false,
    };
  }
}
