import { AuthorI } from '@/interfaces/author.interfaces';
import { UserI } from '@/interfaces/user.interface';

export interface productI {
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
  discountPeriod?: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  publishAt:string;
  updatedAt?: Date;
  deletedAt?: Date;
  authorId: string;
  meta?: MetaProductI[];
  author?: AuthorI;
}

export interface MetaProductI {
  id: string;
  title: string;
  realTitle: string;
  description: string;
  image: string;
  productId: string;
  product: productI;
}

export interface CategoryI {
  id: number;
  name: string;
  backgroundImage: string;
  viewType: number;
}

export interface HomepageDataI {
  crafterData: productI[];
  bundleData: productI[];
  vectorData: productI[];
  bestSellerData: productI[];
  exclusiveData: productI[];
  pinnedData: productI;
}

export interface CrafterI {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  price: number;
  product: productI[];
  user: UserI;
}

export interface ReviewI {
  id: string;
  comment: string;
  star: number;
  productId: string;
  userId: string;
  createdAt: string;
  user: UserI;
}



export interface ProductOrder {
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
  updatedAt: string | null;
  deletedAt: string | null;
  authorId: string;
}

export interface OrderI {
  id: number;
  checkoutId: string;
  sessionId: string;
  status: boolean;
  licenseType: number;
  price: number;
  createdAt: string;
  userId: string;
  productId: string;
  affiliateId: string | null;
  product: ProductOrder;
}