import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
import { Mail } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    //To fix the sender, change the configuration in supabse

    try {
      // const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: "https://www.fsagent.com/reset-password",
      // });

      // const { data, error } = await supabase.auth.admin.generateLink({
      //   type: "recovery",
      //   email,
      //   options: {
      //     redirectTo: `${window.location.origin}/reset-password`,
      //   },
      // });
      // if (error || !data?.properties.action_link) {
      //   throw new Error(error?.message || "Failed to generate reset link");
      // }

      // (email, {
      //   redirectTo: `${window.location.origin}/reset-password`, //
      // });

      // //API REST
      // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      // const res = await fetch(`${apiBaseUrl}/api/auth/send-reset-email`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     // resetLink: data.properties.action_link,
      //   }),
      // });

      // if (!res.ok) {
      //   const errJson = await res.json();
      //   throw new Error(errJson.error || "Failed to send email");
      // }

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage("Reset link sent! Please check your email.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/ServiceAgent_new.svg"
                alt="ServiceAgent Logo"
                className="h-12 w-auto mx-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot your password?
            </h1>
            <p className="text-gray-600">
              Enter your email and we’ll send you a password reset link.
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleResetPassword} className="space-y-6">
              {message && (
                <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-200 rounded-lg">
                  {message}
                </div>
              )}
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/signin"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
