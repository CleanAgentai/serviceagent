import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Zap,
  Users,
  FileText,
  Settings,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePlan } from '@/hooks/usePlan';

type PlanKey = 'STARTER' | 'LAUNCH' | 'SCALE' | 'CUSTOM' | 'TEST';

export function SubscriptionRequired({ requiredPlanKey, featureName, title }: { requiredPlanKey?: PlanKey; featureName?: string; title?: string }) {
  const navigate = useNavigate();
  const { isLoading, hasPlan } = usePlan();

  const planKeyToLabel: Record<PlanKey, string> = {
    STARTER: 'Starter',
    LAUNCH: 'Launch',
    SCALE: 'Scale',
    CUSTOM: 'Custom',
    TEST: 'Test',
  };

  const requiredPlanLabel = requiredPlanKey ? planKeyToLabel[requiredPlanKey] : undefined;

  return (
    <div className="min-h-[50svh] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold/20 to-terracotta/20 rounded-full mb-6">
            <Lock className="w-10 h-10 text-gold" />
          </div>
          <h1 className="max-w-2xl mx-auto text-4xl md:text-5xl font-bold text-primary mb-4">
            {title ?? (featureName
              ? <>Upgrade to unlock <span className="text-primary">{featureName}</span></>
              : 'Upgrade your plan')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock {featureName} by upgrading your plan.
            {!isLoading && !hasPlan && (
              <>
                <br />
                Start your 14-day free trial today. No charges until your trial ends.
              </>
            )}
          </p>
          {requiredPlanLabel && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-terracotta/30 bg-terracotta/10 px-4 py-2 text-terracotta">
              <Lock className="w-4 h-4" />
              <span>
                This feature requires the <strong>{requiredPlanLabel}</strong> plan.
              </span>
            </div>
          )}
        </div>
        {/* <div className="text-center">
            <Button onClick={() => navigate('/payment/subscription')} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            View plans & pricing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
