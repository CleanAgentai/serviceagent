import React, { InputHTMLAttributes } from 'react';

export interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

/**
 * CheckBox component for boolean inputs
 */
export const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...rest
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            disabled={disabled}
            className={`
              h-4 w-4 rounded
              text-blue-600
              border-gray-300
              focus:ring-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={helperText || error ? `${id}-description` : undefined}
            required={required}
            {...rest}
          />
        </div>
        <div className="ml-3 text-sm">
          <label 
            htmlFor={id} 
            className={`
              font-medium 
              ${error ? 'text-red-500' : 'text-gray-700'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${labelClassName}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {/* Helper Text or Error Message */}
          {(helperText || error) && (
            <p 
              id={`${id}-description`} 
              className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 