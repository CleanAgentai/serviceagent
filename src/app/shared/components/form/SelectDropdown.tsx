import React, { useState, SelectHTMLAttributes } from 'react';
import { FormField } from './FormField';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectDropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string;
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  placeholder?: string;
  containerClassName?: string;
  variant?: 'outlined' | 'filled';
}

/**
 * SelectDropdown component for dropdown selection inputs
 */
export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  id,
  options,
  label,
  helperText,
  error,
  success = false,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  containerClassName = '',
  variant = 'outlined',
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [localSuccess, setLocalSuccess] = useState(success);

  // Handle select blur
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsTouched(true);
    
    // Validate on blur
    if (required && (!value || value === '')) {
      // Don't do anything for now, as error is passed from parent
    } else if (value) {
      setLocalSuccess(true);
    }
    
    onBlur?.(e);
  };

  const getBorderStyles = () => {
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    if (localSuccess) return 'border-green-600 focus:border-green-600 focus:ring-green-600';
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  };

  const getBackgroundColor = () => {
    if (disabled) return 'bg-gray-100';
    if (variant === 'filled') return 'bg-gray-50';
    return 'bg-white';
  };

  return (
    <FormField
      id={id}
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      className={containerClassName}
      success={localSuccess && !error}
      disabled={disabled}
    >
      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`
            block w-full rounded-md shadow-sm
            appearance-none
            ${getBackgroundColor()}
            ${getBorderStyles()}
            pl-3 pr-10 py-2 text-sm
            disabled:opacity-60 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2
            transition duration-150 ease-in-out
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          required={required}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </FormField>
  );
}; 