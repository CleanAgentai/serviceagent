import React, { Fragment, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  disableAnimation?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  showDividers?: boolean;
  preventScroll?: boolean;
  ariaLabel?: string;
  closeButtonLabel?: string;
  position?: 'center' | 'top';
  onAfterClose?: () => void;
}

/**
 * Modal component for displaying content in a dialog
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOutsideClick = true,
  closeOnEsc = true,
  hideCloseButton = false,
  disableAnimation = false,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  titleClassName = '',
  bodyClassName = '',
  footerClassName = '',
  showDividers = true,
  preventScroll = true,
  ariaLabel,
  closeButtonLabel = 'Close',
  position = 'center',
  onAfterClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  // Position classes
  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-8',
  };

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEsc) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Handle scroll lock
  useEffect(() => {
    if (preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, preventScroll]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node) && closeOnOutsideClick) {
      onClose();
    }
  };

  // Render the modal using a portal to avoid z-index issues
  return isOpen
    ? createPortal(
        <div
          className={`fixed inset-0 z-50 flex justify-center overflow-y-auto ${positionClasses[position]} ${overlayClassName}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabel || 'modal-title'}
          onClick={handleOverlayClick}
        >
          {/* Overlay */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              disableAnimation ? '' : isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            ref={modalRef}
            className={`
              relative bg-white rounded-lg shadow-xl transform transition-all
              ${sizeClasses[size]}
              ${disableAnimation ? '' : isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              ${className}
            `}
          >
            {!hideCloseButton && (
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={onClose}
                aria-label={closeButtonLabel}
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Modal Title */}
            {title && (
              <div 
                className={`
                  p-4 sm:p-6
                  ${showDividers ? 'border-b border-gray-200' : ''}
                  ${titleClassName}
                `}
              >
                {typeof title === 'string' ? (
                  <h3 
                    className="text-lg font-medium text-gray-900" 
                    id="modal-title"
                  >
                    {title}
                  </h3>
                ) : (
                  title
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className={`p-4 sm:p-6 ${bodyClassName}`}>
              <div className={contentClassName}>
                {children}
              </div>
            </div>

            {/* Modal Footer */}
            {footer && (
              <div 
                className={`
                  p-4 sm:p-6
                  ${showDividers ? 'border-t border-gray-200' : ''}
                  ${footerClassName}
                `}
              >
                {footer}
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;
}; 