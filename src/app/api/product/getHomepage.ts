import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getHomepage() {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/product/homepage`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
