// reset-password-confirm.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
export function ResetPasswordConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isBotSafe = params.get("bot-safe") === "true";

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY" && session && isBotSafe) {
        navigate("/reset-password");
      } else if (!session && !checked) {
        setTimeout(() => {
          if (!checked) {
            setChecked(true);
            navigate("/login");
          }
        }, 3000); // give it 3s to load
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.search, checked]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-700 text-lg font-medium">
        Verifying your reset link...
      </p>
    </div>
  );
}
