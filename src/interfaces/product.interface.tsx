import { UserI } from '@/interfaces/user.interface';

export interface productI {
  id?: string;
  name: string;
  imageUrl: string[];
  image?: string;
  description: string;
  category?: string;
  purchasedCount?: number;
  createdAt?: string;
  updatedAt?: string | null;
  price?: number;
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
