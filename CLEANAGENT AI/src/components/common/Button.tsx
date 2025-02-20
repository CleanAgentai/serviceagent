import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variant === 'default' && 'bg-primary-500 text-white hover:bg-primary-600',
          variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4',
          size === 'lg' && 'h-12 px-6',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;