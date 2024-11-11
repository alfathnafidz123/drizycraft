'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { CartI, GetCartResI, Meta } from '@/interfaces/cart.interfaces';

export const fetchCart = createAsyncThunk(
  'cart/fetchCarts',
  async (token: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/cart`,
      {
        headers: { Authorization: `bearer ${token}` },
        params: { page: 1, limit: 25 },
      }
    );
    return res.data as GetCartResI;
  }
);

interface ICartState {
  cart: CartI[];
  meta?: Meta;
}
const initialState: ICartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload.data;
      state.meta = action.payload.meta;
    });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
