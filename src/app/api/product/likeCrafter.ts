import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

interface LikeCrafterI {
  crafterId?: string;
  token?: string;
}
export async function likeCrafter(data: LikeCrafterI) {
  try {
    const resp = await axios.post(
      `https://drizy-api.quadrakaryasantosa.com/crafter/crafter/like`,
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
