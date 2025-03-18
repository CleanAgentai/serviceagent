import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  ListVideo,
  BarChart2,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft,
  Bell,
  Search,
  User,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

const drawerWidth = 280;

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user data on component mount
    const getUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (user) {
          const name = user.user_metadata?.full_name || localStorage.getItem('userName') || 'User';
          setUserName(name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { text: 'Create Interview', icon: <PlusCircle size={20} />, path: '/interviews/create' },
    { text: 'View Interviews', icon: <ListVideo size={20} />, path: '/interviews' },
    { text: 'View Responses', icon: <MessageSquare size={20} />, path: '/interviews/responses' },
    { text: 'Settings', icon: <SettingsIcon size={20} />, path: '/dashboard/settings' },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${open ? 'w-[280px]' : 'w-20'}`}
      >
        {/* Logo Area */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          {open && (
            <div className="flex items-center gap-2">
              <img
                src="/serviceagent-logo.svg"
                alt="ServiceAgent Logo"
                className="h-8 w-auto"
              />
            </div>
          )}
          <button
            onClick={handleDrawerToggle}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
              ${open ? 'ml-auto' : 'mx-auto'}`}
          >
            {open ? <ChevronLeft size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.text}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <div className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </div>
                {open && (
                  <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                    {item.text}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${open ? 'ml-[280px]' : 'ml-20'}`}>
        {/* Top Navigation Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{userName}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* User Menu Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button
                    onClick={() => navigate('/dashboard/settings')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-auto" style={{ height: 'calc(100vh - 64px)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 