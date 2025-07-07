import React, { useState, useEffect, useCallback } from "react";
import { useMergeLink } from "@mergeapi/react-merge-link";
import { Plug } from "lucide-react";
import { supabase } from "../lib/supabase";

interface CurrentUser {
  id: string;
  email: string;
  companyName: string;
  companyProfileId: string;
  mergePublicToken: string | null;
}

// Fetch current user from Supabase
async function fetchCurrentUser(): Promise<CurrentUser> {
  console.log("Fetching current user...");
  
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Error fetching user:", userError);
      throw new Error("Failed to fetch user");
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('created_by_user_id', user.id)
      .single();
    
    if (profileError || !profile) {
      console.error("Error fetching company profile:", profileError);
      throw new Error("Failed to fetch company profile");
    }

    return {
      id: user.id,
      email: user.email || "",
      companyName: profile.company_name || "My Company",
      companyProfileId: profile.id,
      mergePublicToken: profile.merge_public_token || null,
    };
  } catch (err) {
    console.error("Error in fetchCurrentUser:", err);
    throw err;
  }
}

const Integrations: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string>("");
  const [companyProfileId, setCompanyProfileId] = useState<string>("");
  const [mergePublicToken, setMergePublicToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        console.log("Integrations component mounted, fetching user data...");
        const user = await fetchCurrentUser();
        setCompanyProfileId(user.companyProfileId);
        setMergePublicToken(user.mergePublicToken);

        console.log("Requesting link token from API...");
        const resp = await fetch(`${apiBaseUrl}/api/merge/link-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            orgName: user.companyName,
            email: user.email,
          }),
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          console.error("Link token API error:", errorData);
          throw new Error(`API error: ${errorData.error || resp.statusText}`);
        }

        const { linkToken } = await resp.json();
        setLinkToken(linkToken);
      } catch (err) {
        console.error("Failed to fetch link token", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onSuccess = useCallback(
    async (public_token: string) => {
      console.log("Merge Link success! Public token received:", public_token);
      try {
        const resp = await fetch(`${apiBaseUrl}/api/merge/exchange-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicToken: public_token,
            companyProfileId,
          }),
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          console.error("Token exchange API error:", errorData);
          throw new Error(`API error: ${errorData.error || resp.statusText}`);
        }

        const { accountToken } = await resp.json();
        console.log("Token exchange successful! Account token received");

        setMergePublicToken(public_token);
        alert(`Integration successful! Your ATS is now connected.`);
      } catch (err) {
        console.error("Token exchange failed", err);
        alert("Failed to complete integration. Please try again.");
      }
    },
    [companyProfileId]
  );

  const { open, isReady } = useMergeLink({
    linkToken,
    onSuccess,
  });

  const loggedOpen = async () => {
    console.log("Open called");

    const user = await fetchCurrentUser();

    const resp = await fetch(`${apiBaseUrl}/api/merge/link-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        orgName: user.companyName,
        email: user.email,
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      console.error("Error refreshing link token:", errorData);
      alert("Failed to refresh integration token. Please try again.");
      return;
    }

    const { linkToken: newToken } = await resp.json();
    console.log("Refreshed link token:", newToken);
    setLinkToken(newToken);
    open();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 40,
          minWidth: 380,
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Plug size={48} color="#2563eb" style={{ marginBottom: 16 }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Integrations</h1>
        {!mergePublicToken && (
          <p style={{ color: "#555", fontSize: 16, marginBottom: 24, textAlign: "center" }}>
            Connect your favorite ATS tools to ServiceAgent to automate your workflow.
          </p>
        )}

        {error && (
          <div style={{
            padding: "12px 16px",
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            borderRadius: 8,
            marginBottom: 16,
            width: "100%",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <button
          disabled={isLoading || !isReady}
          onClick={loggedOpen}
          style={{
            padding: "14px 36px",
            fontSize: 18,
            borderRadius: 8,
            background: (!isLoading && isReady) ? "#2563eb" : "#a5b4fc",
            color: "white",
            border: "none",
            fontWeight: 600,
            cursor: (!isLoading && isReady) ? "pointer" : "not-allowed",
            marginBottom: 24,
            boxShadow: (!isLoading && isReady) ? "0 2px 8px rgba(37,99,235,0.08)" : undefined,
          }}
        >
          {isLoading
            ? "Loading..."
            : mergePublicToken
              ? "Edit Integration"
              : "Connect an Integration"}
        </button>

        <div
          style={{
            width: "100%",
            padding: "18px 0 0 0",
            borderTop: "1px solid #f1f5f9",
            textAlign: "center",
            color: "#888",
            fontSize: 15,
          }}
        >
          {mergePublicToken ? (
            <span style={{ color: "#555", fontSize: 16 }}>
              Integration successful!<br />
              Your selected ATS is now connected. ServiceAgent will now automatically send candidate data to your ATS.<br />
              <br />
              To unlink your ATS Please <a href="mailto:porter@fsagent.com" style={{ color: "#2563eb", textDecoration: "underline" }}>contact us</a> at porter@fsagent.com.
            </span>
          ) : (
            <span>No integrations connected yet.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
