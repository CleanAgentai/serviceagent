import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";

export function ResetPasswordHandoff() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            console.error("Session Error:", error);
            navigate("/reset-password?session=error");
          } else {
            navigate("/reset-password");
          }
        });
    } else {
      navigate("/reset-password?session=missing");
    }
  }, [navigate]);

  return <p>Loading secure reset session...</p>;
}
