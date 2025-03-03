import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
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
  Boxes,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { primaryGradientClass } from "@/app/shared/styles/theme";

const navItems = [
  { path: "/dashboard", label: "Launchpad", icon: LayoutGrid },
  { path: "/dashboard/chat", label: "Chat", icon: MessageSquare },
  { path: "/dashboard/metrics", label: "Metrics", icon: BarChart2 },
  { path: "/dashboard/sales", label: "Sales", icon: DollarSign },
  { path: "/dashboard/marketing", label: "Marketing", icon: Megaphone },
  { path: "/dashboard/hiring", label: "Hiring", icon: Users },
  { path: "/dashboard/operations", label: "Operations", icon: Cog },
  { path: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
  { path: "/dashboard/integrations", label: "Integrations", icon: Boxes },
  { path: "/dashboard/help", label: "Help", icon: HelpCircle },
];

export default function DashboardLayout() {
  const { signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo and close button (mobile only) */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <Link to="/dashboard" className="flex-shrink-0">
              <div className="flex items-center">
                <img
                  src="/robot-icon.png"
                  alt="Robot Icon"
                  className="
                  w-[clamp(24px,5vw,48px)]
                  h-auto 
                  max-w-[50px]               
                  sm:max-w-[40px]            
                  md:max-w-[48px]            
                  object-contain"
                  loading="eager"
                  width="32"
                  height="32"
                />
                <span className="text-xl font-bold ml-2">
                  <span className="text-blue-600">Clean</span>
                  <span className="text-blue-600">Agent</span>
                </span>
              </div>
            </Link>
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? primaryGradientClass + " text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={signOut}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="block md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden">
            <img
              src="/robot-icon.png"
              alt=""
              className="h-8 w-auto"
              width="32"
              height="32"
            />
            <span className="text-xl font-bold ml-2">
              <span className="text-blue-600">Clean</span>
              <span className="text-blue-600">Agent</span>
            </span>
          </div>
          <div className="w-6"></div> {/* Empty div for balance */}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
