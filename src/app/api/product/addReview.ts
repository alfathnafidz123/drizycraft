import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

interface ReviewI {
  comment: string;
  star: number;
  productId: string;
  token: string;
}
export async function addReview(data: ReviewI) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/reviews`,
      data,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data.token ?? ''}`,
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    NextResponse.error();
    if (error.response.status === 409) {
      toast('You already add a review');
    }
  }
}
