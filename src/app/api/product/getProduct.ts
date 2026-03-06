  import axios from 'axios';
import { NextResponse } from 'next/server';

export enum SortType {
  HighToLow = 'HighToLow',
  LowToHigh = 'LowToHigh',
  Popularity = 'Popularity',
  Latest = 'Latest',
}

interface   GetProductPayload {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  extraCategory?: string;
  sortType: SortType;
}

interface GetRelevantPayload {
  page: number;
  limit: number;
  search?: string;
  category?: string[];
  extraCategory?: string;
  sortType: SortType;
}

export async function getAllProduct(params: GetProductPayload) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product`,
      {
        params,
      }
    );
    // console.log('res',resp.data);
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}

export async function getRelevantProduct(params: GetRelevantPayload) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/relevant`,
      {
        params,
      }
    );
    // console.log('res',resp.data);
    return resp.data;
  } catch (error) {
    NextResponse.error();
  }
}
