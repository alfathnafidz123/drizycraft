import axios from 'axios';
import { NextResponse } from 'next/server';

interface RegisterPayload {
  email: string;
  username: string;
  displayName: string;
}
export async function register(registerPayload: RegisterPayload) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/register`,
      registerPayload
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
