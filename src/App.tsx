import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserPreferencesProvider } from '@/app/providers/UserPreferencesContext';
import { AuthProvider } from '@/app/providers/AuthContext';
import { ProtectedRoute } from '@/app/shared/auth/ProtectedRoute';
import { ErrorBoundary } from '@/app/shared/common/ErrorBoundary';
import { LoadingState } from '@/app/shared/common/LoadingState';
import { AppLayout } from '@/app/shared/layouts/AppLayout';
import { Login } from '@/modules/auth/Login';
import { Signup } from '@/modules/auth/Signup';
import { AuthCallback } from '@/modules/auth/AuthCallback';
import { OAuthCallback } from "./modules/auth/OauthCallback";
import { CompleteProfile } from "./modules/auth/CompleteProfile";
import { PrivacyPolicy } from '@/modules/legal/PrivacyPolicy';
import { TermsOfService } from '@/modules/legal/TermsOfService';
import { CookiePolicy } from '@/modules/legal/CookiePolicy';
import { NotFound } from '@/modules/error/NotFound';
import setupDatabase from '@/utils/setupDatabase';
import { Toaster } from 'sonner';

// Dashboard Components
import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import Dashboard from '@/modules/dashboard/Dashboard';
import Settings from '@/modules/dashboard/Settings';
import AIAnalysis from "@/modules/dashboard/AIAnalysis";

// Interview Components
import CreateInterview from '@/modules/interviews/CreateInterview';
import { ViewInterviews } from '@/modules/interviews/ViewInterviews';
import { ViewResponses } from '@/modules/interviews/ViewResponses';
import { ResponseDetails } from '@/modules/interviews/ResponseDetails';

// Public Pages
import { LandingPage } from "@/modules/landing/LandingPage";

// Sales Routes
const SalesRoutes = React.lazy(() => import("@/pages/sales/setup"));

// Help Articles
const QuickStartGuide = React.lazy(
  () => import("@/modules/dashboard/help/articles/QuickStartGuide")
);
const InitialSetup = React.lazy(
  () => import("@/modules/dashboard/help/articles/InitialSetup")
);
const DashboardOverview = React.lazy(
  () => import("@/modules/dashboard/help/articles/DashboardOverview")
);

const App = () => {
  useEffect(() => {
    // Set document title based on domain
    const domain = import.meta.env.VITE_APP_DOMAIN || "dashboard.fsagent.com";
    document.title = `ServiceAgent - ${domain}`;
    
    // Initialize database
    const initDatabase = async () => {
      try {
        await setupDatabase();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    
    initDatabase();
  }, []);

  return (
    <UserPreferencesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <React.Suspense
            fallback={
              <LoadingState variant="full" message="Loading page..." />
            }
          >
            <ErrorBoundary>
              <Routes>
                {/* Auth Callback Route - Must be outside AppLayout */}
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* Public Routes with AppLayout */}
                <Route
                  element={
                    <AppLayout showNavigation={false} showFooter={false} />
                  }
                >
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/oauth-callback" element={<OAuthCallback />} />
                  <Route
                    path="/complete-profile"
                    element={<CompleteProfile />}
                  />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route
                    path="/terms-of-service"
                    element={<TermsOfService />}
                  />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="ai-analysis" element={<AIAnalysis />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Interview Routes */}
                <Route
                  path="/interviews"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<ViewInterviews />} />
                  <Route path="create" element={<CreateInterview />} />
                  <Route path="responses" element={<ViewResponses />} />
                  <Route path="responses/:responseId" element={<ResponseDetails />} />
                  <Route path=":interviewId" element={<ViewResponses />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </React.Suspense>
        </BrowserRouter>
      </AuthProvider>
    </UserPreferencesProvider>
  );
};

export default App;
