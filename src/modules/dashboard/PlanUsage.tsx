import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/stripe/ProgressBar';
import { usePlan } from '@/hooks/usePlan';

type PlanUsageProps = {
  title?: string;
  className?: string;
};

export default function PlanUsage({ title = 'Candidates Used:', className = ''}: PlanUsageProps) {
  const { planLimit, fetchPlanUsage } = usePlan();
  const [used, setUsed] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const value = await fetchPlanUsage();
      if (mounted) setUsed(value);
    })();
    return () => {
      mounted = false;
    };
  }, [fetchPlanUsage]);

  if (planLimit == null) return null;

  return (
    <div className={className}>
      <p className="text-sm font-medium whitespace-nowrap mb-1">{title}</p>
      <ProgressBar used={used} limit={planLimit} />
    </div>
  );
}


