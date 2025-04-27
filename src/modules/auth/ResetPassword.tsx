import React, { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useNavigate } from "react-router-dom";

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      setSuccess("Password updated successfully!");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <main className="flex-grow">
        <div className="max-w-md mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Reset Your Password
          </h1>

          {success && (
            <div className="p-3 text-green-700 bg-green-100 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="p-3 text-red-600 bg-red-100 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form
            onSubmit={handleResetPassword}
            className="space-y-6 bg-white p-8 rounded-xl shadow-sm"
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center px-4 py-2 bg-gradient-to-r from-[#4FC3DC] to-[#1E529D] text-white rounded-lg hover:opacity-90 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
