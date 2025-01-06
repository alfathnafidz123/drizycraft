import { Suspense } from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import AffiliatorNavigation from '@/components/affiliator/navigation';

import Loading from '@/app/loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <section className='flex flex-col gap-4 p-2 xl:py-20 mx-auto w-full max-w-[1164px]'>
          <AffiliatorNavigation />
          {children}
        </section>
      </Suspense>
    </main>
  );
}
