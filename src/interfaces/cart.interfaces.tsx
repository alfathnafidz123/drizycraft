import { Affiliate } from '@/lib/slices/user';

export interface GetCartResI {
  data: CartI[];
  meta: Meta;
}

export interface CartI {
  id: string;
  productId: string;
  userId: string;
  affiliateId?: string;
  licenseType: number;
  createdAt: string;
  product: Product;
  affiliate: Affiliate;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string[];
  description: string;
  category: string;
  categories: string[];
  subCategories: string[];
  chilSubCategories: string[];
  tags: string[];
  purchasedCount: number;
  price: number[];
  coinPrice: number[];
  enableDiscount: boolean;
  discount: number[];
  discountPeriod: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt?: Date;
  deletedAt?: Date;
  authorId: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
