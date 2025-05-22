import { StripeCheckoutBox } from "@/components/stripe/StripeCheckoutBox";
import React, { useState } from "react";

export const Subscriptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const currency = "$";

  const plans = [
    {
      name: "Launch",
      description: (
        <>
          <p>Basic plan for teams getting started.</p>
          <ul className="list-dash">
            <li>20 AI video interviews/month</li>
            <li>Bulk invite candidates</li>
            <li>Talent management dashboard</li>
            <li>Custom pipeline stages</li>
            <li>AI analysis & analytics</li>
            <li><span className="font-bold">Candidate ranking system
              </span> (trained on 1M+ hires)</li>
            <li><span className="font-bold">Video transcription & storage</span></li>
          </ul>
        </>
      ),
      price: {monthly: 149, yearly: 1430},
      key: "LAUNCH",
    },
    {
      name: "Scale",
      description: (
        <>
          <p>For larger teams with more hiring needs.</p>
          <ul className="list-dash">
            <li>100 AI video interviews/month</li>
            <li>Interview in 10+ languages</li>
            <li>Custom branding</li>
            <li>All Launch features</li>
            <li>AI analysis & analytics</li>
            <li><span className="font-bold">20 job sourcing posts per week
              </span> (1 on Indeed, up to 19 on Facebook groups / job boards)</li>
          </ul>
        </>
      ),
      price: {monthly: 599, yearly: 5750},
      key: "SCALE",
    },
    {
      name: "Custom",
      description: (
        <>
          <p>Custom Enterprise-level features and support.</p>
          <br></br>
          <p>Fully customizable plan. Contact us directly for questions. </p>
        </>
      ),
      price: {monthly: "Custom", yearly: "Custom"},
      key: "CUSTOM",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {!selectedPlan && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className="bg-white p-6 rounded-lg shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 font-bold"><span>Monthly Price: </span>
                  {plan.key != "CUSTOM" && (<span>{currency}</span>)}
                  {plan.price.monthly.toLocaleString()}</p>
                <p className="text-gray-600 mb-4 font-bold"><span>Yearly Price: </span>
                  {plan.key != "CUSTOM" && (<span>{currency}</span>)}
                  {plan.price.yearly.toLocaleString()}</p>
                <p className="text-gray-600 mb-4">{plan.description}</p>
              </div>
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPlan && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
          <h2 className="text-xl font-bold mb-4">
            Subscribing to: {selectedPlan} Plan
          </h2>
          <button
            onClick={() => setSelectedPlan(null)}
            className="mb-4 text-sm text-blue-600 underline"
          >
            ← Go back
          </button>
          <div id="checkout">
            <StripeCheckoutBox planName={selectedPlan} yearly={true} />
          </div>
        </div>
      )}
    </div>
  );
};
