import React, { useState, InputHTMLAttributes, ChangeEvent } from 'react';
import { FormField, FormFieldProps } from './FormField';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    validate?: (value: string) => string | undefined;
  };
  onValidation?: (isValid: boolean) => void;
  variant?: 'outlined' | 'filled';
  containerClassName?: string;
}

/**
 * TextField component for form inputs
 */
export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  helperText,
  error,
  success = false,
  required = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  validation,
  onValidation,
  className = '',
  containerClassName = '',
  variant = 'outlined',
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const [localError, setLocalError] = useState<string | undefined>(error);
  const [isTouched, setIsTouched] = useState(false);
  const [localSuccess, setLocalSuccess] = useState(success);

  // Combined error message from props or validation
  const errorMessage = error || localError;

  // Validate the input
  const validateInput = (inputValue: string) => {
    if (!validation) return true;
    
    if (validation.minLength && inputValue.length < validation.minLength) {
      const message = `Minimum ${validation.minLength} characters required`;
      setLocalError(message);
      onValidation?.(false);
      return false;
    }
    
    if (validation.maxLength && inputValue.length > validation.maxLength) {
      const message = `Maximum ${validation.maxLength} characters allowed`;
      setLocalError(message);
      onValidation?.(false);
      return false;
    }
    
    if (validation.pattern && !validation.pattern.test(inputValue)) {
      const message = 'Input format is invalid';
      setLocalError(message);
      onValidation?.(false);
      return false;
    }
    
    if (validation.validate) {
      const customError = validation.validate(inputValue);
      if (customError) {
        setLocalError(customError);
        onValidation?.(false);
        return false;
      }
    }
    
    setLocalError(undefined);
    setLocalSuccess(true);
    onValidation?.(true);
    return true;
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // If the input has been touched, validate on change
    if (isTouched && validation) {
      validateInput(newValue);
    }
    
    onChange?.(e);
  };

  // Handle input blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    
    if (validation && value !== undefined) {
      validateInput(String(value));
    }
    
    onBlur?.(e);
  };

  const getBorderStyles = () => {
    if (errorMessage) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
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
      error={errorMessage}
      required={required}
      className={containerClassName}
      success={localSuccess && !errorMessage}
      disabled={disabled}
    >
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`
            block w-full rounded-md shadow-sm
            ${getBackgroundColor()}
            ${getBorderStyles()}
            ${icon && iconPosition === 'left' ? 'pl-10' : 'pl-3'}
            ${icon && iconPosition === 'right' ? 'pr-10' : 'pr-3'}
            py-2 text-sm
            disabled:opacity-60 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2
            transition duration-150 ease-in-out
            ${className}
          `}
          aria-invalid={!!errorMessage}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          required={required}
          {...rest}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
      </div>
    </FormField>
  );
}; 