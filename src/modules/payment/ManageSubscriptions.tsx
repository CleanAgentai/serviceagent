import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ManageSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [subName, setSubName] = useState<string | null>("Loading...");
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
        .select("subscription, subscription_id")
        .eq("id", user.id)
        .single();

      if (!queryError && data?.subscription_id) {
        setSubName(data?.subscription);
        setHasActiveSub(true);
      } else {
        setSubName("None");
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
        body: JSON.stringify({ subToDel, user_id: user.id }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Subscription cancelled successfully.");
        
        // Clear the cached plan data to force refresh
        const storageKey = `sa:userPlan:${user.id}`;
        localStorage.removeItem(storageKey);
        
        // Update local state immediately
        setHasActiveSub(false);
        setSubName("None");
        
        // Trigger a page refresh to update all components
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        if (subName == 'Custom') {
          setMessage("You have a custom plan.")
        } else {
          setMessage("Failed to cancel subscription.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mt-10 text-2xl font-bold text-blue-600 text-center">  
        Current Plan: {subName}
      </h2>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-2xl font-bold mb-4 text-center text-zinc-800 dark:text-zinc-100">
          Cancel Subscription
        </h1>

        <div className="relative group w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={!hasActiveSub || loading}
                  className={`w-full bg-red-600 hover:bg-red-700 font-medium text-white py-3 rounded-full
                  border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:border-transparent${
                    !hasActiveSub
                      ? "bg-gray-300 text-gray-500"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  } disabled:opacity-50`}
                >
                  {loading ? "Cancelling..." : "Cancel Subscription"}
                </button>
              </TooltipTrigger>
              {!hasActiveSub && (
                <TooltipContent>
                  You don't have an active subscription to cancel.
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate("/payment/subscription")}
                  disabled={hasActiveSub}
                  className={`w-full bg-blue-600 hover:bg-blue-700 font-medium text-white py-3 rounded-full
                  border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:border-transparent ${
                    hasActiveSub
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Add a Subscription
                </button>
              </TooltipTrigger>
              {hasActiveSub && (
                <TooltipContent>
                  You have an active subscription. Cancel it first to change to a new one.
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        {message && (
          <p className="mt-4 text-sm text-center text-zinc-700 dark:text-zinc-300">
            {message} 
            {subName == 'Custom' && (<p>Please <a href='mailto:porter@fsagent.com' 
            className="text-blue-600 underline">
              contact us</a> to cancel</p>)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageSubscriptions;