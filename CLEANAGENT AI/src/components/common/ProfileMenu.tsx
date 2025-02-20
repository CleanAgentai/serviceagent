import React, { useState, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown, Shield, Key, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
}

export default function ProfileMenu({ 
  user = { 
    name: 'John Doe', 
    email: 'john@example.com',
    role: 'Admin'
  } 
}: ProfileMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu-container')) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to login page
    navigate('/login');
    setShowMenu(false);
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: User,
      path: '/settings/profile'
    },
    {
      label: 'Security',
      icon: Shield,
      path: '/settings/security'
    },
    {
      label: 'API Keys',
      icon: Key,
      path: '/settings/api-keys'
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      path: '/help'
    }
  ];

  return (
    <div className="relative profile-menu-container">
      <Button
        variant="ghost"
        onClick={() => setShowMenu(!showMenu)}
        className="relative flex items-center gap-2 hover:bg-primary-50 rounded-full p-2"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600" />
          </div>
        )}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </Button>

      {showMenu && (
        <Card
          className="absolute right-0 mt-2 w-64 z-50 animate-slide-up"
          hover={false}
        >
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 rounded-full p-2">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                {user.role && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <item.icon className="h-5 w-5 text-gray-500" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <hr className="my-2" />
            
            <button
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </div>
        </Card>
      )}
    </div>
  );
} 