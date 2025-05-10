import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";

export function ResetPasswordHandoff() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("🔐 Received code:", code);

    if (!code) {
      navigate("/reset-password?session=missing");
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        console.error("Session error:", error);
        navigate("/reset-password?session=error");
      } else {
        navigate("/reset-password"); // 세션 설정 완료
      }
    });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-sm">Setting up your secure session...</p>
    </div>
  );
}
