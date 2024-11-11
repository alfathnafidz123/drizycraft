/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function storyByTitle(title: string) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/story/${title}`,
      {
        headers: {
          Accept: 'application/json',
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
