import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getSeason() {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/product/child/Seasonal`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
