import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Megaphone,
  Users,
  Cog,
  Puzzle,
  HelpCircle,
  Menu,
  X,
  Keyboard,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Workflow
} from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import Button from './common/Button';
import ShortcutsHelp from './common/ShortcutsHelp';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { shortcuts } = useKeyboardShortcuts();

  // Add keyboard shortcut for shortcuts help
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setShowShortcuts(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Launchpad', icon: LayoutDashboard, path: '/' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/chat' },
    { id: 'metrics', label: 'Metrics', icon: BarChart3, path: '/metrics' },
    { id: 'sales', label: 'Sales', icon: DollarSign, path: '/sales' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, path: '/marketing' },
    { id: 'hiring', label: 'Hiring', icon: Users, path: '/hiring' },
    { id: 'operations', label: 'Operations', icon: Workflow, path: '/operations' },
    { id: 'settings', label: 'Settings', icon: Cog, path: '/settings' },
    { id: 'integrations', label: 'Integrations', icon: Puzzle, path: '/integrations' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
  ];

  return (
    <div className="min-h-screen bg-gradient-light flex">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center p-4 border-b">
            <h1 className="text-xl font-bold">CleanAgent</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-md'
                      : 'text-gray-600 hover:bg-primary-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t bg-gray-50">
            <Button
              variant="outline"
              className="w-full justify-center hover:bg-primary-50 transition-colors"
              onClick={() => setShowShortcuts(true)}
            >
              <Keyboard className="h-4 w-4 mr-2" />
              Shortcuts
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-primary-50"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <div className="flex items-center space-x-4">
                {/* Add back Notifications and ProfileMenu components here */}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsHelp
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}