import axios from 'axios';
import { NextResponse } from 'next/server';

interface GetProductPayload {
  id: string;
}
export async function getProductById(data: GetProductPayload) {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/product/product/by-id?productId=${data.id}`
    );
    console.log(resp);
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
