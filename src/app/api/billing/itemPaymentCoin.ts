import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

interface PaymentCoinI {
  productId?: string;
  licenseType?: string;
  checkoutId?: string;
  token?: string;
}

export async function itemPaymentCoin(data: PaymentCoinI) {
  try {
    const resp = await axios.post(`http://localhost:3002/buy-with-coin`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${data.token ?? ''}`,
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.code === 'ERR_BAD_REQUEST') {
      toast('You already liked the project');
    }
    NextResponse.error();
  }
}
