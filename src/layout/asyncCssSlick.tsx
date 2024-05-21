// components/AsyncCSS.tsx
'use client';
import React, { useEffect } from 'react';

const AsyncCSSSlick: React.FC = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css';
    link.onload = () => {
      // Setelah pemuatan selesai, ubah rel menjadi stylesheet
      (link as HTMLLinkElement).rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <link
        rel='preload'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        as='style'
      />
      <noscript>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
      </noscript>
    </>
  );
};

export default AsyncCSSSlick;
