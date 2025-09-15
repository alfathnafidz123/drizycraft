// src/store/slices/downloadSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface DownloadState {
  remaining: number;
}

const initialState: DownloadState = {
  remaining: 0,
};

export const fetchDownloadRemaining = createAsyncThunk(
  "download/fetchRemaining",
  async (token: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-transaction?page=1&limit=12`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const totalDownloads = res.data.data.length || 0;
    return Math.max(0, 10 - totalDownloads);
  }
);

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDownloadRemaining.fulfilled, (state, action) => {
      state.remaining = action.payload;
    });
  },
});

export default downloadSlice.reducer;
