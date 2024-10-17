/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

import { MenuState } from '@/layout/navbar';

const useOutsideClick = (
  callback: () => void,
  menu: MenuState,
  sideBarOpen?: boolean
) => {
  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [menu.all, menu.crafter, menu.vector, sideBarOpen]);

  return ref;
};

export default useOutsideClick;
