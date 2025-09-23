import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

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

  const fetchClientSecret = useCallback(async (planName : string, yearly : boolean) => {
    console.log("Stripe starting fetch client secret");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error("Fetch user error: ", error?.message);
      return Promise.reject("Fetch user error");
    }

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
        "Accept": "application/json",
      },
      body: JSON.stringify({
        lookup_key: lookup_key_match,
        user_id: user.id,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Checkout init failed: ${res.status}`);
        const data = await res.json();
        // accept both camelCase and snake_case
        return data.clientSecret ?? data.client_secret;
      });
  }, []);
  
  return (
    <div className="w-full bg-transparent py-4 rounded-lg flex justify-center">
      <div id="checkout" className="w-full max-w-none overflow-y-auto">
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
