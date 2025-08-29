import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserPreferencesProvider } from "@/app/providers/UserPreferencesContext";
import { AuthProvider } from "@/app/providers/AuthContext";
import { ProtectedRoute } from "@/app/shared/auth/ProtectedRoute";
import { ErrorBoundary } from "@/app/shared/common/ErrorBoundary";
import { LoadingState } from "@/app/shared/common/LoadingState";
import { AppLayout } from "@/app/shared/layouts/AppLayout";
import { Login } from "@/modules/auth/Login";
import { Signup } from "@/modules/auth/Signup";
import { AuthCallback } from "@/modules/auth/AuthCallback";
import { OAuthCallback } from "./modules/auth/OauthCallback";
import { CompleteProfile } from "./modules/auth/CompleteProfile";
import { PostSignupSetup } from "@/modules/auth/PostSignupSetup";
import { PrivacyPolicy } from "@/modules/legal/PrivacyPolicy";
import { TermsOfService } from "@/modules/legal/TermsOfService";
import { CookiePolicy } from "@/modules/legal/CookiePolicy";
import { NotFound } from "@/modules/error/NotFound";
import setupDatabase from "@/utils/setupDatabase";
import { Toaster } from "sonner";

// Dashboard Components
import DashboardLayout from "@/modules/dashboard/DashboardLayout";
import Dashboard from "@/modules/dashboard/Dashboard";
import Settings from "@/modules/dashboard/Settings";
import AIAnalysis from "@/modules/dashboard/AIAnalysis";

// Interview Components
import CreateInterview from "@/modules/interviews/CreateInterview";
import { ViewInterviews } from "@/modules/interviews/ViewInterviews";
import { ViewResponses } from "@/modules/interviews/ViewResponses";
import { ResponseDetails } from "@/modules/interviews/ResponseDetails";
import EditInterview from "@/modules/interviews/EditInterview";
// Public Pages
import LandingPage from "@/modules/landing/LandingPage";
import { AboutUs } from "./modules/company/AboutUs";
import { Contact } from "./modules/company/Contact";
import { Blog, BlogPost } from "./modules/blog";
import { ForgotPassword } from "./modules/auth/ForgotPassword";
import { ResetPassword } from "./modules/auth/ResetPassword";
// import { ResetPasswordConfirm } from "./modules/auth/ResetPasswordConfirm";
import { Subscriptions } from "./modules/payment/Subscriptions";
import { ResetPasswordHandoff } from "./modules/auth/ResetPasswordHandoff";
import CheckoutSuccess from "./modules/payment/CheckoutSuccess";
import CancelSubscription from "./modules/payment/ManageSubscriptions";
import ManageSubscriptions from "./modules/payment/ManageSubscriptions";
import Integrations from "./pages/integrations";
import GettingStarted from "./components/onboarding/GettingStarted";
import WelcomePopupController from "@/components/onboarding/PopupController";

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

// Industry Pages
const ResidentialCleaning = React.lazy(() => import("@/modules/industries/ResidentialCleaning"));
const CommercialCleaning = React.lazy(() => import("@/modules/industries/CommercialCleaning"));
const HVAC = React.lazy(() => import("@/modules/industries/HVAC"));
const Plumbing = React.lazy(() => import("@/modules/industries/Plumbing"));
const Landscaping = React.lazy(() => import("@/modules/industries/Landscaping"));
const PestControl = React.lazy(() => import("@/modules/industries/PestControl"));
const Franchises = React.lazy(() => import("@/modules/industries/Franchises"));
const Staffing = React.lazy(() => import("@/modules/industries/Staffing"));
const OutsourcingFirms = React.lazy(() => import("@/modules/industries/OutsourcingFirms"));
const Restaurants = React.lazy(() => import("@/modules/industries/Restaurants"));
const Hospitality = React.lazy(() => import("@/modules/industries/Hospitality"));

const App = () => {
  useEffect(() => {
    document.title = "ServiceAgent - Automate hiring for hourly roles";
    // Initialize database
    const initDatabase = async () => {
      try {
        await setupDatabase();
      } catch (error) {
        console.error("Failed to initialize database:", error);
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
            fallback={<LoadingState variant="full" message="Loading page..." />}
          >
            <ErrorBoundary>
              <Routes>
                {/* Auth Callback Route - Must be outside AppLayout */}
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* Landing Page - NO AppLayout */}
                <Route path="/" element={<LandingPage />} />

                {/* Post Signup - NO AppLayout (no nav, no footer) */}
                <Route path="/post-signup" element={<PostSignupSetup />} />
                {/* Plan Onboarding - NO AppLayout (no nav, no footer) */}
                <Route path="/plan-onboarding" element={<Subscriptions />} />
                {/* Complete Profile - NO AppLayout (no nav, no footer) */}
                <Route path="/complete-profile" element={<CompleteProfile />} />

                {/* Public Routes with AppLayout */}
                <Route
                  element={
                    <AppLayout showNavigation={true} showFooter={false} />
                  }
                >
                  <Route
                    path="/login"
                    element={<Navigate to="/signin" replace />}
                  />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="reset-password-handoff"
                    element={<ResetPasswordHandoff />}
                  />
                  <Route path="/oauth-callback" element={<OAuthCallback />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                </Route>
                <Route
                  element={
                    <AppLayout showNavigation={true} showFooter={true} />
                  }
                >
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route
                    path="/terms-of-service"
                    element={<TermsOfService />}
                  />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/industries/residential-cleaning" element={<ResidentialCleaning />} />
                  <Route path="/industries/commercial-cleaning" element={<CommercialCleaning />} />
                  <Route path="/industries/hvac" element={<HVAC />} />
                  <Route path="/industries/plumbing" element={<Plumbing />} />
                  <Route path="/industries/landscaping" element={<Landscaping />} />
                  <Route path="/industries/pest-control" element={<PestControl />} />
                  <Route path="/industries/franchises" element={<Franchises />} />
                  <Route path="/industries/staffing" element={<Staffing />} />
                  <Route path="/industries/outsourcing-firms" element={<OutsourcingFirms />} />
                  <Route path="/industries/restaurants" element={<Restaurants />} />
                  <Route path="/industries/hospitality" element={<Hospitality />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <WelcomePopupController />
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="ai-analysis" element={<AIAnalysis />} />
                  <Route path="onboarding" element={<GettingStarted />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Protected Payment Routes */}
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="subscription" element={<Subscriptions />} />
                  <Route path="manage-subscription" element={<ManageSubscriptions />} />
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
                  <Route path="edit/:interviewId" element={<EditInterview />} />
                  <Route path="responses" element={<ViewResponses />} />
                  <Route
                    path="responses/:responseId"
                    element={<ResponseDetails />}
                  />
                  <Route path=":interviewId" element={<ViewResponses />} />
                </Route>
                
                {/* Integrations Route */}
                                <Route
                  path="/integrations"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Integrations />} />
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
