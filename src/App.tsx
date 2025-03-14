import React from 'react';
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
import { PrivacyPolicy } from '@/modules/legal/PrivacyPolicy';
import { TermsOfService } from '@/modules/legal/TermsOfService';
import { CookiePolicy } from '@/modules/legal/CookiePolicy';
import { NotFound } from '@/modules/error/NotFound';

// Dashboard Components
import DashboardLayout from '@/modules/dashboard/DashboardLayout';
import Dashboard from '@/modules/dashboard/Dashboard';
import CreateInterview from '@/modules/dashboard/CreateInterview';
import AIAnalysis from '@/modules/dashboard/AIAnalysis';
import ViewInterviews from '@/modules/dashboard/ViewInterviews';
import Settings from '@/modules/dashboard/Settings';

// Public Pages
import { LandingPage } from '@/modules/landing/LandingPage';

// Sales Routes
const SalesRoutes = React.lazy(() => import('@/pages/sales/setup'));

// Help Articles
const QuickStartGuide = React.lazy(() => import('@/modules/dashboard/help/articles/QuickStartGuide'));
const InitialSetup = React.lazy(() => import('@/modules/dashboard/help/articles/InitialSetup'));
const DashboardOverview = React.lazy(() => import('@/modules/dashboard/help/articles/DashboardOverview'));

const App = () => {
  // Set the document title with the domain
  React.useEffect(() => {
    const domain = import.meta.env.VITE_APP_DOMAIN || 'dashboard.fsagent.com';
    document.title = `ServiceAgent - ${domain}`;
  }, []);
  
  return (
    <ErrorBoundary>
      <UserPreferencesProvider>
        <BrowserRouter>
          <AuthProvider>
            <React.Suspense fallback={<LoadingState variant="full" message="Loading page..." />}>
              <Routes>
                {/* Public Routes with AppLayout */}
                <Route element={<AppLayout showNavigation={false} showFooter={false} />}>
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                </Route>

                {/* Protected Dashboard Routes - No AppLayout */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="create-interview" element={<CreateInterview />} />
                  <Route path="ai-analysis" element={<AIAnalysis />} />
                  <Route path="view-interviews" element={<ViewInterviews />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </AuthProvider>
        </BrowserRouter>
      </UserPreferencesProvider>
    </ErrorBoundary>
  );
};

export default App;