import axios from 'axios';
import { NextResponse } from 'next/server';

interface GetProductPayload {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}
export async function getAllProduct(data: GetProductPayload) {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/product?page=${data.page}&limit=${data.limit}`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
