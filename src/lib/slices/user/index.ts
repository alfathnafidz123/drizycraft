'use client';
import { createSlice } from '@reduxjs/toolkit';

interface IUserData {
  id: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
}

interface IUserState {
  dataUser?: IUserData;
  token?: string;
}
const initialState: IUserState = {
  dataUser: undefined,
  token: undefined,
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
  },
});

export const { resetUser, setDataUser, setToken } = userSlice.actions;

export default userSlice.reducer;
