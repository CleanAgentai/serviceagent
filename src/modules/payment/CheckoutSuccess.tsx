import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";

const CheckoutSuccess = () => {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleCustomerio = async (event: string) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const { data: { user } } = await supabase.auth.getUser();
    try {
      const identifyRes = await fetch(`${apiBaseUrl}/api/customerio/identify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          traits: { email: user.email,first_name: user.user_metadata?.full_name?.split(" ")[0] || "", plan_status: "onboarding", last_seen_at: new Date().toISOString() },
        }),
      });
      if (!identifyRes.ok) throw new Error(`identify failed: ${identifyRes.status}`);

      const rowAdd = [{
        created_at: new Date().toISOString(),
        user_id: user.id,
        plan_status: "onboarding",
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      }];

      try {
        const { data, error } = await supabase
          .from('customerio')
          .insert(rowAdd)
          .select();
      
        if (error) {
          console.error('Insert customerio error:', error);
          throw error;
        }
      
        console.log('Inserted customerio data:', data);
      } catch (err) {
        console.error('Error:', err);
      }

      const trackRes = await fetch(`${apiBaseUrl}/api/customerio/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          event: event,
          traits: { },
        }),
      });
      if (!trackRes.ok) throw new Error(`track failed: ${trackRes.status}`);

    } catch (cioErr) {
      console.error("Customer.io backend calls failed:", cioErr);
    }
  }


  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    fetch(`${apiBaseUrl}/api/stripe/verify-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then(async (data) => {
        if (data.paid) {
          setStatus("success");

          handleCustomerio("trial_started");

          
          // Clear the cached plan data to force refresh after upgrade
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              const storageKey = `sa:userPlan:${user.id}`;
              localStorage.removeItem(storageKey);
            }
          } catch (error) {
            console.error("Error clearing plan cache:", error);
          }
          
          // Check if company profile is already completed
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              const { data: profile } = await supabase
                .from("company_profiles")
                .select("company_profile_completed")
                .eq("created_by_user_id", user.id)
                .single();
              
              // Redirect based on profile completion status
              setTimeout(() => {
                if (profile?.company_profile_completed) {
                  navigate("/dashboard");
                } else {
                  navigate("/post-signup");
                }
              }, 3000);
            } else {
              // Fallback to post-signup if user not found
              setTimeout(() => {
                navigate("/post-signup");
              }, 3000);
            }
          } catch (error) {
            console.error("Error checking profile completion:", error);
            // Fallback to post-signup on error
            setTimeout(() => {
              navigate("/post-signup");
            }, 3000);
          }
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setStatus("error");
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full text-center p-8 rounded-lg">
        {status === "verifying" && (
          <>
            <h2 className="text-xl font-semibold">Verifying your payment...</h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
            <p className="text-gray-600 mt-2">Thank you for your subscription. Redirecting you now...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">Payment Verification Failed</h2>
            <p className="text-gray-600 mt-2">Please contact support or try again.</p>
            <button
              onClick={() => navigate("/")}
              className="mx-auto w-full group flex items-center justify-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-full
              border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;