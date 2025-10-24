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
  Play
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
import { usePlan } from "@/hooks/usePlan";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { plan, isLoading, hasPlan } = usePlan();

  const planLabel = ((): string => {
    if (!plan) return "";
    const upper = plan.toUpperCase();
    if (upper === "STARTER") return "Starter";
    if (upper === "LAUNCH") return "Launch";
    if (upper === "SCALE") return "Scale";
    if (upper === "CUSTOM") return "Custom";
    return plan;
  })();

  const planBadgeClasses = ((): string => {
    const upper = (plan || "").toUpperCase();
    if (upper === "STARTER") return "bg-teal/10 text-teal border border-teal/30";
    if (upper === "LAUNCH") return "bg-gold/10 text-gold border border-gold/30";
    if (upper === "SCALE") return "bg-terracotta/10 text-terracotta border border-terracotta/30";
    if (upper === "CUSTOM") return "bg-orange-50 text-orange-500 border border-orange-200";
    return "bg-gray-100 text-gray-700 border border-gray-200";
  })();

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

  const isCheckout = /^\/(payment\/subscription|billing\/checkout)(\/|$)/.test(
    location.pathname
  );


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
      tooltipMessage: "ATS Integration is only available on Scale plan. Upgrade to Scale to unlock.",
    },
    {
      path: "/dashboard/onboarding",
      icon: <Play size={20} />,
      label: "Getting Started",
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
    <div
    className={[
      "flex overflow-x-hidden bg-background/95 min-h-[100svh]",
      isCheckout ? "min-h-[100svh]" : "overflow-y-auto",
    ].join(" ")}
  >
      {/* Desktop Sidebar - Added border-r back */}
      <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 border-r">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="px-4 flex items-center border-b h-16">
            <div className="flex-1 flex justify-center">
              <img
                src="/logos/Logo.svg"
                alt="ServiceAgent Logo"
                className="h-auto w-48"
                draggable={false}
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
                  // disabled={item.disabled}
                  tooltipMessage={item.tooltipMessage}
                />
              ))}
            </nav>
          </div>
          {!isLoading && (
            <div className="px-4">
              <div
                className={[
                  "mb-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                  hasPlan ? planBadgeClasses : "bg-gray-100 text-gray-600 border border-gray-200",
                ].join(" ")}
              >
                Current plan: {hasPlan ? planLabel : "None"}
              </div>
            </div>
          )}
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
        <SheetContent side="left" className="p-0 w-56 sm:max-w-sm">
          <ScrollArea className="h-full p-4">
            <div className="flex items-center justify-between mb-4">
            <img
                src="/logos/Brandmark.svg"
                alt="ServiceAgent Logo"
                className="w-10 h-10"
                draggable={false}
              />
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-terracotta"
                aria-label="Close sidebar"
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
                  //disabled={item.disabled} 
                  tooltipMessage={item.tooltipMessage}
                />
              ))}
            </nav>
            {!isLoading && (
              <div className="px-0 pb-2">
                <div
                  className={[
                    "mb-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                    hasPlan ? planBadgeClasses : "bg-gray-100 text-gray-600 border border-gray-200",
                  ].join(" ")}
                >
                  Current plan: {hasPlan ? planLabel : "None"}
                </div>
              </div>
            )}
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
      <div className="md:pl-56 flex flex-col flex-1 min-w-0">
        {/* Top Navigation - Added border-b back */}
        <div className="sticky top-0 z-10 flex-shrink-0 h-24 md:h-16 border-b flex items-center">
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
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="py-6 px-4 sm:px-6 md:px-8 min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
