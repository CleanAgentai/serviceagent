import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/providers/AuthContext";
import { GlobalPopup } from "./Popup";

const LS_KEY = "hide_welcome_popup";              // permanent (Do not show again)
const SS_KEY = "hide_welcome_popup_this_session"; // session-only (X)

export default function WelcomePopupController() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkPopupStatus = async () => {
      if (!user) return;

      const dismissedForever = localStorage.getItem(LS_KEY) === "true";
      if (dismissedForever) return;

      const dismissedThisSession = sessionStorage.getItem(SS_KEY) === "true";
      if (dismissedThisSession) return;

      const { data: profile, error } = await supabase
        .from("company_profiles")
        .select("completion_bitmask")
        .eq("created_by_user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch company profile:", error);
        return;
      }

      const isComplete = profile?.completion_bitmask === "1111";

      if (!isComplete) {
        setShowPopup(true);
      }
    };

    checkPopupStatus();
  }, [user]);

  const handlePopupClose = () => {
    sessionStorage.setItem(SS_KEY, "true");
    setShowPopup(false);
  };

  const handleDismissPermanently = () => {
    localStorage.setItem(LS_KEY, "true");
    sessionStorage.setItem(SS_KEY, "true");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <GlobalPopup
      onClose={handlePopupClose}
      onDismissPermanently={handleDismissPermanently}
    />
  );
}
