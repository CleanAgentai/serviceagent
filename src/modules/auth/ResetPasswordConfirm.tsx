// reset-password-confirm.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ResetPasswordConfirm() {
  const navigate = useNavigate();

  useEffect(() => {
    // 실제 세션이 있는지 체크한 뒤 비밀번호 재설정 폼으로 보냄
    const timeout = setTimeout(() => {
      navigate("/reset-password");
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-700 text-lg">Verifying reset link...</p>
    </div>
  );
}
