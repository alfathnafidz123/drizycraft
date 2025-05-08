import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

interface SubscribeI {
  priceId?: string;
  token?: string;
  membership?: string;

}

export async function subscriptionPayment(data: SubscribeI) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/subscription-payment`,
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
      toast('You already liked the project');
    }
    NextResponse.error();
  }
}
