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