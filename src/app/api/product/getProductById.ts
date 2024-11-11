import axios from 'axios';
import { NextResponse } from 'next/server';

interface GetProductPayload {
  title: string;
}
export async function getProductById(data: GetProductPayload) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/by-id/${data.title}`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
