import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/stripe/ProgressBar';
import { usePlan } from '@/hooks/usePlan';

type PlanUsageProps = {
  title?: string;
  className?: string;
};

export default function PlanUsage({ title = 'Candidates Used:', className = ''}: PlanUsageProps) {
  const { planLimit, fetchPlanUsage, refreshPlan } = usePlan();
  const [used, setUsed] = useState<number>(0);

  const refreshUsage = async () => {
    const value = await fetchPlanUsage();
    setUsed(value);
  };

  useEffect(() => {
    let mounted = true;
    refreshUsage();
    return () => {
      mounted = false;
    };
  }, [fetchPlanUsage]);

  // Refresh usage data when plan limit changes (indicates plan change)
  useEffect(() => {
    refreshUsage();
  }, [planLimit]);

  if (planLimit == null) return null;

  return (
    <div className={className}>
      <p className="text-sm font-medium whitespace-nowrap mb-1">{title}</p>
      <ProgressBar used={used} limit={planLimit} />
    </div>
  );
}


