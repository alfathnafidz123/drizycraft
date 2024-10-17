import axios from 'axios';
import { NextResponse } from 'next/server';

export enum SortType {
  HighToLow = 'HighToLow',
  LowToHigh = 'LowToHigh',
  Popularity = 'Popularity',
  Latest = 'Latest',
}

interface GetProductPayload {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  extraCategory?: string;
  sortType: SortType;
}
export async function getAllProduct(params: GetProductPayload) {
  try {
    const resp = await axios.get(
      `https://drizy-api.quadrakaryasantosa.com/crafter/product`,
      {
        params,
      }
    );
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
