import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getCurrentSubs() {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/current-sub`
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
