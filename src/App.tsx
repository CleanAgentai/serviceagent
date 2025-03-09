import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { UserPreferencesProvider } from '@/app/providers/UserPreferencesContext';
import { AuthProvider } from '@/app/providers/AuthContext';
import { ProtectedRoute } from '@/app/shared/auth/ProtectedRoute';
import { ErrorBoundary } from '@/app/shared/common/ErrorBoundary';
import { LoadingState } from '@/app/shared/common/LoadingState';
import { AppLayout } from '@/app/shared/layouts/AppLayout';

// Public Pages
import { LandingPage } from '@/modules/landing/LandingPage';
import { Login } from '@/modules/auth/Login';
import { Signup } from '@/modules/auth/Signup';
import { AuthCallback } from '@/modules/auth/AuthCallback';
import { PrivacyPolicy } from '@/modules/legal/PrivacyPolicy';
import { TermsOfService } from '@/modules/legal/TermsOfService';
import { CookiePolicy } from '@/modules/legal/CookiePolicy';
import { AboutUs } from '@/modules/company/AboutUs';
import { Contact } from '@/modules/company/Contact';
import { Blog } from '@/modules/blog/Blog';
import { BlogPost } from '@/modules/blog/BlogPost';
import { NotFound } from '@/modules/error/NotFound';

// Dashboard Pages
const DashboardLayout = React.lazy(() => import('@/modules/dashboard/DashboardLayout'));
const Launchpad = React.lazy(() => import('@/modules/dashboard/Launchpad'));
const Chat = React.lazy(() => import('@/modules/dashboard/Chat'));
const Metrics = React.lazy(() => import('@/modules/dashboard/Metrics'));
const Sales = React.lazy(() => import('@/modules/dashboard/Sales'));
const Marketing = React.lazy(() => import('@/modules/dashboard/Marketing'));
const Hiring = React.lazy(() => import('@/modules/dashboard/Hiring'));
const Operations = React.lazy(() => import('@/modules/dashboard/Operations'));
const Settings = React.lazy(() => import('@/modules/dashboard/Settings'));
const Integrations = React.lazy(() => import('@/modules/dashboard/Integrations'));
const Help = React.lazy(() => import('@/modules/dashboard/Help'));

// Sales Routes
const SalesRoutes = React.lazy(() => import('@/pages/sales/setup'));

// Help Articles
const QuickStartGuide = React.lazy(() => import('@/modules/dashboard/help/articles/QuickStartGuide'));
const InitialSetup = React.lazy(() => import('@/modules/dashboard/help/articles/InitialSetup'));
const DashboardOverview = React.lazy(() => import('@/modules/dashboard/help/articles/DashboardOverview'));

function App() {
  return (
    <ErrorBoundary>
      <UserPreferencesProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <React.Suspense fallback={<LoadingState variant="full" message="Loading page..." />}>
              <Routes>
                {/* Auth Routes - No Navigation/Footer */}
                <Route element={<AppLayout showNavigation={false} showFooter={false} />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                </Route>

                {/* Public Routes with Navigation/Footer */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
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
                  <Route index element={<Launchpad />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="metrics" element={<Metrics />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="sales/*" element={<SalesRoutes />} />
                  <Route path="marketing" element={<Marketing />} />
                  <Route path="hiring" element={<Hiring />} />
                  <Route path="operations" element={<Operations />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="integrations" element={<Integrations />} />
                  <Route path="help" element={<Help />} />
                  <Route path="help/articles/quickstart" element={<QuickStartGuide />} />
                  <Route path="help/articles/setup" element={<InitialSetup />} />
                  <Route path="help/articles/dashboard" element={<DashboardOverview />} />
                  <Route path="*" element={<NotFound />} />
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
}

export default App;