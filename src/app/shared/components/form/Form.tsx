import React, { ReactNode, FormEvent, FormHTMLAttributes } from 'react';

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  loading?: boolean;
  submitButton?: ReactNode;
  resetButton?: ReactNode;
  title?: string;
  description?: string;
  horizontal?: boolean;
}

/**
 * Form component for grouping form fields
 */
export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = '',
  loading = false,
  submitButton,
  resetButton,
  title,
  description,
  horizontal = false,
  ...rest
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`${horizontal ? 'sm:grid sm:grid-cols-12 sm:gap-x-6' : ''} ${className}`}
      noValidate 
      {...rest}
    >
      {(title || description) && (
        <div className={`mb-6 ${horizontal ? 'sm:col-span-12' : ''}`}>
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      
      {/* Form Fields */}
      <div className={`space-y-4 ${horizontal ? 'sm:col-span-12' : ''}`}>
        {children}
      </div>
      
      {/* Form Actions */}
      {(submitButton || resetButton) && (
        <div className={`
          mt-6 flex items-center justify-end gap-x-4
          ${horizontal ? 'sm:col-span-12' : ''}
        `}>
          {resetButton}
          {submitButton}
        </div>
      )}
    </form>
  );
}; 