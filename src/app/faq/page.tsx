'use client';

import FAQCard from '@/components/FAQCard';

export default function Privacy() {
  const data = [
    {
      title: 'Can I Use Freebies Items?',
      description:
        'Of course you can! You can use our freebies in your projects both commercial and personal, with attribution required. Or you can modify them so it will look so different from what we’ve made. Otherwise, you can go to our shop for the best offers!',
    },
    {
      title: 'How to Download for Free?',
      description:
        'Just do chekchout process and it will be in your inbox later.',
    },
    {
      title: 'Can I Request Customized Designs?',
      description:
        'You are in the perfect place! We’re also offering our services ranging from font designs, graphic designs, print templates, and so many things! We’d like to to help you. Contact us here.',
    },
    {
      title: 'Still Have Some Questions?',
      description:
        'Don’t feel hesitate to inform us. We’re ready to answer your questions. Ask us here.',
    },
  ];
  return (
    <main>
      <section className=' font-katide-bold mb-[5%] mt-[5%] text-center text-[36px] text-[#1A214C]'>
        FAQ
      </section>

      <section className='flex flex-col gap-16 bg-[#EBECF5] px-40 py-20'>
        {data.map((item, index) => (
          <FAQCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
    </main>
  );
}
