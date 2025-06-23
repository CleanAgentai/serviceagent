import React, { useState, useEffect, useCallback } from "react";
import { useMergeLink } from "@mergeapi/react-merge-link";
import { Plug } from "lucide-react";

interface CurrentUser {
  id: string;
  email: string;
  companyName: string;
  companyProfileId: string;
}

// ← You’ll need to fill in how you get your logged-in user’s info
async function fetchCurrentUser(): Promise<CurrentUser> {
  const res = await fetch("/api/auth/me");
  return res.json();
}

const Integrations: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string>("");
  const [companyProfileId, setCompanyProfileId] = useState<string>("");

  // 1) On mount, fetch user info and then a link token
  useEffect(() => {
    (async () => {
      try {
        const user = await fetchCurrentUser();
        setCompanyProfileId(user.companyProfileId);

        const resp = await fetch("/api/merge/link-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            orgName: user.companyName,
            email: user.email,
            integration: "breezy",      // or any ATS slug you want to skip to
          }),
        });
        const { linkToken } = await resp.json();
        setLinkToken(linkToken);
      } catch (err) {
        console.error("Failed to fetch link token", err);
      }
    })();
  }, []);

  // 2) When the end user finishes linking, swap public_token for account_token
  const onSuccess = useCallback(
    async (public_token: string) => {
      try {
        const resp = await fetch("/api/merge/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicToken: public_token,
            companyProfileId,
          }),
        });
        const { accountToken } = await resp.json();
        alert(`Integration successful! Account token: ${accountToken}`);
      } catch (err) {
        console.error("Token exchange failed", err);
      }
    },
    [companyProfileId]
  );

  // 3) Initialize Merge Link with your dynamic token
  const { open, isReady } = useMergeLink({
    linkToken,
    onSuccess,
    // Optional: onExit, tenantConfig, etc.
  });

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
        <p style={{ color: "#555", fontSize: 16, marginBottom: 24, textAlign: "center" }}>
          Connect your favorite ATS tools to ServiceAgent to automate your workflow.
        </p>
        <button
          disabled={!isReady}
          onClick={open}
          style={{
            padding: "14px 36px",
            fontSize: 18,
            borderRadius: 8,
            background: isReady ? "#2563eb" : "#a5b4fc",
            color: "white",
            border: "none",
            fontWeight: 600,
            cursor: isReady ? "pointer" : "not-allowed",
            marginBottom: 24,
            boxShadow: isReady ? "0 2px 8px rgba(37,99,235,0.08)" : undefined,
          }}
        >
          Connect an Integration
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
          <span>No integrations connected yet.</span>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
