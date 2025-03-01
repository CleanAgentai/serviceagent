import React, { InputHTMLAttributes } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  id: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  direction?: 'vertical' | 'horizontal';
  containerClassName?: string;
  optionClassName?: string;
  disabled?: boolean;
}

/**
 * RadioGroup component for multiple choice selection
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  label,
  helperText,
  error,
  required = false,
  direction = 'vertical',
  containerClassName = '',
  optionClassName = '',
  disabled = false,
}) => {
  return (
    <div role="radiogroup" className={`mb-4 ${containerClassName}`}>
      {/* Group Label */}
      {label && (
        <div className="mb-2">
          <span className={`block text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>
      )}
      
      {/* Radio Options */}
      <div 
        className={`
          ${direction === 'vertical' ? 'space-y-2' : 'flex flex-wrap space-x-4'}
        `}
      >
        {options.map((option, index) => (
          <div 
            key={`${id}-${option.value}`} 
            className={`
              flex items-center
              ${optionClassName}
            `}
          >
            <input
              id={`${id}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled || option.disabled}
              className={`
                h-4 w-4
                text-blue-600
                border-gray-300
                focus:ring-blue-500
                ${error ? 'border-red-500' : 'border-gray-300'}
                ${(disabled || option.disabled) ? 'opacity-60 cursor-not-allowed' : ''}
              `}
              aria-invalid={!!error}
              required={required}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className={`
                ml-2 block text-sm
                ${error ? 'text-red-500' : 'text-gray-700'}
                ${(disabled || option.disabled) ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {/* Helper Text or Error Message */}
      {(helperText || error) && (
        <div className="mt-1">
          <p className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        </div>
      )}
    </div>
  );
}; 