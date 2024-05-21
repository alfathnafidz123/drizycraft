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
    const res = await axios.get(
      'https://drizy-api.quadrakaryasantosa.com/billing/current-sub',
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    return res.data as SubcriptionResI;
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
      const isActive = moment(new Date()).isBefore(
        new Date(action.payload.data.end_date)
      );
      state.subcription = action.payload.data;
      state.activeSubcription = isActive;
    });
  },
});

export const { resetSubs } = subcriptionSlice.actions;

export default subcriptionSlice.reducer;
