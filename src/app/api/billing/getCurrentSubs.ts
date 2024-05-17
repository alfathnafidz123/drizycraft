import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getCurrentSubs() {
  try {
    const resp = await axios.get(`http://localhost:3002/current-sub`);
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
