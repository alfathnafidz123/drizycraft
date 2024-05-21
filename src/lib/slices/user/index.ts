'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface IUserData {
  id: string;
  email: string;
  username: string;
  displayName: string;
  activationKey: any;
  userStatus: any;
  coin?: 0;
  createdAt: string;
  updatedAt: string;
  blocked: boolean;
  affiliateId: string;
  affiliate: Affiliate;
}

export interface Affiliate {
  id: string;
  refferalCode: string;
  totalEarnings: number;
  userId: string;
  createdAt: string;
  updatedAt?: Date;
}

interface IUserState {
  dataUser?: IUserData;
  token?: string;
  openModal?: boolean;
}
const initialState: IUserState = {
  dataUser: undefined,
  token: undefined,
  openModal: false,
};

interface TokenPayload {
  payload: {
    token: string;
  };
}

interface UserPayload {
  payload: {
    userData: IUserData;
  };
}

interface ModalPayload {
  payload: boolean;
}

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (token: string) => {
    const res = await axios.get(
      'https://drizy-api.quadrakaryasantosa.com/auth/user/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data as IUserData;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    setToken: (state, { payload }: TokenPayload) => {
      state.token = payload.token;
    },
    setDataUser: (state, { payload }: UserPayload) => {
      state.dataUser = payload.userData;
    },
    setOpenModal: (state, { payload }: ModalPayload) => {
      state.openModal = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.dataUser = action.payload;
    });
  },
});

export const { resetUser, setDataUser, setToken, setOpenModal } =
  userSlice.actions;

export default userSlice.reducer;
