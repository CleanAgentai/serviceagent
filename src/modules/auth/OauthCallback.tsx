import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";

export function OAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        // 1️⃣ 현재 로그인한 사용자 정보 가져오기
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getUser();
        if (sessionError) throw sessionError;

        const user = sessionData?.user;
        if (!user || !user.id)
          throw new Error("OAuth login failed: No valid user info");

        // 2️⃣ `profiles` 테이블에서 사용자 정보 확인 (company_name 체크)
        const { data: existingProfile, error: profileError } = await supabase
          .from("profiles")
          .select("company_name")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        if (!existingProfile || !existingProfile.company_name) {
          // ❌ 회사명이 없으면 추가 정보 입력 페이지로 이동
          navigate("/complete-profile", { state: { user } });
          return;
        }

        // ✅ 회사명이 있으면 대시보드로 이동
        navigate("/dashboard");
      } catch (error: any) {
        setError("OAuth authentication failed. Please try again.");
        console.error("OAuth authentication failed:", error);
      }
    };

    checkUserProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="text-lg font-semibold">Processing login...</p>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
