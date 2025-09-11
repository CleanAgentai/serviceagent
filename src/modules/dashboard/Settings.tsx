import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
import { Building, LogOut, X, Lock, ArrowRight } from 'lucide-react';
import { CompanyProfileForm } from './CompanyProfileForm';
import { supabase } from '@/app/lib/supabase';
import { toast } from 'sonner';
import { StripeCheckoutBox } from '@/components/stripe/StripeCheckoutBox';

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyColors, setCompanyColors] = useState({
    primary: '#0693e3',
    secondary: '#8ed1fc',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('At least 1 uppercase letter required');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('At least 1 lowercase letter required');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('At least 1 number (0-9) required');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('At least 1 special character required');
    }

    return errors;
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    const errors = validatePassword(value);
    setPasswordErrors(errors);
    setShowPasswordRequirements(value.length > 0);
  };

  useEffect(() => {
    async function loadCompanyColors() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: companyProfile } = await supabase
          .from('company_profiles')
          .select('company_primary_colour, company_secondary_colour')
          .eq('created_by_user_id', user.id)
          .single();

        if (companyProfile) {
          setCompanyColors({
            primary: companyProfile.company_primary_colour || '#0693e3',
            secondary: companyProfile.company_secondary_colour || '#8ed1fc',
          });
        }
      } catch (error) {
        console.error('Error loading company colors:', error);
      }
    }

    loadCompanyColors();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await logout();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setError('');
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }
      if (currentPassword === newPassword) {
        setError('New password must be different from the current one');
        return;
      }

      // Check password requirements
      const passwordValidationErrors = validatePassword(newPassword);
      if (passwordValidationErrors.length > 0) {
        setError('Password does not meet requirements');
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email ?? '',
        password: currentPassword,
      });
      if (signInError) {
        setError('Current password is incorrect');
        return;
      }

      //update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError('Failed to update password');
        return;
      }

      toast.success('Password has been changed successfully!');
      setShowChangePasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setPasswordErrors([]);
      setShowPasswordRequirements(false);
    } catch (err) {
      setError('An error occurred. Please try again');
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto py-4 px-6">
          <div className="p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-left text-2xl font-bold text-gray-900">
                    Company Settings
                  </h1>
                  <p className="text-gray-600 mt-1 text-sm leading-tight whitespace-nowrap truncate max-w-xl">
                    Manage your company information and branding
                  </p>
                </div>
              </div>

              <CompanyProfileForm mode="update" />

              <div className="w-full max-w-4xl mx-auto mt-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate('/payment/manage-subscription')}
                    className="w-full inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    Manage Subscription
                  </button>
                  <button
                    onClick={() => setShowChangePasswordModal(true)}
                    className="w-full inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setError('');
                  setPasswordErrors([]);
                  setShowPasswordRequirements(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    onFocus={() => setShowPasswordRequirements(true)}
                    onBlur={() => setShowPasswordRequirements(false)}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      passwordErrors.length > 0 && newPassword.length > 0
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                </div>

                {/* Password Requirements */}
                {showPasswordRequirements && (
                  <div className="mt-2 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Password requirements:
                    </p>
                    <ul className="space-y-1">
                      <li
                        className={`text-xs flex items-center transition-colors duration-300 ${
                          newPassword.length >= 8
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <span className="mr-2 transition-all duration-300">
                          {newPassword.length >= 8 ? '✓' : '✗'}
                        </span>
                        At least 8 characters long
                      </li>
                      <li
                        className={`text-xs flex items-center transition-colors duration-300 ${
                          /[A-Z]/.test(newPassword)
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <span className="mr-2 transition-all duration-300">
                          {/[A-Z]/.test(newPassword) ? '✓' : '✗'}
                        </span>
                        At least 1 uppercase letter
                      </li>
                      <li
                        className={`text-xs flex items-center transition-colors duration-300 ${
                          /[a-z]/.test(newPassword)
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <span className="mr-2 transition-all duration-300">
                          {/[a-z]/.test(newPassword) ? '✓' : '✗'}
                        </span>
                        At least 1 lowercase letter
                      </li>
                      <li
                        className={`text-xs flex items-center transition-colors duration-300 ${
                          /[0-9]/.test(newPassword)
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <span className="mr-2 transition-all duration-300">
                          {/[0-9]/.test(newPassword) ? '✓' : '✗'}
                        </span>
                        At least 1 number (0-9)
                      </li>
                      <li
                        className={`text-xs flex items-center transition-colors duration-300 ${
                          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                            newPassword,
                          )
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        <span className="mr-2 transition-all duration-300">
                          {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                            newPassword,
                          )
                            ? '✓'
                            : '✗'}
                        </span>
                        At least 1 special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      confirmPassword.length > 0 &&
                      newPassword !== confirmPassword
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : confirmPassword.length > 0 &&
                            newPassword === confirmPassword
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                          : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {confirmPassword.length > 0 && (
                  <div className="mt-1 transition-all duration-300">
                    {newPassword === confirmPassword ? (
                      <p className="text-xs text-green-600 flex items-center transition-colors duration-300">
                        <span className="mr-1 transition-all duration-300">
                          ✓
                        </span>
                        Passwords match
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 flex items-center transition-colors duration-300">
                        <span className="mr-1 transition-all duration-300">
                          ✗
                        </span>
                        Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>
              <button
                className="w-full flex items-center justify-center group bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3"
                onClick={handlePasswordChange}
              >
                Update Password
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
