// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import React, { useCallback, useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

// /**
//  * Props for the StripeCheckoutBox component.
//  */
// interface StripeCheckoutBoxProps {
//   /**
//    * The name of the selected subscription plan (e.g., "Launch", "Scale", "Enterprise").
//    */
//   planName: string;

//   /**
//    * Indicates whether the subscription is billed yearly.
//    * - `true`: Yearly billing
//    * - `false`: Monthly billing
//    */
//   yearly: boolean;
// }

// export const StripeCheckoutBox: React.FC<StripeCheckoutBoxProps> = ({planName, yearly}) => {

//   const fetchClientSecret = useCallback(async (planName : string, yearly : boolean) => {
//     console.log("Stripe starting fetch client secret");

//     const {
//       data: { user },
//       error,
//     } = await supabase.auth.getUser();

//     if (error || !user) {
//       console.error("Fetch user error: ", error?.message);
//       return Promise.reject("Fetch user error");
//     }

//     const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

//     var lookupKeyMap : Record<string, string> = null;

//     if (yearly) {
//       lookupKeyMap = {
//         LAUNCH: "launch_yearly",
//         SCALE: "scale_yearly",
//         ENTERPRISE: "TODO",
//       };
//     } else {
//       lookupKeyMap = {
//         LAUNCH: "launch_monthly",
//         SCALE: "scale_monthly",
//         ENTERPRISE: "TODO",
//       }
//     }
  
//     const lookup_key_match = lookupKeyMap[planName.toUpperCase()];
  
//     if (!lookup_key_match) {
//       console.error("Invalid plan name provided:", planName);
//       return Promise.reject("Invalid plan name");
//     }

//     return fetch(`${apiBaseUrl}/api/stripe/checkout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         lookup_key: lookup_key_match,
//         user_id: user.id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);
  
//   return (
//     <div className="max-w-7xl mx-auto mt-12 bg-white p-6 rounded-lg">
//       <div id="checkout">
//         <EmbeddedCheckoutProvider 
//           stripe={stripePromise} 
//           options={{fetchClientSecret : () => fetchClientSecret(planName, yearly)}}
//         >
//           <EmbeddedCheckout />
//         </EmbeddedCheckoutProvider>
//       </div>
//     </div>
//   );
// };

import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import React, { useCallback, useMemo } from "react";
import { supabase } from "@/app/lib/supabase";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutBoxProps {
  planName: string;
  yearly: boolean;
}

const PLAN_LOOKUP: Record<"monthly" | "yearly", Record<string, string>> = {
  monthly: {
    LAUNCH: "launch_monthly",
    SCALE: "scale_monthly",
    ENTERPRISE: "TODO",
  },
  yearly: {
    LAUNCH: "launch_yearly",
    SCALE: "scale_yearly",
    ENTERPRISE: "TODO",
  },
};

export const StripeCheckoutBox: React.FC<StripeCheckoutBoxProps> = ({ planName, yearly }) => {
  const fetchClientSecret = useCallback(async () => {
    console.log("Stripe starting fetch client secret");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error("Fetch user error: ", error?.message);
      throw new Error("No user");
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
    if (!apiBaseUrl) throw new Error("VITE_API_BASE_URL is missing");

    const tier = yearly ? "yearly" : "monthly";
    const key = PLAN_LOOKUP[tier]?.[planName.toUpperCase()];
    if (!key) throw new Error(`Invalid plan: ${planName} (${tier})`);

    const res = await fetch(`${apiBaseUrl}/api/stripe/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        lookup_key: key,
        user_id: user.id,
        return_url: `${window.location.origin}/billing/return`,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Checkout init failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    const clientSecret = data.clientSecret ?? data.client_secret;
    if (!clientSecret) throw new Error("Missing client secret in response");
    return clientSecret as string;
  }, [planName, yearly]);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <div className="max-w-7xl mx-auto mt-12 bg-white p-6 rounded-lg">
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

