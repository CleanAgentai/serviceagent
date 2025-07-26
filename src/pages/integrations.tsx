import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";

interface CurrentUser {
  id: string;
  email: string;
  companyName: string;
  companyProfileId: string;
}

// (unchanged) your helper to grab the logged‑in user/profile
async function fetchCurrentUser(): Promise<CurrentUser> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw userError || new Error("No user");
  const { data: profile, error: profileError } = await supabase
    .from("company_profiles")
    .select("*")
    .eq("created_by_user_id", user.id)
    .single();
  if (profileError || !profile) throw profileError || new Error("No profile");
  return {
    id: user.id,
    email: user.email || "",
    companyName: profile.company_name,
    companyProfileId: profile.id,
  };
}

const Integrations: React.FC = () => {
  const knitRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // 1) Fetch & inject a fresh Knit session token
  const fetchSessionToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Starting fetchSessionToken...");
      const user = await fetchCurrentUser();
      console.log("👤 User fetched:", user);
      
      const apiUrl = `${apiBaseUrl}/api/knit/session-token`;
      console.log("🌐 API URL:", apiUrl);
      console.log("📦 Request payload:", {
        userId: user.id,
        orgName: user.companyName,
        email: user.email,
      });
      
      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          orgName: user.companyName,
          email: user.email,
        }),
      });
      
      console.log("📡 Response status:", resp.status);
      console.log("📡 Response headers:", Object.fromEntries(resp.headers.entries()));
      
      if (!resp.ok) {
        const responseText = await resp.text();
        console.error("❌ Response not OK. Status:", resp.status);
        console.error("❌ Response text:", responseText);
        throw new Error(`API error: ${resp.status} - ${responseText}`);
      }
      
      const responseText = await resp.text();
      console.log("📄 Raw response text:", responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("✅ Parsed JSON:", responseData);
      } catch (jsonError) {
        console.error("❌ JSON parse error:", jsonError);
        console.error("❌ Response was not valid JSON:", responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      const { token } = responseData;
      console.log("🔑 Token received:", token ? "✅ Yes" : "❌ No");
      
      if (token) {
        knitRef.current?.setAttribute("authsessiontoken", token);
        console.log("✅ Token set on knit-auth element");
      } else {
        throw new Error("No token in response");
      }
    } catch (err: any) {
      console.error("🚨 Knit session error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // 2) Event handlers for the Knit UI
  const handleNewSession = useCallback(
    (e: CustomEvent) => {
      e.preventDefault();
      fetchSessionToken();
    },
    [fetchSessionToken]
  );

  const handleFinish = useCallback((e: CustomEvent) => {
    const details = e.detail.integrationDetails;
    console.log("Knit integration completed:", details);
    // TODO: optionally POST `details` back to your server to persist
  }, []);

  const handleDeactivate = useCallback((e: CustomEvent) => {
    console.log("Knit integration deactivated:", e.detail.integrationDetails);
  }, []);

  const handleClose = useCallback((e: CustomEvent) => {
    console.log("Knit UI closed");
  }, []);

  // 3) Wire up listeners & kick off first session
  useEffect(() => {
    const el = knitRef.current;
    if (!el) return;
    el.addEventListener("onNewSession", handleNewSession as EventListener);
    el.addEventListener("onFinish", handleFinish as EventListener);
    el.addEventListener(
      "onDeactivate",
      handleDeactivate as EventListener
    );
    el.addEventListener("onKnitClose", handleClose as EventListener);

    // initial load
    fetchSessionToken();

    return () => {
      el.removeEventListener(
        "onNewSession",
        handleNewSession as EventListener
      );
      el.removeEventListener("onFinish", handleFinish as EventListener);
      el.removeEventListener(
        "onDeactivate",
        handleDeactivate as EventListener
      );
      el.removeEventListener("onKnitClose", handleClose as EventListener);
    };
  }, [
    fetchSessionToken,
    handleNewSession,
    handleFinish,
    handleDeactivate,
    handleClose,
  ]);

  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>{error}</div>
      )}

             <knit-auth ref={knitRef} skipIntro="">
        <button
          slot="trigger"
          disabled={loading}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            borderRadius: 6,
            background: loading ? "#ccc" : "#2563eb",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading…" : "Connect with Knit"}
        </button>
      </knit-auth>
    </div>
  );
};

export default Integrations;
