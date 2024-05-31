import React, { ReactNode } from 'react';

interface SectionContainerProps {
  className?: string;
  children: ReactNode;
  bgColor?: string;
  fullwidth?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  className,
  children,
  bgColor,
  fullwidth = false,
}) => {
  return (
    <div
      className='flex w-full justify-center'
      style={{ backgroundColor: bgColor }}
    >
      {fullwidth ? (
        <div
          className={`mx-auto min-h-[592px] w-[1164px] overflow-visible ${className}`}
        >
          <div className='w-screen px-8 lg:px-0'>{children}</div>
        </div>
      ) : (
        <div
          className={`mx-auto w-screen overflow-visible lg:w-[1164px] ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionContainer;
