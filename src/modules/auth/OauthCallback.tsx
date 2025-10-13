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

        const user = sessionData?.user;

        console.log("User:", user);
        if (!user || !user.id)
          throw new Error("OAuth login failed: No valid user info");

        // 2️⃣ `profiles` 테이블에서 사용자 정보 확인 (company_name 및 subscription 체크)
        const { data: existingProfile, error: profileError } = await supabase
          .from("profiles")
          .select("company_name, subscription")
          .eq("id", user.id)
          .single();

        console.log("Existing profile:", profileError);

        // Check if user has an active subscription
        const hasSubscription = existingProfile?.subscription && existingProfile.subscription.trim() !== '';

        if (!existingProfile || !existingProfile.company_name) {
          // ❌ 회사명이 없으면 추가 정보 입력 페이지로 이동
          navigate("/plan-onboarding", { state: { user } });
          return;
        } else if (!hasSubscription) {
          // ❌ 회사명은 있지만 구독이 없으면 결제 페이지로 이동
          console.log("No active subscription found, redirecting to payment page...");
          navigate("/plan-onboarding", { state: { user } });
          return;
        }

        // ✅ 회사명이 있고 구독이 있으면 대시보드로 이동
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
