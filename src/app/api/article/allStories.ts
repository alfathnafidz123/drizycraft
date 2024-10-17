/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { NextResponse } from 'next/server';

import { PagingStory } from '@/interfaces/article.interfaces';

export async function allStories(params: PagingStory) {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/story`,
      {
        headers: {
          Accept: 'application/json',
        },
        params,
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
