import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
import {
  LayoutGrid,
  Users,
  Settings as SettingsIcon,
  BrainCircuit,
  Video,
  FileText,
  LogOut
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { path: '/dashboard/hiring', label: 'Hiring', icon: Users },
  { path: '/dashboard/create-interview', label: 'Create Interview', icon: FileText },
  { path: '/dashboard/ai-analysis', label: 'AI Analysis', icon: BrainCircuit },
  { path: '/dashboard/view-interviews', label: 'View Interviews', icon: Video },
  { path: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
];

export default function DashboardLayout() {
  const { signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-gray-200 flex-shrink-0">
          <Link to="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/serviceagent logo.png" 
              alt="ServiceAgent.ai" 
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold text-gray-900">
              ServiceAgent.ai
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
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

        {/* Sign Out Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 