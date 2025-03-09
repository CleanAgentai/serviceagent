import React, { ReactNode } from 'react';

export interface CardProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  bgColor?: string;
  compact?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  headerActions?: ReactNode;
}

/**
 * Card component for displaying content in a container
 */
export const Card: React.FC<CardProps> = ({
  title,
  description,
  footer,
  children,
  className = '',
  contentClassName = '',
  headerClassName = '',
  footerClassName = '',
  shadow = 'md',
  hoverEffect = false,
  rounded = 'md',
  bordered = false,
  bgColor = 'bg-white',
  compact = false,
  padding = 'md',
  headerActions,
}) => {
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  // Rounded corner classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  // Header padding classes (usually smaller bottom padding)
  const headerPaddingClasses = {
    none: 'px-0 pt-0',
    sm: 'px-3 pt-3 pb-2',
    md: 'px-4 pt-4 pb-3',
    lg: 'px-6 pt-6 pb-4',
  };

  // Footer padding classes (usually smaller top padding)
  const footerPaddingClasses = {
    none: 'px-0 pb-0',
    sm: 'px-3 pb-3 pt-2',
    md: 'px-4 pb-4 pt-3',
    lg: 'px-6 pb-6 pt-4',
  };

  // Content padding classes (adjusted when header/footer exist)
  const getContentPaddingClasses = () => {
    const hasHeader = title || description;
    const hasFooter = footer;
    
    if (padding === 'none') return 'p-0';
    
    if (hasHeader && hasFooter) {
      return {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      }[padding];
    } else if (hasHeader) {
      return {
        sm: 'px-3 pb-3 pt-2',
        md: 'px-4 pb-4 pt-3',
        lg: 'px-6 pb-6 pt-4',
      }[padding];
    } else if (hasFooter) {
      return {
        sm: 'px-3 pt-3 pb-2',
        md: 'px-4 pt-4 pb-3',
        lg: 'px-6 pt-6 pb-4',
      }[padding];
    } else {
      return paddingClasses[padding];
    }
  };

  return (
    <div
      className={`
        ${bgColor}
        ${shadowClasses[shadow]}
        ${roundedClasses[rounded]}
        ${bordered ? 'border border-gray-200' : ''}
        ${hoverEffect ? 'transition-shadow hover:shadow-lg' : ''}
        ${compact ? 'max-w-sm' : 'w-full'}
        overflow-hidden
        ${className}
      `}
    >
      {/* Card Header */}
      {(title || description) && (
        <div className={`
          ${headerPaddingClasses[padding]}
          border-b border-gray-200
          ${headerClassName}
        `}>
          <div className="flex items-center justify-between">
            <div>
              {typeof title === 'string' ? (
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              ) : (
                title
              )}
              {typeof description === 'string' ? (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              ) : (
                description
              )}
            </div>
            {headerActions && (
              <div>{headerActions}</div>
            )}
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className={`${getContentPaddingClasses()} ${contentClassName}`}>
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className={`
          ${footerPaddingClasses[padding]}
          border-t border-gray-200
          ${footerClassName}
        `}>
          {footer}
        </div>
      )}
    </div>
  );
}; 