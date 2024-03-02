import axios from 'axios';
import { NextResponse } from 'next/server';

interface LoginPayload {
  payload: string;
  password: string;
}
export async function login(loginPayload: LoginPayload) {
  try {
    const resp = await axios.post(
      `http://localhost:3001/user/login`,
      loginPayload
    );
    return resp.data.data;
  } catch (error) {
    NextResponse.error();
    // console.error(error);
  }
}
