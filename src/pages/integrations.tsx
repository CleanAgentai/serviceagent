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
      console.log("👤 User fetched successfully");
      
      // Validate API configuration
      if (!apiBaseUrl) {
        console.error("❌ API base URL not configured");
        setError("API base URL not configured");
        return;
      }

      
      const apiUrl = `${apiBaseUrl}/api/knit/auth/session`;
      console.log("🌐 Initiating auth session...");
      
      // Updated to match backend controller field names
      const requestPayload = {
        originOrgId: user.id, // Using user.id as org identifier
        originOrgName: user.companyName,
        originUserEmail: user.email,
        originUserName: user.email.split('@')[0] // Extract username from email
      };
      console.log("📦 Sending auth request...");
      
      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });
      
      if (!resp.ok) {
        const responseText = await resp.text();
        console.error("❌ Auth request failed. Status:", resp.status);
        throw new Error(`Authentication failed: ${resp.status}`);
      }
      
      const responseText = await resp.text();
      console.log("📄 Response received");
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("✅ Response parsed successfully");
      } catch (jsonError) {
        console.error("❌ Invalid response format");
        throw new Error("Invalid response from server");
      }
      
      // Backend returns { success: true, token: "..." }
      const { success, token } = responseData;
      console.log("🔑 Auth session:", success ? "✅ Success" : "❌ Failed");
      
      if (success && token) {
        knitRef.current?.setAttribute("authsessiontoken", token);
        console.log("✅ Token set on knit-auth element");
      } else {
        throw new Error("Authentication session failed");
      }
    } catch (err: any) {
      console.error("🚨 Auth session failed:", err.message);
      setError(err.message || "Authentication failed");
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
    if (!el) {
      console.warn("⚠️ Knit component not ready, retrying...");
      return;
    }
    el.addEventListener("onNewSession", handleNewSession as EventListener);
    el.addEventListener("onFinish", handleFinish as EventListener);
    el.addEventListener(
      "onDeactivate",
      handleDeactivate as EventListener
    );
    el.addEventListener("onKnitClose", handleClose as EventListener);

    // Initialize auth session
    fetchSessionToken().catch(err => {
      console.error("🚨 Auth session initialization failed:", err.message);
    });

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
