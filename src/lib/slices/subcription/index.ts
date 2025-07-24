'use client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  showSubscriptionModal: boolean;
  showReminderModal: boolean;
}
const initialState: ISubState = {
  subcription: undefined,
  activeSubcription: false,
  showSubscriptionModal: false,
  showReminderModal: false,
};

const subcriptionSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    resetSubs: () => initialState,
    setSubscriptionModalOpen: (state, action: PayloadAction<boolean>) => {
      state.showSubscriptionModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubs.fulfilled, (state, action) => {
      if (action.payload) {
        const isActive = moment().isSameOrBefore(
          moment(action.payload.data.end_date),
          'day'
        );
        state.subcription = action.payload.data;
        state.activeSubcription = isActive;
      } else {
        state.subcription = undefined;
        state.activeSubcription = false;
      }
    });
  },
});

export const { resetSubs, setSubscriptionModalOpen } = subcriptionSlice.actions;

export default subcriptionSlice.reducer;
