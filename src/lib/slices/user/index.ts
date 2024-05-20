'use client';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const { resetUser, setDataUser, setToken, setOpenModal } =
  userSlice.actions;

export default userSlice.reducer;
