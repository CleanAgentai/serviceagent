import React, { useState } from 'react';
import { CreditCard, Package, Receipt, ChevronRight, Shield, Loader2, Check } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { cn } from '../../lib/utils';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoice: string;
}

export default function Billing() {
  const [currentPlan, setCurrentPlan] = useState<string>('pro');
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      features: [
        'Up to 5 team members',
        'Basic analytics',
        'Standard support',
        '5GB storage'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 99,
      features: [
        'Up to 20 team members',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Custom integrations'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: [
        'Unlimited team members',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Unlimited storage',
        'Custom development',
        'SLA guarantee'
      ]
    }
  ];

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
      isDefault: true
    }
  ]);

  const billingHistory: BillingHistory[] = [
    {
      id: '1',
      date: '2024-01-28',
      amount: 99,
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: '2',
      date: '2023-12-28',
      amount: 99,
      status: 'paid',
      invoice: 'INV-2023-012'
    }
  ];

  const handlePlanChange = async (planId: string) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentPlan(planId);
      setSuccess('Plan updated successfully');
      setShowPlanSelector(false);
    } catch (error) {
      setError('Failed to update plan. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddPaymentMethod = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Payment method added successfully');
      setShowPaymentForm(false);
    } catch (error) {
      setError('Failed to add payment method. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-1">Current Plan</h3>
              <p className="text-sm text-gray-500">
                You are currently on the {plans.find(p => p.id === currentPlan)?.name} plan
              </p>
            </div>
            <Button
              onClick={() => setShowPlanSelector(true)}
              disabled={isProcessing}
            >
              Change Plan
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 bg-green-50 text-green-500 rounded-md text-sm flex items-center gap-2">
              <Check size={16} />
              {success}
            </div>
          )}
        </div>
      </Card>

      {/* Plan Selector Modal */}
      {showPlanSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Select a Plan</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPlanSelector(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    className={cn(
                      "p-6 rounded-lg border-2 transition-all duration-200",
                      plan.isPopular ? "border-blue-500 shadow-lg" : "border-gray-200",
                      "hover:border-blue-500 hover:shadow-lg cursor-pointer"
                    )}
                    onClick={() => handlePlanChange(plan.id)}
                  >
                    {plan.isPopular && (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-3xl font-bold mb-4">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check size={16} className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      variant={plan.id === currentPlan ? 'outline' : 'default'}
                      disabled={isProcessing || plan.id === currentPlan}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : plan.id === currentPlan ? (
                        'Current Plan'
                      ) : (
                        'Select Plan'
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Methods */}
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Payment Methods</h3>
              <p className="text-sm text-gray-500">
                Manage your payment methods and billing preferences
              </p>
            </div>
            <Button
              onClick={() => setShowPaymentForm(true)}
              disabled={isProcessing}
            >
              Add Payment Method
            </Button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="text-gray-400" />
                  <div>
                    <p className="font-medium">
                      •••• {method.last4}
                      {method.isDefault && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Add Payment Method Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Payment Method</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentForm(false)}
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Card Number
                  </label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expiry Date
                    </label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      CVC
                    </label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cardholder Name
                  </label>
                  <Input placeholder="John Doe" />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentForm(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Add Payment Method'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Billing History */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Billing History</h3>
          <div className="space-y-4">
            {billingHistory.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Receipt className="text-gray-400" />
                  <div>
                    <p className="font-medium">${item.amount}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm",
                      item.status === 'paid' && "bg-green-100 text-green-600",
                      item.status === 'pending' && "bg-yellow-100 text-yellow-600",
                      item.status === 'failed' && "bg-red-100 text-red-600"
                    )}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
} 