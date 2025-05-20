import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { Building, LogOut, X } from "lucide-react";
import { CompanyProfileForm } from "./CompanyProfileForm";
import { supabase } from "@/app/lib/supabase";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyColors, setCompanyColors] = useState({
    primary: "#0693e3",
    secondary: "#8ed1fc",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function loadCompanyColors() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: companyProfile } = await supabase
          .from("company_profiles")
          .select("company_primary_colour, company_secondary_colour")
          .eq("created_by_user_id", user.id)
          .single();

        if (companyProfile) {
          setCompanyColors({
            primary: companyProfile.company_primary_colour || "#0693e3",
            secondary: companyProfile.company_secondary_colour || "#8ed1fc",
          });
        }
      } catch (error) {
        console.error("Error loading company colors:", error);
      }
    }

    loadCompanyColors();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await logout();
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match.");
        return;
      }
      if (currentPassword === newPassword) {
        toast.error("New password must be different from the current one.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email ?? "",
        password: currentPassword,
      });
      if (signInError) {
        toast.error("Current password is incorrect.");
        return;
      }

      //update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        toast.error("Failed to update password.");
        return;
      }

      toast.success("Password has been changed successfully!");
      setShowChangePasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("An error occurred. Please try again");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto py-8 px-8">
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Company Settings
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage your company information and branding
                  </p>
                </div>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Change Password
                </button>
              </div>

              <CompanyProfileForm mode="update" />
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
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={
                    {
                      "--tw-ring-color": companyColors.primary,
                      "--tw-ring-offset-color": companyColors.primary,
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={
                    {
                      "--tw-ring-color": companyColors.primary,
                      "--tw-ring-offset-color": companyColors.primary,
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={
                    {
                      "--tw-ring-color": companyColors.primary,
                      "--tw-ring-offset-color": companyColors.primary,
                    } as React.CSSProperties
                  }
                />
              </div>
              <button
                className="w-full text-white py-2 px-4 rounded-lg transition-colors bg-gray-900 hover:bg-gray-700"
                onClick={handlePasswordChange}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
