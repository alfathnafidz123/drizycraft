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
  coin?: number;
  createdAt: string;
  updatedAt: string;
  blocked: boolean;
  affiliateId: string;
  affiliate: Affiliate;
  avatar: string;
}

export interface Affiliate {
  id: string;
  refferalCode: string;
  totalEarnings: number;
  commissionRate: number;
  userId: string;
  eligible: boolean;
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data as IUserData;
  }
);

export const fetchCoin = createAsyncThunk(
  'user/fetchCoin',
  async (token: string) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/coin`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data.coinAmount as number;
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
    setDataCoin: (state, { payload }: { payload: { coin: number } }) => {
      state.dataUser = { ...state.dataUser!, coin: payload.coin };
    },
    setDataUser: (state, { payload }: UserPayload) => {
      state.dataUser = {
        ...state.dataUser,
        id: payload.userData.id,
        email: payload.userData.email,
        username: payload.userData.username,
        displayName: payload.userData.displayName,
        activationKey: payload.userData.activationKey,
        userStatus: payload.userData.userStatus,
        createdAt: payload.userData.createdAt,
        updatedAt: payload.userData.updatedAt,
        blocked: payload.userData.blocked,
        affiliateId: payload.userData.affiliateId,
        affiliate: payload.userData.affiliate,
        avatar: payload.userData.avatar,
      };
    },
    setOpenModal: (state, { payload }: ModalPayload) => {
      state.openModal = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.dataUser = {
        ...state.dataUser,
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        displayName: action.payload.displayName,
        activationKey: action.payload.activationKey,
        userStatus: action.payload.userStatus,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        blocked: action.payload.blocked,
        affiliateId: action.payload.affiliateId,
        affiliate: action.payload.affiliate,
        avatar: action.payload.avatar,
      };
    });

    builder.addCase(fetchCoin.fulfilled, (state, action) => {
      state.dataUser = {
        ...state.dataUser!,
        coin: action.payload,
      };
    });
  },
});

export const { resetUser, setDataUser, setToken, setOpenModal, setDataCoin } =
  userSlice.actions;

export default userSlice.reducer;
