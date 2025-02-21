import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/app/lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const hasNavigated = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Starting auth callback handling...');
        
        // Check URL parameters for OAuth response
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          console.error('OAuth error:', error, errorDescription);
          throw new Error(errorDescription || 'Authentication failed');
        }

        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          throw sessionError;
        }

        // If we have a valid session, navigate to dashboard
        if (session && !hasNavigated.current) {
          console.log('Valid session found, navigating to dashboard');
          hasNavigated.current = true;
          navigate('/dashboard', { replace: true });
          return;
        }

        // If no session, set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Auth state changed:', event, !!session);
          
          if (session && !hasNavigated.current) {
            console.log('Session established via auth state change, navigating to dashboard');
            hasNavigated.current = true;
            navigate('/dashboard', { replace: true });
          } else if (!session && !hasNavigated.current) {
            console.log('No session after auth state change, navigating to login');
            hasNavigated.current = true;
            navigate('/login', { replace: true });
          }
        });

        // Clean up subscription when component unmounts
        return () => {
          console.log('Cleaning up auth state subscription');
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        if (!hasNavigated.current) {
          hasNavigated.current = true;
          navigate('/login', { replace: true });
        }
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-gray-600 mb-4">Completing authentication...</div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
} 