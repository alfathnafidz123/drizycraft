import axios from 'axios';
import { NextResponse } from 'next/server';

interface GetProductPayload {
  title: string;
  token?: string;
}
export async function getProductOwnedById(data: GetProductPayload) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/owned/${data.title}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
