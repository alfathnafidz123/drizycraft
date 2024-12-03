import { Meta, PagingI } from './paging.interfaces';

export enum CouponStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}
export interface GetCouponReqI extends PagingI {
  status: CouponStatus;
}

export interface GetCouponResI {
  coupons: CouponI[];
  meta: Meta;
}

export interface CouponI {
  id: string;
  name: string;
  code: string;
  percentage?: number;
  discount?: number;
  expiredAt: Date;
  status: string;
  authorId: any;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
}

export interface CouponPayloadI {
  name: string;
  code: string;
  percentage: number;
  expiredAt: any;
}

export interface CheckCouponResI {
  status: "active" | "expired" | "invalid";
  coupon?: CouponI;
}
