import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("At least 1 uppercase letter required");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("At least 1 lowercase letter required");
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push("At least 1 number (0-9) required");
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("At least 1 special character required");
    }
    
    return errors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    const errors = validatePassword(value);
    setPasswordErrors(errors);
    setShowPasswordRequirements(value.length > 0);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Check password requirements
    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      setError("Password does not meet requirements");
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
    <div className="relative min-h-screen w-full flex flex-col mt-[-2rem]">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-50 to-white -z-10" />
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600">
              Enter your new password below. Make sure it meets our security requirements.
            </p>
          </div>

          {/* Success Display */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Reset Password Form */}
          <div className="bg-transparent rounded-xl p-8 pt-0">
            <form onSubmit={handleResetPassword} className="space-y-6" noValidate>
              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      onFocus={() => setShowPasswordRequirements(true)}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        passwordErrors.length > 0 && password.length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  {/* Password Requirements */}
                  {showPasswordRequirements && (
                    <div className="mt-2 bg-gray-50 rounded-lg">
                      <ul className="space-y-1 transition-all duration-300">
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          password.length >= 8 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{password.length >= 8 ? '✓' : '✗'}</span>
                          At least 8 characters long
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[A-Z]/.test(password) ? '✓' : '✗'}</span>
                          At least 1 uppercase letter
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[a-z]/.test(password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[a-z]/.test(password) ? '✓' : '✗'}</span>
                          At least 1 lowercase letter
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[0-9]/.test(password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[0-9]/.test(password) ? '✓' : '✗'}</span>
                          At least 1 number (0-9)
                        </li>
                        <li className={`text-xs flex items-center transition-colors duration-300 ${
                          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="mr-2 transition-all duration-300">{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✓' : '✗'}</span>
                          At least 1 special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        confirmPassword.length > 0 && password !== confirmPassword
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : confirmPassword.length > 0 && password === confirmPassword
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {confirmPassword.length > 0 && (
                    <div className="mt-1 transition-all duration-300">
                      {password === confirmPassword ? (
                        <p className="text-xs text-green-600 flex items-center transition-colors duration-300">
                          <span className="mr-1 transition-all duration-300">✓</span>
                          Passwords match
                        </p>
                      ) : (
                        <p className="text-xs text-red-600 flex items-center transition-colors duration-300">
                          <span className="mr-1 transition-all duration-300">✗</span>
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 bg-clip-padding text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 border border-white/20 disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Reset Password"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
