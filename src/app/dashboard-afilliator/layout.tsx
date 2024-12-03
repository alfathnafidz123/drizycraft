
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import AffiliatorNavigation from '@/components/affiliator/navigation';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main>
      <section className='flex flex-col xl:flex-row gap-4 p-2 xl:py-20 mx-auto w-full max-w-[1164px]'>
        <AffiliatorNavigation />
        {children}
      </section>
    </main>
  );
}
