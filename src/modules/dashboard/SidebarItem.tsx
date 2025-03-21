import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  path, 
  onClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);
  
  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };
  
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start text-sm font-medium",
        isActive 
          ? "bg-secondary text-secondary-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
      onClick={handleClick}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Button>
  );
};

export default SidebarItem; 