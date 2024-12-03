import { Product } from "@/interfaces/crafter.interfaces"

export interface AffiliateI {
  id: string
  userId: string
  status: StatusType
  rejectReason: string
  createdAt: Date
}

export enum StatusType {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}

export interface ResTransactionI {
  sum: number
  transactions: Transaction[]
}

export interface Transaction {
  id: number
  checkoutId: string
  sessionId: string
  status: boolean
  licenseType: number
  price: number
  c: number
  createdAt: string
  userId: string
  productId: string
  product: Product
  affiliateId: string
}

export interface ResGetClickI {
  count: CountI
}

export interface CountI {
  clicks: ClickI[]
  count: number
}

export interface ClickI {
  id: string
  clickDate: string
  ipAddress: string
  userAgent: string
  shortLink: ShortLinkI
}

export interface ShortLinkI {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt: string
  clickCount: number
}

