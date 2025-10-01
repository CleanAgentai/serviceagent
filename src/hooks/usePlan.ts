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

  /* Human label (e.g., "Starter") and normalized key (e.g., "STARTER") */
  planLabel?: string;
  planKey?: 'STARTER' | 'LAUNCH' | 'SCALE' | 'CUSTOM' | 'TEST' | 'TRIAL' | 'NONE';

  /* Plan limit utilities for progress bars */
  planLimit: number | null;
  getPlanLimit: (planKey?: string | null) => number | null;
  /* Fetch current usage (attempts count) for the company, to compute progress */
  fetchPlanUsage: () => Promise<number>;
}

export function usePlan(): UserPlan {
  const { user } = useAuth();
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [planLimit, setPlanLimit] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setPlan(null);
        setIsLoading(false);
        setPlanLimit(getPlanLimit(null));
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
              const cachedPlan = cached.plan ?? null;
              setPlan(cachedPlan);
              setPlanLimit(getPlanLimit(cachedPlan));
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
          setPlanLimit(getPlanLimit(nextPlan));
          // cache
          try {
            localStorage.setItem(storageKey, JSON.stringify({ plan: nextPlan, ts: Date.now() }));
          } catch {}
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        setPlan(null);
        setPlanLimit(getPlanLimit(null));
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

  // Helpers for plan label/key and limits
  const toPlanKey = (value?: string | null): UserPlan['planKey'] => {
    const key = String(value || '').toUpperCase();
    if (!value) return 'TRIAL';
    if (key === 'STARTER') return 'STARTER';
    if (key === 'LAUNCH') return 'LAUNCH';
    if (key === 'SCALE') return 'SCALE';
    if (key === 'CUSTOM') return 'CUSTOM';
    if (key === 'TEST') return 'TEST';
    return 'NONE';
  };

  const getPlanLimit = (value?: string | null): number | null => {
    const key = toPlanKey(value);
    switch (key) {
      case 'STARTER':
        return 10;
      case 'LAUNCH':
        return 20;
      case 'SCALE':
        return 100;
      // FETCH FROM DB
      case 'CUSTOM':
        return 1000;
      case 'TEST':
        return 100000;
      case 'TRIAL':
      case 'NONE':
      default:
        return 1; // default minimal capacity for trial/none
    }
  };

  const planKey = toPlanKey(plan);
  const planLabel = plan
    ? plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()
    : 'Free Trial';

  const fetchPlanUsage = async (): Promise<number> => {
    try {
      const { data: auth } = await supabase.auth.getUser();
      const currentUser = auth?.user;
      if (!currentUser) return 0;

      const { data: profile, error: profileError } = await supabase
        .from('company_profiles')
        .select('willo_company_key')
        .eq('created_by_user_id', currentUser.id)
        .single();

      if (profileError || !profile?.willo_company_key) return 0;
      const companyKey = profile.willo_company_key as string;

      const { count, error } = await supabase
        .from('interview_attempts')
        .select('id', { count: 'exact', head: true })
        .eq('department_key', companyKey);

      if (error) return 0;
      return typeof count === 'number' ? count : 0;
    } catch {
      return 0;
    }
  };

  return {
    plan,
    isLoading,
    hasPlan,
    hasAccess,
    planLabel,
    planKey,
    planLimit,
    getPlanLimit,
    fetchPlanUsage,
  };
}