import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/providers/AuthContext";
import { GlobalPopup } from "./Popup";

const LS_KEY = "hide_welcome_popup";

export default function WelcomePopupController() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPopupStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if user has permanently dismissed the popup
        const dismissedForever = localStorage.getItem(LS_KEY) === "true";
        if (dismissedForever) {
          setShowPopup(false);
          setIsLoading(false);
          return;
        }

        // Check user's progress
        const { data: profile, error } = await supabase
          .from("company_profiles")
          .select("completion_bitmask, first_interview_id")
          .eq("created_by_user_id", user.id)
          .single();

        if (error) {
          console.error("Failed to fetch company profile:", error);
          setIsLoading(false);
          return;
        }

        // Show popup if user hasn't completed the first essential steps
        const hasStarted = profile?.first_interview_id || 
                          (profile?.completion_bitmask && 
                           profile.completion_bitmask !== "0000");

        // Only show popup if user hasn't started onboarding yet
        if (!hasStarted) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      } catch (error) {
        console.error("Error checking popup status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure auth is fully loaded
    const timer = setTimeout(() => {
      checkPopupStatus();
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleDismissPermanently = () => {
    localStorage.setItem(LS_KEY, "true");
    setShowPopup(false);
  };

  if (isLoading || !showPopup) return null;

  return (
    <GlobalPopup
      onClose={handlePopupClose}
      onDismissPermanently={handleDismissPermanently}
    />
  );
}