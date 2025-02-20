import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AgentProvider } from './contexts/AgentContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingState from './components/common/LoadingState';

// Lazy load pages
const Login = React.lazy(() => import('./pages/Login'));
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
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Configure future flags for React Router v7
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

function App() {
  return (
    <ErrorBoundary>
      <UserPreferencesProvider>
        <AuthProvider>
          <BrowserRouter future={routerFutureConfig}>
            <AgentProvider>
              <React.Suspense fallback={<LoadingState variant="full" message="Loading page..." />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <Routes>
                            <Route path="/" element={<Launchpad />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/metrics" element={<Metrics />} />
                            <Route path="/sales" element={<Sales />} />
                            <Route path="/marketing" element={<Marketing />} />
                            <Route path="/hiring" element={<Hiring />} />
                            <Route path="/operations" element={<Operations />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/integrations" element={<Integrations />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </React.Suspense>
            </AgentProvider>
          </BrowserRouter>
        </AuthProvider>
      </UserPreferencesProvider>
    </ErrorBoundary>
  );
}

export default App;