import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getSubCategories() {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/child-category`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
