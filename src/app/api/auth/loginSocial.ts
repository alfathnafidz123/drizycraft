import axios from 'axios';
import { NextResponse } from 'next/server';

interface LoginPayload {
  email: string;
  fullName: string;
}
export async function loginSocial(loginPayload: LoginPayload) {
  try {
    const resp = await axios.post(
      `https://drizy-api.quadrakaryasantosa.com/auth/user/login-sso`,
      loginPayload
    );
    return resp.data.data;
  } catch (error) {
    NextResponse.error();
  }
}
