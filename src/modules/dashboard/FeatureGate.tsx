import { ReactNode } from 'react';
import { usePlan } from '@/hooks/usePlan';
import Loading from '@/components/common/Loading';
import { SubscriptionRequired } from '@/modules/error/SubscriptionRequired';

type FeatureGateProps = {
  requiredPlan: 'STARTER' | 'LAUNCH' | 'SCALE' | 'CUSTOM' | 'TEST';
  children: ReactNode;
  showGate?: boolean; // Show subscription required screen
  fallback?: ReactNode;
  featureName?: string;
  title?: string;
};

export function FeatureGate({ requiredPlan, children, fallback, featureName, title, showGate = true }: FeatureGateProps) {
  const { isLoading, hasAccess } = usePlan();

  if (isLoading) return <Loading />;
  if (!hasAccess(requiredPlan)) {
    if (!showGate) return null;
    return <>{fallback ?? <SubscriptionRequired requiredPlanKey={requiredPlan} featureName={featureName} title={title} />}</>;
  }
  return <>{children}</>;
}