import React, { useState, InputHTMLAttributes } from 'react';
import { FormField } from './FormField';
import { Calendar } from 'lucide-react';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  containerClassName?: string;
  dateFormat?: string;
}

/**
 * DatePicker component for date selection
 * Uses native date input with browser support
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  helperText,
  error,
  success = false,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  className = '',
  containerClassName = '',
  value,
  onChange,
  onBlur,
  dateFormat = 'yyyy-MM-dd',
  ...rest
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [localSuccess, setLocalSuccess] = useState(success);

  // Handle blur event
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    
    // Validate on blur
    if (value) {
      const dateValue = new Date(String(value));
      
      // Check for valid date
      if (isNaN(dateValue.getTime())) {
        // Invalid date format (should be caught by browser)
      } else {
        setLocalSuccess(true);
      }
    }
    
    onBlur?.(e);
  };

  const getBorderStyles = () => {
    if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    if (localSuccess) return 'border-green-600 focus:border-green-600 focus:ring-green-600';
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
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
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <Calendar className="h-5 w-5" />
        </div>
        
        <input
          id={id}
          type="date"
          disabled={disabled}
          value={value as string}
          onChange={onChange}
          onBlur={handleBlur}
          min={minDate}
          max={maxDate}
          className={`
            block w-full rounded-md shadow-sm
            bg-white
            ${getBorderStyles()}
            pl-10 pr-3 py-2 text-sm
            disabled:opacity-60 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2
            transition duration-150 ease-in-out
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          required={required}
          {...rest}
        />
      </div>
    </FormField>
  );
}; 