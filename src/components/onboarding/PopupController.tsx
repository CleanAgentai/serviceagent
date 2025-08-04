import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/providers/AuthContext";
import { GlobalPopup } from "./Popup"; // <- adjust path if needed

export default function WelcomePopupController() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkPopupStatus = async () => {
      if (!user) return;

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
      const dismissed = localStorage.getItem("hide_welcome_popup");

      if (!isComplete && !dismissed) {
        setShowPopup(true);
      }
    };

    checkPopupStatus();
  }, [user]);

  const handlePopupClose = () => setShowPopup(false);

  const handleDismissPermanently = () => {
    localStorage.setItem("hide_welcome_popup", "true");
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