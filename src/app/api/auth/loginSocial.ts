import axios from 'axios';
import { NextResponse } from 'next/server';

interface LoginPayload {
  id: string;
  email: string;
  fullName: string;
  provider: 'google' | 'facebook';
  avatar: string;
}
export async function loginSocial(loginPayload: LoginPayload) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/login-sso`,
      loginPayload
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
