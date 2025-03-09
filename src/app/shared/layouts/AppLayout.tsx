import React, { ReactNode, useState } from 'react';
import { Navigation } from '@/modules/landing/components/Navigation';
import { Footer } from '@/modules/landing/components/Footer';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface AppLayoutProps {
  children?: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * AppLayout provides a consistent layout structure across the application
 * It handles responsive behavior, navigation, and footer display
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showNavigation = true,
  showFooter = true,
  fullWidth = false,
  className = '',
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Mobile menu button - only shown on small screens */}
      {showNavigation && (
        <div className="block md:hidden fixed top-4 left-4 z-50">
          <button
            type="button"
            className="flex items-center justify-center h-10 w-10 rounded-md bg-white shadow-md text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleMobileSidebar}
            aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
          >
            {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Mobile sidebar - only visible on small screens when toggled */}
      {showNavigation && (
        <div
          className={`fixed inset-0 z-40 md:hidden transform ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="relative flex flex-col w-full max-w-xs h-full bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <span className="text-xl font-bold">
                <span className="text-blue-600">Clean</span>
                <span className="text-blue-600">Agent</span>
              </span>
              <button
                type="button"
                className="h-10 w-10 flex items-center justify-center text-gray-500 hover:text-gray-600"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 px-4 py-6 overflow-y-auto">
              {/* Add mobile navigation links here */}
            </div>
          </div>
          <div 
            className="absolute inset-0 bg-gray-600 bg-opacity-75" 
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        {showNavigation && <Navigation />}
        <main className={`flex-grow ${fullWidth ? '' : 'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'}`}>
          {children || <Outlet />}
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}; 