import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'url' | 'textarea' | 'select' | 'date';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  options,
  rows = 3,
  min,
  max,
  step,
  disabled = false,
  className = '',
  helperText
}) => {
  const id = `field-${name}`;
  const hasError = Boolean(error);

  const baseInputClasses = `
    block w-full rounded-md shadow-sm sm:text-sm
    ${hasError
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${className}
  `;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={baseInputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
        );

      case 'select':
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={baseInputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={baseInputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={`block text-sm font-medium ${
            hasError ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {helperText && !hasError && (
          <span className="text-sm text-gray-500">{helperText}</span>
        )}
      </div>

      <div className="relative">
        {renderInput()}
        {hasError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <AlertCircle
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {hasError && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField; 