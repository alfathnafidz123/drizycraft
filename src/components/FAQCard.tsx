import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

interface FAQCardProps {
  title: string;
  description: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ title, description }) => {
  return (
    <div className='flex w-full flex-col overflow-hidden rounded-3xl border border-[#d7d6e0] shadow-lg'>
      <div className='flex justify-between bg-[#E4F6FB] p-8 text-[#4065D1]'>
        <p className='font-katide-bold text-3xl'>{title}</p>
        <BsQuestionCircle className='h-8 w-8' />
      </div>
      <div className='bg-white p-8 text-[#1A214C]'>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FAQCard;
