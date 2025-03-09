import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  interactive?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  showIcon = true,
  className = '',
  interactive = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        interactive &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [interactive]);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-800',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-800',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-800',
  };

  const handleInteraction = () => {
    if (interactive) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div 
      className={`inline-flex items-center relative ${className}`}
      ref={triggerRef}
      onMouseEnter={() => !interactive && setIsVisible(true)}
      onMouseLeave={() => !interactive && setIsVisible(false)}
      onClick={handleInteraction}
    >
      {children || (showIcon && <Info className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-help" />)}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 
            text-sm text-white bg-gray-800 
            rounded-lg shadow-lg
            max-w-xs
            ${positionClasses[position]}
          `}
          role="tooltip"
        >
          {content}
          <div 
            className={`
              absolute w-3 h-3 
              transform rotate-45 
              border-4 border-transparent
              ${arrowClasses[position]}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip; 