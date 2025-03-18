import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { CompanyProfileForm } from '@/modules/dashboard/CompanyProfileForm';
import { routes } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PostSignupSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          throw authError;
        }
        
        if (!user) {
          // Not logged in, redirect to login
          navigate(routes.login);
          return;
        }
        
        // Check if user already has a company profile in user metadata
        // This is more reliable than checking the profiles table which might have schema issues
        if (user.user_metadata?.company_profile_completed === true) {
          // User has completed their profile according to metadata, redirect to dashboard
          navigate(routes.dashboard);
          return;
        }
        
        // If we get here, the user needs to complete their profile
        setLoading(false);
      } catch (error) {
        console.error('Error in auth check:', error);
        setError('Authentication error. Please try logging in again.');
        setLoading(false);
      }
    }
    
    checkAuth();
  }, [navigate]);
  
  const handleComplete = () => {
    navigate(routes.dashboard);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              We encountered a problem setting up your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate(routes.login)}
                className="text-primary hover:underline"
              >
                Return to Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to ServiceAgent</h1>
        <p className="text-gray-600">
          Let's set up your company profile to get started
        </p>
      </div>
      
      <CompanyProfileForm onComplete={handleComplete} />
    </div>
  );
} 