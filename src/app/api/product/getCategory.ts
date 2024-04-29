import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getCategory() {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/product/category`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
