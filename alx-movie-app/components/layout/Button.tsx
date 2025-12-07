import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

const LayoutButton: React.FC<Props> = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`px-3 py-1 rounded border border-gray-300 bg-white text-sm ${className}`}
    >
      {children}
    </button>
  );
};

export default LayoutButton;
