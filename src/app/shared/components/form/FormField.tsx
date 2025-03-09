import React, { ReactNode } from 'react';
import { tokens } from '@/app/shared/styles/tokens';

export interface FormFieldProps {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
  success?: boolean;
  disabled?: boolean;
}

/**
 * FormField is a base component for all form elements
 * It provides consistent layout, labels, error messages, and success states
 */
export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  helperText,
  error,
  required = false,
  className = '',
  children,
  success = false,
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            error ? 'text-red-500' : success ? 'text-green-600' : 'text-gray-700'
          } ${disabled ? 'opacity-60' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Form Control */}
      {children}
      
      {/* Helper Text or Error Message */}
      {(helperText || error) && (
        <div className="mt-1">
          {error ? (
            <p className="text-red-500 text-xs">{error}</p>
          ) : helperText ? (
            <p className="text-gray-500 text-xs">{helperText}</p>
          ) : null}
        </div>
      )}
      
      {/* Success Indicator */}
      {success && !error && (
        <div className="mt-1">
          <p className="text-green-600 text-xs">Valid input</p>
        </div>
      )}
    </div>
  );
}; 