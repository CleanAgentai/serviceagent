// src/hooks/useUserPlan.ts
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { supabase } from '@/app/lib/supabase';

export interface UserPlan {
  plan: string | null;
  isLoading: boolean;

  /* TRUE if the user has a plan, else show subscription required screen */
  hasPlan: boolean;

  /* Check if the user has access to a feature based on their plan */
  hasAccess: (requiredPlan: string) => boolean;
}

export function usePlan(): UserPlan {
  const { user } = useAuth();
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setPlan(null);
        setIsLoading(false);
        return;
      }

      const storageKey = `sa:userPlan:${user.id}`;
      try {
        // Try cached plan first
        const cachedRaw = localStorage.getItem(storageKey);
        if (cachedRaw) {
          try {
            const cached = JSON.parse(cachedRaw) as { plan: string | null; ts: number };
            // 10 minutes TTL
            const isFresh = Date.now() - cached.ts < 10 * 60 * 1000;
            if (isFresh) {
              setPlan(cached.plan ?? null);
              setIsLoading(false);
              return;
            }
          } catch {}
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('subscription')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user plan:', error);
          setPlan(null);
          localStorage.removeItem(storageKey);
        } else {
          const nextPlan = data?.subscription || null;
          setPlan(nextPlan);
          // cache
          try {
            localStorage.setItem(storageKey, JSON.stringify({ plan: nextPlan, ts: Date.now() }));
          } catch {}
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setPlan(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, [user?.id]);

  const hasPlan = plan !== null;

  const hasAccess = (requiredPlan: string): boolean => {
    if (!plan) return false;

    const planHierarchy = {
      'STARTER': 1,
      'LAUNCH': 2,
      'SCALE': 3,
      'CUSTOM': 3,
      'TEST': 4,
    } as const;

    const normalizedUserPlan = String(plan).toUpperCase();
    const normalizedRequired = String(requiredPlan).toUpperCase();

    const userPlanLevel = planHierarchy[normalizedUserPlan as keyof typeof planHierarchy] ?? 0;
    const requiredPlanLevel = planHierarchy[normalizedRequired as keyof typeof planHierarchy] ?? 0;

    return userPlanLevel >= requiredPlanLevel;
  };

  return {
    plan,
    isLoading,
    hasPlan,
    hasAccess
  };
}