import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

interface SubscribeI {
  priceId?: string;
  token?: string;
}

export async function subscriptionPayment(data: SubscribeI) {
  try {
    const resp = await axios.post(
      `http://localhost:3002/subscription-payment`,
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
