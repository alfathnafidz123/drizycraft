import axios from 'axios';
import { NextResponse } from 'next/server';

interface ConfirmSubsI {
  checkoutId?: string;
  token?: string;
}

export async function confirmSubs(data: ConfirmSubsI) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/confirm-subs-payment`,
      data,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${data.token ?? ''}`,
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    if (error.code === 'ERR_BAD_REQUEST') {
      // toast('You already liked the project');
    }
    NextResponse.error();
  }
}
