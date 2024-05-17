import axios from 'axios';
import { NextResponse } from 'next/server';

export async function getSubs() {
  try {
    const resp = await axios.get(`http://localhost:3002/`);
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
