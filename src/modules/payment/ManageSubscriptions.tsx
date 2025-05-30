import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { useNavigate } from "react-router-dom";

const ManageSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasActiveSub, setHasActiveSub] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) return;

      const { data, error: queryError } = await supabase
        .from("profiles")
        .select("subscription_id")
        .eq("id", user.id)
        .single();

      if (!queryError && data?.subscription_id) {
        setHasActiveSub(true);
      } else {
        setHasActiveSub(false);
      }
    };

    checkSubscription();
  }, []);

  const handleCancel = async () => {
    const {
        data: { user },
        error: auth_error,
    } = await supabase.auth.getUser();

    console.log(user);

    if (auth_error || !user) {
        console.error("Fetch user error: ", auth_error?.message);
        return Promise.reject("Fetch user error");
    }

    const { data, error: querry_error } = await supabase
      .from('profiles')
      .select('subscription_id')
      .eq('id', user.id)
      .single();
    
    console.log("User subscription: ", data);
    const { subscription_id: subToDel } = data;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stripe/cancel-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subToDel }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Subscription cancelled successfully.");
        const { data, error: update_error } = await supabase
          .from('profiles')
          .update({subscription: "", subscription_id: ""})
          .eq('id', user.id)
          .select('*');
        if (update_error) {
          console.log(update_error);
        }
        setHasActiveSub(false);
      } else {
        setMessage("Failed to cancel subscription.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700">
      <h1 className="text-2xl font-bold mb-4 text-center text-zinc-800 dark:text-zinc-100">
        Cancel Subscription
      </h1>

      <div className="relative group w-full">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!hasActiveSub || loading}
          className={`w-full py-2 rounded-md font-medium transition duration-200 ${
            !hasActiveSub
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          } disabled:opacity-50`}
        >
          {loading ? "Cancelling..." : "Cancel Subscription"}
        </button>

        {/* Tooltip when no active subscription */}
        {!hasActiveSub && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-gray-800 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-center z-10">
            You don’t have an active subscription to cancel.
          </div>
        )}
      </div>
      
      {showConfirm && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
            Confirm Cancellation
          </h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-6">
            Are you sure you want to cancel your subscription? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={async () => {
                setShowConfirm(false);
                await handleCancel();
              }}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
      )}

      <div className="relative group w-full mt-4">
        <button
          onClick={() => navigate("/payment/subscription")}
          disabled={hasActiveSub}
          className={`w-full py-2 rounded-md font-medium transition duration-200 ${
            hasActiveSub
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Add a Subscription
        </button>

        {hasActiveSub && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-gray-800 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center">
            You have an active subscription. Cancel it first to change to a new one.
          </div>
        )}
      </div>

      {message && (
        <p className="mt-4 text-sm text-center text-zinc-700 dark:text-zinc-300">
          {message}
        </p>
      )}
    </div>
  );
};

export default ManageSubscriptions;