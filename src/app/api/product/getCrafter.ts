import axios from 'axios';
import { NextResponse } from 'next/server';

interface GetProductPayload {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}
export async function getAllCrafter(data: GetProductPayload) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter?page=${data.page}&limit=${data.limit}`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
