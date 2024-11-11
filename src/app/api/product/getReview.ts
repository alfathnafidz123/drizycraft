import axios from 'axios';
import { NextResponse } from 'next/server';

interface GetReviewPayload {
  page: number;
  limit: number;
  id: string;
}
export async function getReviews(data: GetReviewPayload) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/reviews/${data?.id}?page=${data.page}&limit=${data.limit}`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
