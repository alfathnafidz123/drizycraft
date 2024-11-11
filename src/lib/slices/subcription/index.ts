'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import {
  SubcriptionI,
  SubcriptionResI,
} from '@/interfaces/subcription.interfaces';

export const fetchSubs = createAsyncThunk(
  'subcription/fetchSubss',
  async (token: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/current-sub`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      return res.data as SubcriptionResI;
    } catch (error) {
      return undefined;
    }
  }
);

interface ISubState {
  subcription?: SubcriptionI;
  activeSubcription: boolean;
}
const initialState: ISubState = {
  subcription: undefined,
  activeSubcription: false,
};

const subcriptionSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    resetSubs: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubs.fulfilled, (state, action) => {
      if (action.payload) {
        const isActive = moment(new Date()).isBefore(
          new Date(action.payload.data.end_date)
        );
        state.subcription = action.payload.data;
        state.activeSubcription = isActive;
      } else {
        state.subcription = undefined;
      }
    });
  },
});

export const { resetSubs } = subcriptionSlice.actions;

export default subcriptionSlice.reducer;
