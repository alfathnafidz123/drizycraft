import React, { ReactNode } from 'react';

interface SectionContainerProps {
  className?: string;
  children: ReactNode;
  bgColor?: string;
  parentClassName?: string;
  fullwidth?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  className,
  children,
  bgColor,
  fullwidth = false,
  parentClassName,
}) => {
  return (
    <div
      className={`flex w-full justify-center ${parentClassName}`}
      style={{ backgroundColor: bgColor }}
    >
      {fullwidth ? (
        <div
          className={`mx-auto w-full overflow-hidden lg:min-h-[592px] lg:max-w-[1164px] ${className}`}
        >
          <div className='w-screen px-6 lg:px-0'>{children}</div>
        </div>
      ) : (
        <div
          className={`mx-auto w-screen overflow-visible lg:max-w-[1164px] ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionContainer;
