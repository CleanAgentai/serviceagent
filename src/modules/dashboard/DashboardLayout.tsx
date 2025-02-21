import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
import {
  LayoutGrid,
  MessageSquare,
  BarChart2,
  DollarSign,
  Megaphone,
  Users,
  Settings as SettingsIcon,
  HelpCircle,
  Cog,
  Boxes
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Launchpad', icon: LayoutGrid },
  { path: '/dashboard/chat', label: 'Chat', icon: MessageSquare },
  { path: '/dashboard/metrics', label: 'Metrics', icon: BarChart2 },
  { path: '/dashboard/sales', label: 'Sales', icon: DollarSign },
  { path: '/dashboard/marketing', label: 'Marketing', icon: Megaphone },
  { path: '/dashboard/hiring', label: 'Hiring', icon: Users },
  { path: '/dashboard/operations', label: 'Operations', icon: Cog },
  { path: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
  { path: '/dashboard/integrations', label: 'Integrations', icon: Boxes },
  { path: '/dashboard/help', label: 'Help', icon: HelpCircle },
];

export default function Layout() {
  const { signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <Link to="/dashboard" className="flex-shrink-0">
              <span className="text-xl font-bold">
                <span className="text-blue-600">Clean</span>
                <span className="text-blue-600">Agent</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 