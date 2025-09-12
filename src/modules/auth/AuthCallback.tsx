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

        // Check if we have a session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (session) {
          console.log("Session found, checking user profile completion...");
          
          // Check if user has completed company profile
          const { data: user } = await supabase.auth.getUser();
          const { data: profile } = await supabase
            .from("company_profiles")
            .select("company_profile_completed")
            .eq("created_by_user_id", user.user?.id)
            .single();
          
          if (!hasNavigated.current) {
            hasNavigated.current = true;
            
            // If company profile is not completed, redirect to company setup
            if (!profile?.company_profile_completed) {
              console.log("Company profile not completed, redirecting to post-signup...");
              navigate("/post-signup", { replace: true });
            } else {
              console.log("Company profile completed, redirecting to dashboard...");
              navigate("/dashboard", { replace: true });
            }
          }
          return;
        }

        // Set up auth state change listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, !!session);

          if (session && !hasNavigated.current) {
            console.log("Session established, checking user profile completion...");
            
            // Check if user has completed company profile
            const { data: user } = await supabase.auth.getUser();
            const { data: profile } = await supabase
              .from("company_profiles")
              .select("company_profile_completed")
              .eq("created_by_user_id", user.user?.id)
              .single();
            
            hasNavigated.current = true;
            
            // If company profile is not completed, redirect to company setup
            if (!profile?.company_profile_completed) {
              console.log("Company profile not completed, redirecting to post-signup...");
              navigate("/post-signup", { replace: true });
            } else {
              console.log("Company profile completed, redirecting to dashboard...");
              navigate("/dashboard", { replace: true });
            }
          } else if (!session && !hasNavigated.current) {
            console.log('No session found, redirecting to login...');
            hasNavigated.current = true;
            navigate('/login', { replace: true });
          }
        });

        // If no session after 5 seconds, redirect to login
        const timeout = setTimeout(() => {
          if (!hasNavigated.current) {
            console.log('Auth timeout, redirecting to login...');
            hasNavigated.current = true;
            navigate('/login', { replace: true });
          }
        }, 5000);

        return () => {
          clearTimeout(timeout);
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
