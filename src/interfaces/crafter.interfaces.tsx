import { MetaProductI } from "@/interfaces/product.interface"

export interface GetCarfterResI {
  data: CrafterI[]
  meta: Meta
}

export interface CrafterI {
  id: string
  name: any
  description: string
  imageUrl: string
  createdAt: string
  updatedAt: any
  likeCount: number
  price: number
  status: string
  coin: number
  reason: any
  product: Product[]
  breezy: any[]
  user: User
  likes: any[]
  operation: string[]
  material: string[]
  difficulty: string
  time: number
  steps: CrafterStepsI[]
}

export interface CrafterStepsI {
  id: string
  stepsNumber: number
  description: string
  imageUrl: string
}

export interface Product {
  id: string
  name: string
  imageUrl: string[]
  description: string
  category: string
  categories: string[]
  subCategories: string[]
  chilSubCategories: string[]
  tags: string[]
  purchasedCount: number
  price: number[]
  coinPrice: number[]
  enableDiscount: boolean
  discount: number[]
  discountPeriod: string
  fileType: string
  fileSize: number
  createdAt: string
  updatedAt: any
  deletedAt: any
  authorId: any
  meta: MetaProductI[]
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  activationKey: any
  userStatus: any
  coin: any
  createdAt: string
  updatedAt: string
  blocked: boolean
  affiliateId: string
  avatar: any
  gid: any
  fid: any
}

export interface Meta {
  total: number
  page: number
  limit: number
  lastPage: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
