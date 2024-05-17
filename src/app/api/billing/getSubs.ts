import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getSubs() {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/billing/`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
