import React from 'react';

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', className, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md text-sm font-medium focus:outline-none';
  const variantStyles =
    variant === 'outline'
      ? 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100'
      : 'bg-indigo-600 text-white hover:bg-indigo-700';

  return (
    <button
      {...props}
      className={cn(baseStyles, variantStyles, className)}
    />
  );
};
