import axios from 'axios';
import { NextResponse } from 'next/server';

interface LoginPayload {
  payload: string;
  password: string;
}
export async function login(loginPayload: LoginPayload) {
  try {
    const resp = await axios.post(
      `https://drizy-api.quadrakaryasantosa.com/auth/user/login`,
      loginPayload
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
