import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingState from './components/common/LoadingState';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BookDemo from './pages/BookDemo';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import AuthCallback from './pages/AuthCallback';

// Import components from dashboard
const Layout = React.lazy(() => import('./components/Layout'));
const Launchpad = React.lazy(() => import('./pages/Launchpad'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Metrics = React.lazy(() => import('./pages/Metrics'));
const Sales = React.lazy(() => import('./pages/Sales'));
const Marketing = React.lazy(() => import('./pages/Marketing'));
const Hiring = React.lazy(() => import('./pages/Hiring'));
const Operations = React.lazy(() => import('./pages/Operations'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Integrations = React.lazy(() => import('./pages/Integrations'));
const Help = React.lazy(() => import('./pages/Help'));

// Layout wrapper for public routes
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <UserPreferencesProvider>
        <AuthProvider>
          <BrowserRouter>
            <React.Suspense fallback={<LoadingState variant="full" message="Loading page..." />}>
              <Routes>
                {/* Public Routes with Footer */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/book-demo" element={<BookDemo />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                </Route>

                {/* Protected Dashboard Routes - No Footer */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Launchpad />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="metrics" element={<Metrics />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="marketing" element={<Marketing />} />
                  <Route path="hiring" element={<Hiring />} />
                  <Route path="operations" element={<Operations />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="integrations" element={<Integrations />} />
                  <Route path="help" element={<Help />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </AuthProvider>
      </UserPreferencesProvider>
    </ErrorBoundary>
  );
}

export default App;