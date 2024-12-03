'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from '../lib/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={storeRef.current.__persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
