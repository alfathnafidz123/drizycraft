'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LogoutButton from '@/components/buttons/LogoutButton';

import {
  account,
  address,
  download,
  history,
  orders,
  paymentMethod,
  subscription,
} from '~/images';

export default function ProfileMenu() {
  const items = [
    { src: account.src, text: 'Account Details', link: 'account' },
    { src: address.src, text: 'Addresses', link: 'address' },
    { src: paymentMethod.src, text: 'Payment Methods', link: 'payment' },
    { src: subscription.src, text: 'Subscriptions', link: 'subscription' },
    { src: orders.src, text: 'Orders', link: 'order' },
    { src: download.src, text: 'Download', link: 'download' },
    { src: history.src, text: 'History Project', link: 'history' },
  ];

  const pathname = usePathname();
  const path = pathname.split('/')[2];
  return (
    <div className='flex flex-col gap-4 overflow-hidden rounded-lg border p-4 shadow-lg'>
      {items.map((item, index) => (
        <Link href={`/profile/${item.link}`} key={index}>
          <div
            className={
              path === item.link
                ? 'flex cursor-pointer items-center gap-4 text-[#4065D1]'
                : 'flex cursor-pointer items-center gap-4 text-[#a2a5b5]'
            }
          >
            <Image src={item.src} width={24} height={24} alt='history' />
            <p className='font-semibold'>{item.text}</p>
          </div>
        </Link>
      ))}
      <LogoutButton className='mx-4 mt-4 rounded-full bg-[#008ECC] px-4 py-2 text-white' />
    </div>
  );
}
