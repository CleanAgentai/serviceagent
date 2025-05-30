import React, { useState } from "react";
import { supabase } from "@/app/lib/supabase";

const ManageSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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

      <button
        onClick={handleCancel}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition duration-200 disabled:opacity-50"
      >
        {loading ? "Cancelling..." : "Cancel Subscription"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-zinc-700 dark:text-zinc-300">
          {message}
        </p>
      )}
    </div>
  );
};

export default ManageSubscriptions;