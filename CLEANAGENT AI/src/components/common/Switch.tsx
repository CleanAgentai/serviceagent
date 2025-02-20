import { FC } from 'react';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
    lg: 'w-14 h-7'
  };

  const toggleClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <label className={cn(
      'inline-flex items-center cursor-pointer',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            sizeClasses[size],
            'rounded-full transition-colors duration-200 ease-in-out',
            checked ? 'bg-gradient-primary' : 'bg-gray-200'
          )}
        >
          <div
            className={cn(
              toggleClasses[size],
              'absolute bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out',
              checked ? 'translate-x-full' : 'translate-x-0',
              size === 'sm' ? 'top-0.5 left-0.5' : size === 'md' ? 'top-0.5 left-0.5' : 'top-0.5 left-0.5'
            )}
          />
        </div>
      </div>
      {label && (
        <span className={cn(
          'ml-3',
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
        )}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;
export type { SwitchProps }; 
