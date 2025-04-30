// reset-password-confirm.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
export function ResetPasswordConfirm() {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/reset-password"); // 실제 reset page로 이동
      } else {
        navigate("/login");
      }
    };
    check();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-700 text-lg">Verifying reset link...</p>
    </div>
  );
}
