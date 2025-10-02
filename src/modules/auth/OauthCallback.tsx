import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";

export function OAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleCustomerio = async (event: string) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const { data: { user } } = await supabase.auth.getUser();
    try {
      const identifyRes = await fetch(`${apiBaseUrl}/api/customerio/identify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          traits: { last_seen_at: new Date().toISOString() },
        }),
      });
      if (!identifyRes.ok) throw new Error(`identify failed: ${identifyRes.status}`);

      const trackRes = await fetch(`${apiBaseUrl}/api/customerio/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          event: event,
          traits: { },
        }),
      });
      if (!trackRes.ok) throw new Error(`track failed: ${trackRes.status}`);

    } catch (cioErr) {
      console.error("Customer.io backend calls failed:", cioErr);
    }
  }

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

        // 2️⃣ `profiles` 테이블에서 사용자 정보 확인 (company_name 체크)
        const { data: existingProfile, error: profileError } = await supabase
          .from("profiles")
          .select("company_name")
          .eq("id", user.id)
          .single();

        console.log("Existing profile:", profileError);

        if (!existingProfile || !existingProfile.company_name) {
          // ❌ 회사명이 없으면 추가 정보 입력 페이지로 이동
          navigate("/plan-onboarding", { state: { user } });
          return;
        }

        // ✅ 회사명이 있으면 대시보드로 이동
        handleCustomerio("login");
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
