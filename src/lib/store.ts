'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from './slices/cart';
import subcriptionSlice from './slices/subcription';
import userSlice from './slices/user';

const reducers = combineReducers({
  user: userSlice,
  cart: cartSlice,
  subs: subcriptionSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
