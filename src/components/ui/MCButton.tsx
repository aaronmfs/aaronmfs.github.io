import React from 'react';
import { playClick } from '../../lib/sound';

interface MCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MCButton = React.forwardRef<HTMLButtonElement, MCButtonProps>(
  ({ children, className = '', onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`mc-button-bg font-minecraft text-[1rem] leading-none font-semibold tracking-wide text-[#f0f0f0] disabled:text-[#aaaaaa] text-center px-5 pt-[0px] pb-[8px] cursor-pointer outline-none mc-text-shadow whitespace-nowrap ${className}`}
        onClick={(e) => {
          playClick();
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MCButton.displayName = 'MCButton';

export default MCButton;
