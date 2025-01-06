"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.NEXT_PUBLIC_META_PIXEL}`);
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};

export default FacebookPixelEvents;