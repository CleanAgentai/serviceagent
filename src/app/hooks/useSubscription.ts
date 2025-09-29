import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

interface SubscriptionData {
  subscription: string | null;
  subscription_id: string | null;
  loading: boolean;
  error: string | null;
}

export const useSubscription = (): SubscriptionData => {
  const [subscription, setSubscription] = useState<string | null>(null);
  const [subscription_id, setSubscriptionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          setError('User not authenticated');
          return;
        }

        const { data, error: queryError } = await supabase
          .from('profiles')
          .select('subscription, subscription_id')
          .eq('id', user.id)
          .single();

        if (queryError) {
          setError(queryError.message);
          return;
        }

        setSubscription(data?.subscription || null);
        setSubscriptionId(data?.subscription_id || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  return {
    subscription,
    subscription_id,
    loading,
    error,
  };
};

// Helper function to check if user has Scale or Custom plan
export const isScalePlan = (subscription: string | null): boolean => {
  return subscription === 'Scale' || subscription === 'Custom';
};

// Helper function to check if user has a paid plan (not free trial)
export const hasPaidPlan = (subscription: string | null): boolean => {
  return subscription && subscription !== 'Free Trial' && subscription !== null;
};