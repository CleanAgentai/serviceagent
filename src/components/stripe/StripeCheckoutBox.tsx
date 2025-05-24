import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import React, {useCallback } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

/**
 * Props for the StripeCheckoutBox component.
 */
interface StripeCheckoutBoxProps {
  /**
   * The name of the selected subscription plan (e.g., "Launch", "Scale", "Enterprise").
   */
  planName: string;

  /**
   * Indicates whether the subscription is billed yearly.
   * - `true`: Yearly billing
   * - `false`: Monthly billing
   */
  yearly: boolean;
}

export const StripeCheckoutBox: React.FC<StripeCheckoutBoxProps> = ({planName, yearly}) => {
  const fetchClientSecret = useCallback((planName : string, yearly : boolean) => {
    console.log("Stripe starting fetch client secret")
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    var lookupKeyMap : Record<string, string> = null;

    if (yearly) {
      lookupKeyMap = {
        LAUNCH: "launch_yearly",
        SCALE: "scale_yearly",
        ENTERPRISE: "TODO",
      };
    } else {
      lookupKeyMap = {
        LAUNCH: "launch_monthly",
        SCALE: "scale_monthly",
        ENTERPRISE: "TODO",
      }
    }
  
    const lookup_key_match = lookupKeyMap[planName.toUpperCase()];
  
    if (!lookup_key_match) {
      console.error("Invalid plan name provided:", planName);
      return Promise.reject("Invalid plan name");
    }

    return fetch(`${apiBaseUrl}/api/stripe/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lookup_key: lookup_key_match,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  
  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <div id="checkout">
        <EmbeddedCheckoutProvider 
          stripe={stripePromise} 
          options={{fetchClientSecret : () => fetchClientSecret(planName, yearly)}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};
