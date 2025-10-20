import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
  disabled?: boolean;
  tooltipMessage?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  onClick,
  disabled = false,
  tooltipMessage
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;
  const [showTooltip, setShowTooltip] = useState(false);
  
  
  const handleClick = () => {
    if (disabled) return;
    navigate(path);
    if (onClick) onClick();
  };

  const buttonContent = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start text-sm font-medium rounded-none",
        isActive 
          ? "bg-secondary text-secondary-foreground"
          : "text-foreground hover:text-foreground hover:bg-muted",
        disabled && "opacity-50 cursor-not-allowed text-gray-400 hover:text-gray-400 hover:bg-transparent"
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Button>
  );

  if (disabled && tooltipMessage) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-sm font-medium rounded-none",
            isActive
              ? "bg-secondary text-secondary-foreground"
              : "text-foreground",
            "opacity-50 cursor-not-allowed text-gray-400 pointer-events-none"
          )}
          disabled={true}
          tabIndex={-1}
        >
          <span className="mr-3">{icon}</span>
          {label}
        </Button>
        {/* Tooltip - positioned below the button */}
        {showTooltip && (
          <div
            className="absolute left-0 top-full mt-1 z-[9999] w-full px-2"
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-gray-900 text-white text-xs rounded-md shadow-lg p-2">
              {tooltipMessage}
            </div>
          </div>
        )}
      </div>
    );
  }

  return buttonContent;
};

export default SidebarItem; 