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
          className={`relative mx-auto min-h-[592px] w-[1164px] overflow-visible ${className}`}
        >
          <div className='absolute inset-0 w-screen'>{children}</div>
        </div>
      ) : (
        <div className={`mx-auto w-[1164px] overflow-visible ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionContainer;
