import { MetaProductI } from '@/interfaces/product.interface';

export interface TransactionResI {
  data: TransactionI[];
  meta: Meta;
}

export interface SubsTransactionResI {
  data: SubsTransactionI[];
  meta: Meta;
}

export interface SubsTransactionI {
  id: string;
  name: string;
  status: string;
  price: number;
  userId: string;
}

export interface TransactionI {
  id: number;
  checkoutId: string;
  sessionId: string;
  status: boolean;
  licenseType: number;
  price: number;
  createdAt: string;
  userId: string;
  productId: string;
  affiliateId?: string;
  product: ProductI;
}

export interface ProductI {
  id: string;
  name: string;
  imageUrl: string[];
  description: string;
  category: string;
  url: string;
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
  authorId?: string;
  meta: MetaProductI[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
