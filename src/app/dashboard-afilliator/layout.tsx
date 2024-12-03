
import { lazy, Suspense } from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Loading from '@/app/loading';

const AffiliatorNavigation = lazy(() => import('@/components/affiliator/navigation'));


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main>
      <section className='flex flex-col xl:flex-row gap-4 p-2 xl:py-20 mx-auto w-full max-w-[1164px]'>
        <Suspense fallback={<Loading />}>
          <AffiliatorNavigation />
          {children}
        </Suspense>
      </section>
    </main>
  );
}
