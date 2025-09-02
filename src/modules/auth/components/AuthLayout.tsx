import { Navigation } from "@/modules/landing/components/Navigation";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-50 to-white -z-10" />
      <Navigation />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <img 
              src="/logos/Logo.svg" 
              alt="ServiceAgent Logo" 
              className="h-auto w-16 mb-8"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
} 