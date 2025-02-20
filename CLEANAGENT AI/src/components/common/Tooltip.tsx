import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export default function Tooltip({ children, content, className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (tooltipRef.current && targetRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        tooltipRef.current.style.left = `${targetRect.left + (targetRect.width - tooltipRect.width) / 2}px`;
        tooltipRef.current.style.top = `${targetRect.top - tooltipRect.height - 8}px`;
      }
    };

    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  return (
    <div className="relative inline-block">
      <div
        ref={targetRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={className}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg pointer-events-none whitespace-nowrap"
          style={{ transform: 'translateX(-50%)' }}
        >
          {content}
          <div
            className="absolute left-1/2 bottom-0 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1/2 -translate-x-1/2"
            style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
          />
        </div>
      )}
    </div>
  );
} 