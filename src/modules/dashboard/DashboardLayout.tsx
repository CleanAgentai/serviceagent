import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Settings,
  User,
  Users,
  Clipboard,
  LogOut,
  CreditCard,
  Plug,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { useAuth } from "@/app/providers/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItem from "./SidebarItem";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Get initials or first letter of user's name/email for avatar
  const getInitials = () => {
    if (!user) return "?";

    if (user.user_metadata?.firstName && user.user_metadata?.lastName) {
      return `${user.user_metadata.firstName[0]}${user.user_metadata.lastName[0]}`;
    }

    if (user.email) {
      return user.email[0].toUpperCase();
    }

    return "?";
  };

  // Navigation items
  const navItems = [
    { path: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/interviews", icon: <Clipboard size={20} />, label: "Interviews" },
    {
      path: "/interviews/responses",
      icon: <Users size={20} />,
      label: "Candidates",
    },
    {
      path: "/integrations",
      icon: <Plug size={20} />,
      label: "Integrations",
    },
    {
      path: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Added border-r back */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="px-4 flex items-center border-b h-16">
            <div className="flex-1 flex justify-center">
              <img
                src="/Banner_SA_new.svg"
                alt="ServiceAgent Logo"
                className="h-14 w-auto"
              />
            </div>
          </div>
          <div className="flex-1 mb-4">
            <nav>
              {navItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  onClick={closeSidebar}
                />
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start rounded-md"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 sm:max-w-sm">
          <ScrollArea className="h-full p-4">
            <div className="flex items-center justify-between mb-4">
              <img
                src="/Banner_SA_new.svg"
                alt="ServiceAgent Logo"
                className="h-10 w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <nav className="mb-4">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  onClick={closeSidebar}
                />
              ))}
            </nav>
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start rounded-md"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top Navigation - Added border-b back */}
        <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-background/95 backdrop-blur-sm border-b flex">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </Button>

          <div className="flex-1 flex justify-end items-center px-4 space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/dashboard/settings")}
                  >
                    <User size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Company settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
