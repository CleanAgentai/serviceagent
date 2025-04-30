// reset-password-confirm.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
export function ResetPasswordConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isQuerySafe = params.get("bot-safe") === "true";

    const isHeadless = navigator.webdriver || false;
    const isSmallScreen = window.innerWidth < 100;
    const ua = navigator.userAgent || "";
    const isLikelyBot =
      isHeadless || isSmallScreen || /puppeteer|HeadlessChrome/i.test(ua);

    if (isQuerySafe && !isLikelyBot) {
      navigate("/reset-password");
    } else {
      console.warn("Bot detected or unsafe link.");
    }
  }, [navigate, location.search]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-700 text-lg font-medium">
        Verifying your identity...
      </p>
    </div>
  );
}
