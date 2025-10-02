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
          traits: { first_name: user.user_metadata?.full_name?.split(" ")[0] || "", plan_status: "onboarding", last_seen_at: new Date().toISOString() },
        }),
      });
      if (!identifyRes.ok) throw new Error(`identify failed: ${identifyRes.status}`);

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
      .then((data) => {
        if (data.paid) {
          setStatus("success");
          // Redirect to company profile setup after successful payment
          setTimeout(() => {
            handleCustomerio("trial_started");
            navigate("/post-signup");
          }, 3000);
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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow">
        {status === "verifying" && (
          <>
            <h2 className="text-xl font-semibold">Verifying your payment...</h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
            <p className="text-gray-600 mt-2">Thank you for your subscription.</p>
            <button
              onClick={() => navigate("/post-signup")}
              className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Complete Your Profile
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">Payment Verification Failed</h2>
            <p className="text-gray-600 mt-2">Please contact support or try again.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;